import jspb from 'google-protobuf'
import eventemitter2 from 'eventemitter2'
import Messages from './kkProto/messages_pb'
import { fromEvent } from 'rxjs'
import { take } from 'rxjs/operators'
import ByteBuffer from 'bytebuffer'
import { leByteArrayToLong } from './utils'
import messageTypeRegistry from './messageTypeRegistry'
import { makeEvent } from './event'

export default abstract class Device {
  public abstract events: eventemitter2.EventEmitter2

  public abstract get isInitialized (): boolean
  public abstract initialize (): Promise<void>
  public abstract disconnect (): Promise<void>

  public abstract getEntropy (length: number): Uint8Array

  protected abstract interface: Interface

  // exchange sends a request to the device and streams back the results
  // the MessageType enum numer will be returned in addition to the google-protobuf message
  // based on trezorExchange()
  // in https://github.com/go-ethereum/accounts/usbwallet/trezor.go
  // and https://github.com/solipsis/go-keepkey/blob/master/pkg/keepkey/transport.go#L277
  public async exchange (msgTypeEnum: number, msg: jspb.Message): Promise<[number, jspb.Message]> {
    const msgBuffer = this.toMessageBuffer(msgTypeEnum, msg)
    const responseBuffer = await this.sendRaw(msgBuffer)
    this.events.emit(String(msgTypeEnum), makeEvent({
      message_enum: msgTypeEnum,
      message: msg.toObject(),
      from_device: false,
      interface: this.interface
    }))
    const [responseTypeEnum, responseMsg] = this.fromMessageBuffer(responseBuffer)
    this.events.emit(String(responseTypeEnum), makeEvent({
      message_enum: responseTypeEnum,
      message: responseMsg.toObject(),
      from_device: true,
      interface: this.interface
    }))

    // If error, throw with response message
    if (responseTypeEnum === Messages.MessageType.MESSAGETYPE_FAILURE) {
      const errorResponse = responseMsg as Messages.Failure
      throw new Error(errorResponse.getMessage())
    }
    if (responseTypeEnum === Messages.MessageType.MESSAGETYPE_BUTTONREQUEST) {
      return this.exchange(
        Messages.MessageType.MESSAGETYPE_BUTTONACK,
        new Messages.ButtonAck()
      )
    }
    if (responseTypeEnum === Messages.MessageType.MESSAGETYPE_ENTROPYREQUEST) {
      const ack = new Messages.EntropyAck()
      ack.setEntropy(this.getEntropy(32))
      return this.exchange(Messages.MessageType.MESSAGETYPE_ENTROPYACK, ack)
    }
    if (responseTypeEnum === Messages.MessageType.MESSAGETYPE_PINMATRIXREQUEST) {
      const interruptedResponse = await fromEvent(
        this.events,
        'PINMATRIXACK_INTERRUPT_RESULT'
      ).pipe(take(1)).toPromise()
      return interruptedResponse as [number, jspb.Message]
    }
    if (responseTypeEnum === Messages.MessageType.MESSAGETYPE_PASSPHRASEREQUEST) {
      const interruptedResponse = await fromEvent(
        this.events,
        'PASSPHRASEACK_INTERRUPT_RESULT'
      ).pipe(take(1)).toPromise()
      return interruptedResponse as [number, jspb.Message]
    }
    if (responseTypeEnum === Messages.MessageType.MESSAGETYPE_CHARACTERREQUEST) {
      const interruptedResponse = await fromEvent(
        this.events,
        'CHARACTERACK_INTERRUPT_RESULT'
      ).pipe(take(1)).toPromise()
      return interruptedResponse as [number, jspb.Message]
    }
    return [responseTypeEnum, responseMsg]
  }

  public abstract sendRaw (buffer: ByteBuffer): Promise<ByteBuffer>

  protected toMessageBuffer (msgTypeEnum: number, msg: jspb.Message): ByteBuffer {
    const messageBuffer = msg.serializeBinary()

    const headerBuffer = new ArrayBuffer(8)
    const headerView = new DataView(headerBuffer)

    headerView.setUint8(0, 0x23)
    headerView.setUint8(1, 0x23)
    headerView.setUint16(2, msgTypeEnum)
    headerView.setUint32(4, messageBuffer.byteLength)

    return ByteBuffer.concat([headerView.buffer, messageBuffer])
  }

  protected fromMessageBuffer (buff: ByteBuffer): [number, jspb.Message] {
    const dataView: any = buff.view
    // this slice shit is dumb; do this differently
    const slice = dataView ?
      dataView.slice(3, 5) :
      Array.from(new Int8Array(buff.buffer.slice(3, 5)))
    const messageId = leByteArrayToLong(slice)
    const MessageType = messageTypeRegistry[messageId] as any
    const msg = new MessageType()
    const nextSlice = dataView ?
      dataView.slice(9) :
      Array.from(new Int8Array(buff.buffer.slice(9)))
    const reader = new jspb.BinaryReader(nextSlice, 0, buff.limit - (9 + 2))
    return [messageId, MessageType.deserializeBinaryFromReader(msg, reader)]
  }
}
