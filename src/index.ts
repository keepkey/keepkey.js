export { default as KeepKeyManager } from './keepkeyManager'
export { default as KeepKey } from './keepkey'

// Export our device interfaces
export { default as WebUSBDevice } from './webUSBDevice'
// export { default as hidDevice } from './hidDevice // When it exists

// Export all proto message classes
export { default as Messages } from './kkProto/messages_pb'
export { default as Types } from './kkProto/types_pb'
export { default as Exchange } from './kkProto/exchange_pb'

// Export constant functions and utils
export * from './ethereum'
export * from './utils'

// Export a map of number MessageType enums to their respective keepkey proto class
export { default as messageTypeRegistry } from './messageTypeRegistry'

// Export constants useful for detecting devices
export const productID = '0002'
export const vendorID = 0x2b24

// Export our WebUSB Device filter
export const KeepKeyDeviceRequestOptions = { filters: [{ vendorId: vendorID }] }
