import ByteBuffer from 'bytebuffer'
import * as jspb from 'google-protobuf'
import eventemitter2 from 'eventemitter2'
import Device from './device'

export interface WebUSBDeviceConfig {
  usbDevice: USBDevice,
  events?: eventemitter2.EventEmitter2
}

const SEGMENT_SIZE = 63

export default class WebUSBDevice extends Device {

  public usbDevice: USBDevice
  public events: eventemitter2.EventEmitter2

  protected interface: Interface = 'StandardWebUSB'

  public static async requestPair (): Promise<USBDevice> {
    return window.navigator.usb.requestDevice({ filters: [{ vendorId: 0x2b24 }] })
  }

  constructor (config: WebUSBDeviceConfig) {
    super()
    this.usbDevice = config.usbDevice
    this.events = config.events || new eventemitter2.EventEmitter2()
  }

  public get isInitialized (): boolean {
    return this.usbDevice.opened
  }

  public async initialize (): Promise<void> {
    await this.usbDevice.open()
    if (this.usbDevice.configuration === null) await this.usbDevice.selectConfiguration(1)
    await this.usbDevice.claimInterface(0)
  }

  public async disconnect (): Promise<void> {
    if (!this.usbDevice.opened) return
    return this.usbDevice.releaseInterface(0)
  }

  public getEntropy (length: number = 64): Uint8Array {
    return window.crypto.getRandomValues(new Uint8Array(length))
  }

  public async sendRaw (
    msgTypeEnum: number,
    msg: jspb.Message
  ): Promise<[number, jspb.Message]> {
    await this.write(this.toMessageBuffer(msgTypeEnum, msg))
    return this.fromMessageBuffer(await this.read())
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
      await this.writeChunk(ByteBuffer.concat(fragments))
    }
  }

  protected async read (): Promise<ByteBuffer> {
    let first = await this.readChunk()

    // FIXME: assert that buffer starts with: [ 0x3f, 0x23, 0x23 ]
    const valid = first.getUint32(0) === 1059267328
    const msgLength = first.getUint32(5)
    if (valid && msgLength > 0 && msgLength < 4194304) { // 4 MB sanity check
      // FIXME: why doesn't ByteBuffer.concat() work?
      let buffer = new Uint8Array(9 + 2 + msgLength)
      for (let k = 0; k < first.byteLength; k++) {
        buffer[k] = first.getUint8(k)
      }

      if (msgLength > SEGMENT_SIZE) {
        let max = Math.ceil((msgLength - first.byteLength) / SEGMENT_SIZE)
        for (let i = 0; i < max; i += 1) {
          let next = await this.readChunk()
          for (let k = 1; k < next.byteLength; k++) {
            buffer[(i + 1) * SEGMENT_SIZE + k] = next.getUint8(k)
          }
        }
      }

      return ByteBuffer.wrap(buffer)
    } else {
      console.error('Invalid message', { msgLength, valid, first})
      return new ByteBuffer(0)
    }
  }

  private async writeChunk (buffer: ByteBuffer): Promise<USBOutTransferResult> {
    return this.usbDevice.transferOut(1, buffer.toArrayBuffer())
  }

  private async readChunk (): Promise<DataView> {
    const result = await this.usbDevice.transferIn(1, 64)

    if (result.status === 'stall') {
      await this.usbDevice.clearHalt('out', 1)
    }

    return Promise.resolve(result.data)
  }

  protected toByteBuffer (view: DataView): ByteBuffer {
    let bb = new ByteBuffer(view.byteLength)
    for (let i = 0; i < view.byteLength; i++) {
      bb[i] = view.getUint8(i)
    }
    return bb
  }
}
