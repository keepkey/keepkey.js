/// <reference path="../node_modules/@types/w3c-web-usb/index.d.ts" />
import { wrap, concat } from 'bytebuffer'
import eventemitter3 from 'eventemitter3'

import { Device } from './device'
import Messages from '@keepkey/device-protocol/lib/messages_pb'
import Types from '@keepkey/device-protocol/lib/types_pb'

const SEGMENT_SIZE = 63

export class WebUSBDevice extends Device {

  usbDevice: USBDevice

  // This must return a tuple of [returnedBuffer, entireBufferThatWasSent], concatenating if
  // buffers were sent in chunks
  public async sendRaw (buffer: ByteBuffer): Promise<ByteBuffer> {
    try {
      await this.write(buffer)
      return await this.read()
    } catch (e) {
      const msg = new Messages.Failure()
      msg.setCode(Types.FailureType.FAILURE_UNEXPECTEDMESSAGE)
      msg.setMessage(String(e))
      return wrap(msg.serializeBinary())
    }
  }

  protected async write (buff: ByteBuffer): Promise<void> {
    // break frame into segments
    for (let i = 0; i < buff.limit; i += SEGMENT_SIZE) {
      let segment = buff.toArrayBuffer().slice(i, i + SEGMENT_SIZE)
      let padding = new Array(SEGMENT_SIZE - segment.byteLength + 1).join('\0')
      let fragments: Array<any> = []
      fragments.push([63])
      fragments.push(segment)
      fragments.push(padding)
      const fragmentBuffer = concat(fragments)
      await this.writeChunk(fragmentBuffer)
    }
  }

  protected async read (): Promise<ByteBuffer> {
    let first = await this.readChunk()
    // Check that buffer starts with: "?##" [ 0x3f, 0x23, 0x23 ]
    // "?" = USB marker, "##" = KeepKey magic bytes
    // Message ID is bytes 4-5. Message length starts at byte 6.
    const valid = (first.getUint32(0) & 0xffffff00) === 0x3f232300
    const msgLength = first.getUint32(5)
    if (valid && msgLength >= 0 && msgLength < 131072) { // 128KB max message size
      // FIXME: why doesn't ByteBuffer.concat() work?
      const buffer = new Uint8Array(9 + 2 + msgLength)
      for (let k = 0; k < first.byteLength; k++) {
        buffer[k] = first.getUint8(k)
      }
      let offset = first.byteLength

      while (offset < buffer.length) {
        const next = await this.readChunk()
        // Drop USB "?" packet identifier in the first byte
        for (let k = 1; (k < next.byteLength && offset < buffer.length); k++) {
          buffer[offset] = next.getUint8(k)
          offset++
        }
      }

      return wrap(buffer)
    } else {
      console.error('Invalid message', { msgLength, valid, first })
      throw new Error('Invalid message')
    }
  }

  private async writeChunk (buffer: ByteBuffer): Promise<USBOutTransferResult> {
    return this.usbDevice.transferOut(1, buffer.toArrayBuffer())
  }

  private async readChunk (): Promise<DataView> {
    const result = await this.usbDevice.transferIn(1, SEGMENT_SIZE + 1)

    if (result.status === 'stall') {
      await this.usbDevice.clearHalt('out', 1)
    }

    return Promise.resolve(result.data)
  }
}
