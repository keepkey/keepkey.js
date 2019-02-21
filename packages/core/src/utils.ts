import * as ProtoMessages from '@keepkey/device-protocol/lib/messages_pb'
import * as eventemitter3 from 'eventemitter3'
import { Observable, concat, fromEvent } from 'rxjs'
import { take } from 'rxjs/operators'

const { default: Messages } = ProtoMessages as any // Conflict between typedef and actual js export

export const VENDOR_ID = 0x2b24
export const PRODUCT_ID = 0x0002

export type WebUSBInterface = 'StandardWebUSB' | 'DebugWebUSB'

export type Interface = WebUSBInterface

export const EXIT_TYPES = [
  String(Messages.MessageType.MESSAGETYPE_CANCEL),
  String(Messages.MessageType.MESSAGETYPE_FAILURE)
]

export function typeIDFromMessageBuffer(bb: ByteBuffer) {
  let value = 0
  for (let i = bb.offset; i < bb.limit; i++) {
    value += bb.readByte(i)
  }
  return value
}

// Shim until this exists for jspb https://github.com/protocolbuffers/protobuf/issues/1591
export function protoFieldToSetMethod (fieldName: string): string {
  return `set${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)}`
}

export const isArray = Array.isArray || function (obj) {
  return Object.prototype.toString.call(obj) === '[object Array]'
}

// These helper functions marshal hex into and out of UInt8Arrays which are consumed by protobuf js
export const fromHexString = (hexString: string) => {
  const match = hexString.match(/.{1,2}/g) || []
  return new Uint8Array(match.map(byte => parseInt(byte, 16)))
}

// export const toHexString = (bytes: number[]) => bytes.reduce((str, byte) => str + byte.toString(16).padStart(2, '0'), '')

export function toHexString (arr: Uint8Array): string {
  return Array.prototype.map.call(arr, (x: number) => ('00' + x.toString(16)).slice(-2)).join('')
}

// const prevhashTx = {"txid":"6f90f3c7cbec2258b0971056ef3fe34128dbde30daa9c0639a898f9977299d54","version":1,"locktime":0,"vin":[{"txid":"ee336e79153d51f4f3e45278f1f77ab29fd5bb135dce467282e2aff22cb9c570","vout":1,"sequence":4294967295,"n":0,"scriptSig":{"hex":"483045022066c418874dbe5628296700382d727ce1734928796068c26271472df09dccf1a20221009dec59d19f9d73db381fcd35c0fff757ad73e54ef59157b0d7c57e6739a092f00121033fef08c603943dc7d25f4ce65771762143b1cd8678343d660a1a76b9d1d3ced7","asm":"3045022066c418874dbe5628296700382d727ce1734928796068c26271472df09dccf1a20221009dec59d19f9d73db381fcd35c0fff757ad73e54ef59157b0d7c57e6739a092f0[ALL] 033fef08c603943dc7d25f4ce65771762143b1cd8678343d660a1a76b9d1d3ced7"},"addr":"mnsfHtywp6AVUzgqu9P4tay6iQYY3WhCpz","valueSat":550865100,"value":5.508651,"doubleSpentTxID":null},{"txid":"2fe4d8af2b44faccc10dd5a6578c923491d2d21269a1dfe8c83f492a30fb8f9f","vout":1,"sequence":4294967295,"n":1,"scriptSig":{"hex":"47304402206fbb8e14be706b8557a2280d2a2a75c0a65c4f7936d90d510f0971c93f41f74402201b79c8c4e4ac4c944913611633c230193558296e70a36269b7fc3a80efa27d120121030cb5be79bdc36a4ff4443dbac43068cc43d638ea06ff2fa1b8dab389e39aefc7","asm":"304402206fbb8e14be706b8557a2280d2a2a75c0a65c4f7936d90d510f0971c93f41f74402201b79c8c4e4ac4c944913611633c230193558296e70a36269b7fc3a80efa27d12[ALL] 030cb5be79bdc36a4ff4443dbac43068cc43d638ea06ff2fa1b8dab389e39aefc7"},"addr":"mrDBnbEumaEiHm8pc9pj1rfUCsR4H7N5xh","valueSat":852985889,"value":8.52985889,"doubleSpentTxID":null}],"vout":[{"value":"4.03850989","n":0,"scriptPubKey":{"hex":"76a914f5a05c2664b40d3116b1c5086c9ba38ed15b742e88ac","asm":"OP_DUP OP_HASH160 f5a05c2664b40d3116b1c5086c9ba38ed15b742e OP_EQUALVERIFY OP_CHECKSIG","addresses":["n3uhx4JymCrWKX3e9i59YdJivMghF1bKZ4"],"type":"pubkeyhash"},"spentTxId":"5170fe1f25a05e1c9e125c27cd09e11f7c79c41409bc5b68f0e6f056af2d56b0","spentIndex":0,"spentHeight":203911},{"value":"10.00000000","n":1,"scriptPubKey":{"hex":"76a91424a56db43cf6f2b02e838ea493f95d8d6047423188ac","asm":"OP_DUP OP_HASH160 24a56db43cf6f2b02e838ea493f95d8d60474231 OP_EQUALVERIFY OP_CHECKSIG","addresses":["mirio8q3gtv7fhdnmb3TpZ4EuafdzSs7zL"],"type":"pubkeyhash"},"spentTxId":null,"spentIndex":null,"spentHeight":null}],"blockhash":"000000006656e1d72a211b7f469dd85209ba85c54127957a95591712a63d3848","blockheight":180573,"confirmations":1234520,"time":1391901762,"blocktime":1391901762,"valueOut":14.03850989,"size":373,"valueIn":14.03850989,"fees":0}
// export function getPrevHashTx(prevhash){
//   return prevhashTx
// }

// Copying this from ethers.js until their elliptic dep stops being circular
export function arrayify (value: string): Uint8Array {
  if (value == null) {
    throw new Error('cannot convert null value to array')
  }

  if (typeof (value) === 'string') {
    let match = value.match(/^(0x)?[0-9a-fA-F]*$/)

    if (!match) {
      throw new Error('invalid hexidecimal string')
    }

    if (match[1] !== '0x') {
      throw new Error('hex string must have 0x prefix')
    }

    value = value.substring(2)
    if (value.length % 2) { value = '0' + value }

    const result = []
    for (let i = 0; i < value.length; i += 2) {
      result.push(parseInt(value.substr(i, 2), 16))
    }

    return new Uint8Array(result)
  }
}

const HARDENED = 0x80000000
export function bip32ToAddressNList (address: string): number[] {
  if (/^m\//i.test(address)) {
    address = address.slice(2)
  }
  const path = address.split('/')
  if (path.length === 1 && path[0] === '') return []
  const ret = new Array(path.length)
  for (let i = 0; i < path.length; i++) {
    const tmp = /(\d+)([hH\']?)/.exec(path[i])
    if (tmp === null) {
      throw new Error('Invalid input')
    }
    ret[i] = parseInt(tmp[1], 10)
    if (ret[i] >= HARDENED) {
      throw new Error('Invalid child index')
    }
    if (tmp[2] === 'h' || tmp[2] === 'H' || tmp[2] === '\'') {
      ret[i] += HARDENED
    } else if (tmp[2].length !== 0) {
      throw new Error('Invalid modifier')
    }
  }
  return ret
}

export function bip32Like (address: string): boolean {
  return address.slice(0, 2) === 'm/'
}

export function takeFirstOfManyEvents(eventEmitter: eventemitter3, events: string[]): Observable<{}> {
  return concat(
    ...events.map(event => fromEvent<Event>(eventEmitter, event))
  ).pipe(take(1))
}
