import * as eventemitter3 from 'eventemitter3'
import { Message, BinaryReader } from 'google-protobuf'
import * as ByteBuffer from 'bytebuffer'
import RxSingletonLock from 'rx-singleton-lock'

import * as Messages from '@keepkey/device-protocol/lib/messages_pb'
import * as Types from '@keepkey/device-protocol/lib/types_pb'

import { messageTypeRegistry } from './typeRegistry'
import { leByteSliceToLong } from './utils'
import { WebUSBInterface } from './devices/webUSBDevice'
import { makeEvent } from './event';

export type Interface = WebUSBInterface

export abstract class Device {

  public abstract events: eventemitter3
  public lock: RxSingletonLock = new RxSingletonLock()

  protected abstract async write (buff: ByteBuffer): Promise<void>
  protected abstract async read (): Promise<ByteBuffer>

  public abstract get isInitialized (): boolean
  public abstract initialize (): Promise<void>
  public abstract disconnect (): Promise<void>
  public abstract getEntropy (length: number): Uint8Array

  protected abstract interface: Interface

  public async listen (): Promise<void> {
    while(true) {
      console.log('listen')
      try {
        const [msgTypeEnum, msg] = this.fromMessageBuffer(await this.read())
        console.log(msgTypeEnum, msg)
        this.events.emit(String(msgTypeEnum), makeEvent({
          message_enum: msgTypeEnum,
          message: msg.toObject(),
          from_device: true,
          device_id: '1'
        }))
      } catch(e) {
        console.log(e)
      } finally {
        console.log('done listen')
      }
    }
  }

  public async exchange (msgTypeEnum: number, msg: Message): Promise<[number, Message]> {
    console.log(msgTypeEnum, msg)
    this.events.emit(String(msgTypeEnum), makeEvent({
      message_enum: msgTypeEnum,
      message: msg.toObject(),
      from_device: false,
      device_id: '1'
    }))
    this.write(this.toMessageBuffer(msgTypeEnum, msg))
    return [msgTypeEnum, msg]
  }

  protected toMessageBuffer (msgTypeEnum: number, msg: Message): ByteBuffer {
    const messageBuffer = msg.serializeBinary()

    console.log(ArrayBuffer, DataView)
    const headerBuffer = new ArrayBuffer(8)
    const headerView = new DataView(headerBuffer)

    headerView.setUint8(0, 0x23)
    headerView.setUint8(1, 0x23)
    headerView.setUint16(2, msgTypeEnum)
    headerView.setUint32(4, messageBuffer.byteLength)

    return ByteBuffer.concat([headerView.buffer, messageBuffer])
  }

  protected fromMessageBuffer (bb: ByteBuffer): [number, Message] {
    const typeID = leByteSliceToLong(bb.slice(3, 5))
    const MessageType = messageTypeRegistry[typeID] as any
    console.log(Messages)
    if (!MessageType) {
      const msg = new Messages.Failure()
      msg.setCode(Types.FailureType.FAILURE_UNEXPECTEDMESSAGE)
      msg.setMessage('Unknown message type received')
      return [Messages.MessageType.MESSAGETYPE_FAILURE, msg]
    }
    const msg = new MessageType()
    const reader = new BinaryReader(bb.slice(9).buffer, 0, bb.limit - (9 + 2))
    return [typeID, MessageType.deserializeBinaryFromReader(msg, reader)]
  }
}