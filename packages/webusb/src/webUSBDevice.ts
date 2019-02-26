/// <reference path="../node_modules/@types/w3c-web-usb/index.d.ts" />
import { Device, VENDOR_ID, PRODUCT_ID, Interface } from '@keepkey/core'
import * as eventemitter2 from 'eventemitter2'
import * as ByteBuffer from 'bytebuffer'

const { default: { concat, wrap } } = ByteBuffer as any

const SEGMENT_SIZE = 63

export interface WebUSBDeviceConfig {
  usbDevice: USBDevice,
  events?: eventemitter2.EventEmitter2
}

export class WebUSBDevice extends Device {
  public usbDevice: USBDevice
  public events: eventemitter2.EventEmitter2

  protected interface: Interface = 'StandardWebUSB'

  public static async requestPair (): Promise<USBDevice> {
    if (!window.navigator.usb) {
      throw new Error('WebUSB is not available in this browser. We recommend trying Chrome.')
    }
    return window.navigator.usb.requestDevice({ filters: [{ vendorId: VENDOR_ID, productId: PRODUCT_ID }] })
  }

  constructor (config: WebUSBDeviceConfig) {
    super()
    this.usbDevice = config.usbDevice
    this.events = config.events || new eventemitter2.EventEmitter2()
  }

  public get isOpened (): boolean {
    return this.usbDevice.opened
  }

  public async open (): Promise<void> {
    if(this.isOpened) return
    await this.usbDevice.open()
    if (this.usbDevice.configuration === null) await this.usbDevice.selectConfiguration(1)
    await this.usbDevice.claimInterface(0)

    // Start reading data from usbDevice
    this.listen()
  }

  public async disconnect (): Promise<void> {
    try {
      // If the device is disconnected, this will fail and throw, which is fine.
      await this.usbDevice.close()
    } catch (e) {
      console.log('Disconnect Error (Ignored):', e)
    }
  }

  public getEntropy (length: number = 64): Uint8Array {
    return window.crypto.getRandomValues(new Uint8Array(length))
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
    console.log('read', first)
    // Check that buffer starts with: "?##" [ 0x3f, 0x23, 0x23 ]
    // "?" = USB marker, "##" = KeepKey magic bytes
    // Message ID is bytes 4-5. Message length starts at byte 6.
    const valid = (first.getUint32(0) & 0xffffff00) === 0x3f232300
    const msgLength = first.getUint32(5)
    console.log('msgLength', msgLength)
    if (valid && msgLength >= 0) {
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