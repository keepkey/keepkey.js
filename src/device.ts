import * as EventEmitter from 'eventemitter3'
import { Message, BinaryReader } from 'google-protobuf'
import * as ByteBuffer from 'bytebuffer'

import * as Messages from '@keepkey/device-protocol/lib/messages_pb'
import * as Types from '@keepkey/device-protocol/lib/types_pb'

import { messageTypeRegistry } from './typeRegistry'
import { leByteSliceToLong } from './utils'
import { WebUSBInterface } from './devices/webUSBDevice'

export type Interface = WebUSBInterface

export abstract class Device {

  public abstract events: EventEmitter

  protected abstract async write (buff: ByteBuffer): Promise<void>
  protected abstract async read (): Promise<ByteBuffer>

  public abstract get isInitialized (): boolean
  public abstract initialize (): Promise<void>
  public abstract disconnect (): Promise<void>

  public abstract getEntropy (length: number): Uint8Array

  protected abstract interface: Interface

  public async listen (): Promise<void> {
    while(true) {
      try {
        const thing = this.fromMessageBuffer(await this.read())
        console.log('heard this', thing)
      } catch(e) {
        console.log(e)
      }
    }
  }

  public async exchange (msgTypeEnum: number, msg: Message): Promise<[number, Message]> {
    return [msgTypeEnum, msg]
  }

  protected toMessageBuffer (msgTypeEnum: number, msg: Message): ByteBuffer {
    const messageBuffer = msg.serializeBinary()

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