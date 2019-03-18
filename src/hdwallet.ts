
export interface EthereumGetAddress {
  addressNList: Array<number>,
  showDisplay?: boolean
}

export interface EthereumSignTx {

}

export interface EthereumWallet {
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

export interface BitcoinWallet {
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

export abstract class HDWallet {
  public abstract async getPublicKey (msg: GetPublicKey);

  public abstract async clearSession (): Promise<void>;

  public abstract async ethereumIsSupported (): Promise<boolean>

  public abstract async bitcoinIsSupported (): Promise<boolean>
}

class KeepKeyHDWallet implements HDWallet, EthereumWallet, BitcoinWallet {
  private impl: KeepKey

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
