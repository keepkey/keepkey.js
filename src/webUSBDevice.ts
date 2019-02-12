import ByteBuffer from 'bytebuffer'
import eventemitter2 from 'eventemitter2'
import { default as PQueue } from 'p-queue'

import Device from './device'
import Messages from './kkProto/messages_pb'

export interface WebUSBDeviceConfig {
  usbDevice: USBDevice,
  events?: eventemitter2.EventEmitter2
}

const SEGMENT_SIZE = 63

export default class WebUSBDevice extends Device {
  private queue: PQueue
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
    this.queue = new PQueue({ concurrency: 1 })
  }

  public get isInitialized (): boolean {
    return this.usbDevice.opened
  }

  public async initialize (): Promise<void> {
    if (!this.isInitialized) {
      await this.usbDevice.open()
      if (this.usbDevice.configuration === null) await this.usbDevice.selectConfiguration(1)
      await this.usbDevice.claimInterface(0)
    }
  }

  public async cancelPending () {
    console.log('pending', this.queue.pending)
    try {
      // If there are no pending commands, we should wait for a read back from the cancel command
      // Otherwise the pending promise will read the error
      if (this.queue.pending === 0) {
        this.queue.add(() => this.read(), { priority: 1000 })
          .then(() => console.log('cancenPending read done'))
          .catch(e => console.log('cancenPending read failed', e))
      }

      const cancelMsg = new Messages.Cancel()
      const buffer = this.toMessageBuffer(Messages.MessageType.MESSAGETYPE_CANCEL, cancelMsg)
      await this.write(buffer)
    } catch (e) {
      console.error('Cancel Pending Error', e)
    }
  }

  public async disconnect (): Promise<void> {
    if (!this.usbDevice.opened) return
    try {
      // If the device is disconnected, this will fail and throw, which is fine.
      await this.usbDevice.releaseInterface(0)
    } catch (e) {
      console.log('Disconnect Error (Ignored):', e)
    }
  }

  public getEntropy (length: number = 64): Uint8Array {
    return window.crypto.getRandomValues(new Uint8Array(length))
  }

  // This must return a tuple of [returnedBuffer, entireBufferThatWasSent], concatenating if
  // buffers were sent in chunks
  public async sendRaw (buffer: ByteBuffer): Promise<ByteBuffer> {
    // Temporarily removing queue to debug overflow error potentially caused by concurrent sends
    return this.queue.add(async () => {
      try {
        await this.write(buffer)
        return await this.read()
      } catch (e) {
        return Device.failureMessageFactory(e)
      }
    })
  }

  protected async write (buff: ByteBuffer): Promise<void> {
    // break frame into segments
    this.events.emit('write', buff)
    for (let i = 0; i < buff.limit; i += SEGMENT_SIZE) {
      let segment = buff.toArrayBuffer().slice(i, i + SEGMENT_SIZE)
      let padding = new Array(SEGMENT_SIZE - segment.byteLength + 1).join('\0')
      let fragments: Array<any> = []
      fragments.push([63])
      fragments.push(segment)
      fragments.push(padding)
      const fragmentBuffer = ByteBuffer.concat(fragments)
      await this.writeChunk(fragmentBuffer)
    }
  }

  protected async read (): Promise<ByteBuffer> {
    this.events.emit('reading')
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

      const res = ByteBuffer.wrap(buffer)
      this.events.emit('read', res)
      return res
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
