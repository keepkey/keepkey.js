import eventemitter2 from 'eventemitter2'
import * as jspb from 'google-protobuf'
import Device from './Device'

export interface HIDDeviceConfig {
  usbDevice: USBDevice,
  events?: eventemitter2.EventEmitter2
}

export default class HIDDevice extends Device {
  public usbDevice: USBDevice
  public events: eventemitter2.EventEmitter2

  protected interface: Interface = 'StandardHID'

  public static async requestPair (): Promise<USBDevice> {
    // find all hid devices and return devices that match vendorId
    return new USBDevice()
  }

  constructor (config: HIDDeviceConfig) {
    super()
    this.usbDevice = config.usbDevice
  }

  public get isInitialized (): boolean {
    // implement
    return true
  }

  public async initialize (): Promise<void> {
    // implement
  }

  public async disconnect (): Promise<void> {
    // implement
  }

  public getEntropy (length: number): Uint8Array {
    return new Uint8Array(length)
  }

  public async sendRaw (
    msgTypeEnum: number,
    msg: jspb.Message
  ): Promise<[number, jspb.Message]> {
    // implement
    return [1, null]
  }
}
