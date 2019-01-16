import * as event from './event'

jest.mock('./messageNameRegistry', () => ({
  default: {
    1: 'PING'
  }
}))

jest.mock('./kkProto/messages_pb', () => ({
  default: {
    MessageType: {
      MESSAGETYPE_PASSPHRASEACK: 42,
      MESSAGETYPE_ENTROPYACK: 36,
      MESSAGETYPE_LOADDEVICE: 13
    }
  }
}))

describe('makeEvent', () => {
  test('should format return object correctly', () => {
    expect(event.makeEvent({
      message_enum: 1,
      message: {},
      from_device: true,
      buffer: '',
      interface: 'StandardWebUSB'
    })).toEqual(
      expect.objectContaining({
        message_type: 'PING',
        date: expect.any(Number),
        message_enum: 1,
        message: {},
        buffer: '',
        from_device: true,
        interface: 'StandardWebUSB'
      })
    )
  })
})
