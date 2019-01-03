import messageNameRegistry from './messageNameRegistry'
import Messages from './kkProto/messages_pb'

const { MessageType: {
  MESSAGETYPE_PASSPHRASEACK,
  MESSAGETYPE_ENTROPYACK,
  MESSAGETYPE_LOADDEVICE
}} = Messages

export const MSG_CONTENT_BLACKLIST = [
  MESSAGETYPE_PASSPHRASEACK,
  MESSAGETYPE_ENTROPYACK,
  MESSAGETYPE_LOADDEVICE
]

export interface Event {
  message_type?: string
  message_enum: number
  from_device: boolean
  interface?: Interface
  message: {},
  date?: number
}

export function makeEvent (e: Event): Event {
  if (MSG_CONTENT_BLACKLIST.includes(e.message_enum)) e.message = {}
  return {
    message_type: messageNameRegistry[e.message_enum],
    date: Date.now(),
    ...e
  }
}
