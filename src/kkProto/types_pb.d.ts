// package: 
// file: types.proto

import * as jspb from "google-protobuf";
import * as google_protobuf_descriptor_pb from "google-protobuf/google/protobuf/descriptor_pb";
import * as exchange_pb from "./exchange_pb";

export class HDNodeType extends jspb.Message {
  hasDepth(): boolean;
  clearDepth(): void;
  getDepth(): number | undefined;
  setDepth(value: number): void;

  hasFingerprint(): boolean;
  clearFingerprint(): void;
  getFingerprint(): number | undefined;
  setFingerprint(value: number): void;

  hasChildNum(): boolean;
  clearChildNum(): void;
  getChildNum(): number | undefined;
  setChildNum(value: number): void;

  hasChainCode(): boolean;
  clearChainCode(): void;
  getChainCode(): Uint8Array | string;
  getChainCode_asU8(): Uint8Array;
  getChainCode_asB64(): string;
  setChainCode(value: Uint8Array | string): void;

  hasPrivateKey(): boolean;
  clearPrivateKey(): void;
  getPrivateKey(): Uint8Array | string;
  getPrivateKey_asU8(): Uint8Array;
  getPrivateKey_asB64(): string;
  setPrivateKey(value: Uint8Array | string): void;

  hasPublicKey(): boolean;
  clearPublicKey(): void;
  getPublicKey(): Uint8Array | string;
  getPublicKey_asU8(): Uint8Array;
  getPublicKey_asB64(): string;
  setPublicKey(value: Uint8Array | string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): HDNodeType.AsObject;
  static toObject(includeInstance: boolean, msg: HDNodeType): HDNodeType.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: HDNodeType, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): HDNodeType;
  static deserializeBinaryFromReader(message: HDNodeType, reader: jspb.BinaryReader): HDNodeType;
}

export namespace HDNodeType {
  export type AsObject = {
    depth?: number,
    fingerprint?: number,
    childNum?: number,
    chainCode: Uint8Array | string,
    privateKey: Uint8Array | string,
    publicKey: Uint8Array | string,
  }
}

export class HDNodePathType extends jspb.Message {
  hasNode(): boolean;
  clearNode(): void;
  getNode(): HDNodeType;
  setNode(value?: HDNodeType): void;

  clearAddressNList(): void;
  getAddressNList(): Array<number>;
  setAddressNList(value: Array<number>): void;
  addAddressN(value: number, index?: number): number;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): HDNodePathType.AsObject;
  static toObject(includeInstance: boolean, msg: HDNodePathType): HDNodePathType.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: HDNodePathType, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): HDNodePathType;
  static deserializeBinaryFromReader(message: HDNodePathType, reader: jspb.BinaryReader): HDNodePathType;
}

export namespace HDNodePathType {
  export type AsObject = {
    node: HDNodeType.AsObject,
    addressNList: Array<number>,
  }
}

export class CoinType extends jspb.Message {
  hasCoinName(): boolean;
  clearCoinName(): void;
  getCoinName(): string | undefined;
  setCoinName(value: string): void;

  hasCoinShortcut(): boolean;
  clearCoinShortcut(): void;
  getCoinShortcut(): string | undefined;
  setCoinShortcut(value: string): void;

  hasAddressType(): boolean;
  clearAddressType(): void;
  getAddressType(): number | undefined;
  setAddressType(value: number): void;

  hasMaxfeeKb(): boolean;
  clearMaxfeeKb(): void;
  getMaxfeeKb(): number | undefined;
  setMaxfeeKb(value: number): void;

  hasAddressTypeP2sh(): boolean;
  clearAddressTypeP2sh(): void;
  getAddressTypeP2sh(): number | undefined;
  setAddressTypeP2sh(value: number): void;

  hasAddressTypeP2wpkh(): boolean;
  clearAddressTypeP2wpkh(): void;
  getAddressTypeP2wpkh(): number | undefined;
  setAddressTypeP2wpkh(value: number): void;

  hasAddressTypeP2wsh(): boolean;
  clearAddressTypeP2wsh(): void;
  getAddressTypeP2wsh(): number | undefined;
  setAddressTypeP2wsh(value: number): void;

  hasSignedMessageHeader(): boolean;
  clearSignedMessageHeader(): void;
  getSignedMessageHeader(): string | undefined;
  setSignedMessageHeader(value: string): void;

  hasBip44AccountPath(): boolean;
  clearBip44AccountPath(): void;
  getBip44AccountPath(): number | undefined;
  setBip44AccountPath(value: number): void;

  hasForkid(): boolean;
  clearForkid(): void;
  getForkid(): number | undefined;
  setForkid(value: number): void;

  hasDecimals(): boolean;
  clearDecimals(): void;
  getDecimals(): number | undefined;
  setDecimals(value: number): void;

  hasContractAddress(): boolean;
  clearContractAddress(): void;
  getContractAddress(): Uint8Array | string;
  getContractAddress_asU8(): Uint8Array;
  getContractAddress_asB64(): string;
  setContractAddress(value: Uint8Array | string): void;

  hasGasLimit(): boolean;
  clearGasLimit(): void;
  getGasLimit(): Uint8Array | string;
  getGasLimit_asU8(): Uint8Array;
  getGasLimit_asB64(): string;
  setGasLimit(value: Uint8Array | string): void;

  hasXpubMagic(): boolean;
  clearXpubMagic(): void;
  getXpubMagic(): number | undefined;
  setXpubMagic(value: number): void;

  hasXprvMagic(): boolean;
  clearXprvMagic(): void;
  getXprvMagic(): number | undefined;
  setXprvMagic(value: number): void;

  hasSegwit(): boolean;
  clearSegwit(): void;
  getSegwit(): boolean | undefined;
  setSegwit(value: boolean): void;

  hasForceBip143(): boolean;
  clearForceBip143(): void;
  getForceBip143(): boolean | undefined;
  setForceBip143(value: boolean): void;

  hasCurveName(): boolean;
  clearCurveName(): void;
  getCurveName(): string | undefined;
  setCurveName(value: string): void;

  hasCashaddrPrefix(): boolean;
  clearCashaddrPrefix(): void;
  getCashaddrPrefix(): string | undefined;
  setCashaddrPrefix(value: string): void;

  hasBech32Prefix(): boolean;
  clearBech32Prefix(): void;
  getBech32Prefix(): string | undefined;
  setBech32Prefix(value: string): void;

  hasDecred(): boolean;
  clearDecred(): void;
  getDecred(): boolean | undefined;
  setDecred(value: boolean): void;

  hasVersionGroupId(): boolean;
  clearVersionGroupId(): void;
  getVersionGroupId(): number | undefined;
  setVersionGroupId(value: number): void;

  hasXpubMagicSegwitP2sh(): boolean;
  clearXpubMagicSegwitP2sh(): void;
  getXpubMagicSegwitP2sh(): number | undefined;
  setXpubMagicSegwitP2sh(value: number): void;

  hasXpubMagicSegwitNative(): boolean;
  clearXpubMagicSegwitNative(): void;
  getXpubMagicSegwitNative(): number | undefined;
  setXpubMagicSegwitNative(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CoinType.AsObject;
  static toObject(includeInstance: boolean, msg: CoinType): CoinType.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: CoinType, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CoinType;
  static deserializeBinaryFromReader(message: CoinType, reader: jspb.BinaryReader): CoinType;
}

export namespace CoinType {
  export type AsObject = {
    coinName?: string,
    coinShortcut?: string,
    addressType?: number,
    maxfeeKb?: number,
    addressTypeP2sh?: number,
    addressTypeP2wpkh?: number,
    addressTypeP2wsh?: number,
    signedMessageHeader?: string,
    bip44AccountPath?: number,
    forkid?: number,
    decimals?: number,
    contractAddress: Uint8Array | string,
    gasLimit: Uint8Array | string,
    xpubMagic?: number,
    xprvMagic?: number,
    segwit?: boolean,
    forceBip143?: boolean,
    curveName?: string,
    cashaddrPrefix?: string,
    bech32Prefix?: string,
    decred?: boolean,
    versionGroupId?: number,
    xpubMagicSegwitP2sh?: number,
    xpubMagicSegwitNative?: number,
  }
}

export class MultisigRedeemScriptType extends jspb.Message {
  clearPubkeysList(): void;
  getPubkeysList(): Array<HDNodePathType>;
  setPubkeysList(value: Array<HDNodePathType>): void;
  addPubkeys(value?: HDNodePathType, index?: number): HDNodePathType;

  clearSignaturesList(): void;
  getSignaturesList(): Array<Uint8Array | string>;
  getSignaturesList_asU8(): Array<Uint8Array>;
  getSignaturesList_asB64(): Array<string>;
  setSignaturesList(value: Array<Uint8Array | string>): void;
  addSignatures(value: Uint8Array | string, index?: number): Uint8Array | string;

  hasM(): boolean;
  clearM(): void;
  getM(): number | undefined;
  setM(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): MultisigRedeemScriptType.AsObject;
  static toObject(includeInstance: boolean, msg: MultisigRedeemScriptType): MultisigRedeemScriptType.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: MultisigRedeemScriptType, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): MultisigRedeemScriptType;
  static deserializeBinaryFromReader(message: MultisigRedeemScriptType, reader: jspb.BinaryReader): MultisigRedeemScriptType;
}

export namespace MultisigRedeemScriptType {
  export type AsObject = {
    pubkeysList: Array<HDNodePathType.AsObject>,
    signaturesList: Array<Uint8Array | string>,
    m?: number,
  }
}

export class TxInputType extends jspb.Message {
  clearAddressNList(): void;
  getAddressNList(): Array<number>;
  setAddressNList(value: Array<number>): void;
  addAddressN(value: number, index?: number): number;

  hasPrevHash(): boolean;
  clearPrevHash(): void;
  getPrevHash(): Uint8Array | string;
  getPrevHash_asU8(): Uint8Array;
  getPrevHash_asB64(): string;
  setPrevHash(value: Uint8Array | string): void;

  hasPrevIndex(): boolean;
  clearPrevIndex(): void;
  getPrevIndex(): number | undefined;
  setPrevIndex(value: number): void;

  hasScriptSig(): boolean;
  clearScriptSig(): void;
  getScriptSig(): Uint8Array | string;
  getScriptSig_asU8(): Uint8Array;
  getScriptSig_asB64(): string;
  setScriptSig(value: Uint8Array | string): void;

  hasSequence(): boolean;
  clearSequence(): void;
  getSequence(): number | undefined;
  setSequence(value: number): void;

  hasScriptType(): boolean;
  clearScriptType(): void;
  getScriptType(): InputScriptType | undefined;
  setScriptType(value: InputScriptType): void;

  hasMultisig(): boolean;
  clearMultisig(): void;
  getMultisig(): MultisigRedeemScriptType | undefined;
  setMultisig(value?: MultisigRedeemScriptType): void;

  hasAmount(): boolean;
  clearAmount(): void;
  getAmount(): number | undefined;
  setAmount(value: number): void;

  hasDecredTree(): boolean;
  clearDecredTree(): void;
  getDecredTree(): number | undefined;
  setDecredTree(value: number): void;

  hasDecredScriptVersion(): boolean;
  clearDecredScriptVersion(): void;
  getDecredScriptVersion(): number | undefined;
  setDecredScriptVersion(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): TxInputType.AsObject;
  static toObject(includeInstance: boolean, msg: TxInputType): TxInputType.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: TxInputType, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): TxInputType;
  static deserializeBinaryFromReader(message: TxInputType, reader: jspb.BinaryReader): TxInputType;
}

export namespace TxInputType {
  export type AsObject = {
    addressNList: Array<number>,
    prevHash: Uint8Array | string,
    prevIndex?: number,
    scriptSig: Uint8Array | string,
    sequence?: number,
    scriptType?: InputScriptType,
    multisig?: MultisigRedeemScriptType.AsObject,
    amount?: number,
    decredTree?: number,
    decredScriptVersion?: number,
  }
}

export class TxOutputType extends jspb.Message {
  hasAddress(): boolean;
  clearAddress(): void;
  getAddress(): string | undefined;
  setAddress(value: string): void;

  clearAddressNList(): void;
  getAddressNList(): Array<number>;
  setAddressNList(value: Array<number>): void;
  addAddressN(value: number, index?: number): number;

  hasAmount(): boolean;
  clearAmount(): void;
  getAmount(): number | undefined;
  setAmount(value: number): void;

  hasScriptType(): boolean;
  clearScriptType(): void;
  getScriptType(): OutputScriptType | undefined;
  setScriptType(value: OutputScriptType): void;

  hasMultisig(): boolean;
  clearMultisig(): void;
  getMultisig(): MultisigRedeemScriptType | undefined;
  setMultisig(value?: MultisigRedeemScriptType): void;

  hasOpReturnData(): boolean;
  clearOpReturnData(): void;
  getOpReturnData(): Uint8Array | string;
  getOpReturnData_asU8(): Uint8Array;
  getOpReturnData_asB64(): string;
  setOpReturnData(value: Uint8Array | string): void;

  hasAddressType(): boolean;
  clearAddressType(): void;
  getAddressType(): OutputAddressType | undefined;
  setAddressType(value: OutputAddressType): void;

  hasExchangeType(): boolean;
  clearExchangeType(): void;
  getExchangeType(): ExchangeType | undefined;
  setExchangeType(value?: ExchangeType): void;

  hasDecredScriptVersion(): boolean;
  clearDecredScriptVersion(): void;
  getDecredScriptVersion(): number | undefined;
  setDecredScriptVersion(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): TxOutputType.AsObject;
  static toObject(includeInstance: boolean, msg: TxOutputType): TxOutputType.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: TxOutputType, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): TxOutputType;
  static deserializeBinaryFromReader(message: TxOutputType, reader: jspb.BinaryReader): TxOutputType;
}

export namespace TxOutputType {
  export type AsObject = {
    address?: string,
    addressNList: Array<number>,
    amount?: number,
    scriptType?: OutputScriptType,
    multisig?: MultisigRedeemScriptType.AsObject,
    opReturnData: Uint8Array | string,
    addressType?: OutputAddressType,
    exchangeType?: ExchangeType.AsObject,
    decredScriptVersion?: number,
  }
}

export class TxOutputBinType extends jspb.Message {
  hasAmount(): boolean;
  clearAmount(): void;
  getAmount(): number | undefined;
  setAmount(value: number): void;

  hasScriptPubkey(): boolean;
  clearScriptPubkey(): void;
  getScriptPubkey(): Uint8Array | string;
  getScriptPubkey_asU8(): Uint8Array;
  getScriptPubkey_asB64(): string;
  setScriptPubkey(value: Uint8Array | string): void;

  hasDecredScriptVersion(): boolean;
  clearDecredScriptVersion(): void;
  getDecredScriptVersion(): number | undefined;
  setDecredScriptVersion(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): TxOutputBinType.AsObject;
  static toObject(includeInstance: boolean, msg: TxOutputBinType): TxOutputBinType.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: TxOutputBinType, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): TxOutputBinType;
  static deserializeBinaryFromReader(message: TxOutputBinType, reader: jspb.BinaryReader): TxOutputBinType;
}

export namespace TxOutputBinType {
  export type AsObject = {
    amount?: number,
    scriptPubkey: Uint8Array | string,
    decredScriptVersion?: number,
  }
}

export class TransactionType extends jspb.Message {
  hasVersion(): boolean;
  clearVersion(): void;
  getVersion(): number | undefined;
  setVersion(value: number): void;

  clearInputsList(): void;
  getInputsList(): Array<TxInputType>;
  setInputsList(value: Array<TxInputType>): void;
  addInputs(value?: TxInputType, index?: number): TxInputType;

  clearBinOutputsList(): void;
  getBinOutputsList(): Array<TxOutputBinType>;
  setBinOutputsList(value: Array<TxOutputBinType>): void;
  addBinOutputs(value?: TxOutputBinType, index?: number): TxOutputBinType;

  clearOutputsList(): void;
  getOutputsList(): Array<TxOutputType>;
  setOutputsList(value: Array<TxOutputType>): void;
  addOutputs(value?: TxOutputType, index?: number): TxOutputType;

  hasLockTime(): boolean;
  clearLockTime(): void;
  getLockTime(): number | undefined;
  setLockTime(value: number): void;

  hasInputsCnt(): boolean;
  clearInputsCnt(): void;
  getInputsCnt(): number | undefined;
  setInputsCnt(value: number): void;

  hasOutputsCnt(): boolean;
  clearOutputsCnt(): void;
  getOutputsCnt(): number | undefined;
  setOutputsCnt(value: number): void;

  hasExtraData(): boolean;
  clearExtraData(): void;
  getExtraData(): Uint8Array | string;
  getExtraData_asU8(): Uint8Array;
  getExtraData_asB64(): string;
  setExtraData(value: Uint8Array | string): void;

  hasExtraDataLen(): boolean;
  clearExtraDataLen(): void;
  getExtraDataLen(): number | undefined;
  setExtraDataLen(value: number): void;

  hasExpiry(): boolean;
  clearExpiry(): void;
  getExpiry(): number | undefined;
  setExpiry(value: number): void;

  hasOverwintered(): boolean;
  clearOverwintered(): void;
  getOverwintered(): boolean | undefined;
  setOverwintered(value: boolean): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): TransactionType.AsObject;
  static toObject(includeInstance: boolean, msg: TransactionType): TransactionType.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: TransactionType, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): TransactionType;
  static deserializeBinaryFromReader(message: TransactionType, reader: jspb.BinaryReader): TransactionType;
}

export namespace TransactionType {
  export type AsObject = {
    version?: number,
    inputsList: Array<TxInputType.AsObject>,
    binOutputsList: Array<TxOutputBinType.AsObject>,
    outputsList: Array<TxOutputType.AsObject>,
    lockTime?: number,
    inputsCnt?: number,
    outputsCnt?: number,
    extraData: Uint8Array | string,
    extraDataLen?: number,
    expiry?: number,
    overwintered?: boolean,
  }
}

export class RawTransactionType extends jspb.Message {
  hasPayload(): boolean;
  clearPayload(): void;
  getPayload(): Uint8Array | string;
  getPayload_asU8(): Uint8Array;
  getPayload_asB64(): string;
  setPayload(value: Uint8Array | string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): RawTransactionType.AsObject;
  static toObject(includeInstance: boolean, msg: RawTransactionType): RawTransactionType.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: RawTransactionType, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): RawTransactionType;
  static deserializeBinaryFromReader(message: RawTransactionType, reader: jspb.BinaryReader): RawTransactionType;
}

export namespace RawTransactionType {
  export type AsObject = {
    payload: Uint8Array | string,
  }
}

export class TxRequestDetailsType extends jspb.Message {
  hasRequestIndex(): boolean;
  clearRequestIndex(): void;
  getRequestIndex(): number | undefined;
  setRequestIndex(value: number): void;

  hasTxHash(): boolean;
  clearTxHash(): void;
  getTxHash(): Uint8Array | string;
  getTxHash_asU8(): Uint8Array;
  getTxHash_asB64(): string;
  setTxHash(value: Uint8Array | string): void;

  hasExtraDataLen(): boolean;
  clearExtraDataLen(): void;
  getExtraDataLen(): number | undefined;
  setExtraDataLen(value: number): void;

  hasExtraDataOffset(): boolean;
  clearExtraDataOffset(): void;
  getExtraDataOffset(): number | undefined;
  setExtraDataOffset(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): TxRequestDetailsType.AsObject;
  static toObject(includeInstance: boolean, msg: TxRequestDetailsType): TxRequestDetailsType.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: TxRequestDetailsType, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): TxRequestDetailsType;
  static deserializeBinaryFromReader(message: TxRequestDetailsType, reader: jspb.BinaryReader): TxRequestDetailsType;
}

export namespace TxRequestDetailsType {
  export type AsObject = {
    requestIndex?: number,
    txHash: Uint8Array | string,
    extraDataLen?: number,
    extraDataOffset?: number,
  }
}

export class TxRequestSerializedType extends jspb.Message {
  hasSignatureIndex(): boolean;
  clearSignatureIndex(): void;
  getSignatureIndex(): number | undefined;
  setSignatureIndex(value: number): void;

  hasSignature(): boolean;
  clearSignature(): void;
  getSignature(): Uint8Array | string;
  getSignature_asU8(): Uint8Array;
  getSignature_asB64(): string;
  setSignature(value: Uint8Array | string): void;

  hasSerializedTx(): boolean;
  clearSerializedTx(): void;
  getSerializedTx(): Uint8Array | string;
  getSerializedTx_asU8(): Uint8Array;
  getSerializedTx_asB64(): string;
  setSerializedTx(value: Uint8Array | string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): TxRequestSerializedType.AsObject;
  static toObject(includeInstance: boolean, msg: TxRequestSerializedType): TxRequestSerializedType.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: TxRequestSerializedType, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): TxRequestSerializedType;
  static deserializeBinaryFromReader(message: TxRequestSerializedType, reader: jspb.BinaryReader): TxRequestSerializedType;
}

export namespace TxRequestSerializedType {
  export type AsObject = {
    signatureIndex?: number,
    signature: Uint8Array | string,
    serializedTx: Uint8Array | string,
  }
}

export class IdentityType extends jspb.Message {
  hasProto(): boolean;
  clearProto(): void;
  getProto(): string | undefined;
  setProto(value: string): void;

  hasUser(): boolean;
  clearUser(): void;
  getUser(): string | undefined;
  setUser(value: string): void;

  hasHost(): boolean;
  clearHost(): void;
  getHost(): string | undefined;
  setHost(value: string): void;

  hasPort(): boolean;
  clearPort(): void;
  getPort(): string | undefined;
  setPort(value: string): void;

  hasPath(): boolean;
  clearPath(): void;
  getPath(): string | undefined;
  setPath(value: string): void;

  hasIndex(): boolean;
  clearIndex(): void;
  getIndex(): number | undefined;
  setIndex(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): IdentityType.AsObject;
  static toObject(includeInstance: boolean, msg: IdentityType): IdentityType.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: IdentityType, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): IdentityType;
  static deserializeBinaryFromReader(message: IdentityType, reader: jspb.BinaryReader): IdentityType;
}

export namespace IdentityType {
  export type AsObject = {
    proto?: string,
    user?: string,
    host?: string,
    port?: string,
    path?: string,
    index?: number,
  }
}

export class PolicyType extends jspb.Message {
  hasPolicyName(): boolean;
  clearPolicyName(): void;
  getPolicyName(): string | undefined;
  setPolicyName(value: string): void;

  hasEnabled(): boolean;
  clearEnabled(): void;
  getEnabled(): boolean | undefined;
  setEnabled(value: boolean): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): PolicyType.AsObject;
  static toObject(includeInstance: boolean, msg: PolicyType): PolicyType.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: PolicyType, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): PolicyType;
  static deserializeBinaryFromReader(message: PolicyType, reader: jspb.BinaryReader): PolicyType;
}

export namespace PolicyType {
  export type AsObject = {
    policyName?: string,
    enabled?: boolean,
  }
}

export class ExchangeType extends jspb.Message {
  hasSignedExchangeResponse(): boolean;
  clearSignedExchangeResponse(): void;
  getSignedExchangeResponse(): exchange_pb.SignedExchangeResponse | undefined;
  setSignedExchangeResponse(value?: exchange_pb.SignedExchangeResponse): void;

  hasWithdrawalCoinName(): boolean;
  clearWithdrawalCoinName(): void;
  getWithdrawalCoinName(): string | undefined;
  setWithdrawalCoinName(value: string): void;

  clearWithdrawalAddressNList(): void;
  getWithdrawalAddressNList(): Array<number>;
  setWithdrawalAddressNList(value: Array<number>): void;
  addWithdrawalAddressN(value: number, index?: number): number;

  clearReturnAddressNList(): void;
  getReturnAddressNList(): Array<number>;
  setReturnAddressNList(value: Array<number>): void;
  addReturnAddressN(value: number, index?: number): number;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ExchangeType.AsObject;
  static toObject(includeInstance: boolean, msg: ExchangeType): ExchangeType.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ExchangeType, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ExchangeType;
  static deserializeBinaryFromReader(message: ExchangeType, reader: jspb.BinaryReader): ExchangeType;
}

export namespace ExchangeType {
  export type AsObject = {
    signedExchangeResponse?: exchange_pb.SignedExchangeResponse.AsObject,
    withdrawalCoinName?: string,
    withdrawalAddressNList: Array<number>,
    returnAddressNList: Array<number>,
  }
}

  export const wireIn: jspb.ExtensionFieldInfo<boolean>;

  export const wireOut: jspb.ExtensionFieldInfo<boolean>;

  export const wireDebugIn: jspb.ExtensionFieldInfo<boolean>;

  export const wireDebugOut: jspb.ExtensionFieldInfo<boolean>;

export enum FailureType {
  FAILURE_UNEXPECTEDMESSAGE = 1,
  FAILURE_BUTTONEXPECTED = 2,
  FAILURE_SYNTAXERROR = 3,
  FAILURE_ACTIONCANCELLED = 4,
  FAILURE_PINEXPECTED = 5,
  FAILURE_PINCANCELLED = 6,
  FAILURE_PININVALID = 7,
  FAILURE_INVALIDSIGNATURE = 8,
  FAILURE_OTHER = 9,
  FAILURE_NOTENOUGHFUNDS = 10,
  FAILURE_NOTINITIALIZED = 11,
  FAILURE_PINMISMATCH = 12,
  FAILURE_FIRMWAREERROR = 99,
}

export enum OutputScriptType {
  PAYTOADDRESS = 0,
  PAYTOSCRIPTHASH = 1,
  PAYTOMULTISIG = 2,
  PAYTOOPRETURN = 3,
  PAYTOWITNESS = 4,
  PAYTOP2SHWITNESS = 5,
}

export enum InputScriptType {
  SPENDADDRESS = 0,
  SPENDMULTISIG = 1,
  EXTERNAL = 2,
  SPENDWITNESS = 3,
  SPENDP2SHWITNESS = 4,
}

export enum RequestType {
  TXINPUT = 0,
  TXOUTPUT = 1,
  TXMETA = 2,
  TXFINISHED = 3,
  TXEXTRADATA = 4,
}

export enum OutputAddressType {
  SPEND = 0,
  TRANSFER = 1,
  CHANGE = 2,
  EXCHANGE = 3,
}

export enum ButtonRequestType {
  BUTTONREQUEST_OTHER = 1,
  BUTTONREQUEST_FEEOVERTHRESHOLD = 2,
  BUTTONREQUEST_CONFIRMOUTPUT = 3,
  BUTTONREQUEST_RESETDEVICE = 4,
  BUTTONREQUEST_CONFIRMWORD = 5,
  BUTTONREQUEST_WIPEDEVICE = 6,
  BUTTONREQUEST_PROTECTCALL = 7,
  BUTTONREQUEST_SIGNTX = 8,
  BUTTONREQUEST_FIRMWARECHECK = 9,
  BUTTONREQUEST_ADDRESS = 10,
  BUTTONREQUEST_FIRMWAREERASE = 11,
  BUTTONREQUEST_CONFIRMTRANSFERTOACCOUNT = 12,
  BUTTONREQUEST_CONFIRMTRANSFERTONODEPATH = 13,
  BUTTONREQUEST_CHANGELABEL = 14,
  BUTTONREQUEST_CHANGELANGUAGE = 15,
  BUTTONREQUEST_ENABLEPASSPHRASE = 16,
  BUTTONREQUEST_DISABLEPASSPHRASE = 17,
  BUTTONREQUEST_ENCRYPTANDSIGNMESSAGE = 18,
  BUTTONREQUEST_ENCRYPTMESSAGE = 19,
  BUTTONREQUEST_IMPORTPRIVATEKEY = 20,
  BUTTONREQUEST_IMPORTRECOVERYSENTENCE = 21,
  BUTTONREQUEST_SIGNIDENTITY = 22,
  BUTTONREQUEST_PING = 23,
  BUTTONREQUEST_REMOVEPIN = 24,
  BUTTONREQUEST_CHANGEPIN = 25,
  BUTTONREQUEST_CREATEPIN = 26,
  BUTTONREQUEST_GETENTROPY = 27,
  BUTTONREQUEST_SIGNMESSAGE = 28,
  BUTTONREQUEST_APPLYPOLICIES = 29,
  BUTTONREQUEST_SIGNEXCHANGE = 30,
  BUTTONREQUEST_AUTOLOCKDELAYMS = 31,
  BUTTONREQUEST_U2FCOUNTER = 32,
}

export enum PinMatrixRequestType {
  PINMATRIXREQUESTTYPE_CURRENT = 1,
  PINMATRIXREQUESTTYPE_NEWFIRST = 2,
  PINMATRIXREQUESTTYPE_NEWSECOND = 3,
}

