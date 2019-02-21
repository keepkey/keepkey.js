import { messageNameRegistry } from './typeRegistry'
import { Interface } from './utils'

export interface Event {
  message_type?: string
  message_enum: number
  from_device: boolean
  device_id?: string
  interface?: Interface
  message: {},
  date?: number
}

export function makeEvent (e: Event): Event {
  return {
    message_type: messageNameRegistry[e.message_enum],
    date: Date.now(),
    ...e
  }
}
