import KeepKey from './keepkey'

let mockCall = KeepKey.prototype.acknowledgeWithCharacterProto = jest.fn()

jest.mock('./messageNameRegistry', () => ({}))
jest.mock('./messageTypeRegistry', () => ({}))

describe('KeepKey', () => {
  test('should instantiate a new KeepKey with default values', () => {
    const keepkey = new KeepKey({})
    expect(keepkey).toEqual(
      expect.objectContaining({
        autoButton: false,
        device: null
      })
    )
  })
  test('should call acknowledgeWithCharacterProto when acknowledging with character', () => {
    const keepkey = new KeepKey({})
    // tslint:disable-next-line:no-floating-promises
    expect(keepkey.acknowledgeWithCharacter('a')).toEqual(expect.any(Promise))
    expect(mockCall).toHaveBeenCalledTimes(1)
    expect(mockCall.mock.calls[0]).toEqual(
      expect.arrayContaining([
        'a',
        false,
        false
      ])
    )
  })
  test('should call acknowledgeWithCharacterProto when acknowledging with character delete', () => {
    const keepkey = new KeepKey({})
    // tslint:disable-next-line:no-floating-promises
    expect(keepkey.acknowledgeWithCharacterDelete()).toEqual(expect.any(Promise))
    expect(mockCall).toHaveBeenCalledTimes(2)
    expect(mockCall.mock.calls[1]).toEqual(
      expect.arrayContaining([
        '',
        true,
        false
      ])
    )
  })
  test('should call acknowledgeWithCharacterProto when acknowledging with character done', () => {
    const keepkey = new KeepKey({})
    // tslint:disable-next-line:no-floating-promises
    expect(keepkey.acknowledgeWithCharacterDone()).toEqual(expect.any(Promise))
    expect(mockCall).toHaveBeenCalledTimes(3)
    expect(mockCall.mock.calls[2]).toEqual(
      expect.arrayContaining([
        '',
        false,
        true
      ])
    )
  })
})
