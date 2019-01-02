// package: 
// file: exchange.proto

import * as jspb from "google-protobuf";

export class ExchangeAddress extends jspb.Message {
  hasCoinType(): boolean;
  clearCoinType(): void;
  getCoinType(): string | undefined;
  setCoinType(value: string): void;

  hasAddress(): boolean;
  clearAddress(): void;
  getAddress(): string | undefined;
  setAddress(value: string): void;

  hasDestTag(): boolean;
  clearDestTag(): void;
  getDestTag(): string | undefined;
  setDestTag(value: string): void;

  hasRsAddress(): boolean;
  clearRsAddress(): void;
  getRsAddress(): string | undefined;
  setRsAddress(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ExchangeAddress.AsObject;
  static toObject(includeInstance: boolean, msg: ExchangeAddress): ExchangeAddress.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ExchangeAddress, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ExchangeAddress;
  static deserializeBinaryFromReader(message: ExchangeAddress, reader: jspb.BinaryReader): ExchangeAddress;
}

export namespace ExchangeAddress {
  export type AsObject = {
    coinType?: string,
    address?: string,
    destTag?: string,
    rsAddress?: string,
  }
}

export class ExchangeResponseV2 extends jspb.Message {
  hasDepositAddress(): boolean;
  clearDepositAddress(): void;
  getDepositAddress(): ExchangeAddress | undefined;
  setDepositAddress(value?: ExchangeAddress): void;

  hasDepositAmount(): boolean;
  clearDepositAmount(): void;
  getDepositAmount(): Uint8Array | string;
  getDepositAmount_asU8(): Uint8Array;
  getDepositAmount_asB64(): string;
  setDepositAmount(value: Uint8Array | string): void;

  hasExpiration(): boolean;
  clearExpiration(): void;
  getExpiration(): number | undefined;
  setExpiration(value: number): void;

  hasQuotedRate(): boolean;
  clearQuotedRate(): void;
  getQuotedRate(): Uint8Array | string;
  getQuotedRate_asU8(): Uint8Array;
  getQuotedRate_asB64(): string;
  setQuotedRate(value: Uint8Array | string): void;

  hasWithdrawalAddress(): boolean;
  clearWithdrawalAddress(): void;
  getWithdrawalAddress(): ExchangeAddress | undefined;
  setWithdrawalAddress(value?: ExchangeAddress): void;

  hasWithdrawalAmount(): boolean;
  clearWithdrawalAmount(): void;
  getWithdrawalAmount(): Uint8Array | string;
  getWithdrawalAmount_asU8(): Uint8Array;
  getWithdrawalAmount_asB64(): string;
  setWithdrawalAmount(value: Uint8Array | string): void;

  hasReturnAddress(): boolean;
  clearReturnAddress(): void;
  getReturnAddress(): ExchangeAddress | undefined;
  setReturnAddress(value?: ExchangeAddress): void;

  hasApiKey(): boolean;
  clearApiKey(): void;
  getApiKey(): Uint8Array | string;
  getApiKey_asU8(): Uint8Array;
  getApiKey_asB64(): string;
  setApiKey(value: Uint8Array | string): void;

  hasMinerFee(): boolean;
  clearMinerFee(): void;
  getMinerFee(): Uint8Array | string;
  getMinerFee_asU8(): Uint8Array;
  getMinerFee_asB64(): string;
  setMinerFee(value: Uint8Array | string): void;

  hasOrderId(): boolean;
  clearOrderId(): void;
  getOrderId(): Uint8Array | string;
  getOrderId_asU8(): Uint8Array;
  getOrderId_asB64(): string;
  setOrderId(value: Uint8Array | string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ExchangeResponseV2.AsObject;
  static toObject(includeInstance: boolean, msg: ExchangeResponseV2): ExchangeResponseV2.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ExchangeResponseV2, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ExchangeResponseV2;
  static deserializeBinaryFromReader(message: ExchangeResponseV2, reader: jspb.BinaryReader): ExchangeResponseV2;
}

export namespace ExchangeResponseV2 {
  export type AsObject = {
    depositAddress?: ExchangeAddress.AsObject,
    depositAmount: Uint8Array | string,
    expiration?: number,
    quotedRate: Uint8Array | string,
    withdrawalAddress?: ExchangeAddress.AsObject,
    withdrawalAmount: Uint8Array | string,
    returnAddress?: ExchangeAddress.AsObject,
    apiKey: Uint8Array | string,
    minerFee: Uint8Array | string,
    orderId: Uint8Array | string,
  }
}

export class SignedExchangeResponse extends jspb.Message {
  hasResponse(): boolean;
  clearResponse(): void;
  getResponse(): ExchangeResponse | undefined;
  setResponse(value?: ExchangeResponse): void;

  hasSignature(): boolean;
  clearSignature(): void;
  getSignature(): Uint8Array | string;
  getSignature_asU8(): Uint8Array;
  getSignature_asB64(): string;
  setSignature(value: Uint8Array | string): void;

  hasResponsev2(): boolean;
  clearResponsev2(): void;
  getResponsev2(): ExchangeResponseV2 | undefined;
  setResponsev2(value?: ExchangeResponseV2): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SignedExchangeResponse.AsObject;
  static toObject(includeInstance: boolean, msg: SignedExchangeResponse): SignedExchangeResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: SignedExchangeResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SignedExchangeResponse;
  static deserializeBinaryFromReader(message: SignedExchangeResponse, reader: jspb.BinaryReader): SignedExchangeResponse;
}

export namespace SignedExchangeResponse {
  export type AsObject = {
    response?: ExchangeResponse.AsObject,
    signature: Uint8Array | string,
    responsev2?: ExchangeResponseV2.AsObject,
  }
}

export class ExchangeResponse extends jspb.Message {
  hasDepositAddress(): boolean;
  clearDepositAddress(): void;
  getDepositAddress(): ExchangeAddress | undefined;
  setDepositAddress(value?: ExchangeAddress): void;

  hasDepositAmount(): boolean;
  clearDepositAmount(): void;
  getDepositAmount(): number | undefined;
  setDepositAmount(value: number): void;

  hasExpiration(): boolean;
  clearExpiration(): void;
  getExpiration(): number | undefined;
  setExpiration(value: number): void;

  hasQuotedRate(): boolean;
  clearQuotedRate(): void;
  getQuotedRate(): number | undefined;
  setQuotedRate(value: number): void;

  hasWithdrawalAddress(): boolean;
  clearWithdrawalAddress(): void;
  getWithdrawalAddress(): ExchangeAddress | undefined;
  setWithdrawalAddress(value?: ExchangeAddress): void;

  hasWithdrawalAmount(): boolean;
  clearWithdrawalAmount(): void;
  getWithdrawalAmount(): number | undefined;
  setWithdrawalAmount(value: number): void;

  hasReturnAddress(): boolean;
  clearReturnAddress(): void;
  getReturnAddress(): ExchangeAddress | undefined;
  setReturnAddress(value?: ExchangeAddress): void;

  hasApiKey(): boolean;
  clearApiKey(): void;
  getApiKey(): Uint8Array | string;
  getApiKey_asU8(): Uint8Array;
  getApiKey_asB64(): string;
  setApiKey(value: Uint8Array | string): void;

  hasMinerFee(): boolean;
  clearMinerFee(): void;
  getMinerFee(): number | undefined;
  setMinerFee(value: number): void;

  hasOrderId(): boolean;
  clearOrderId(): void;
  getOrderId(): Uint8Array | string;
  getOrderId_asU8(): Uint8Array;
  getOrderId_asB64(): string;
  setOrderId(value: Uint8Array | string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ExchangeResponse.AsObject;
  static toObject(includeInstance: boolean, msg: ExchangeResponse): ExchangeResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ExchangeResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ExchangeResponse;
  static deserializeBinaryFromReader(message: ExchangeResponse, reader: jspb.BinaryReader): ExchangeResponse;
}

export namespace ExchangeResponse {
  export type AsObject = {
    depositAddress?: ExchangeAddress.AsObject,
    depositAmount?: number,
    expiration?: number,
    quotedRate?: number,
    withdrawalAddress?: ExchangeAddress.AsObject,
    withdrawalAmount?: number,
    returnAddress?: ExchangeAddress.AsObject,
    apiKey: Uint8Array | string,
    minerFee?: number,
    orderId: Uint8Array | string,
  }
}

