import { randomBytes } from 'crypto'
import { Device, VENDOR_ID, PRODUCT_ID, Interface } from '@keepkey/core'
import * as eventemitter2 from 'eventemitter2'
import * as ByteBuffer from 'bytebuffer'
import { Device as NodeHIDDevice, HID } from 'node-hid'

const { default: { concat, wrap } } = ByteBuffer as any

const SEGMENT_SIZE = 63

export interface HIDDeviceConfig {
  hidRef?: HID,
  hidDevice: NodeHIDDevice,
  events?: eventemitter2.EventEmitter2
}

export class HIDDevice extends Device {
  public hidRef: HID
  public hidDevice: NodeHIDDevice
  public events: eventemitter2.EventEmitter2

  private bufferQueue: ByteBuffer[] = []

  protected interface: Interface = 'StandardHID'

  public static async requestPair (): Promise<HID> {
    return new HID(VENDOR_ID, PRODUCT_ID)
  }

  constructor (config: HIDDeviceConfig) {
    super()
    this.hidDevice = config.hidDevice
    this.hidRef = config.hidRef || new HID(config.hidDevice.path)
    this.events = config.events || new eventemitter2.EventEmitter2()
  }

  public get isOpened (): boolean {
    return this.hidDevice.interface > -1
  }

  public async open (): Promise<void> {
    if(this.isOpened) return
    this.hidRef.on('data', this.enqueueBuffer.bind(this))
    // Start reading data from usbDevice
    this.listen()
  }

  public async disconnect (): Promise<void> {
    try {
      // If the device is disconnected, this will fail and throw, which is fine.
      await this.hidRef.close()
    } catch (e) {
      console.log('Disconnect Error (Ignored):', e)
    }
  }

  public getEntropy (length: number = 64): Uint8Array {
    return randomBytes(length)
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
    if(!this.bufferQueue.length) return
    let first = await this.bufferQueue.shift()
    console.log('read', first)
    // Check that buffer starts with: "?##" [ 0x3f, 0x23, 0x23 ]
    // "?" = USB marker, "##" = KeepKey magic bytes
    // Message ID is bytes 4-5. Message length starts at byte 6.
    const valid = (first.readUint32(0) & 0xffffff00) === 0x3f232300
    const msgLength = first.readUint32(5)
    console.log('msgLength', msgLength)
    if (valid && msgLength >= 0) {
      // FIXME: why doesn't ByteBuffer.concat() work?
      const buffer = new Uint8Array(9 + 2 + msgLength)
      for (let k = 0; k < first.limit; k++) {
        buffer[k] = first.readByte(k)
      }
      let offset = first.limit

      while (offset < buffer.length) {
        const next = this.bufferQueue.shift()
        // Drop USB "?" packet identifier in the first byte
        for (let k = 1; (k < next.limit && offset < buffer.length); k++) {
          buffer[offset] = next.readByte(k)
          offset++
        }
      }
      return wrap(buffer)
    }
  }

  private async writeChunk (buffer: ByteBuffer): Promise<number> {
    const arr: number[] = new Array(buffer.limit).fill(undefined)
    for (let i = buffer.offset; i < buffer.limit; i++) {
      arr[i] = buffer.readByte(i)
    }
    return this.hidRef.write(arr)
  }

  private enqueueBuffer(data: number[]): void {
    if(data.length) this.bufferQueue.push(wrap(data))
  }
}