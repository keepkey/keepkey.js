import { HID } from 'node-hid'
import eventemitter2 from 'eventemitter2'
import ByteBuffer from 'bytebuffer'
import * as jspb from 'google-protobuf'
import Device from './Device'
import { fromEvent } from 'rxjs'

export interface HIDDeviceConfig {
  hidDevice: HID,
  events?: eventemitter2.EventEmitter2
}

// this constant should be difined elsewhere as it is also required by webUSBDevice
const SEGMENT_SIZE = 63

export default class HIDDevice extends Device {
  public hidDevice: HID
  public events: eventemitter2.EventEmitter2
  public bufferQueue: DataView[] = []

  protected interface: Interface = 'StandardHID'

  public static async requestPair (): Promise<USBDevice> {
    console.log('invoked request pair')
    // find all hid devices and return devices that match vendorId
    // this needs a dependency like node-hid to actually return a device
    // consider making this dependency agnostic
    return new USBDevice()
  }

  constructor (config: HIDDeviceConfig) {
    super()
    this.hidDevice = config.hidDevice
    this.events = config.events || new eventemitter2.EventEmitter2()
    this.hidDevice.on('data', this.collectReadData.bind(this))
  }

  private collectReadData (data) {
    const ab = new ArrayBuffer(data.length)
    const view = new Uint8Array(ab)
    for (let i = 0; i < data.length; ++i) {
      view[i] = data[i]
    }
    const dv = new DataView(ab)
    this.bufferQueue.push(dv)
  }

  public get isInitialized (): boolean {
    // implement
    console.log('invoked isInitialized')
    return true
  }

  public async initialize (): Promise<void> {
    // implement
    // right now we only pass in open devices
    console.log('invoked initialize')
    if (!this.isInitialized) {
      // create HID from path
    }
  }

  public async disconnect (): Promise<void> {
    console.log('invoked disconnect')
    return this.hidDevice.close()
  }

  public getEntropy (length: number): Uint8Array {
    console.log('invoked getEntropy')
    return new Uint8Array(length)
  }

  public async sendRaw (buffer: ByteBuffer): Promise<ByteBuffer> {
    await this.write(buffer)
    // need to check for completed message instead of sleeping
    const sleep = () => new Promise(resolve => setTimeout(resolve, 2000))
    await sleep()
    return this.read()
  }

  protected async read (): Promise<ByteBuffer> {
    let first = this.bufferQueue[0]
    if (!first) throw new Error('Queue is empty')
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

      let currentBufferIndex = 1

      // this is where things are going to shit
      while (currentBufferIndex < this.bufferQueue.length) {
        const next = this.bufferQueue[currentBufferIndex]
        // Drop USB "?" packet identifier in the first byte
        for (let k = 1; (k < next.byteLength && offset < buffer.length); k++) {
          buffer[offset] = next.getUint8(k)
          offset++
        }
        currentBufferIndex++
      }

      return ByteBuffer.wrap(buffer)
    } else {
      console.error('Invalid message', { msgLength, valid, first })
      return new ByteBuffer(0)
    }
  }

  protected async write (buffer: ByteBuffer): Promise<void> {
    for (let i = 0; i < buffer.limit; i += SEGMENT_SIZE) {
      let segment = buffer.toArrayBuffer().slice(i, i + SEGMENT_SIZE)
      let padding = new Array(SEGMENT_SIZE - segment.byteLength + 1).join('\0')
      let fragments: Array<any> = []
      fragments.push([63])
      fragments.push(segment)
      fragments.push(padding)
      const fragmentBuffer = ByteBuffer.concat(fragments)
      await this.writeChunk(fragmentBuffer)
    }
  }

  private async writeChunk (buffer: ByteBuffer): Promise<number> {
    const arr = []
    for (let i = 0; i < buffer.buffer.length; i++) {
      arr[i] = buffer.buffer[i]
    }
    return this.hidDevice.write(arr)
  }

}