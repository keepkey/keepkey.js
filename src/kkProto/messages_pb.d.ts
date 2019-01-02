// package: 
// file: messages.proto

import * as jspb from "google-protobuf";
import * as types_pb from "./types_pb";

export class Initialize extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Initialize.AsObject;
  static toObject(includeInstance: boolean, msg: Initialize): Initialize.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Initialize, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Initialize;
  static deserializeBinaryFromReader(message: Initialize, reader: jspb.BinaryReader): Initialize;
}

export namespace Initialize {
  export type AsObject = {
  }
}

export class GetFeatures extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetFeatures.AsObject;
  static toObject(includeInstance: boolean, msg: GetFeatures): GetFeatures.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: GetFeatures, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetFeatures;
  static deserializeBinaryFromReader(message: GetFeatures, reader: jspb.BinaryReader): GetFeatures;
}

export namespace GetFeatures {
  export type AsObject = {
  }
}

export class Features extends jspb.Message {
  hasVendor(): boolean;
  clearVendor(): void;
  getVendor(): string | undefined;
  setVendor(value: string): void;

  hasMajorVersion(): boolean;
  clearMajorVersion(): void;
  getMajorVersion(): number | undefined;
  setMajorVersion(value: number): void;

  hasMinorVersion(): boolean;
  clearMinorVersion(): void;
  getMinorVersion(): number | undefined;
  setMinorVersion(value: number): void;

  hasPatchVersion(): boolean;
  clearPatchVersion(): void;
  getPatchVersion(): number | undefined;
  setPatchVersion(value: number): void;

  hasBootloaderMode(): boolean;
  clearBootloaderMode(): void;
  getBootloaderMode(): boolean | undefined;
  setBootloaderMode(value: boolean): void;

  hasDeviceId(): boolean;
  clearDeviceId(): void;
  getDeviceId(): string | undefined;
  setDeviceId(value: string): void;

  hasPinProtection(): boolean;
  clearPinProtection(): void;
  getPinProtection(): boolean | undefined;
  setPinProtection(value: boolean): void;

  hasPassphraseProtection(): boolean;
  clearPassphraseProtection(): void;
  getPassphraseProtection(): boolean | undefined;
  setPassphraseProtection(value: boolean): void;

  hasLanguage(): boolean;
  clearLanguage(): void;
  getLanguage(): string | undefined;
  setLanguage(value: string): void;

  hasLabel(): boolean;
  clearLabel(): void;
  getLabel(): string | undefined;
  setLabel(value: string): void;

  clearCoinsList(): void;
  getCoinsList(): Array<types_pb.CoinType>;
  setCoinsList(value: Array<types_pb.CoinType>): void;
  addCoins(value?: types_pb.CoinType, index?: number): types_pb.CoinType;

  hasInitialized(): boolean;
  clearInitialized(): void;
  getInitialized(): boolean | undefined;
  setInitialized(value: boolean): void;

  hasRevision(): boolean;
  clearRevision(): void;
  getRevision(): Uint8Array | string;
  getRevision_asU8(): Uint8Array;
  getRevision_asB64(): string;
  setRevision(value: Uint8Array | string): void;

  hasBootloaderHash(): boolean;
  clearBootloaderHash(): void;
  getBootloaderHash(): Uint8Array | string;
  getBootloaderHash_asU8(): Uint8Array;
  getBootloaderHash_asB64(): string;
  setBootloaderHash(value: Uint8Array | string): void;

  hasImported(): boolean;
  clearImported(): void;
  getImported(): boolean | undefined;
  setImported(value: boolean): void;

  hasPinCached(): boolean;
  clearPinCached(): void;
  getPinCached(): boolean | undefined;
  setPinCached(value: boolean): void;

  hasPassphraseCached(): boolean;
  clearPassphraseCached(): void;
  getPassphraseCached(): boolean | undefined;
  setPassphraseCached(value: boolean): void;

  clearPoliciesList(): void;
  getPoliciesList(): Array<types_pb.PolicyType>;
  setPoliciesList(value: Array<types_pb.PolicyType>): void;
  addPolicies(value?: types_pb.PolicyType, index?: number): types_pb.PolicyType;

  hasModel(): boolean;
  clearModel(): void;
  getModel(): string | undefined;
  setModel(value: string): void;

  hasFirmwareVariant(): boolean;
  clearFirmwareVariant(): void;
  getFirmwareVariant(): string | undefined;
  setFirmwareVariant(value: string): void;

  hasFirmwareHash(): boolean;
  clearFirmwareHash(): void;
  getFirmwareHash(): Uint8Array | string;
  getFirmwareHash_asU8(): Uint8Array;
  getFirmwareHash_asB64(): string;
  setFirmwareHash(value: Uint8Array | string): void;

  hasNoBackup(): boolean;
  clearNoBackup(): void;
  getNoBackup(): boolean | undefined;
  setNoBackup(value: boolean): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Features.AsObject;
  static toObject(includeInstance: boolean, msg: Features): Features.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Features, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Features;
  static deserializeBinaryFromReader(message: Features, reader: jspb.BinaryReader): Features;
}

export namespace Features {
  export type AsObject = {
    vendor?: string,
    majorVersion?: number,
    minorVersion?: number,
    patchVersion?: number,
    bootloaderMode?: boolean,
    deviceId?: string,
    pinProtection?: boolean,
    passphraseProtection?: boolean,
    language?: string,
    label?: string,
    coinsList: Array<types_pb.CoinType.AsObject>,
    initialized?: boolean,
    revision: Uint8Array | string,
    bootloaderHash: Uint8Array | string,
    imported?: boolean,
    pinCached?: boolean,
    passphraseCached?: boolean,
    policiesList: Array<types_pb.PolicyType.AsObject>,
    model?: string,
    firmwareVariant?: string,
    firmwareHash: Uint8Array | string,
    noBackup?: boolean,
  }
}

export class GetCoinTable extends jspb.Message {
  hasStart(): boolean;
  clearStart(): void;
  getStart(): number | undefined;
  setStart(value: number): void;

  hasEnd(): boolean;
  clearEnd(): void;
  getEnd(): number | undefined;
  setEnd(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetCoinTable.AsObject;
  static toObject(includeInstance: boolean, msg: GetCoinTable): GetCoinTable.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: GetCoinTable, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetCoinTable;
  static deserializeBinaryFromReader(message: GetCoinTable, reader: jspb.BinaryReader): GetCoinTable;
}

export namespace GetCoinTable {
  export type AsObject = {
    start?: number,
    end?: number,
  }
}

export class CoinTable extends jspb.Message {
  clearTableList(): void;
  getTableList(): Array<types_pb.CoinType>;
  setTableList(value: Array<types_pb.CoinType>): void;
  addTable(value?: types_pb.CoinType, index?: number): types_pb.CoinType;

  hasNumCoins(): boolean;
  clearNumCoins(): void;
  getNumCoins(): number | undefined;
  setNumCoins(value: number): void;

  hasChunkSize(): boolean;
  clearChunkSize(): void;
  getChunkSize(): number | undefined;
  setChunkSize(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CoinTable.AsObject;
  static toObject(includeInstance: boolean, msg: CoinTable): CoinTable.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: CoinTable, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CoinTable;
  static deserializeBinaryFromReader(message: CoinTable, reader: jspb.BinaryReader): CoinTable;
}

export namespace CoinTable {
  export type AsObject = {
    tableList: Array<types_pb.CoinType.AsObject>,
    numCoins?: number,
    chunkSize?: number,
  }
}

export class ClearSession extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ClearSession.AsObject;
  static toObject(includeInstance: boolean, msg: ClearSession): ClearSession.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ClearSession, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ClearSession;
  static deserializeBinaryFromReader(message: ClearSession, reader: jspb.BinaryReader): ClearSession;
}

export namespace ClearSession {
  export type AsObject = {
  }
}

export class ApplySettings extends jspb.Message {
  hasLanguage(): boolean;
  clearLanguage(): void;
  getLanguage(): string | undefined;
  setLanguage(value: string): void;

  hasLabel(): boolean;
  clearLabel(): void;
  getLabel(): string | undefined;
  setLabel(value: string): void;

  hasUsePassphrase(): boolean;
  clearUsePassphrase(): void;
  getUsePassphrase(): boolean | undefined;
  setUsePassphrase(value: boolean): void;

  hasAutoLockDelayMs(): boolean;
  clearAutoLockDelayMs(): void;
  getAutoLockDelayMs(): number | undefined;
  setAutoLockDelayMs(value: number): void;

  hasU2fCounter(): boolean;
  clearU2fCounter(): void;
  getU2fCounter(): number | undefined;
  setU2fCounter(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ApplySettings.AsObject;
  static toObject(includeInstance: boolean, msg: ApplySettings): ApplySettings.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ApplySettings, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ApplySettings;
  static deserializeBinaryFromReader(message: ApplySettings, reader: jspb.BinaryReader): ApplySettings;
}

export namespace ApplySettings {
  export type AsObject = {
    language?: string,
    label?: string,
    usePassphrase?: boolean,
    autoLockDelayMs?: number,
    u2fCounter?: number,
  }
}

export class ChangePin extends jspb.Message {
  hasRemove(): boolean;
  clearRemove(): void;
  getRemove(): boolean | undefined;
  setRemove(value: boolean): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ChangePin.AsObject;
  static toObject(includeInstance: boolean, msg: ChangePin): ChangePin.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ChangePin, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ChangePin;
  static deserializeBinaryFromReader(message: ChangePin, reader: jspb.BinaryReader): ChangePin;
}

export namespace ChangePin {
  export type AsObject = {
    remove?: boolean,
  }
}

export class Ping extends jspb.Message {
  hasMessage(): boolean;
  clearMessage(): void;
  getMessage(): string | undefined;
  setMessage(value: string): void;

  hasButtonProtection(): boolean;
  clearButtonProtection(): void;
  getButtonProtection(): boolean | undefined;
  setButtonProtection(value: boolean): void;

  hasPinProtection(): boolean;
  clearPinProtection(): void;
  getPinProtection(): boolean | undefined;
  setPinProtection(value: boolean): void;

  hasPassphraseProtection(): boolean;
  clearPassphraseProtection(): void;
  getPassphraseProtection(): boolean | undefined;
  setPassphraseProtection(value: boolean): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Ping.AsObject;
  static toObject(includeInstance: boolean, msg: Ping): Ping.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Ping, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Ping;
  static deserializeBinaryFromReader(message: Ping, reader: jspb.BinaryReader): Ping;
}

export namespace Ping {
  export type AsObject = {
    message?: string,
    buttonProtection?: boolean,
    pinProtection?: boolean,
    passphraseProtection?: boolean,
  }
}

export class Success extends jspb.Message {
  hasMessage(): boolean;
  clearMessage(): void;
  getMessage(): string | undefined;
  setMessage(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Success.AsObject;
  static toObject(includeInstance: boolean, msg: Success): Success.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Success, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Success;
  static deserializeBinaryFromReader(message: Success, reader: jspb.BinaryReader): Success;
}

export namespace Success {
  export type AsObject = {
    message?: string,
  }
}

export class Failure extends jspb.Message {
  hasCode(): boolean;
  clearCode(): void;
  getCode(): types_pb.FailureType | undefined;
  setCode(value: types_pb.FailureType): void;

  hasMessage(): boolean;
  clearMessage(): void;
  getMessage(): string | undefined;
  setMessage(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Failure.AsObject;
  static toObject(includeInstance: boolean, msg: Failure): Failure.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Failure, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Failure;
  static deserializeBinaryFromReader(message: Failure, reader: jspb.BinaryReader): Failure;
}

export namespace Failure {
  export type AsObject = {
    code?: types_pb.FailureType,
    message?: string,
  }
}

export class ButtonRequest extends jspb.Message {
  hasCode(): boolean;
  clearCode(): void;
  getCode(): types_pb.ButtonRequestType | undefined;
  setCode(value: types_pb.ButtonRequestType): void;

  hasData(): boolean;
  clearData(): void;
  getData(): string | undefined;
  setData(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ButtonRequest.AsObject;
  static toObject(includeInstance: boolean, msg: ButtonRequest): ButtonRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ButtonRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ButtonRequest;
  static deserializeBinaryFromReader(message: ButtonRequest, reader: jspb.BinaryReader): ButtonRequest;
}

export namespace ButtonRequest {
  export type AsObject = {
    code?: types_pb.ButtonRequestType,
    data?: string,
  }
}

export class ButtonAck extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ButtonAck.AsObject;
  static toObject(includeInstance: boolean, msg: ButtonAck): ButtonAck.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ButtonAck, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ButtonAck;
  static deserializeBinaryFromReader(message: ButtonAck, reader: jspb.BinaryReader): ButtonAck;
}

export namespace ButtonAck {
  export type AsObject = {
  }
}

export class PinMatrixRequest extends jspb.Message {
  hasType(): boolean;
  clearType(): void;
  getType(): types_pb.PinMatrixRequestType | undefined;
  setType(value: types_pb.PinMatrixRequestType): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): PinMatrixRequest.AsObject;
  static toObject(includeInstance: boolean, msg: PinMatrixRequest): PinMatrixRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: PinMatrixRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): PinMatrixRequest;
  static deserializeBinaryFromReader(message: PinMatrixRequest, reader: jspb.BinaryReader): PinMatrixRequest;
}

export namespace PinMatrixRequest {
  export type AsObject = {
    type?: types_pb.PinMatrixRequestType,
  }
}

export class PinMatrixAck extends jspb.Message {
  hasPin(): boolean;
  clearPin(): void;
  getPin(): string | undefined;
  setPin(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): PinMatrixAck.AsObject;
  static toObject(includeInstance: boolean, msg: PinMatrixAck): PinMatrixAck.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: PinMatrixAck, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): PinMatrixAck;
  static deserializeBinaryFromReader(message: PinMatrixAck, reader: jspb.BinaryReader): PinMatrixAck;
}

export namespace PinMatrixAck {
  export type AsObject = {
    pin?: string,
  }
}

export class Cancel extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Cancel.AsObject;
  static toObject(includeInstance: boolean, msg: Cancel): Cancel.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Cancel, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Cancel;
  static deserializeBinaryFromReader(message: Cancel, reader: jspb.BinaryReader): Cancel;
}

export namespace Cancel {
  export type AsObject = {
  }
}

export class PassphraseRequest extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): PassphraseRequest.AsObject;
  static toObject(includeInstance: boolean, msg: PassphraseRequest): PassphraseRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: PassphraseRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): PassphraseRequest;
  static deserializeBinaryFromReader(message: PassphraseRequest, reader: jspb.BinaryReader): PassphraseRequest;
}

export namespace PassphraseRequest {
  export type AsObject = {
  }
}

export class PassphraseAck extends jspb.Message {
  hasPassphrase(): boolean;
  clearPassphrase(): void;
  getPassphrase(): string | undefined;
  setPassphrase(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): PassphraseAck.AsObject;
  static toObject(includeInstance: boolean, msg: PassphraseAck): PassphraseAck.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: PassphraseAck, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): PassphraseAck;
  static deserializeBinaryFromReader(message: PassphraseAck, reader: jspb.BinaryReader): PassphraseAck;
}

export namespace PassphraseAck {
  export type AsObject = {
    passphrase?: string,
  }
}

export class GetEntropy extends jspb.Message {
  hasSize(): boolean;
  clearSize(): void;
  getSize(): number | undefined;
  setSize(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetEntropy.AsObject;
  static toObject(includeInstance: boolean, msg: GetEntropy): GetEntropy.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: GetEntropy, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetEntropy;
  static deserializeBinaryFromReader(message: GetEntropy, reader: jspb.BinaryReader): GetEntropy;
}

export namespace GetEntropy {
  export type AsObject = {
    size?: number,
  }
}

export class Entropy extends jspb.Message {
  hasEntropy(): boolean;
  clearEntropy(): void;
  getEntropy(): Uint8Array | string;
  getEntropy_asU8(): Uint8Array;
  getEntropy_asB64(): string;
  setEntropy(value: Uint8Array | string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Entropy.AsObject;
  static toObject(includeInstance: boolean, msg: Entropy): Entropy.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Entropy, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Entropy;
  static deserializeBinaryFromReader(message: Entropy, reader: jspb.BinaryReader): Entropy;
}

export namespace Entropy {
  export type AsObject = {
    entropy: Uint8Array | string,
  }
}

export class GetPublicKey extends jspb.Message {
  clearAddressNList(): void;
  getAddressNList(): Array<number>;
  setAddressNList(value: Array<number>): void;
  addAddressN(value: number, index?: number): number;

  hasEcdsaCurveName(): boolean;
  clearEcdsaCurveName(): void;
  getEcdsaCurveName(): string | undefined;
  setEcdsaCurveName(value: string): void;

  hasShowDisplay(): boolean;
  clearShowDisplay(): void;
  getShowDisplay(): boolean | undefined;
  setShowDisplay(value: boolean): void;

  hasCoinName(): boolean;
  clearCoinName(): void;
  getCoinName(): string | undefined;
  setCoinName(value: string): void;

  hasScriptType(): boolean;
  clearScriptType(): void;
  getScriptType(): types_pb.InputScriptType | undefined;
  setScriptType(value: types_pb.InputScriptType): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetPublicKey.AsObject;
  static toObject(includeInstance: boolean, msg: GetPublicKey): GetPublicKey.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: GetPublicKey, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetPublicKey;
  static deserializeBinaryFromReader(message: GetPublicKey, reader: jspb.BinaryReader): GetPublicKey;
}

export namespace GetPublicKey {
  export type AsObject = {
    addressNList: Array<number>,
    ecdsaCurveName?: string,
    showDisplay?: boolean,
    coinName?: string,
    scriptType?: types_pb.InputScriptType,
  }
}

export class PublicKey extends jspb.Message {
  hasNode(): boolean;
  clearNode(): void;
  getNode(): types_pb.HDNodeType;
  setNode(value?: types_pb.HDNodeType): void;

  hasXpub(): boolean;
  clearXpub(): void;
  getXpub(): string | undefined;
  setXpub(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): PublicKey.AsObject;
  static toObject(includeInstance: boolean, msg: PublicKey): PublicKey.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: PublicKey, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): PublicKey;
  static deserializeBinaryFromReader(message: PublicKey, reader: jspb.BinaryReader): PublicKey;
}

export namespace PublicKey {
  export type AsObject = {
    node: types_pb.HDNodeType.AsObject,
    xpub?: string,
  }
}

export class GetAddress extends jspb.Message {
  clearAddressNList(): void;
  getAddressNList(): Array<number>;
  setAddressNList(value: Array<number>): void;
  addAddressN(value: number, index?: number): number;

  hasCoinName(): boolean;
  clearCoinName(): void;
  getCoinName(): string | undefined;
  setCoinName(value: string): void;

  hasShowDisplay(): boolean;
  clearShowDisplay(): void;
  getShowDisplay(): boolean | undefined;
  setShowDisplay(value: boolean): void;

  hasMultisig(): boolean;
  clearMultisig(): void;
  getMultisig(): types_pb.MultisigRedeemScriptType | undefined;
  setMultisig(value?: types_pb.MultisigRedeemScriptType): void;

  hasScriptType(): boolean;
  clearScriptType(): void;
  getScriptType(): types_pb.InputScriptType | undefined;
  setScriptType(value: types_pb.InputScriptType): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetAddress.AsObject;
  static toObject(includeInstance: boolean, msg: GetAddress): GetAddress.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: GetAddress, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetAddress;
  static deserializeBinaryFromReader(message: GetAddress, reader: jspb.BinaryReader): GetAddress;
}

export namespace GetAddress {
  export type AsObject = {
    addressNList: Array<number>,
    coinName?: string,
    showDisplay?: boolean,
    multisig?: types_pb.MultisigRedeemScriptType.AsObject,
    scriptType?: types_pb.InputScriptType,
  }
}

export class EthereumGetAddress extends jspb.Message {
  clearAddressNList(): void;
  getAddressNList(): Array<number>;
  setAddressNList(value: Array<number>): void;
  addAddressN(value: number, index?: number): number;

  hasShowDisplay(): boolean;
  clearShowDisplay(): void;
  getShowDisplay(): boolean | undefined;
  setShowDisplay(value: boolean): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): EthereumGetAddress.AsObject;
  static toObject(includeInstance: boolean, msg: EthereumGetAddress): EthereumGetAddress.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: EthereumGetAddress, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): EthereumGetAddress;
  static deserializeBinaryFromReader(message: EthereumGetAddress, reader: jspb.BinaryReader): EthereumGetAddress;
}

export namespace EthereumGetAddress {
  export type AsObject = {
    addressNList: Array<number>,
    showDisplay?: boolean,
  }
}

export class Address extends jspb.Message {
  hasAddress(): boolean;
  clearAddress(): void;
  getAddress(): string | undefined;
  setAddress(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Address.AsObject;
  static toObject(includeInstance: boolean, msg: Address): Address.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Address, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Address;
  static deserializeBinaryFromReader(message: Address, reader: jspb.BinaryReader): Address;
}

export namespace Address {
  export type AsObject = {
    address?: string,
  }
}

export class EthereumAddress extends jspb.Message {
  hasAddress(): boolean;
  clearAddress(): void;
  getAddress(): Uint8Array | string;
  getAddress_asU8(): Uint8Array;
  getAddress_asB64(): string;
  setAddress(value: Uint8Array | string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): EthereumAddress.AsObject;
  static toObject(includeInstance: boolean, msg: EthereumAddress): EthereumAddress.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: EthereumAddress, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): EthereumAddress;
  static deserializeBinaryFromReader(message: EthereumAddress, reader: jspb.BinaryReader): EthereumAddress;
}

export namespace EthereumAddress {
  export type AsObject = {
    address: Uint8Array | string,
  }
}

export class WipeDevice extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): WipeDevice.AsObject;
  static toObject(includeInstance: boolean, msg: WipeDevice): WipeDevice.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: WipeDevice, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): WipeDevice;
  static deserializeBinaryFromReader(message: WipeDevice, reader: jspb.BinaryReader): WipeDevice;
}

export namespace WipeDevice {
  export type AsObject = {
  }
}

export class LoadDevice extends jspb.Message {
  hasMnemonic(): boolean;
  clearMnemonic(): void;
  getMnemonic(): string | undefined;
  setMnemonic(value: string): void;

  hasNode(): boolean;
  clearNode(): void;
  getNode(): types_pb.HDNodeType | undefined;
  setNode(value?: types_pb.HDNodeType): void;

  hasPin(): boolean;
  clearPin(): void;
  getPin(): string | undefined;
  setPin(value: string): void;

  hasPassphraseProtection(): boolean;
  clearPassphraseProtection(): void;
  getPassphraseProtection(): boolean | undefined;
  setPassphraseProtection(value: boolean): void;

  hasLanguage(): boolean;
  clearLanguage(): void;
  getLanguage(): string | undefined;
  setLanguage(value: string): void;

  hasLabel(): boolean;
  clearLabel(): void;
  getLabel(): string | undefined;
  setLabel(value: string): void;

  hasSkipChecksum(): boolean;
  clearSkipChecksum(): void;
  getSkipChecksum(): boolean | undefined;
  setSkipChecksum(value: boolean): void;

  hasU2fCounter(): boolean;
  clearU2fCounter(): void;
  getU2fCounter(): number | undefined;
  setU2fCounter(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): LoadDevice.AsObject;
  static toObject(includeInstance: boolean, msg: LoadDevice): LoadDevice.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: LoadDevice, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): LoadDevice;
  static deserializeBinaryFromReader(message: LoadDevice, reader: jspb.BinaryReader): LoadDevice;
}

export namespace LoadDevice {
  export type AsObject = {
    mnemonic?: string,
    node?: types_pb.HDNodeType.AsObject,
    pin?: string,
    passphraseProtection?: boolean,
    language?: string,
    label?: string,
    skipChecksum?: boolean,
    u2fCounter?: number,
  }
}

export class ResetDevice extends jspb.Message {
  hasDisplayRandom(): boolean;
  clearDisplayRandom(): void;
  getDisplayRandom(): boolean | undefined;
  setDisplayRandom(value: boolean): void;

  hasStrength(): boolean;
  clearStrength(): void;
  getStrength(): number | undefined;
  setStrength(value: number): void;

  hasPassphraseProtection(): boolean;
  clearPassphraseProtection(): void;
  getPassphraseProtection(): boolean | undefined;
  setPassphraseProtection(value: boolean): void;

  hasPinProtection(): boolean;
  clearPinProtection(): void;
  getPinProtection(): boolean | undefined;
  setPinProtection(value: boolean): void;

  hasLanguage(): boolean;
  clearLanguage(): void;
  getLanguage(): string | undefined;
  setLanguage(value: string): void;

  hasLabel(): boolean;
  clearLabel(): void;
  getLabel(): string | undefined;
  setLabel(value: string): void;

  hasNoBackup(): boolean;
  clearNoBackup(): void;
  getNoBackup(): boolean | undefined;
  setNoBackup(value: boolean): void;

  hasAutoLockDelayMs(): boolean;
  clearAutoLockDelayMs(): void;
  getAutoLockDelayMs(): number | undefined;
  setAutoLockDelayMs(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ResetDevice.AsObject;
  static toObject(includeInstance: boolean, msg: ResetDevice): ResetDevice.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ResetDevice, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ResetDevice;
  static deserializeBinaryFromReader(message: ResetDevice, reader: jspb.BinaryReader): ResetDevice;
}

export namespace ResetDevice {
  export type AsObject = {
    displayRandom?: boolean,
    strength?: number,
    passphraseProtection?: boolean,
    pinProtection?: boolean,
    language?: string,
    label?: string,
    noBackup?: boolean,
    autoLockDelayMs?: number,
  }
}

export class EntropyRequest extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): EntropyRequest.AsObject;
  static toObject(includeInstance: boolean, msg: EntropyRequest): EntropyRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: EntropyRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): EntropyRequest;
  static deserializeBinaryFromReader(message: EntropyRequest, reader: jspb.BinaryReader): EntropyRequest;
}

export namespace EntropyRequest {
  export type AsObject = {
  }
}

export class EntropyAck extends jspb.Message {
  hasEntropy(): boolean;
  clearEntropy(): void;
  getEntropy(): Uint8Array | string;
  getEntropy_asU8(): Uint8Array;
  getEntropy_asB64(): string;
  setEntropy(value: Uint8Array | string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): EntropyAck.AsObject;
  static toObject(includeInstance: boolean, msg: EntropyAck): EntropyAck.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: EntropyAck, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): EntropyAck;
  static deserializeBinaryFromReader(message: EntropyAck, reader: jspb.BinaryReader): EntropyAck;
}

export namespace EntropyAck {
  export type AsObject = {
    entropy: Uint8Array | string,
  }
}

export class RecoveryDevice extends jspb.Message {
  hasWordCount(): boolean;
  clearWordCount(): void;
  getWordCount(): number | undefined;
  setWordCount(value: number): void;

  hasPassphraseProtection(): boolean;
  clearPassphraseProtection(): void;
  getPassphraseProtection(): boolean | undefined;
  setPassphraseProtection(value: boolean): void;

  hasPinProtection(): boolean;
  clearPinProtection(): void;
  getPinProtection(): boolean | undefined;
  setPinProtection(value: boolean): void;

  hasLanguage(): boolean;
  clearLanguage(): void;
  getLanguage(): string | undefined;
  setLanguage(value: string): void;

  hasLabel(): boolean;
  clearLabel(): void;
  getLabel(): string | undefined;
  setLabel(value: string): void;

  hasEnforceWordlist(): boolean;
  clearEnforceWordlist(): void;
  getEnforceWordlist(): boolean | undefined;
  setEnforceWordlist(value: boolean): void;

  hasUseCharacterCipher(): boolean;
  clearUseCharacterCipher(): void;
  getUseCharacterCipher(): boolean | undefined;
  setUseCharacterCipher(value: boolean): void;

  hasAutoLockDelayMs(): boolean;
  clearAutoLockDelayMs(): void;
  getAutoLockDelayMs(): number | undefined;
  setAutoLockDelayMs(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): RecoveryDevice.AsObject;
  static toObject(includeInstance: boolean, msg: RecoveryDevice): RecoveryDevice.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: RecoveryDevice, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): RecoveryDevice;
  static deserializeBinaryFromReader(message: RecoveryDevice, reader: jspb.BinaryReader): RecoveryDevice;
}

export namespace RecoveryDevice {
  export type AsObject = {
    wordCount?: number,
    passphraseProtection?: boolean,
    pinProtection?: boolean,
    language?: string,
    label?: string,
    enforceWordlist?: boolean,
    useCharacterCipher?: boolean,
    autoLockDelayMs?: number,
  }
}

export class WordRequest extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): WordRequest.AsObject;
  static toObject(includeInstance: boolean, msg: WordRequest): WordRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: WordRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): WordRequest;
  static deserializeBinaryFromReader(message: WordRequest, reader: jspb.BinaryReader): WordRequest;
}

export namespace WordRequest {
  export type AsObject = {
  }
}

export class WordAck extends jspb.Message {
  hasWord(): boolean;
  clearWord(): void;
  getWord(): string | undefined;
  setWord(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): WordAck.AsObject;
  static toObject(includeInstance: boolean, msg: WordAck): WordAck.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: WordAck, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): WordAck;
  static deserializeBinaryFromReader(message: WordAck, reader: jspb.BinaryReader): WordAck;
}

export namespace WordAck {
  export type AsObject = {
    word?: string,
  }
}

export class CharacterRequest extends jspb.Message {
  hasWordPos(): boolean;
  clearWordPos(): void;
  getWordPos(): number | undefined;
  setWordPos(value: number): void;

  hasCharacterPos(): boolean;
  clearCharacterPos(): void;
  getCharacterPos(): number | undefined;
  setCharacterPos(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CharacterRequest.AsObject;
  static toObject(includeInstance: boolean, msg: CharacterRequest): CharacterRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: CharacterRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CharacterRequest;
  static deserializeBinaryFromReader(message: CharacterRequest, reader: jspb.BinaryReader): CharacterRequest;
}

export namespace CharacterRequest {
  export type AsObject = {
    wordPos?: number,
    characterPos?: number,
  }
}

export class CharacterAck extends jspb.Message {
  hasCharacter(): boolean;
  clearCharacter(): void;
  getCharacter(): string | undefined;
  setCharacter(value: string): void;

  hasDelete(): boolean;
  clearDelete(): void;
  getDelete(): boolean | undefined;
  setDelete(value: boolean): void;

  hasDone(): boolean;
  clearDone(): void;
  getDone(): boolean | undefined;
  setDone(value: boolean): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CharacterAck.AsObject;
  static toObject(includeInstance: boolean, msg: CharacterAck): CharacterAck.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: CharacterAck, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CharacterAck;
  static deserializeBinaryFromReader(message: CharacterAck, reader: jspb.BinaryReader): CharacterAck;
}

export namespace CharacterAck {
  export type AsObject = {
    character?: string,
    pb_delete?: boolean,
    done?: boolean,
  }
}

export class SignMessage extends jspb.Message {
  clearAddressNList(): void;
  getAddressNList(): Array<number>;
  setAddressNList(value: Array<number>): void;
  addAddressN(value: number, index?: number): number;

  hasMessage(): boolean;
  clearMessage(): void;
  getMessage(): Uint8Array | string;
  getMessage_asU8(): Uint8Array;
  getMessage_asB64(): string;
  setMessage(value: Uint8Array | string): void;

  hasCoinName(): boolean;
  clearCoinName(): void;
  getCoinName(): string | undefined;
  setCoinName(value: string): void;

  hasScriptType(): boolean;
  clearScriptType(): void;
  getScriptType(): types_pb.InputScriptType | undefined;
  setScriptType(value: types_pb.InputScriptType): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SignMessage.AsObject;
  static toObject(includeInstance: boolean, msg: SignMessage): SignMessage.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: SignMessage, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SignMessage;
  static deserializeBinaryFromReader(message: SignMessage, reader: jspb.BinaryReader): SignMessage;
}

export namespace SignMessage {
  export type AsObject = {
    addressNList: Array<number>,
    message: Uint8Array | string,
    coinName?: string,
    scriptType?: types_pb.InputScriptType,
  }
}

export class VerifyMessage extends jspb.Message {
  hasAddress(): boolean;
  clearAddress(): void;
  getAddress(): string | undefined;
  setAddress(value: string): void;

  hasSignature(): boolean;
  clearSignature(): void;
  getSignature(): Uint8Array | string;
  getSignature_asU8(): Uint8Array;
  getSignature_asB64(): string;
  setSignature(value: Uint8Array | string): void;

  hasMessage(): boolean;
  clearMessage(): void;
  getMessage(): Uint8Array | string;
  getMessage_asU8(): Uint8Array;
  getMessage_asB64(): string;
  setMessage(value: Uint8Array | string): void;

  hasCoinName(): boolean;
  clearCoinName(): void;
  getCoinName(): string | undefined;
  setCoinName(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): VerifyMessage.AsObject;
  static toObject(includeInstance: boolean, msg: VerifyMessage): VerifyMessage.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: VerifyMessage, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): VerifyMessage;
  static deserializeBinaryFromReader(message: VerifyMessage, reader: jspb.BinaryReader): VerifyMessage;
}

export namespace VerifyMessage {
  export type AsObject = {
    address?: string,
    signature: Uint8Array | string,
    message: Uint8Array | string,
    coinName?: string,
  }
}

export class MessageSignature extends jspb.Message {
  hasAddress(): boolean;
  clearAddress(): void;
  getAddress(): string | undefined;
  setAddress(value: string): void;

  hasSignature(): boolean;
  clearSignature(): void;
  getSignature(): Uint8Array | string;
  getSignature_asU8(): Uint8Array;
  getSignature_asB64(): string;
  setSignature(value: Uint8Array | string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): MessageSignature.AsObject;
  static toObject(includeInstance: boolean, msg: MessageSignature): MessageSignature.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: MessageSignature, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): MessageSignature;
  static deserializeBinaryFromReader(message: MessageSignature, reader: jspb.BinaryReader): MessageSignature;
}

export namespace MessageSignature {
  export type AsObject = {
    address?: string,
    signature: Uint8Array | string,
  }
}

export class EncryptMessage extends jspb.Message {
  hasPubkey(): boolean;
  clearPubkey(): void;
  getPubkey(): Uint8Array | string;
  getPubkey_asU8(): Uint8Array;
  getPubkey_asB64(): string;
  setPubkey(value: Uint8Array | string): void;

  hasMessage(): boolean;
  clearMessage(): void;
  getMessage(): Uint8Array | string;
  getMessage_asU8(): Uint8Array;
  getMessage_asB64(): string;
  setMessage(value: Uint8Array | string): void;

  hasDisplayOnly(): boolean;
  clearDisplayOnly(): void;
  getDisplayOnly(): boolean | undefined;
  setDisplayOnly(value: boolean): void;

  clearAddressNList(): void;
  getAddressNList(): Array<number>;
  setAddressNList(value: Array<number>): void;
  addAddressN(value: number, index?: number): number;

  hasCoinName(): boolean;
  clearCoinName(): void;
  getCoinName(): string | undefined;
  setCoinName(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): EncryptMessage.AsObject;
  static toObject(includeInstance: boolean, msg: EncryptMessage): EncryptMessage.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: EncryptMessage, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): EncryptMessage;
  static deserializeBinaryFromReader(message: EncryptMessage, reader: jspb.BinaryReader): EncryptMessage;
}

export namespace EncryptMessage {
  export type AsObject = {
    pubkey: Uint8Array | string,
    message: Uint8Array | string,
    displayOnly?: boolean,
    addressNList: Array<number>,
    coinName?: string,
  }
}

export class EncryptedMessage extends jspb.Message {
  hasNonce(): boolean;
  clearNonce(): void;
  getNonce(): Uint8Array | string;
  getNonce_asU8(): Uint8Array;
  getNonce_asB64(): string;
  setNonce(value: Uint8Array | string): void;

  hasMessage(): boolean;
  clearMessage(): void;
  getMessage(): Uint8Array | string;
  getMessage_asU8(): Uint8Array;
  getMessage_asB64(): string;
  setMessage(value: Uint8Array | string): void;

  hasHmac(): boolean;
  clearHmac(): void;
  getHmac(): Uint8Array | string;
  getHmac_asU8(): Uint8Array;
  getHmac_asB64(): string;
  setHmac(value: Uint8Array | string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): EncryptedMessage.AsObject;
  static toObject(includeInstance: boolean, msg: EncryptedMessage): EncryptedMessage.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: EncryptedMessage, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): EncryptedMessage;
  static deserializeBinaryFromReader(message: EncryptedMessage, reader: jspb.BinaryReader): EncryptedMessage;
}

export namespace EncryptedMessage {
  export type AsObject = {
    nonce: Uint8Array | string,
    message: Uint8Array | string,
    hmac: Uint8Array | string,
  }
}

export class DecryptMessage extends jspb.Message {
  clearAddressNList(): void;
  getAddressNList(): Array<number>;
  setAddressNList(value: Array<number>): void;
  addAddressN(value: number, index?: number): number;

  hasNonce(): boolean;
  clearNonce(): void;
  getNonce(): Uint8Array | string;
  getNonce_asU8(): Uint8Array;
  getNonce_asB64(): string;
  setNonce(value: Uint8Array | string): void;

  hasMessage(): boolean;
  clearMessage(): void;
  getMessage(): Uint8Array | string;
  getMessage_asU8(): Uint8Array;
  getMessage_asB64(): string;
  setMessage(value: Uint8Array | string): void;

  hasHmac(): boolean;
  clearHmac(): void;
  getHmac(): Uint8Array | string;
  getHmac_asU8(): Uint8Array;
  getHmac_asB64(): string;
  setHmac(value: Uint8Array | string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): DecryptMessage.AsObject;
  static toObject(includeInstance: boolean, msg: DecryptMessage): DecryptMessage.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: DecryptMessage, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): DecryptMessage;
  static deserializeBinaryFromReader(message: DecryptMessage, reader: jspb.BinaryReader): DecryptMessage;
}

export namespace DecryptMessage {
  export type AsObject = {
    addressNList: Array<number>,
    nonce: Uint8Array | string,
    message: Uint8Array | string,
    hmac: Uint8Array | string,
  }
}

export class DecryptedMessage extends jspb.Message {
  hasMessage(): boolean;
  clearMessage(): void;
  getMessage(): Uint8Array | string;
  getMessage_asU8(): Uint8Array;
  getMessage_asB64(): string;
  setMessage(value: Uint8Array | string): void;

  hasAddress(): boolean;
  clearAddress(): void;
  getAddress(): string | undefined;
  setAddress(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): DecryptedMessage.AsObject;
  static toObject(includeInstance: boolean, msg: DecryptedMessage): DecryptedMessage.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: DecryptedMessage, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): DecryptedMessage;
  static deserializeBinaryFromReader(message: DecryptedMessage, reader: jspb.BinaryReader): DecryptedMessage;
}

export namespace DecryptedMessage {
  export type AsObject = {
    message: Uint8Array | string,
    address?: string,
  }
}

export class CipherKeyValue extends jspb.Message {
  clearAddressNList(): void;
  getAddressNList(): Array<number>;
  setAddressNList(value: Array<number>): void;
  addAddressN(value: number, index?: number): number;

  hasKey(): boolean;
  clearKey(): void;
  getKey(): string | undefined;
  setKey(value: string): void;

  hasValue(): boolean;
  clearValue(): void;
  getValue(): Uint8Array | string;
  getValue_asU8(): Uint8Array;
  getValue_asB64(): string;
  setValue(value: Uint8Array | string): void;

  hasEncrypt(): boolean;
  clearEncrypt(): void;
  getEncrypt(): boolean | undefined;
  setEncrypt(value: boolean): void;

  hasAskOnEncrypt(): boolean;
  clearAskOnEncrypt(): void;
  getAskOnEncrypt(): boolean | undefined;
  setAskOnEncrypt(value: boolean): void;

  hasAskOnDecrypt(): boolean;
  clearAskOnDecrypt(): void;
  getAskOnDecrypt(): boolean | undefined;
  setAskOnDecrypt(value: boolean): void;

  hasIv(): boolean;
  clearIv(): void;
  getIv(): Uint8Array | string;
  getIv_asU8(): Uint8Array;
  getIv_asB64(): string;
  setIv(value: Uint8Array | string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CipherKeyValue.AsObject;
  static toObject(includeInstance: boolean, msg: CipherKeyValue): CipherKeyValue.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: CipherKeyValue, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CipherKeyValue;
  static deserializeBinaryFromReader(message: CipherKeyValue, reader: jspb.BinaryReader): CipherKeyValue;
}

export namespace CipherKeyValue {
  export type AsObject = {
    addressNList: Array<number>,
    key?: string,
    value: Uint8Array | string,
    encrypt?: boolean,
    askOnEncrypt?: boolean,
    askOnDecrypt?: boolean,
    iv: Uint8Array | string,
  }
}

export class CipheredKeyValue extends jspb.Message {
  hasValue(): boolean;
  clearValue(): void;
  getValue(): Uint8Array | string;
  getValue_asU8(): Uint8Array;
  getValue_asB64(): string;
  setValue(value: Uint8Array | string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CipheredKeyValue.AsObject;
  static toObject(includeInstance: boolean, msg: CipheredKeyValue): CipheredKeyValue.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: CipheredKeyValue, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CipheredKeyValue;
  static deserializeBinaryFromReader(message: CipheredKeyValue, reader: jspb.BinaryReader): CipheredKeyValue;
}

export namespace CipheredKeyValue {
  export type AsObject = {
    value: Uint8Array | string,
  }
}

export class EstimateTxSize extends jspb.Message {
  hasOutputsCount(): boolean;
  clearOutputsCount(): void;
  getOutputsCount(): number | undefined;
  setOutputsCount(value: number): void;

  hasInputsCount(): boolean;
  clearInputsCount(): void;
  getInputsCount(): number | undefined;
  setInputsCount(value: number): void;

  hasCoinName(): boolean;
  clearCoinName(): void;
  getCoinName(): string | undefined;
  setCoinName(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): EstimateTxSize.AsObject;
  static toObject(includeInstance: boolean, msg: EstimateTxSize): EstimateTxSize.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: EstimateTxSize, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): EstimateTxSize;
  static deserializeBinaryFromReader(message: EstimateTxSize, reader: jspb.BinaryReader): EstimateTxSize;
}

export namespace EstimateTxSize {
  export type AsObject = {
    outputsCount?: number,
    inputsCount?: number,
    coinName?: string,
  }
}

export class TxSize extends jspb.Message {
  hasTxSize(): boolean;
  clearTxSize(): void;
  getTxSize(): number | undefined;
  setTxSize(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): TxSize.AsObject;
  static toObject(includeInstance: boolean, msg: TxSize): TxSize.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: TxSize, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): TxSize;
  static deserializeBinaryFromReader(message: TxSize, reader: jspb.BinaryReader): TxSize;
}

export namespace TxSize {
  export type AsObject = {
    txSize?: number,
  }
}

export class SignTx extends jspb.Message {
  hasOutputsCount(): boolean;
  clearOutputsCount(): void;
  getOutputsCount(): number | undefined;
  setOutputsCount(value: number): void;

  hasInputsCount(): boolean;
  clearInputsCount(): void;
  getInputsCount(): number | undefined;
  setInputsCount(value: number): void;

  hasCoinName(): boolean;
  clearCoinName(): void;
  getCoinName(): string | undefined;
  setCoinName(value: string): void;

  hasVersion(): boolean;
  clearVersion(): void;
  getVersion(): number | undefined;
  setVersion(value: number): void;

  hasLockTime(): boolean;
  clearLockTime(): void;
  getLockTime(): number | undefined;
  setLockTime(value: number): void;

  hasExpiry(): boolean;
  clearExpiry(): void;
  getExpiry(): number | undefined;
  setExpiry(value: number): void;

  hasOverwintered(): boolean;
  clearOverwintered(): void;
  getOverwintered(): boolean | undefined;
  setOverwintered(value: boolean): void;

  hasVersionGroupId(): boolean;
  clearVersionGroupId(): void;
  getVersionGroupId(): number | undefined;
  setVersionGroupId(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SignTx.AsObject;
  static toObject(includeInstance: boolean, msg: SignTx): SignTx.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: SignTx, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SignTx;
  static deserializeBinaryFromReader(message: SignTx, reader: jspb.BinaryReader): SignTx;
}

export namespace SignTx {
  export type AsObject = {
    outputsCount?: number,
    inputsCount?: number,
    coinName?: string,
    version?: number,
    lockTime?: number,
    expiry?: number,
    overwintered?: boolean,
    versionGroupId?: number,
  }
}

export class SimpleSignTx extends jspb.Message {
  clearInputsList(): void;
  getInputsList(): Array<types_pb.TxInputType>;
  setInputsList(value: Array<types_pb.TxInputType>): void;
  addInputs(value?: types_pb.TxInputType, index?: number): types_pb.TxInputType;

  clearOutputsList(): void;
  getOutputsList(): Array<types_pb.TxOutputType>;
  setOutputsList(value: Array<types_pb.TxOutputType>): void;
  addOutputs(value?: types_pb.TxOutputType, index?: number): types_pb.TxOutputType;

  clearTransactionsList(): void;
  getTransactionsList(): Array<types_pb.TransactionType>;
  setTransactionsList(value: Array<types_pb.TransactionType>): void;
  addTransactions(value?: types_pb.TransactionType, index?: number): types_pb.TransactionType;

  hasCoinName(): boolean;
  clearCoinName(): void;
  getCoinName(): string | undefined;
  setCoinName(value: string): void;

  hasVersion(): boolean;
  clearVersion(): void;
  getVersion(): number | undefined;
  setVersion(value: number): void;

  hasLockTime(): boolean;
  clearLockTime(): void;
  getLockTime(): number | undefined;
  setLockTime(value: number): void;

  hasExpiry(): boolean;
  clearExpiry(): void;
  getExpiry(): number | undefined;
  setExpiry(value: number): void;

  hasOverwintered(): boolean;
  clearOverwintered(): void;
  getOverwintered(): boolean | undefined;
  setOverwintered(value: boolean): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SimpleSignTx.AsObject;
  static toObject(includeInstance: boolean, msg: SimpleSignTx): SimpleSignTx.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: SimpleSignTx, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SimpleSignTx;
  static deserializeBinaryFromReader(message: SimpleSignTx, reader: jspb.BinaryReader): SimpleSignTx;
}

export namespace SimpleSignTx {
  export type AsObject = {
    inputsList: Array<types_pb.TxInputType.AsObject>,
    outputsList: Array<types_pb.TxOutputType.AsObject>,
    transactionsList: Array<types_pb.TransactionType.AsObject>,
    coinName?: string,
    version?: number,
    lockTime?: number,
    expiry?: number,
    overwintered?: boolean,
  }
}

export class TxRequest extends jspb.Message {
  hasRequestType(): boolean;
  clearRequestType(): void;
  getRequestType(): types_pb.RequestType | undefined;
  setRequestType(value: types_pb.RequestType): void;

  hasDetails(): boolean;
  clearDetails(): void;
  getDetails(): types_pb.TxRequestDetailsType | undefined;
  setDetails(value?: types_pb.TxRequestDetailsType): void;

  hasSerialized(): boolean;
  clearSerialized(): void;
  getSerialized(): types_pb.TxRequestSerializedType | undefined;
  setSerialized(value?: types_pb.TxRequestSerializedType): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): TxRequest.AsObject;
  static toObject(includeInstance: boolean, msg: TxRequest): TxRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: TxRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): TxRequest;
  static deserializeBinaryFromReader(message: TxRequest, reader: jspb.BinaryReader): TxRequest;
}

export namespace TxRequest {
  export type AsObject = {
    requestType?: types_pb.RequestType,
    details?: types_pb.TxRequestDetailsType.AsObject,
    serialized?: types_pb.TxRequestSerializedType.AsObject,
  }
}

export class TxAck extends jspb.Message {
  hasTx(): boolean;
  clearTx(): void;
  getTx(): types_pb.TransactionType | undefined;
  setTx(value?: types_pb.TransactionType): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): TxAck.AsObject;
  static toObject(includeInstance: boolean, msg: TxAck): TxAck.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: TxAck, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): TxAck;
  static deserializeBinaryFromReader(message: TxAck, reader: jspb.BinaryReader): TxAck;
}

export namespace TxAck {
  export type AsObject = {
    tx?: types_pb.TransactionType.AsObject,
  }
}

export class RawTxAck extends jspb.Message {
  hasTx(): boolean;
  clearTx(): void;
  getTx(): types_pb.RawTransactionType | undefined;
  setTx(value?: types_pb.RawTransactionType): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): RawTxAck.AsObject;
  static toObject(includeInstance: boolean, msg: RawTxAck): RawTxAck.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: RawTxAck, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): RawTxAck;
  static deserializeBinaryFromReader(message: RawTxAck, reader: jspb.BinaryReader): RawTxAck;
}

export namespace RawTxAck {
  export type AsObject = {
    tx?: types_pb.RawTransactionType.AsObject,
  }
}

export class EthereumSignTx extends jspb.Message {
  clearAddressNList(): void;
  getAddressNList(): Array<number>;
  setAddressNList(value: Array<number>): void;
  addAddressN(value: number, index?: number): number;

  hasNonce(): boolean;
  clearNonce(): void;
  getNonce(): Uint8Array | string;
  getNonce_asU8(): Uint8Array;
  getNonce_asB64(): string;
  setNonce(value: Uint8Array | string): void;

  hasGasPrice(): boolean;
  clearGasPrice(): void;
  getGasPrice(): Uint8Array | string;
  getGasPrice_asU8(): Uint8Array;
  getGasPrice_asB64(): string;
  setGasPrice(value: Uint8Array | string): void;

  hasGasLimit(): boolean;
  clearGasLimit(): void;
  getGasLimit(): Uint8Array | string;
  getGasLimit_asU8(): Uint8Array;
  getGasLimit_asB64(): string;
  setGasLimit(value: Uint8Array | string): void;

  hasTo(): boolean;
  clearTo(): void;
  getTo(): Uint8Array | string;
  getTo_asU8(): Uint8Array;
  getTo_asB64(): string;
  setTo(value: Uint8Array | string): void;

  hasValue(): boolean;
  clearValue(): void;
  getValue(): Uint8Array | string;
  getValue_asU8(): Uint8Array;
  getValue_asB64(): string;
  setValue(value: Uint8Array | string): void;

  hasDataInitialChunk(): boolean;
  clearDataInitialChunk(): void;
  getDataInitialChunk(): Uint8Array | string;
  getDataInitialChunk_asU8(): Uint8Array;
  getDataInitialChunk_asB64(): string;
  setDataInitialChunk(value: Uint8Array | string): void;

  hasDataLength(): boolean;
  clearDataLength(): void;
  getDataLength(): number | undefined;
  setDataLength(value: number): void;

  clearToAddressNList(): void;
  getToAddressNList(): Array<number>;
  setToAddressNList(value: Array<number>): void;
  addToAddressN(value: number, index?: number): number;

  hasAddressType(): boolean;
  clearAddressType(): void;
  getAddressType(): types_pb.OutputAddressType | undefined;
  setAddressType(value: types_pb.OutputAddressType): void;

  hasExchangeType(): boolean;
  clearExchangeType(): void;
  getExchangeType(): types_pb.ExchangeType | undefined;
  setExchangeType(value?: types_pb.ExchangeType): void;

  hasChainId(): boolean;
  clearChainId(): void;
  getChainId(): number | undefined;
  setChainId(value: number): void;

  hasTokenValue(): boolean;
  clearTokenValue(): void;
  getTokenValue(): Uint8Array | string;
  getTokenValue_asU8(): Uint8Array;
  getTokenValue_asB64(): string;
  setTokenValue(value: Uint8Array | string): void;

  hasTokenTo(): boolean;
  clearTokenTo(): void;
  getTokenTo(): Uint8Array | string;
  getTokenTo_asU8(): Uint8Array;
  getTokenTo_asB64(): string;
  setTokenTo(value: Uint8Array | string): void;

  hasTokenShortcut(): boolean;
  clearTokenShortcut(): void;
  getTokenShortcut(): string | undefined;
  setTokenShortcut(value: string): void;

  hasTxType(): boolean;
  clearTxType(): void;
  getTxType(): number | undefined;
  setTxType(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): EthereumSignTx.AsObject;
  static toObject(includeInstance: boolean, msg: EthereumSignTx): EthereumSignTx.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: EthereumSignTx, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): EthereumSignTx;
  static deserializeBinaryFromReader(message: EthereumSignTx, reader: jspb.BinaryReader): EthereumSignTx;
}

export namespace EthereumSignTx {
  export type AsObject = {
    addressNList: Array<number>,
    nonce: Uint8Array | string,
    gasPrice: Uint8Array | string,
    gasLimit: Uint8Array | string,
    to: Uint8Array | string,
    value: Uint8Array | string,
    dataInitialChunk: Uint8Array | string,
    dataLength?: number,
    toAddressNList: Array<number>,
    addressType?: types_pb.OutputAddressType,
    exchangeType?: types_pb.ExchangeType.AsObject,
    chainId?: number,
    tokenValue: Uint8Array | string,
    tokenTo: Uint8Array | string,
    tokenShortcut?: string,
    txType?: number,
  }
}

export class EthereumTxRequest extends jspb.Message {
  hasDataLength(): boolean;
  clearDataLength(): void;
  getDataLength(): number | undefined;
  setDataLength(value: number): void;

  hasSignatureV(): boolean;
  clearSignatureV(): void;
  getSignatureV(): number | undefined;
  setSignatureV(value: number): void;

  hasSignatureR(): boolean;
  clearSignatureR(): void;
  getSignatureR(): Uint8Array | string;
  getSignatureR_asU8(): Uint8Array;
  getSignatureR_asB64(): string;
  setSignatureR(value: Uint8Array | string): void;

  hasSignatureS(): boolean;
  clearSignatureS(): void;
  getSignatureS(): Uint8Array | string;
  getSignatureS_asU8(): Uint8Array;
  getSignatureS_asB64(): string;
  setSignatureS(value: Uint8Array | string): void;

  hasHash(): boolean;
  clearHash(): void;
  getHash(): Uint8Array | string;
  getHash_asU8(): Uint8Array;
  getHash_asB64(): string;
  setHash(value: Uint8Array | string): void;

  hasSignatureDer(): boolean;
  clearSignatureDer(): void;
  getSignatureDer(): Uint8Array | string;
  getSignatureDer_asU8(): Uint8Array;
  getSignatureDer_asB64(): string;
  setSignatureDer(value: Uint8Array | string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): EthereumTxRequest.AsObject;
  static toObject(includeInstance: boolean, msg: EthereumTxRequest): EthereumTxRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: EthereumTxRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): EthereumTxRequest;
  static deserializeBinaryFromReader(message: EthereumTxRequest, reader: jspb.BinaryReader): EthereumTxRequest;
}

export namespace EthereumTxRequest {
  export type AsObject = {
    dataLength?: number,
    signatureV?: number,
    signatureR: Uint8Array | string,
    signatureS: Uint8Array | string,
    hash: Uint8Array | string,
    signatureDer: Uint8Array | string,
  }
}

export class EthereumTxAck extends jspb.Message {
  hasDataChunk(): boolean;
  clearDataChunk(): void;
  getDataChunk(): Uint8Array | string;
  getDataChunk_asU8(): Uint8Array;
  getDataChunk_asB64(): string;
  setDataChunk(value: Uint8Array | string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): EthereumTxAck.AsObject;
  static toObject(includeInstance: boolean, msg: EthereumTxAck): EthereumTxAck.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: EthereumTxAck, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): EthereumTxAck;
  static deserializeBinaryFromReader(message: EthereumTxAck, reader: jspb.BinaryReader): EthereumTxAck;
}

export namespace EthereumTxAck {
  export type AsObject = {
    dataChunk: Uint8Array | string,
  }
}

export class EthereumSignMessage extends jspb.Message {
  clearAddressNList(): void;
  getAddressNList(): Array<number>;
  setAddressNList(value: Array<number>): void;
  addAddressN(value: number, index?: number): number;

  hasMessage(): boolean;
  clearMessage(): void;
  getMessage(): Uint8Array | string;
  getMessage_asU8(): Uint8Array;
  getMessage_asB64(): string;
  setMessage(value: Uint8Array | string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): EthereumSignMessage.AsObject;
  static toObject(includeInstance: boolean, msg: EthereumSignMessage): EthereumSignMessage.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: EthereumSignMessage, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): EthereumSignMessage;
  static deserializeBinaryFromReader(message: EthereumSignMessage, reader: jspb.BinaryReader): EthereumSignMessage;
}

export namespace EthereumSignMessage {
  export type AsObject = {
    addressNList: Array<number>,
    message: Uint8Array | string,
  }
}

export class EthereumVerifyMessage extends jspb.Message {
  hasAddress(): boolean;
  clearAddress(): void;
  getAddress(): Uint8Array | string;
  getAddress_asU8(): Uint8Array;
  getAddress_asB64(): string;
  setAddress(value: Uint8Array | string): void;

  hasSignature(): boolean;
  clearSignature(): void;
  getSignature(): Uint8Array | string;
  getSignature_asU8(): Uint8Array;
  getSignature_asB64(): string;
  setSignature(value: Uint8Array | string): void;

  hasMessage(): boolean;
  clearMessage(): void;
  getMessage(): Uint8Array | string;
  getMessage_asU8(): Uint8Array;
  getMessage_asB64(): string;
  setMessage(value: Uint8Array | string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): EthereumVerifyMessage.AsObject;
  static toObject(includeInstance: boolean, msg: EthereumVerifyMessage): EthereumVerifyMessage.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: EthereumVerifyMessage, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): EthereumVerifyMessage;
  static deserializeBinaryFromReader(message: EthereumVerifyMessage, reader: jspb.BinaryReader): EthereumVerifyMessage;
}

export namespace EthereumVerifyMessage {
  export type AsObject = {
    address: Uint8Array | string,
    signature: Uint8Array | string,
    message: Uint8Array | string,
  }
}

export class EthereumMessageSignature extends jspb.Message {
  hasAddress(): boolean;
  clearAddress(): void;
  getAddress(): Uint8Array | string;
  getAddress_asU8(): Uint8Array;
  getAddress_asB64(): string;
  setAddress(value: Uint8Array | string): void;

  hasSignature(): boolean;
  clearSignature(): void;
  getSignature(): Uint8Array | string;
  getSignature_asU8(): Uint8Array;
  getSignature_asB64(): string;
  setSignature(value: Uint8Array | string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): EthereumMessageSignature.AsObject;
  static toObject(includeInstance: boolean, msg: EthereumMessageSignature): EthereumMessageSignature.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: EthereumMessageSignature, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): EthereumMessageSignature;
  static deserializeBinaryFromReader(message: EthereumMessageSignature, reader: jspb.BinaryReader): EthereumMessageSignature;
}

export namespace EthereumMessageSignature {
  export type AsObject = {
    address: Uint8Array | string,
    signature: Uint8Array | string,
  }
}

export class SignIdentity extends jspb.Message {
  hasIdentity(): boolean;
  clearIdentity(): void;
  getIdentity(): types_pb.IdentityType | undefined;
  setIdentity(value?: types_pb.IdentityType): void;

  hasChallengeHidden(): boolean;
  clearChallengeHidden(): void;
  getChallengeHidden(): Uint8Array | string;
  getChallengeHidden_asU8(): Uint8Array;
  getChallengeHidden_asB64(): string;
  setChallengeHidden(value: Uint8Array | string): void;

  hasChallengeVisual(): boolean;
  clearChallengeVisual(): void;
  getChallengeVisual(): string | undefined;
  setChallengeVisual(value: string): void;

  hasEcdsaCurveName(): boolean;
  clearEcdsaCurveName(): void;
  getEcdsaCurveName(): string | undefined;
  setEcdsaCurveName(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SignIdentity.AsObject;
  static toObject(includeInstance: boolean, msg: SignIdentity): SignIdentity.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: SignIdentity, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SignIdentity;
  static deserializeBinaryFromReader(message: SignIdentity, reader: jspb.BinaryReader): SignIdentity;
}

export namespace SignIdentity {
  export type AsObject = {
    identity?: types_pb.IdentityType.AsObject,
    challengeHidden: Uint8Array | string,
    challengeVisual?: string,
    ecdsaCurveName?: string,
  }
}

export class SignedIdentity extends jspb.Message {
  hasAddress(): boolean;
  clearAddress(): void;
  getAddress(): string | undefined;
  setAddress(value: string): void;

  hasPublicKey(): boolean;
  clearPublicKey(): void;
  getPublicKey(): Uint8Array | string;
  getPublicKey_asU8(): Uint8Array;
  getPublicKey_asB64(): string;
  setPublicKey(value: Uint8Array | string): void;

  hasSignature(): boolean;
  clearSignature(): void;
  getSignature(): Uint8Array | string;
  getSignature_asU8(): Uint8Array;
  getSignature_asB64(): string;
  setSignature(value: Uint8Array | string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SignedIdentity.AsObject;
  static toObject(includeInstance: boolean, msg: SignedIdentity): SignedIdentity.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: SignedIdentity, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SignedIdentity;
  static deserializeBinaryFromReader(message: SignedIdentity, reader: jspb.BinaryReader): SignedIdentity;
}

export namespace SignedIdentity {
  export type AsObject = {
    address?: string,
    publicKey: Uint8Array | string,
    signature: Uint8Array | string,
  }
}

export class ApplyPolicies extends jspb.Message {
  clearPolicyList(): void;
  getPolicyList(): Array<types_pb.PolicyType>;
  setPolicyList(value: Array<types_pb.PolicyType>): void;
  addPolicy(value?: types_pb.PolicyType, index?: number): types_pb.PolicyType;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ApplyPolicies.AsObject;
  static toObject(includeInstance: boolean, msg: ApplyPolicies): ApplyPolicies.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ApplyPolicies, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ApplyPolicies;
  static deserializeBinaryFromReader(message: ApplyPolicies, reader: jspb.BinaryReader): ApplyPolicies;
}

export namespace ApplyPolicies {
  export type AsObject = {
    policyList: Array<types_pb.PolicyType.AsObject>,
  }
}

export class FlashHash extends jspb.Message {
  hasAddress(): boolean;
  clearAddress(): void;
  getAddress(): number | undefined;
  setAddress(value: number): void;

  hasLength(): boolean;
  clearLength(): void;
  getLength(): number | undefined;
  setLength(value: number): void;

  hasChallenge(): boolean;
  clearChallenge(): void;
  getChallenge(): Uint8Array | string;
  getChallenge_asU8(): Uint8Array;
  getChallenge_asB64(): string;
  setChallenge(value: Uint8Array | string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): FlashHash.AsObject;
  static toObject(includeInstance: boolean, msg: FlashHash): FlashHash.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: FlashHash, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): FlashHash;
  static deserializeBinaryFromReader(message: FlashHash, reader: jspb.BinaryReader): FlashHash;
}

export namespace FlashHash {
  export type AsObject = {
    address?: number,
    length?: number,
    challenge: Uint8Array | string,
  }
}

export class FlashWrite extends jspb.Message {
  hasAddress(): boolean;
  clearAddress(): void;
  getAddress(): number | undefined;
  setAddress(value: number): void;

  hasData(): boolean;
  clearData(): void;
  getData(): Uint8Array | string;
  getData_asU8(): Uint8Array;
  getData_asB64(): string;
  setData(value: Uint8Array | string): void;

  hasErase(): boolean;
  clearErase(): void;
  getErase(): boolean | undefined;
  setErase(value: boolean): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): FlashWrite.AsObject;
  static toObject(includeInstance: boolean, msg: FlashWrite): FlashWrite.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: FlashWrite, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): FlashWrite;
  static deserializeBinaryFromReader(message: FlashWrite, reader: jspb.BinaryReader): FlashWrite;
}

export namespace FlashWrite {
  export type AsObject = {
    address?: number,
    data: Uint8Array | string,
    erase?: boolean,
  }
}

export class FlashHashResponse extends jspb.Message {
  hasData(): boolean;
  clearData(): void;
  getData(): Uint8Array | string;
  getData_asU8(): Uint8Array;
  getData_asB64(): string;
  setData(value: Uint8Array | string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): FlashHashResponse.AsObject;
  static toObject(includeInstance: boolean, msg: FlashHashResponse): FlashHashResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: FlashHashResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): FlashHashResponse;
  static deserializeBinaryFromReader(message: FlashHashResponse, reader: jspb.BinaryReader): FlashHashResponse;
}

export namespace FlashHashResponse {
  export type AsObject = {
    data: Uint8Array | string,
  }
}

export class DebugLinkFlashDump extends jspb.Message {
  hasAddress(): boolean;
  clearAddress(): void;
  getAddress(): number | undefined;
  setAddress(value: number): void;

  hasLength(): boolean;
  clearLength(): void;
  getLength(): number | undefined;
  setLength(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): DebugLinkFlashDump.AsObject;
  static toObject(includeInstance: boolean, msg: DebugLinkFlashDump): DebugLinkFlashDump.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: DebugLinkFlashDump, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): DebugLinkFlashDump;
  static deserializeBinaryFromReader(message: DebugLinkFlashDump, reader: jspb.BinaryReader): DebugLinkFlashDump;
}

export namespace DebugLinkFlashDump {
  export type AsObject = {
    address?: number,
    length?: number,
  }
}

export class DebugLinkFlashDumpResponse extends jspb.Message {
  hasData(): boolean;
  clearData(): void;
  getData(): Uint8Array | string;
  getData_asU8(): Uint8Array;
  getData_asB64(): string;
  setData(value: Uint8Array | string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): DebugLinkFlashDumpResponse.AsObject;
  static toObject(includeInstance: boolean, msg: DebugLinkFlashDumpResponse): DebugLinkFlashDumpResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: DebugLinkFlashDumpResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): DebugLinkFlashDumpResponse;
  static deserializeBinaryFromReader(message: DebugLinkFlashDumpResponse, reader: jspb.BinaryReader): DebugLinkFlashDumpResponse;
}

export namespace DebugLinkFlashDumpResponse {
  export type AsObject = {
    data: Uint8Array | string,
  }
}

export class SoftReset extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SoftReset.AsObject;
  static toObject(includeInstance: boolean, msg: SoftReset): SoftReset.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: SoftReset, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SoftReset;
  static deserializeBinaryFromReader(message: SoftReset, reader: jspb.BinaryReader): SoftReset;
}

export namespace SoftReset {
  export type AsObject = {
  }
}

export class FirmwareErase extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): FirmwareErase.AsObject;
  static toObject(includeInstance: boolean, msg: FirmwareErase): FirmwareErase.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: FirmwareErase, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): FirmwareErase;
  static deserializeBinaryFromReader(message: FirmwareErase, reader: jspb.BinaryReader): FirmwareErase;
}

export namespace FirmwareErase {
  export type AsObject = {
  }
}

export class FirmwareUpload extends jspb.Message {
  hasPayloadHash(): boolean;
  clearPayloadHash(): void;
  getPayloadHash(): Uint8Array | string;
  getPayloadHash_asU8(): Uint8Array;
  getPayloadHash_asB64(): string;
  setPayloadHash(value: Uint8Array | string): void;

  hasPayload(): boolean;
  clearPayload(): void;
  getPayload(): Uint8Array | string;
  getPayload_asU8(): Uint8Array;
  getPayload_asB64(): string;
  setPayload(value: Uint8Array | string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): FirmwareUpload.AsObject;
  static toObject(includeInstance: boolean, msg: FirmwareUpload): FirmwareUpload.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: FirmwareUpload, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): FirmwareUpload;
  static deserializeBinaryFromReader(message: FirmwareUpload, reader: jspb.BinaryReader): FirmwareUpload;
}

export namespace FirmwareUpload {
  export type AsObject = {
    payloadHash: Uint8Array | string,
    payload: Uint8Array | string,
  }
}

export class DebugLinkDecision extends jspb.Message {
  hasYesNo(): boolean;
  clearYesNo(): void;
  getYesNo(): boolean | undefined;
  setYesNo(value: boolean): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): DebugLinkDecision.AsObject;
  static toObject(includeInstance: boolean, msg: DebugLinkDecision): DebugLinkDecision.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: DebugLinkDecision, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): DebugLinkDecision;
  static deserializeBinaryFromReader(message: DebugLinkDecision, reader: jspb.BinaryReader): DebugLinkDecision;
}

export namespace DebugLinkDecision {
  export type AsObject = {
    yesNo?: boolean,
  }
}

export class DebugLinkGetState extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): DebugLinkGetState.AsObject;
  static toObject(includeInstance: boolean, msg: DebugLinkGetState): DebugLinkGetState.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: DebugLinkGetState, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): DebugLinkGetState;
  static deserializeBinaryFromReader(message: DebugLinkGetState, reader: jspb.BinaryReader): DebugLinkGetState;
}

export namespace DebugLinkGetState {
  export type AsObject = {
  }
}

export class DebugLinkState extends jspb.Message {
  hasLayout(): boolean;
  clearLayout(): void;
  getLayout(): Uint8Array | string;
  getLayout_asU8(): Uint8Array;
  getLayout_asB64(): string;
  setLayout(value: Uint8Array | string): void;

  hasPin(): boolean;
  clearPin(): void;
  getPin(): string | undefined;
  setPin(value: string): void;

  hasMatrix(): boolean;
  clearMatrix(): void;
  getMatrix(): string | undefined;
  setMatrix(value: string): void;

  hasMnemonic(): boolean;
  clearMnemonic(): void;
  getMnemonic(): string | undefined;
  setMnemonic(value: string): void;

  hasNode(): boolean;
  clearNode(): void;
  getNode(): types_pb.HDNodeType | undefined;
  setNode(value?: types_pb.HDNodeType): void;

  hasPassphraseProtection(): boolean;
  clearPassphraseProtection(): void;
  getPassphraseProtection(): boolean | undefined;
  setPassphraseProtection(value: boolean): void;

  hasResetWord(): boolean;
  clearResetWord(): void;
  getResetWord(): string | undefined;
  setResetWord(value: string): void;

  hasResetEntropy(): boolean;
  clearResetEntropy(): void;
  getResetEntropy(): Uint8Array | string;
  getResetEntropy_asU8(): Uint8Array;
  getResetEntropy_asB64(): string;
  setResetEntropy(value: Uint8Array | string): void;

  hasRecoveryFakeWord(): boolean;
  clearRecoveryFakeWord(): void;
  getRecoveryFakeWord(): string | undefined;
  setRecoveryFakeWord(value: string): void;

  hasRecoveryWordPos(): boolean;
  clearRecoveryWordPos(): void;
  getRecoveryWordPos(): number | undefined;
  setRecoveryWordPos(value: number): void;

  hasRecoveryCipher(): boolean;
  clearRecoveryCipher(): void;
  getRecoveryCipher(): string | undefined;
  setRecoveryCipher(value: string): void;

  hasRecoveryAutoCompletedWord(): boolean;
  clearRecoveryAutoCompletedWord(): void;
  getRecoveryAutoCompletedWord(): string | undefined;
  setRecoveryAutoCompletedWord(value: string): void;

  hasFirmwareHash(): boolean;
  clearFirmwareHash(): void;
  getFirmwareHash(): Uint8Array | string;
  getFirmwareHash_asU8(): Uint8Array;
  getFirmwareHash_asB64(): string;
  setFirmwareHash(value: Uint8Array | string): void;

  hasStorageHash(): boolean;
  clearStorageHash(): void;
  getStorageHash(): Uint8Array | string;
  getStorageHash_asU8(): Uint8Array;
  getStorageHash_asB64(): string;
  setStorageHash(value: Uint8Array | string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): DebugLinkState.AsObject;
  static toObject(includeInstance: boolean, msg: DebugLinkState): DebugLinkState.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: DebugLinkState, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): DebugLinkState;
  static deserializeBinaryFromReader(message: DebugLinkState, reader: jspb.BinaryReader): DebugLinkState;
}

export namespace DebugLinkState {
  export type AsObject = {
    layout: Uint8Array | string,
    pin?: string,
    matrix?: string,
    mnemonic?: string,
    node?: types_pb.HDNodeType.AsObject,
    passphraseProtection?: boolean,
    resetWord?: string,
    resetEntropy: Uint8Array | string,
    recoveryFakeWord?: string,
    recoveryWordPos?: number,
    recoveryCipher?: string,
    recoveryAutoCompletedWord?: string,
    firmwareHash: Uint8Array | string,
    storageHash: Uint8Array | string,
  }
}

export class DebugLinkStop extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): DebugLinkStop.AsObject;
  static toObject(includeInstance: boolean, msg: DebugLinkStop): DebugLinkStop.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: DebugLinkStop, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): DebugLinkStop;
  static deserializeBinaryFromReader(message: DebugLinkStop, reader: jspb.BinaryReader): DebugLinkStop;
}

export namespace DebugLinkStop {
  export type AsObject = {
  }
}

export class DebugLinkLog extends jspb.Message {
  hasLevel(): boolean;
  clearLevel(): void;
  getLevel(): number | undefined;
  setLevel(value: number): void;

  hasBucket(): boolean;
  clearBucket(): void;
  getBucket(): string | undefined;
  setBucket(value: string): void;

  hasText(): boolean;
  clearText(): void;
  getText(): string | undefined;
  setText(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): DebugLinkLog.AsObject;
  static toObject(includeInstance: boolean, msg: DebugLinkLog): DebugLinkLog.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: DebugLinkLog, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): DebugLinkLog;
  static deserializeBinaryFromReader(message: DebugLinkLog, reader: jspb.BinaryReader): DebugLinkLog;
}

export namespace DebugLinkLog {
  export type AsObject = {
    level?: number,
    bucket?: string,
    text?: string,
  }
}

export class DebugLinkFillConfig extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): DebugLinkFillConfig.AsObject;
  static toObject(includeInstance: boolean, msg: DebugLinkFillConfig): DebugLinkFillConfig.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: DebugLinkFillConfig, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): DebugLinkFillConfig;
  static deserializeBinaryFromReader(message: DebugLinkFillConfig, reader: jspb.BinaryReader): DebugLinkFillConfig;
}

export namespace DebugLinkFillConfig {
  export type AsObject = {
  }
}

export enum MessageType {
  MESSAGETYPE_INITIALIZE = 0,
  MESSAGETYPE_PING = 1,
  MESSAGETYPE_SUCCESS = 2,
  MESSAGETYPE_FAILURE = 3,
  MESSAGETYPE_CHANGEPIN = 4,
  MESSAGETYPE_WIPEDEVICE = 5,
  MESSAGETYPE_FIRMWAREERASE = 6,
  MESSAGETYPE_FIRMWAREUPLOAD = 7,
  MESSAGETYPE_GETENTROPY = 9,
  MESSAGETYPE_ENTROPY = 10,
  MESSAGETYPE_GETPUBLICKEY = 11,
  MESSAGETYPE_PUBLICKEY = 12,
  MESSAGETYPE_LOADDEVICE = 13,
  MESSAGETYPE_RESETDEVICE = 14,
  MESSAGETYPE_SIGNTX = 15,
  MESSAGETYPE_SIMPLESIGNTX = 16,
  MESSAGETYPE_FEATURES = 17,
  MESSAGETYPE_PINMATRIXREQUEST = 18,
  MESSAGETYPE_PINMATRIXACK = 19,
  MESSAGETYPE_CANCEL = 20,
  MESSAGETYPE_TXREQUEST = 21,
  MESSAGETYPE_TXACK = 22,
  MESSAGETYPE_CIPHERKEYVALUE = 23,
  MESSAGETYPE_CLEARSESSION = 24,
  MESSAGETYPE_APPLYSETTINGS = 25,
  MESSAGETYPE_BUTTONREQUEST = 26,
  MESSAGETYPE_BUTTONACK = 27,
  MESSAGETYPE_GETADDRESS = 29,
  MESSAGETYPE_ADDRESS = 30,
  MESSAGETYPE_ENTROPYREQUEST = 35,
  MESSAGETYPE_ENTROPYACK = 36,
  MESSAGETYPE_SIGNMESSAGE = 38,
  MESSAGETYPE_VERIFYMESSAGE = 39,
  MESSAGETYPE_MESSAGESIGNATURE = 40,
  MESSAGETYPE_PASSPHRASEREQUEST = 41,
  MESSAGETYPE_PASSPHRASEACK = 42,
  MESSAGETYPE_ESTIMATETXSIZE = 43,
  MESSAGETYPE_TXSIZE = 44,
  MESSAGETYPE_RECOVERYDEVICE = 45,
  MESSAGETYPE_WORDREQUEST = 46,
  MESSAGETYPE_WORDACK = 47,
  MESSAGETYPE_CIPHEREDKEYVALUE = 48,
  MESSAGETYPE_ENCRYPTMESSAGE = 49,
  MESSAGETYPE_ENCRYPTEDMESSAGE = 50,
  MESSAGETYPE_DECRYPTMESSAGE = 51,
  MESSAGETYPE_DECRYPTEDMESSAGE = 52,
  MESSAGETYPE_SIGNIDENTITY = 53,
  MESSAGETYPE_SIGNEDIDENTITY = 54,
  MESSAGETYPE_GETFEATURES = 55,
  MESSAGETYPE_ETHEREUMGETADDRESS = 56,
  MESSAGETYPE_ETHEREUMADDRESS = 57,
  MESSAGETYPE_ETHEREUMSIGNTX = 58,
  MESSAGETYPE_ETHEREUMTXREQUEST = 59,
  MESSAGETYPE_ETHEREUMTXACK = 60,
  MESSAGETYPE_CHARACTERREQUEST = 80,
  MESSAGETYPE_CHARACTERACK = 81,
  MESSAGETYPE_RAWTXACK = 82,
  MESSAGETYPE_APPLYPOLICIES = 83,
  MESSAGETYPE_FLASHHASH = 84,
  MESSAGETYPE_FLASHWRITE = 85,
  MESSAGETYPE_FLASHHASHRESPONSE = 86,
  MESSAGETYPE_DEBUGLINKFLASHDUMP = 87,
  MESSAGETYPE_DEBUGLINKFLASHDUMPRESPONSE = 88,
  MESSAGETYPE_SOFTRESET = 89,
  MESSAGETYPE_DEBUGLINKDECISION = 100,
  MESSAGETYPE_DEBUGLINKGETSTATE = 101,
  MESSAGETYPE_DEBUGLINKSTATE = 102,
  MESSAGETYPE_DEBUGLINKSTOP = 103,
  MESSAGETYPE_DEBUGLINKLOG = 104,
  MESSAGETYPE_DEBUGLINKFILLCONFIG = 105,
  MESSAGETYPE_GETCOINTABLE = 106,
  MESSAGETYPE_COINTABLE = 107,
  MESSAGETYPE_ETHEREUMSIGNMESSAGE = 108,
  MESSAGETYPE_ETHEREUMVERIFYMESSAGE = 109,
  MESSAGETYPE_ETHEREUMMESSAGESIGNATURE = 110,
}

