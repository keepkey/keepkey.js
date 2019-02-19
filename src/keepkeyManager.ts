import { KeepKey } from './keepkey'
import * as eventemitter3 from 'eventemitter3'
import { WebUSBDeviceConfig } from './devices/webUSBDevice'

const { default: EventEmitter } = eventemitter3 as any

export type USBDeviceEventCallback = (deviceID: string) => void
const defaultUSBDeviceCallback = () => {} // tslint:disable-line:no-empty

export interface KeepKeyManagerConfig {
  onConnectCallback?: USBDeviceEventCallback
  onDisconnectCallback?: USBDeviceEventCallback
}

export class KeepKeyManager {
  public deviceEvents: eventemitter3 = new EventEmitter()

  public keepkeys: { [deviceID: string]: KeepKey } = {}

  protected onConnectCallback: USBDeviceEventCallback = defaultUSBDeviceCallback
  protected onDisconnectCallback: USBDeviceEventCallback = defaultUSBDeviceCallback

  constructor (config: KeepKeyManagerConfig = {}) {
    this.onConnectCallback = config.onConnectCallback || defaultUSBDeviceCallback
    this.onDisconnectCallback = config.onDisconnectCallback || defaultUSBDeviceCallback

    // If we have access to WebUSB, register callbacks
    if (window.navigator.usb) {
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

    const devicesToInitialize = devices || await window.navigator.usb.getDevices()

    for (const usbDevice of devicesToInitialize) {
      if (this.keepkeys[usbDevice.serialNumber]) {
        console.log(usbDevice.serialNumber, this.get(usbDevice.serialNumber))
        await this.get(usbDevice.serialNumber).initialize()
        continue
      }
      let k = KeepKey.withWebUSB({ usbDevice, events: this.deviceEvents, ...webusbConfig })
      const features = await k.initialize()
      if (features) this.add(k, usbDevice.serialNumber)
    }

    return this.initializedCount
  }

  public add (keepkey: KeepKey, deviceID?: string): boolean {
    const id = deviceID || keepkey.features.deviceId
    if (!(this.keepkeys[id])) {
      this.keepkeys[id] = keepkey
      // this.decorateEvents(deviceID, keepkey.device.events)
      return true
    }
    return false
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

    try {
      const keepkey = this.get(deviceID)
      // await keepkey.clearSession()
      await keepkey.device.disconnect()
    } catch (e) {
      console.error(e)
    } finally {
      delete this.keepkeys[deviceID]
    }
  }

  public async removeAll (): Promise<void> {
    await Promise.all(Object.keys(this.keepkeys).map(this.remove))
  }

  public disconnectAll (): void {
    Object.values(this.keepkeys).forEach(k => {
      k.device.disconnect().catch(console.log)
    })
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
      .catch((e) => this.onDisconnectCallback(deviceID))
  }
  
  // protected decorateEvents (deviceID: string, events: eventemitter3.EventEmitterStatic): void {
  //   events.onAny((e: string, ...values: any[]) => this.deviceEvents.emit([e, deviceID], [deviceID, ...values]))
  // }
}
