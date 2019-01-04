import Device from './device'
import Types from './kkProto/types_pb'
import Messages from './kkProto/messages_pb'
import Exchanges from './kkProto/exchange_pb'
import { fromHexString, toHexString, arrayify, protoFieldToSetMethod } from './utils'
import WebUSBDevice, { WebUSBDeviceConfig } from './webUSBDevice'
import { Event } from './event'
import messageTypeRegistry from './messageTypeRegistry'

interface KeepKeyConfig {
  autoButton?: boolean
  device?: Device
}

const initialKeepKeyArgs = {
  autoButton: false,
  device: null
}

export default class KeepKey {

  public features: Messages.Features.AsObject

  public autoButton: boolean = false
  public device: Device

  constructor (config: KeepKeyConfig) {
    const mergedConfig = {
      ...initialKeepKeyArgs,
      ...config
    }
    this.autoButton = mergedConfig.autoButton
    this.device = mergedConfig.device
  }

  public static withWebUSB (webUSBDeviceConfig: WebUSBDeviceConfig): KeepKey {
    return new KeepKey({ autoButton: false, device: new WebUSBDevice(webUSBDeviceConfig) })
  }

  public async acknowledgeWithCharacter (character: string): Promise<[number, any]> {
  	return this.acknowledgeWithCharacterProto(character, false, false)
  }

  public async acknowledgeWithCharacterDelete (): Promise<[number, any]> {
  	return this.acknowledgeWithCharacterProto('', true, false)
  }

  public async acknowledgeWithCharacterDone (): Promise<[number, any]> {
  	return this.acknowledgeWithCharacterProto('', false, true)
  }

  public async acknowledgeWithCharacterProto (character: string, _delete: boolean, _done: boolean): Promise<[number, any]> {
    const characterAck = new Messages.CharacterAck()
    if (character !== '') {
      characterAck.setCharacter(character)
    } else if (_delete) {
      characterAck.setDelete(_delete)
    } else if (_done) {
      characterAck.setDone(_done)
    }

    // User may be propmpted for button press up to 2 times
    const [typeEnum, response] = await this.device.exchange(Messages.MessageType.MESSAGETYPE_CHARACTERACK, characterAck)
    const responseObj = (response as any).toObject()

    // Emit event to notify clients that passphrase has been exchanged
    this.device.events.emit(String(Messages.MessageType.MESSAGETYPE_CHARACTERACK), typeEnum, response)

    return [typeEnum, responseObj]
  }

  // Send passphrase to the device, this will typically be called in response to a MESSAGETYPE_PASSPHRASEREQUEST event
  public async acknowledgeWithPassphrase (passphrase: string): Promise<[number, any]> {
    const passphraseAck = new Messages.PassphraseAck()
    passphraseAck.setPassphrase(passphrase)
    // User may be propmpted for button press up to 2 times
    const [typeEnum, response] = await this.device.exchange(Messages.MessageType.MESSAGETYPE_PASSPHRASEACK, passphraseAck)
    const responseObj = (response as any).toObject()

    // Emit event to notify clients that passphrase has been exchanged
    this.device.events.emit(String(Messages.MessageType.MESSAGETYPE_PASSPHRASEACK), typeEnum, response)

    return [typeEnum, responseObj]
  }

  // Send pin to the device, this will typically be called in response to a MESSAGETYPE_PINMATRIXREQUEST event
  public async acknowledgeWithPin (pin: string): Promise<[number, any]> {
    const matrixAck = new Messages.PinMatrixAck()
    matrixAck.setPin(pin)
    // User may be propmpted for button press up to 2 times
    const [typeEnum, response] = await this.device.exchange(Messages.MessageType.MESSAGETYPE_PINMATRIXACK, matrixAck)
    const responseObj = (response as any).toObject()

    // Emit event to notify clients that pin has been exchanged
    this.device.events.emit('PINMATRIXACK_INTERRUPT_RESULT', typeEnum, response)

    return [typeEnum, responseObj]
  }

  // ApplyPolicy enables or disables a named policy such as "ShapeShift" on the device
  public async applyPolicy (p: Types.PolicyType.AsObject): Promise<void> {
    const policy = new Types.PolicyType()
    policy.setPolicyName(p.policyName)
    policy.setEnabled(p.enabled)
    const applyPolicies = new Messages.ApplyPolicies()
    applyPolicies.setPolicyList([policy])
    await this.device.exchange(Messages.MessageType.MESSAGETYPE_APPLYPOLICIES, applyPolicies)
  }

  // ApplySettings changes the label, language, and enabling/disabling the passphrase
  // The default language is english
  public async applySettings (s: Messages.ApplySettings.AsObject): Promise<void> {
    const applySettings = new Messages.ApplySettings()
    applySettings.setUsePassphrase(s.usePassphrase)
    if (s.language) {
      applySettings.setLanguage(s.language)
    }
    await this.device.exchange(Messages.MessageType.MESSAGETYPE_APPLYSETTINGS, applySettings)
  }

  // Cancel aborts the last device action that required user interaction
  // It can follow a button request, passphrase request, or pin request
  public async cancel (): Promise<void> {
    const cancel = new Messages.Cancel()
    // send
    await this.device.exchange(Messages.MessageType.MESSAGETYPE_CANCEL, cancel)

    // Emit event to notify clients that pin has been exchanged
    this.device.events.emit(String(Messages.MessageType.MESSAGETYPE_CANCEL))
  }

   // ChangePin requests setting/changing the pin
  public async changePin (): Promise<void> {
    const changePin = new Messages.ChangePin()
    // User may be propmpted for button press up to 2 times
    await this.device.exchange(Messages.MessageType.MESSAGETYPE_CHANGEPIN, changePin)
  }

  // CipherKeyValue encrypts or decrypts a value with a given key, nodepath, and initializationVector
  // This method encrypts if encrypt is true and decrypts if false, the confirm paramater determines wether
  // the user is prompted on the device. See EncryptKeyValue() and DecryptKeyValue() for convenience methods
  // NOTE: If the length of the value in bytes is not divisible by 16 it will be zero padded
  public async cipherKeyValue (v: Messages.CipherKeyValue.AsObject): Promise<string | Uint8Array> {
    // if(val.length % 16 !== 0) val = val.concat() TODO THIS
    const cipherKeyValue = new Messages.CipherKeyValue()
    cipherKeyValue.setAddressNList(v.addressNList)
    cipherKeyValue.setKey(v.key)
    cipherKeyValue.setValue(v.value)
    cipherKeyValue.setEncrypt(v.encrypt)
    cipherKeyValue.setAskOnEncrypt(v.askOnEncrypt || false)
    cipherKeyValue.setAskOnDecrypt(v.askOnDecrypt || false)
    cipherKeyValue.setIv(v.iv || '')
    const [_, response] = await this.device.exchange(Messages.MessageType.MESSAGETYPE_CIPHERKEYVALUE, cipherKeyValue)
    const { value } = (response as Messages.CipheredKeyValue).toObject()
    return value
  }

  // ClearSession clears cached session values such as the pin and passphrase
  public async clearSession (): Promise<void> {
    const clearSession = new Messages.ClearSession()
    await this.device.exchange(Messages.MessageType.MESSAGETYPE_CLEARSESSION, clearSession)
  }

  // DecryptKeyValue is a convenience method around decrypting with CipherKeyValue().
  // For more granular control of the process use CipherKeyValue()
  public async decryptKeyValue (v: Messages.CipherKeyValue.AsObject): Promise<string | Uint8Array> {
    return this.cipherKeyValue(v)
  }

  // EthereumGetAddress returns the ethereum address associated with the given node path
  // Optionally you can display  the address on the screen
  public async ethereumGetAddress (a: Messages.EthereumGetAddress.AsObject): Promise<string> {
    const getAddr = new Messages.EthereumGetAddress()
    getAddr.setAddressNList(a.addressNList)
    getAddr.setShowDisplay(a.showDisplay)
    // send, receive ethereumaddress message
    const [_, response] = await this.device.exchange(Messages.MessageType.MESSAGETYPE_ETHEREUMGETADDRESS, getAddr)
    const { addressNList } = (response as Messages.EthereumGetAddress).toObject()
    return addressNList.join('')
  }

  // Sign an ethereum transaction using a given node path
  // The user may be prompted for a pin and/or passphrase if they are enabled
  public async ethereumSignTx (
    tx: Messages.EthereumSignTx.AsObject,
    addressType?: Types.OutputAddressType,
    exchangeType?: Types.ExchangeType,
    data?: Uint8Array | string,
    chainId?: number
  ): Promise<any> {

    const est: Messages.EthereumSignTx = new Messages.EthereumSignTx()

    if (addressType === Types.OutputAddressType.TRANSFER) {
      throw Error('Not implemented yet.')
    } else if (addressType === Types.OutputAddressType.EXCHANGE) {
      est.setAddressNList(tx.addressNList)
      est.setNonce(typeof tx.nonce === 'string' ? arrayify(tx.nonce) : tx.nonce)
      est.setGasPrice(typeof tx.gasPrice === 'string' ? arrayify(tx.gasPrice) : tx.gasPrice)
      est.setGasLimit(typeof tx.gasLimit === 'string' ? arrayify(tx.gasLimit) : tx.gasLimit)
      est.setValue(typeof tx.value === 'string' ? arrayify(tx.value) : tx.value)
      est.setAddressType(Types.OutputAddressType.SPEND)
      est.setExchangeType(exchangeType)
    } else {
      est.setAddressNList(tx.addressNList)
      est.setNonce(typeof tx.nonce === 'string' ? arrayify(tx.nonce) : tx.nonce)
      est.setGasPrice(typeof tx.gasPrice === 'string' ? arrayify(tx.gasPrice) : tx.gasPrice)
      est.setGasLimit(typeof tx.gasLimit === 'string' ? arrayify(tx.gasLimit) : tx.gasLimit)
      est.setValue(typeof tx.value === 'string' ? arrayify(tx.value) : tx.value)
      est.setAddressType(Types.OutputAddressType.SPEND)
    }

    if (tx.to) {
      if (typeof tx.to === 'string') est.setTo(arrayify(tx.to))
      else est.setTo(tx.to)
    }

    let dataChunk = null
    let dataRemaining = typeof data === 'string' ? arrayify(data) : data

    if (dataRemaining) {
      est.setDataLength(dataRemaining.length)
      dataChunk = dataRemaining.slice(0, 1024)
      dataRemaining = dataRemaining.slice(dataChunk.length)
      est.setDataInitialChunk(dataChunk)
    }

    if (chainId != null) {
      est.setChainId(chainId)
    }

    let response: Messages.EthereumTxRequest

    // Make initial request
    let nextResponse = await this.device.exchange(Messages.MessageType.MESSAGETYPE_ETHEREUMSIGNTX, est)
    response = nextResponse[1] as Messages.EthereumTxRequest

    while (response.hasDataLength()) {
      const dataLength = response.getDataLength()
      dataChunk = dataRemaining.slice(0, dataLength)
      dataRemaining = dataRemaining.slice(dataLength, dataRemaining.length)

      nextResponse = await this.device.exchange(Messages.MessageType.MESSAGETYPE_ETHEREUMSIGNTX, est)
      response = nextResponse[1] as Messages.EthereumTxRequest
    }

    return {
      r: '0x' + toHexString(response.getSignatureR_asU8()),
      s: '0x' + toHexString(response.getSignatureS_asU8()),
      v: '0x' + response.getSignatureV().toString(16)
    }
  }

  // FirmwareErase askes the device to erase its firmware
  public async firmwareErase (): Promise<void> {
    const firmwareErase = new Messages.FirmwareErase()
    // send
    await this.device.exchange(Messages.MessageType.MESSAGETYPE_FIRMWAREERASE, firmwareErase)
  }

  // Initialize assigns a hid connection to this KeepKey and send initialize message to device
  public async initialize (): Promise<Messages.Features.AsObject | void> {
    await this.device.initialize()
    // send initialize
    const initialize = new Messages.Initialize()
    const [_, response] = await this.device.exchange(Messages.MessageType.MESSAGETYPE_INITIALIZE, initialize)
    const features = (response as Messages.Features).toObject()
    this.features = features

    return features
  }

  // GetAddress returns an address string given a node path and a coin type.
  // Optionally you can display the address on the device screen
  // If passphrase is enabled this may request the passphrase.
  public async getAddress (g: Messages.GetAddress.AsObject): Promise<string> {
    const address = new Messages.GetAddress()
    address.setAddressNList(g.addressNList)
    address.setCoinName(g.coinName)
    address.setShowDisplay(g.showDisplay || true)
    address.setScriptType(g.scriptType || Types.InputScriptType.SPENDADDRESS)
    const [_, response] = await this.device.exchange(Messages.MessageType.MESSAGETYPE_GETADDRESS, address)
    const msg = (response as Messages.Address).toObject()
    return msg.address
  }

  // GetFeatures returns the features and other device information such as the version, label, and supported coins
  public async getFeatures (): Promise<Messages.Features.AsObject> {
    const features = new Messages.GetFeatures()
    const [_, response] = await this.device.exchange(Messages.MessageType.MESSAGETYPE_GETFEATURES, features)
    return (response as Messages.Features).toObject()
  }

  // GetEntropy requests sample data from the hardware RNG
  public async getEntropy (size: number): Promise<string | Uint8Array> {
    const getEntropy = new Messages.GetEntropy()
    getEntropy.setSize(size)
    // send
    const [_, response] = await this.device.exchange(Messages.MessageType.MESSAGETYPE_GETENTROPY, getEntropy)
    const { entropy } = (response as Messages.Entropy).toObject()
    return entropy
  }

  // GetPublicKey asks the device for a public key corresponding to a nodePath and curve name.
  // Returns the hdnode, the XPUB as a string and a possidble error
  // This may prompt the user for a passphrase
  public async getPublicKey (g: Messages.GetPublicKey.AsObject): Promise<[Types.HDNodeType.AsObject, string]> {
    const getPublicKey = new Messages.GetPublicKey()
    getPublicKey.setAddressNList(g.addressNList)
    getPublicKey.setEcdsaCurveName(g.ecdsaCurveName || 'secp256k1')
    getPublicKey.setShowDisplay(g.showDisplay || false)
    getPublicKey.setScriptType(g.scriptType || Types.InputScriptType.SPENDADDRESS)
    // send
    const [_, response] = await this.device.exchange(Messages.MessageType.MESSAGETYPE_GETPUBLICKEY, getPublicKey)
    const publicKey = (response as Messages.PublicKey).toObject()
    return [publicKey.node, publicKey.xpub]
  }

  // GetNumCoins returns the number of coins supported by the device regardless of if the hanve funds.
  public async getNumCoins (): Promise<number> {
    const getCoinTable = new Messages.GetCoinTable()
    const [_, response] = await this.device.exchange(Messages.MessageType.MESSAGETYPE_GETCOINTABLE, getCoinTable)
    return (response as Messages.CoinTable).getNumCoins()
  }

  public async getAllCoinsAsMap () {
    const numCoins = await this.getNumCoins()
    const coinTable = {}
    for (let i = 0; i < numCoins; i += 10) {
      const pagedTable = await this.getCoinTable(i, i + Math.min(numCoins - i, 10))
      pagedTable.filter(coin => !coin.coinShortcut.startsWith(' ')).forEach(coinType => {
        const symbol = coinType.coinShortcut
        coinTable[symbol] = {
          coinShortcut: symbol,
          bip44AccountPath: coinType.bip44AccountPath,
          curveName: coinType.curveName,
          coinName: coinType.coinName,
          gasLimit: coinType.gasLimit
        }
      })
    }
    return coinTable
  }

  // GetCoinTable returns an array of Types.CoinTypes, with start and end arguments for paging.
  // You cannot request more than 10 at a time.
  public async getCoinTable (start: number = 0, end: number = start + 10): Promise<Types.CoinType.AsObject[]> {
    const getCoinTable = new Messages.GetCoinTable()
    getCoinTable.setStart(start)
    getCoinTable.setEnd(end)
    const [_, response] = await this.device.exchange(Messages.MessageType.MESSAGETYPE_GETCOINTABLE, getCoinTable)
    const coinTable = (response as Messages.CoinTable).toObject()
    return coinTable.tableList
  }

  // getCoinShortcutXPubPairs returns an array of [coinShortcut, xPub] pairs
  public async getCoinShortcutXPubPairs (coinTable: Types.CoinType.AsObject[]): Promise<[string, string][]> {
    const publicKeys = await Promise.all(coinTable.map(coinType => this.getPublicKey({
      addressNList: [2147483648 + 44, coinType.bip44AccountPath, 2147483648]
    })))
    const pairs: [string, string][] = []
    publicKeys.forEach(([, xPub], i) => {
      pairs.push([coinTable[i].coinShortcut, xPub])
    })
    return pairs
  }

  // LoadDevice loads a provided seed onto the device and applies the provided settings
  // including setting a pin/device label, enabling/disabling the passphrase, and whether to
  // check the checksum of the provided mnemonic
  public async loadDevice (l: Messages.LoadDevice.AsObject): Promise<void> {
    const loadDevice = new Messages.LoadDevice()
    loadDevice.setMnemonic(l.mnemonic)
    loadDevice.setPassphraseProtection(l.passphraseProtection || false)
    loadDevice.setSkipChecksum(l.skipChecksum || true)
    if (l.pin) loadDevice.setPin(l.pin)
    if (l.label) loadDevice.setLabel(l.label)
    // send
    await this.device.exchange(Messages.MessageType.MESSAGETYPE_LOADDEVICE, loadDevice)
  }

  public async recoveryDevice (r: Messages.RecoveryDevice.AsObject): Promise<void> {
    if (r.wordCount !== 12 && r.wordCount !== 18 && r.wordCount !== 24) {
      throw new Error('Invalid word count. Use 12/18/24')
    }
    const msg = new Messages.RecoveryDevice()
    msg.setWordCount(r.wordCount)
    msg.setPassphraseProtection(r.passphraseProtection)
    msg.setPinProtection(r.pinProtection)
    msg.setLabel(r.label)
    msg.setLanguage(r.language || 'english')
    msg.setEnforceWordlist(true)
    msg.setUseCharacterCipher(true)
    await this.device.exchange(Messages.MessageType.MESSAGETYPE_RECOVERYDEVICE, msg)
  }

  // Ping the device. If a message is provided it will be shown on the device screen and returned
  // in the success message. Optionally require a button press, pin, or passphrase to continue
  public async ping (p: Messages.Ping.AsObject): Promise<string | undefined> {
    const ping = new Messages.Ping()
    ping.setMessage(p.message)
    ping.setButtonProtection(p.buttonProtection || false)
    ping.setPinProtection(p.pinProtection || false)
    ping.setPassphraseProtection(p.passphraseProtection || false)
    const [_, response] = await this.device.exchange(Messages.MessageType.MESSAGETYPE_PING, ping)
    const { message } = (response as Messages.Success).toObject()
    return message
  }

  private async prepareSignTx (
    coinName: string,
    inputs: any[],
    outputs: any[],
    exchangeOutputs?: any[]
  ): Promise<any> {
    const txmap = {} // Create a map of transactions by txid needed for the KeepKey signing flow.
    const unsignedTx = new Types.TransactionType()
    unsignedTx.setVersion(2)
    unsignedTx.setInputsCnt(inputs.length)
    unsignedTx.setOutputsCnt(outputs.length + exchangeOutputs.length)
    unsignedTx.setLockTime(0) // TODO: remove?

    inputs.forEach((input, i) => {
      const utxo = new Types.TxInputType()
      utxo.setPrevHash(fromHexString(input.txid))
      utxo.setPrevIndex(input.vout)
      // utxo.setSequence(4294967295)  // TODO: check this
      // utxo.setScriptType(Types.InputScriptType.SPENDADDRESS)  // TODO: handle multisig & segwit
      utxo.setAddressNList(input.address_n)  // bip-32 path to the master key.  TODO: check this
      utxo.setAmount(input.amount)  // Only required by KeepKey for segwit inputs
      unsignedTx.addInputs(utxo, i)
    })

    outputs.forEach((output, k) => {
      const newOutput = new Types.TxOutputType()
      newOutput.setAmount(output.amount)
      newOutput.setScriptType(Types.OutputScriptType.PAYTOADDRESS)  // TODO: Support all script types. NOTE: Older firmware may require PAYTOSCRIPTHASH.
      if (output.isChange) {
        newOutput.setAddressNList(output.address_n)
        newOutput.setAddressType(Types.OutputAddressType.CHANGE)
      } else {
        newOutput.setAddress(output.address)
        newOutput.setAddressType(Types.OutputAddressType.SPEND)
      }
      unsignedTx.addOutputs(newOutput, k)
    })

    if (exchangeOutputs != null) {
      exchangeOutputs.forEach((exchangeOutput, l) => {
        // convert the base64 encoded signedExchangeResponse message into the correct object
        const signedExchange = Exchanges.SignedExchangeResponse.deserializeBinary(exchangeOutput.signed_exchange_response)
        // decode the deposit amount from a little-endian Uint8Array into an unsigned uint64
        let depAmt = signedExchange.getResponsev2().getDepositAmount_asU8()
        let val = 0
        for (let jj = depAmt.length - 1; jj >= 0; jj--) {
          val += depAmt[jj] * Math.pow(2,(8 * (depAmt.length - jj - 1)))
          // TODO validate is uint64
        }
        const outExchangeType = new Types.ExchangeType()
        outExchangeType.setSignedExchangeResponse(signedExchange)
        outExchangeType.setWithdrawalCoinName(exchangeOutput.withdrawal_coin_name)
        outExchangeType.setWithdrawalAddressNList(exchangeOutput.withdrawal_address_n)
        outExchangeType.setReturnAddressNList(exchangeOutput.return_address_n)
        const out = new Types.TxOutputType()
        out.setAmount(val)
        out.setAddress(signedExchange.toObject().responsev2.depositAddress.address)
        out.setScriptType(Types.OutputScriptType.PAYTOADDRESS)
        out.setAddressType(3)
        out.setExchangeType(outExchangeType)
        unsignedTx.addOutputs(out, l)
      })
    }
    unsignedTx.setOutputsCnt(exchangeOutputs.length + outputs.length)
    txmap['unsigned'] = unsignedTx

    inputs.forEach(inputTx => {
      const tx = new Types.TransactionType()
      tx.setVersion(inputTx.tx.version)
      tx.setLockTime(inputTx.tx.locktime) // TODO: remove?
      tx.setInputsCnt(inputTx.tx.vin.length)
      tx.setOutputsCnt(inputTx.tx.vout.length)

      inputTx.tx.vin.forEach((vin, i) => {
        const txInput = new Types.TxInputType()
        txInput.setPrevHash(fromHexString(vin.txid))
        txInput.setPrevIndex(vin.vout)
        txInput.setSequence(vin.sequence)
        txInput.setScriptSig(fromHexString(vin.scriptSig.hex))
        txInput.setScriptType(Types.InputScriptType.SPENDADDRESS)
        txInput.setAmount(vin.valueSat)
        tx.addInputs(txInput, i)
      })

      inputTx.tx.vout.forEach((vout, i) => {
        const txOutput = new Types.TxOutputBinType()
        txOutput.setAmount(Number((vout.value * (10 ** 8)).toFixed(0)))
        txOutput.setScriptPubkey(fromHexString(vout.scriptPubKey.hex))
        tx.addBinOutputs(txOutput, i)
      })

      txmap[inputTx.txid] = tx
    })

    return txmap
  }

  // RemovePin disables pin protection for the device. If a pin is currently enabled
  // it will prompt the user to enter the current pin
  public async removePin (): Promise<void> {
    const changePin = new Messages.ChangePin()
    changePin.setRemove(true)
    // send
    await this.device.exchange(Messages.MessageType.MESSAGETYPE_CHANGEPIN, changePin)
  }

  // ResetDevice generates a new seed using device RNG for entropy and applies the provided settings
  // The device must be uninitialized  before calling this method. This can be achieved by calling WipeDevice()
  // The device entropy strength must be 128, 192, or 256
  public async resetDevice (r: Messages.ResetDevice.AsObject): Promise<void> {
    const resetDevice = new Messages.ResetDevice()
    resetDevice.setStrength(r.strength || 128)
    resetDevice.setDisplayRandom(r.displayRandom || false)
    resetDevice.setPassphraseProtection(r.passphraseProtection || false)
    resetDevice.setPinProtection(r.pinProtection || false)
    resetDevice.setLabel(r.label)
    // resetDevice.setWordsPerGape(wordsPerScreen) // Re-enable when patch gets in
    // Send
    await this.device.exchange(Messages.MessageType.MESSAGETYPE_RESETDEVICE, resetDevice)
  }

  public async send (events: Event[]): Promise<void> {
    for (const event of events) {
      const MessageType = messageTypeRegistry[event.message_enum] as any
      const msg = new MessageType()
      Object.entries(event.message).forEach(([key, value]) => {
        const setterMethod = protoFieldToSetMethod(key)
        if (msg[setterMethod]) {
          // Assume setter methods are always of the format: strength -> setStrength
          // until this exists https://github.com/protocolbuffers/protobuf/issues/1591
          msg[setterMethod](value)
        }
      })
      await this.device.exchange(event.message_enum, msg)
    }
  }

  // Sign UTXO Transaction
  public async signTransaction (
    coinName: string,
    inputs: any[],
    outputs: any[],
    exchangeOutputs: any[] = [],
    version?: number,
    lockTime?: number
  ): Promise<[string[], string]> {
    const txmap = await this.prepareSignTx(coinName, inputs, outputs, exchangeOutputs)

    // Prepare and send initial message
    const tx = new Messages.SignTx()
    tx.setInputsCount(inputs.length)
    tx.setOutputsCount(outputs.length + exchangeOutputs.length)
    tx.setCoinName(coinName)
    if (version != null) tx.setVersion(version)
    if (lockTime != null) tx.setLockTime(lockTime)

    let responseType: number
    let response: any
    [responseType, response] = await this.device.exchange(Messages.MessageType.MESSAGETYPE_SIGNTX, tx)

    // Prepare structure for signatures
    const signatures: string[] = new Array(inputs.length).fill(null)
    let serializedTx: string = ''

    // Begin callback loop
    let messageCount = 0
    while (true) {
      messageCount += 1

      if (responseType === Messages.MessageType.MESSAGETYPE_FAILURE) {
        const errorResponse = response as Messages.Failure
        throw new Error(`Signing failed: ${errorResponse.getMessage()}`)
      }

      if (responseType !== Messages.MessageType.MESSAGETYPE_TXREQUEST) {
        throw new Error(`Unexpected message type: ${responseType}`)
      }

      let txRequest = response as Messages.TxRequest

      // If there's some part of signed transaction, add it
      if (txRequest.hasSerialized() && txRequest.getSerialized().hasSerializedTx()) {
        serializedTx += toHexString(txRequest.getSerialized().getSerializedTx_asU8())
      }

      if (txRequest.hasSerialized() && txRequest.getSerialized().hasSignatureIndex()) {
        if (signatures[txRequest.getSerialized().getSignatureIndex()] !== null) {
          throw new Error(`Signature for index ${txRequest.getSerialized().getSignatureIndex()} already filled`)
        }
        signatures[txRequest.getSerialized().getSignatureIndex()] = txRequest.getSerialized().getSignature_asB64()
      }

      if (txRequest.getRequestType() === Types.RequestType.TXFINISHED) {
        // Device didn't ask for more information, finish workflow
        break
      }

      let currentTx: Types.TransactionType = null
      let msg: Types.TransactionType = null
      let txAck: Messages.TxAck = null

      // Device asked for one more information, let's process it.
      if (txRequest.hasDetails() && !txRequest.getDetails().hasTxHash()) {
        currentTx = txmap['unsigned']
      } else {
        currentTx = txmap[toHexString(txRequest.getDetails().getTxHash_asU8())]
      }

      if (txRequest.getRequestType() === Types.RequestType.TXMETA) {
        msg = new Types.TransactionType()
        msg.setVersion(currentTx.getVersion())
        msg.setLockTime(currentTx.getLockTime())
        msg.setInputsCnt(currentTx.getInputsCnt())
        if (txRequest.getDetails().hasTxHash()) {
          msg.setOutputsCnt(currentTx.getBinOutputsList().length)
        } else {
          msg.setOutputsCnt(currentTx.getOutputsList().length)
        }
        if (currentTx.hasExtraData()) {
          msg.setExtraDataLen(currentTx.getExtraData_asU8().length)
        } else {
          msg.setExtraDataLen(0)
        }
        txAck = new Messages.TxAck()
        txAck.setTx(msg)
        let nextResponse = await this.device.exchange(Messages.MessageType.MESSAGETYPE_TXACK, txAck)
        responseType = nextResponse[0]
        response = nextResponse[1]
      } else if (txRequest.getRequestType() === Types.RequestType.TXINPUT) {
        msg = new Types.TransactionType()
        msg.setInputsList([currentTx.getInputsList()[txRequest.getDetails().getRequestIndex()]])
        txAck = new Messages.TxAck()
        txAck.setTx(msg)
        let nextResponse = await this.device.exchange(Messages.MessageType.MESSAGETYPE_TXACK, txAck)
        responseType = nextResponse[0]
        response = nextResponse[1]
      } else if (txRequest.getRequestType() === Types.RequestType.TXOUTPUT) {
        msg = new Types.TransactionType()
        if (txRequest.getDetails().hasTxHash()) {
          msg.setBinOutputsList([currentTx.getBinOutputsList()[txRequest.getDetails().getRequestIndex()]])
        } else {
          msg.setOutputsList([currentTx.getOutputsList()[txRequest.getDetails().getRequestIndex()]])
          msg.setOutputsCnt(1)
        }
        txAck = new Messages.TxAck()
        txAck.setTx(msg)
        let nextResponse = await this.device.exchange(Messages.MessageType.MESSAGETYPE_TXACK, txAck)
        responseType = nextResponse[0]
        response = nextResponse[1]
      } else if (txRequest.getRequestType() === Types.RequestType.TXEXTRADATA) {
        let offset = txRequest.getDetails().getExtraDataOffset()
        let length = txRequest.getDetails().getExtraDataLen()
        msg = new Types.TransactionType()
        msg.setExtraData(currentTx.getExtraData_asU8().slice(offset, offset + length))
        txAck = new Messages.TxAck()
        txAck.setTx(msg)
        let nextResponse = await this.device.exchange(Messages.MessageType.MESSAGETYPE_TXACK, txAck)
        responseType = nextResponse[0]
        response = nextResponse[1]
      }
    }

    if (signatures.includes(null)) {
      throw new Error('Some signatures are missing!')
    }

    return [signatures, serializedTx]
  }

  // SignMessage signs a message using the given nodepath and Coin
  public async signMessage (s: Messages.SignMessage.AsObject): Promise<Array<string | Uint8Array>> {
    const sign = new Messages.SignMessage()
    sign.setAddressNList(s.addressNList)
    sign.setMessage(s.message)
    sign.setCoinName(s.coinName)
    sign.setScriptType(s.scriptType || Types.InputScriptType.SPENDADDRESS)
    // send
    const [_, response] = await this.device.exchange(Messages.MessageType.MESSAGETYPE_SIGNMESSAGE, sign)
    const messageSignature = (response as Messages.MessageSignature).toObject()
    return [messageSignature.signature, messageSignature.address]
  }

  // SoftReset power cycles the device. The device only responds to
  // this message while in manufacturer mode
  public async softReset (): Promise<void> {
    const softReset = new Messages.SoftReset()
    // send
    await this.device.exchange(Messages.MessageType.MESSAGETYPE_SOFTRESET, softReset)
  }

  // VerifyMessage verifies a signed message
  public async verifyMessage (addr: string, coinName: string, msg: string | Uint8Array, sig: string | Uint8Array): Promise<void> {
    const verify = new Messages.VerifyMessage()
    verify.setAddress(addr)
    verify.setSignature(sig)
    verify.setMessage(msg)
    verify.setCoinName(coinName)
    // send
    await this.device.exchange(Messages.MessageType.MESSAGETYPE_VERIFYMESSAGE, verify)
  }

  // WipeDevice wipes all sensitive data and settings
  public async wipeDevice (): Promise<void> {
    const wipeDevice = new Messages.WipeDevice()
    // send
    await this.device.exchange(Messages.MessageType.MESSAGETYPE_WIPEDEVICE, wipeDevice)
  }
}
