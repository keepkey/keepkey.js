import jspb from 'google-protobuf'
import proto from './proto.json'
import Messages from './kkProto/messages_pb'

const { nested: { MessageType: { values } } } = proto

const messageTypeRegistry: { [msgTypeEnum: number]: jspb.Message } = Object.entries(values).reduce((registry, entry: [string, number]) => {
  registry[entry[1]] = Messages[entry[0].split('_')[1]]
  return registry
}, {})

export default messageTypeRegistry
