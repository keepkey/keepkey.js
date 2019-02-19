import * as eventemitter3 from 'eventemitter3'
import { Message, BinaryReader } from 'google-protobuf'
import * as ByteBuffer from 'bytebuffer'
import { concat as rxConcat, fromEvent, from } from 'rxjs'
import { take } from 'rxjs/operators'
import RxSingletonLock from 'rx-singleton-lock'

import * as ProtoMessages from '@keepkey/device-protocol/lib/messages_pb'
import * as ProtoTypes from '@keepkey/device-protocol/lib/types_pb'

import { messageTypeRegistry } from './typeRegistry'
import { typeIDFromMessageBuffer } from './utils'
import { WebUSBInterface } from './devices/webUSBDevice'
import { makeEvent } from './event'

const { default: Messages } = ProtoMessages as any // Conflict between typedef and actual js export
const { default: Types } = ProtoTypes as any // Conflict between typedef and actual js export
const { default: { concat, wrap } } = ByteBuffer as any

export type Interface = WebUSBInterface

export abstract class Device {

  protected abstract interface: Interface

  protected lock: RxSingletonLock = new RxSingletonLock()
  protected isListening: boolean = false

  public abstract events: eventemitter3
  public abstract get isInitialized (): boolean

  public abstract initialize (): Promise<void>
  public abstract disconnect (): Promise<void>
  public abstract getEntropy (length: number): Uint8Array

  protected abstract async write (buff: ByteBuffer): Promise<void>
  protected abstract async read (): Promise<ByteBuffer>

  public async listen (): Promise<void> {
    while(this.isListening) {
      console.log('listen')
      try {
        const buf = await this.read()
        if(!buf) continue
        const [msgTypeEnum, msg] = this.fromMessageBuffer(buf)
        console.log('got message', msgTypeEnum, msg)
        this.events.emit(String(msgTypeEnum), makeEvent({
          message_enum: msgTypeEnum,
          message: msg.toObject(),
          from_device: true
        }))
        if (msgTypeEnum === Messages.MessageType.MESSAGETYPE_BUTTONREQUEST) {
          this.exchange(Messages.MessageType.MESSAGETYPE_BUTTONACK, new Messages.ButtonAck())
        }
        if (msgTypeEnum === Messages.MessageType.MESSAGETYPE_ENTROPYREQUEST) {
          const ack = new Messages.EntropyAck()
          ack.setEntropy(this.getEntropy(32))
          this.exchange(Messages.MessageType.MESSAGETYPE_ENTROPYACK, ack)
        }
      } catch(e) {
        console.error(e)
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
    this.lock.singleton(
      rxConcat(
        from(this.write(this.toMessageBuffer(msgTypeEnum, msg))),
        rxConcat(
          fromEvent(this.events, String(Messages.MessageType.MESSAGETYPE_FEATURES)),
          fromEvent(this.events, String(Messages.MessageType.MESSAGETYPE_FAILURE)),
        ).pipe(take(1))
      )
    ).toPromise().then((thing) => {
      console.log('!!!!!')
      console.log(thing)
      console.log('!!!!!!')
    })
    // .subscribe(
    //   n => console.log('got value', n),
    //   e => console.error(e),
    //   () => console.log('done')
    // )
    return [msgTypeEnum, msg]
  }

  public async reset () {
    try {
      this.lock = new RxSingletonLock()
      const cancelMsg = new Messages.Cancel()
      const buffer = this.toMessageBuffer(Messages.MessageType.MESSAGETYPE_CANCEL, cancelMsg)
      await this.write(buffer)
    } catch (e) {
      console.error('Cancel Pending Error', e)
    }
  }

  protected toMessageBuffer (msgTypeEnum: number, msg: Message): ByteBuffer {
    const messageBuffer = msg.serializeBinary()

    const headerBuffer = new ArrayBuffer(8)
    const headerView = new DataView(headerBuffer)

    headerView.setUint8(0, 0x23)
    headerView.setUint8(1, 0x23)
    headerView.setUint16(2, msgTypeEnum)
    headerView.setUint32(4, messageBuffer.byteLength)

    return concat([headerView.buffer, messageBuffer])
  }

  protected fromMessageBuffer (bb: ByteBuffer): [number, Message] {
    const typeID = typeIDFromMessageBuffer(bb.slice(3, 5))
    const MessageType = messageTypeRegistry[typeID] as any
    if (!MessageType) {
      const msg = new Messages.Failure()
      msg.setCode(Types.FailureType.FAILURE_UNEXPECTEDMESSAGE)
      msg.setMessage('Unknown message type received')
      return [Messages.MessageType.MESSAGETYPE_FAILURE, msg]
    }
    const msg = new MessageType()
    const reader = new BinaryReader(bb.toBuffer(), 9, bb.limit - (9 + 2))
    return [typeID, MessageType.deserializeBinaryFromReader(msg, reader)]
  }

  protected static failureMessageFactory (e?: Error | string) {
    const msg = new Messages.Failure()
    msg.setCode(Types.FailureType.FAILURE_UNEXPECTEDMESSAGE)
    if (typeof e === 'string') {
      msg.setMessage(e)
    } else {
      msg.setMessage(String(e))
    }
    return wrap(msg.serializeBinary())
  }
}