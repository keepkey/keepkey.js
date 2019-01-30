import * as Messages from './kkProto/messages_pb'
import * as utils from './utils'

describe('utils', () => {
  test('isArray', () => {
    expect(utils.isArray([])).toBe(true)
    expect(utils.isArray([1, 2, 3])).toBe(true)
    expect(utils.isArray([{ a: 'a' }])).toBe(true)
    expect(utils.isArray({})).toBe(false)
  })

  test('toHexString', () => {
    expect(utils.toHexString(new Uint8Array([1, 2]))).toEqual('0102')
    expect(utils.toHexString(new Uint8Array(1))).toEqual('00')
  })

  describe('arrayify', () => {
    test('should error with null', () => {
      expect(() => utils.arrayify(null)).toThrow('cannot convert null value to array')
    })

    test('should error with invalid hex string', () => {
      expect(() => utils.arrayify('0x!')).toThrow('invalid hexidecimal string')
    })

    test('should error when not beginning with "0x"', () => {
      expect(() => utils.arrayify('123123')).toThrow('hex string must have 0x prefix')
    })

    test('should append 0 to beginning when string is not divisible by 2', () => {
      expect(utils.arrayify('0x123')).toEqual(utils.arrayify('0x0123'))
    })

    test('should convert result into Uint8Array', () => {
      expect(utils.arrayify('0x00')).toEqual(expect.any(Uint8Array))
    })
  })

  test('protoFieldToSetMethod', () => {
    expect(utils.protoFieldToSetMethod('test')).toEqual('setTest')
  })

  test('leByteArrayToLong', () => {
    expect(utils.leByteArrayToLong([1, 0])).toEqual(256)
    expect(utils.leByteArrayToLong([0, 0])).toEqual(0)
    expect(utils.leByteArrayToLong([0, 1])).toEqual(1)
  })

  describe('fromHexString', () => {
    test('hex string match', () => {
      expect(utils.fromHexString('0x000000')).toEqual(new Uint8Array([0, 0, 0, 0]))
    })

    test('hex string no match', () => {
      expect(utils.fromHexString('!')).toEqual(new Uint8Array([0]))
    })
  })

  describe('bip32ToAddressNList', () => {
    test('formats return value correctly', () => {
      expect(utils.bip32ToAddressNList(`m/44'/60'/0'/0/0`)).toEqual([2147483692, 2147483708, 2147483648, 0, 0])
    })
    test('will always return an array if the path looks valid', () => {
      expect(utils.bip32ToAddressNList(`m/`)).toEqual([])
    })
    test('throws when given an incorrect bip32 path', () => {
      expect(() => utils.bip32ToAddressNList(`/44'/60'/0'/0/0`)).toThrow()
    })
    test('doesnt throw when being used to build proto messages', () => {
      expect(() => {
        const nodePath = utils.bip32ToAddressNList(`m/44'/60'/0'/0/0`)
        const est = new Messages.EthereumSignTx()
        est.setAddressNList(nodePath)
      }).not.toThrow()
    })
  })

  describe('bip32Like', () => {
    test('returns true if path is valid', () => {
      expect(utils.bip32Like(`m/`)).toEqual(true)
    })
    test('returns false otherwise', () => {
      expect(utils.bip32Like(`/44'/60'/0'/0/0`)).toEqual(false)
    })
  })
})
