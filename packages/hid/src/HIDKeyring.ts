import { KeepKey, Keyring } from '@keepkey/keepkey.js'
import { HIDDeviceConfig, HIDDevice } from './HIDDevice'
import { Device as NodeHIDDevice, HID } from 'node-hid'
import usbDetect from 'usb-detection'

export type HIDDeviceEventCallback = (deviceID: string) => void
const defaultHIDDeviceCallback = () => {} // tslint:disable-line:no-empty

export interface KeepKeyManagerConfig {
  hidDeviceConfig?: HIDDeviceConfig
  onConnectCallback?: USBDeviceEventCallback
  onDisconnectCallback?: USBDeviceEventCallback
  devices?: NodeHIDDevice[]
}

export class HIDKeyring extends Keyring {
  protected onConnectCallback: HIDDeviceEventCallback = defaultHIDDeviceCallback
  protected onDisconnectCallback: HIDDeviceEventCallback = defaultHIDDeviceCallback

  constructor (config: KeepKeyManagerConfig = {}) {
    super()

    this.onConnectCallback = config.onConnectCallback || defaultHIDDeviceCallback
    this.onDisconnectCallback = config.onDisconnectCallback || defaultHIDDeviceCallback

    this.initialize(config)
  }

  public async initialize (config: KeepKeyManagerConfig = {}): Promise<number> {
    const devicesToInitialize = config.devices || await window.navigator.usb.getDevices()

    for (const usbDevice of devicesToInitialize) {
      console.log(usbDevice.serialNumber, this.keepkeys)
      if (this.keepkeys[usbDevice.serialNumber]) {
        console.log(usbDevice.serialNumber, this.get(usbDevice.serialNumber))
        await this.get(usbDevice.serialNumber).initialize()
      } else {
        console.log('keepkey not found, creating new')
        let keepkey = new KeepKey({ autoButton: false, device: new WebUSBDevice({ usbDevice, events: this.deviceEvents }) })
        const features = await keepkey.initialize()
        if (features) this.add(keepkey, usbDevice.serialNumber)
      }
    }

    return this.initializedCount
  }

  protected handleConnectKeepKey (e: USBConnectionEvent): void {
    const deviceID = e.device.serialNumber
    this.initialize({ devices: [e.device] })
      .then(() => this.onConnectCallback(deviceID))
      .catch(console.error)
  }

  protected handleDisconnectKeepKey (e: USBConnectionEvent): void {
    const deviceID = e.device.serialNumber
    this.remove(deviceID)
      .then(() => this.onDisconnectCallback(deviceID))
      .catch((e) => this.onDisconnectCallback(deviceID))
  }

}
