import { Message, BinaryReader } from 'google-protobuf'
import { concat } from 'bytebuffer'

import Messages from '@keepkey/device-protocol/lib/messages_pb'
import Types from '@keepkey/device-protocol/lib/types_pb'

import { messageTypeRegistry } from './messageTypeRegistry'
import { leByteSliceToLong } from './utils'

export class Device  {
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
    const typeID = leByteSliceToLong(bb.slice(3, 5))
    console.log(typeID)
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