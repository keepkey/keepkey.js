import proto from './proto.json'

const { nested: { MessageType: { values } } } = proto

// Map of message type enums to human readable message name
const messageNameRegistry: { [msgTypeEnum: number]: string } = Object.entries(values).reduce((registry, entry: [string, number]) => {
  registry[entry[1]] = entry[0].split('_')[1]
  return registry
}, {})

export default messageNameRegistry
