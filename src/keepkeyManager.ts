import KeepKey from './keepkey'
import eventemitter2 from 'eventemitter2'
import { WebUSBDeviceConfig } from './webUSBDevice'
import { HIDDeviceConfig } from './HIDDevice'

export type USBDeviceEventCallback = (deviceID: string) => void
const defaultUSBDeviceCallback = () => {} // tslint:disable-line:no-empty

export interface KeepKeyManagerConfig {
  onConnectCallback?: USBDeviceEventCallback
  onDisconnectCallback?: USBDeviceEventCallback
}

export default class KeepKeyManager {
  public deviceEvents: eventemitter2.EventEmitter2 = new eventemitter2.EventEmitter2({ wildcard: true })
  public keepkeys: { [deviceID: string]: KeepKey } = {}

  protected onConnectCallback: USBDeviceEventCallback = defaultUSBDeviceCallback
  protected onDisconnectCallback: USBDeviceEventCallback = defaultUSBDeviceCallback

  constructor (config: KeepKeyManagerConfig = {}) {
    this.onConnectCallback = config.onConnectCallback || defaultUSBDeviceCallback
    this.onDisconnectCallback = config.onDisconnectCallback || defaultUSBDeviceCallback

    // If we have access to WebUSB, register callbacks
    if (typeof window !== 'undefined' && window.navigator.usb) {
      window.navigator.usb.onconnect = this.handleConnectKeepKey.bind(this)
      window.navigator.usb.ondisconnect = this.handleDisconnectKeepKey.bind(this)
    }
  }

  public get initializedCount (): number {
    return Object.keys(this.keepkeys).length
  }

  public async initializeWebUSBDevices (
    webusbConfig?: WebUSBDeviceConfig,
    devices?: USBDevice[]
  ): Promise<number> {
    if (!window.navigator.usb) throw new Error('WebUSB not supported in your browser!')

    const devicesToInitialize = devices || (await window.navigator.usb.getDevices())
      .filter((dev) => !(this.keepkeys[dev.serialNumber]))

    for (const usbDevice of devicesToInitialize) {
      let k = KeepKey.withWebUSB({ usbDevice, ...webusbConfig })
      const features = await k.initialize()
      if (features) this.add(k, usbDevice.serialNumber)
    }

    return this.initializedCount
  }

  public add (keepkey: KeepKey, deviceID?: string): boolean {
    const id = deviceID || keepkey.features.deviceId
    if (!(this.keepkeys[id])) {
      this.keepkeys[id] = keepkey
      this.decorateEvents(deviceID, keepkey.device.events)
      return true
    }
    return false
  }

  public async initializeHIDDevices (
    hidConfig?: HIDDeviceConfig,
    devices?: USBDevice[]
  ): Promise<number> {
    let devicesToInitialize = devices
    if (!devicesToInitialize) devicesToInitialize = []
    for (let i = 0; i < devicesToInitialize.length; i++) {
      const hidDevice = devicesToInitialize[i]
      let k = KeepKey.withHID({ hidDevice, ...hidConfig })
      const features = await k.initialize()
      if (features) this.add(k, features.deviceId)
    }
    return this.initializedCount
  }

  public async exec (method: string, ...args): Promise<{ [deviceID: string]: any }> {
    return Promise.all(
      Object.values(this.keepkeys)
        .map(k => k[method](...args))
    ).then(values => values.reduce((final, response, i) => {
      final[Object.keys(this.keepkeys)[i]] = response
      return final
    }, {}))
  }

  public get (deviceID?: string): KeepKey {
    if (this.keepkeys[deviceID]) return this.keepkeys[deviceID]
    if (this.initializedCount) return Object.values(this.keepkeys)[0]
    return null
  }

  public async remove (deviceID: string): Promise<void> {
    if (!this.keepkeys[deviceID]) return
    const keepkey = this.get(deviceID)
    await keepkey.clearSession()
    await keepkey.device.disconnect()
    delete this.keepkeys[deviceID]
  }

  public async removeAll (): Promise<void> {
    Object.values(this.keepkeys).forEach(async (keepkey) => {
      await keepkey.clearSession()
      await keepkey.device.disconnect()
    })
    this.keepkeys = {}
  }

  public decorateEvents (deviceID: string, events: eventemitter2.EventEmitter2): void {
    events.onAny((e: string, ...values: any[]) => this.deviceEvents.emit([e, deviceID], [deviceID, ...values]))
  }

  protected handleConnectKeepKey (e: USBConnectionEvent): void {
    const deviceID = e.device.serialNumber
    this.initializeWebUSBDevices(null, [e.device])
      .then(() => this.onConnectCallback(deviceID))
      .catch(console.error)
  }

  protected handleDisconnectKeepKey (e: USBConnectionEvent): void {
    const deviceID = e.device.serialNumber
    this.remove(deviceID)
      .then(() => this.onDisconnectCallback(deviceID))
      .catch((e) => {
        console.error(e)
        this.onDisconnectCallback(deviceID)
      })
  }
}
