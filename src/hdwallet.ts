
export abstract class WalletSupport {
  public abstract async ethereumIsSupported (): Promise<boolean>

  public abstract async bitcoinIsSupported (): Promise<boolean>
}

export interface EthereumGetAccountPaths {
  coin: string,
  accountIdx: number
}

export interface EthereumAccountPath {
  addressNList: Array<number>
}

export interface EthereumGetAddress {
  addressNList: Array<number>,
  showDisplay?: boolean
}

export interface EthereumSignTx {

}

export abstract class EthereumWallet {
  public static isSupported(wallet: WalletSupport): Promise<boolean> {
    return wallet.ethereumIsSupported()
  }
  public async ethereumIsSupported (): Promise<boolean> {
    return true
  }
  public abstract async ethereumGetAddress (msg: EthereumGetAddress);
  public abstract async ethereumSignTx (msg: EthereumSignTx);

  public abstract ethereumGetAccountPaths (msg: EthereumGetAccountPaths): Array<EthereumAccountPaths>;
}

export interface BitcoinGetAddress {
  addressNList: Array<number>,
  showDisplay?: boolean
}

export interface BitcoinSignTx {
  // ...
}

export interface BitcoinSignedTx {
  // ...
}

export enum InputScriptType {
  IST_SpendAddress,
  IST_SpendMultisig,
  IST_External,
  IST_SpendWitness,
  IST_SpendP2SHWitness,
}

export interface BitcoinGetAccountPaths {
  coin: string,
  accountIdx: number,
  scriptType?: InputScriptType
}

export interface BitcoinAccountPath {
  scriptType: InputScriptType
  addressNList: Array<number>
}

export abstract class BitcoinWallet implements WalletSupport {
  public static isSupported(wallet: WalletSupport): Promise<boolean> {
    return wallet.bitcoinIsSupported()
  }
  public async bitcoinIsSupported (): Promise<boolean> {
    return true
  }
  public abstract async bitcoinGetAddress (msg: BitcoinGetAddress): Promise<BitcoinAddress>
  public abstract async bitcoinSignTx (msg: BitcoinSignTx): Promise<BitcoinSignedTx>

  // Returns a list of bip32 paths for a given account index in preferred order
  // from most to least preferred.
  //
  // For forked coins, eg. BSV, this would return:
  //   p2pkh m/44'/236'/a'
  //   p2pkh m/44'/230'/a'
  //   p2pkh m/44'/0'/a'
  //
  // For BTC it might return:
  //   p2sh-p2pkh m/49'/0'/a'
  //   p2pkh      m/44'/0'/a'
  //   p2sh-p2wsh m/44'/0'/a'
  public abstract bitcoinGetAccountPaths (msg: BitcoinGetAccountPaths): Array<BitcoinAccountPath>

  // Does the device support spending from the combined accounts?
  public abstract bitcoinIsSameAccount (msg: Array<BitcoinAccountPath>): boolean
}

export interface GetPublicKey {
  addressNList: Array<number>,
  ecdsaCurveName?: string,
  showDisplay?: boolean,
  scriptType?: InputScriptType
}

export interface PublicKey {
  node: any, // FIXME
  xpub: string
}

export abstract class HDWallet implements WalletSupport {
  public abstract async getVendor (): Promise<string>

  public abstract async getModel (): Promise<string>

  public abstract async getPublicKey (msg: GetPublicKey);

  public abstract async clearSession (): Promise<void>;

  // Intended to be used like:
  //
  // if (var b = keepkey.castOrNull<BitcoinWallet>()) {
  //   b.bitcoinGetAddress()
  // }
  public async castOrNull<T> (): Promise<T | null> {
    return T.isSupported(this) ? this as T : null
  }
}

class KeepKeyHDWallet implements HDWallet, EthereumWallet, BitcoinWallet {
  private impl: KeepKey

  public abstract async getVendor (): Promise<string> {
    return "keepkey.com"
  }

  public abstract async getModel (): Promise<string> {
    return "KeepKey"
  }

  public async getPublicKey (msg: GetPublicKey): Promise<PublicKey> {
    const script = {
      IST_SpendAddress: Types.InputScriptType.SPENDADDRESS,
      IST_SpendMultisig: Types.InputScriptType.SPENDMULTISIG,
      IST_External: Types.InputScriptType.EXTERNAL,
      IST_SpendWitness: Types.InputScriptType.SPENDWITNESS,
      IST_SpendP2SHWitness: Types.InputScriptType.SPENDP2SHWITNESS,
      // FIXME: default value?
    }[msg.scriptType];

    const ret = await this.impl.getPublicKey({
      addressNList: msg.addressNList,
      ecdsaCurveName: msg.ecdsaCurveName,
      showDisplay: msg.showDisplay,
      scriptType: script
    })

    return {
      node: ret[0],
      xpub: ret[1]
    }
  }

  public async bitcoinGetAddress (msg: BitcoinGetAddress): Promise<BitcoinAddress> {

  }

  public async bitcoinSignTx (msg: BitcoinSignTx): Promise<BitcoinSignedTx> {

  }

  public bitcoinGetAccountPaths (msg: BitcoinGetAccountPaths): Array<BitcoinAccountPath> {
    const slip44 = 0 // FIXME, assumes BTC
    const ret: Array<BitcoinAccountPath> = []
    ret.append({ addressNList: [ 0x80000000 + 44, 0x80000000 + slip44, 0x80000000 + msg.accountIdx ], scriptType: IST_SpendAddress })
    ret.append({ addressNList: [ 0x80000000 + 49, 0x80000000 + slip44, 0x80000000 + msg.accountIdx ], scriptType: IST_SpendP2SHWitness })
    ret.append({ addressNList: [ 0x80000000 + 84, 0x80000000 + slip44, 0x80000000 + msg.accountIdx ], scriptType: IST_SpendWitness })
    return ret
  }

  public async ethereumGetAddress (msg: EthereumGetAddress) {

  }

  public async ethereumSignTx (msg: EthereumSignTx) {

  }

  public ethereumGetAccountPaths (msg: EthereumAccountPaths): Array<EthereumAccountPath> {
    const slip44 = 60 // FIXME, assumes ETH
    const ret: Array<EthereumAccountPath> = []
    ret.append({ addressNList: [ 0x80000000 + 44, 0x80000000 + slip44, 0x80000000 + msg.accountIdx, 0, 0 ] })
    return ret
  }

  public async clearSession (): Promise<void> {
    return this.impl.clearSession()
  }
}
