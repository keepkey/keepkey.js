import * as jspb from 'google-protobuf'
import proto from '@keepkey/device-protocol/lib/proto.json'
import * as Messages from '@keepkey/device-protocol/lib/messages_pb'

const { nested: { MessageType: { values } } } = proto

const MessageTypes = Messages as any // Conflict between typedef and actual js export
export const messageTypeRegistry: { [msgTypeEnum: number]: jspb.Message } = Object.entries(values).reduce((registry, entry: [string, number]) => {
  registry[entry[1]] = MessageTypes.default[entry[0].split('_')[1]]
  return registry
}, {})