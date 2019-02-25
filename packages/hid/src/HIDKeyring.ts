import { KeepKey, Keyring } from '@keepkey/keepkey.js'
import { HIDDeviceConfig, HIDDevice } from './HIDDevice'
import * as HID from 'node-hid'
import * as usbDetect from 'usb-detection'
import { VENDOR_ID, PRODUCT_ID } from '@keepkey/core';

const { default: USBDetect } = usbDetect as any

export type HIDDeviceEventCallback = (deviceID: string) => void
const defaultHIDDeviceCallback = () => {} // tslint:disable-line:no-empty

export interface KeepKeyManagerConfig {
  hidDeviceConfig?: HIDDeviceConfig
  onConnectCallback?: HIDDeviceEventCallback
  onDisconnectCallback?: HIDDeviceEventCallback
  devices?: HID.Device[]
}

export class HIDKeyring extends Keyring {
  protected onConnectCallback: HIDDeviceEventCallback = defaultHIDDeviceCallback
  protected onDisconnectCallback: HIDDeviceEventCallback = defaultHIDDeviceCallback

  public usbDetect = new USBDetect() // Must call keyring.usbDetect.stopMonitoring() for app to exit cleanly

  constructor (config: KeepKeyManagerConfig = {}) {
    super()

    this.onConnectCallback = config.onConnectCallback || defaultHIDDeviceCallback
    this.onDisconnectCallback = config.onDisconnectCallback || defaultHIDDeviceCallback

    this.usbDetect.startMonitoring()
    this.usbDetect.on(`add:${VENDOR_ID}:${PRODUCT_ID}`, this.handleConnectKeepKey.bind(this))
    this.usbDetect.on(`remove:${VENDOR_ID}:${PRODUCT_ID}`, this.handleDisconnectKeepKey.bind(this))

    this.initialize(config)
  }

  public async initialize (config: KeepKeyManagerConfig = {}): Promise<number> {
    const devicesToInitialize = config.devices || HID.devices().filter(d => d.vendorId === VENDOR_ID && d.productId === PRODUCT_ID)

    for (const hidDevice of devicesToInitialize) {
      console.log(hidDevice.serialNumber, this.keepkeys)
      if (this.keepkeys[hidDevice.serialNumber]) {
        console.log(hidDevice.serialNumber, this.get(hidDevice.serialNumber))
        await this.get(hidDevice.serialNumber).initialize()
      } else {
        console.log('keepkey not found, creating new')
        let keepkey = new KeepKey({ autoButton: false, device: new HIDDevice({ hidDevice, events: this.deviceEvents }) })
        const features = await keepkey.initialize()
        if (features) this.add(keepkey, hidDevice.serialNumber)
      }
    }

    return this.initializedCount
  }

  protected handleConnectKeepKey (device: HID.Device): void {
    const deviceID = device.serialNumber
    console.log('device connected', device)
    const devices = HID.devices().filter(d => d.serialNumber === device.serialNumber)
    this.initialize({ devices })
      .then(() => this.onConnectCallback(deviceID))
      .catch(console.error)
  }

  protected handleDisconnectKeepKey (device: HID.Device): void {
    const deviceID = device.serialNumber
    console.log('device disconnected', device)
    this.remove(deviceID)
      .then(() => this.onDisconnectCallback(deviceID))
      .catch((e) => this.onDisconnectCallback(deviceID))
  }

}
