
export abstract class WalletSupport {
  public abstract async ethereumIsSupported (): Promise<boolean>

  public abstract async bitcoinIsSupported (): Promise<boolean>
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

export abstract class BitcoinWallet implements WalletSupport {
  public static isSupported(wallet: WalletSupport): Promise<boolean> {
    return wallet.bitcoinIsSupported()
  }
  public async bitcoinIsSupported (): Promise<boolean> {
    return true
  }
  public abstract async bitcoinGetAddress (msg: BitcoinGetAddress): Promise<BitcoinAddress>
  public abstract async bitcoinSignTx (msg: BitcoinSignTx): Promise<BitcoinSignedTx>
}

export enum InputScriptType {
  IST_SpendAddress,
  IST_SpendMultisig,
  IST_External,
  IST_SpendWitness,
  IST_SpendP2SHWitness,
}

export interface GetPublicKey {
  addressNList: Array<number>,
  ecdsaCurveName?: String,
  showDisplay?: boolean,
  scriptType?: InputScriptType
}

export interface PublicKey {
  node: any, // FIXME
  xpub: String
}

export abstract class HDWallet implements WalletSupport {
  public abstract async getVendor (): Promise<String>

  public abstract async getModel (): Promise<String>

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

  public abstract async getVendor (): Promise<String> {
    return "keepkey.com"
  }

  public abstract async getModel (): Promise<String> {
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

  public async ethereumGetAddress (msg: EthereumGetAddress) {

  }

  public async ethereumSignTx (msg: EthereumSignTx) {

  }

  public async clearSession (): Promise<void> {
    return this.impl.clearSession()
  }
}
