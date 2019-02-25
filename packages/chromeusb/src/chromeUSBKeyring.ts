import { KeepKey, Keyring } from '@keepkey/keepkey.js'
import { ChromeUSBDeviceConfig, ChromeUSBDevice } from './chromeUSBKeyring'

export type USBDeviceEventCallback = (deviceID: string) => void
const defaultUSBDeviceCallback = () => {} // tslint:disable-line:no-empty

export interface KeepKeyManagerConfig {
  ChromeUSBDeviceConfig?: ChromeUSBDeviceConfig
  onConnectCallback?: USBDeviceEventCallback
  onDisconnectCallback?: USBDeviceEventCallback
  devices?: USBDevice[]
}

export class ChromeUSBKeyring extends Keyring {
  protected onConnectCallback: USBDeviceEventCallback = defaultUSBDeviceCallback
  protected onDisconnectCallback: USBDeviceEventCallback = defaultUSBDeviceCallback

  constructor (config: KeepKeyManagerConfig = {}) {
    super()
    this.onConnectCallback = config.onConnectCallback || defaultUSBDeviceCallback
    this.onDisconnectCallback = config.onDisconnectCallback || defaultUSBDeviceCallback

    // If we have access to ChromeUSB, register callbacks
    if (window.navigator.usb) {
      window.navigator.usb.onconnect = this.handleConnectKeepKey.bind(this)
      window.navigator.usb.ondisconnect = this.handleDisconnectKeepKey.bind(this)
    }

    this.initialize(config)
  }

  public async initialize (config: KeepKeyManagerConfig = {}): Promise<number> {
    if (!window.navigator.usb) throw new Error('ChromeUSB not supported in your browser!')

    const devicesToInitialize = config.devices || await window.navigator.usb.getDevices()

    for (const usbDevice of devicesToInitialize) {
      console.log(usbDevice.serialNumber, this.keepkeys)
      if (this.keepkeys[usbDevice.serialNumber]) {
        console.log(usbDevice.serialNumber, this.get(usbDevice.serialNumber))
        await this.get(usbDevice.serialNumber).initialize()
      } else {
        console.log('keepkey not found, creating new')
        let keepkey = new KeepKey({ autoButton: false, device: new ChromeUSBDevice({ usbDevice, events: this.deviceEvents }) })
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
