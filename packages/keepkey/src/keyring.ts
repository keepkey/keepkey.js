import { KeepKey } from './keepkey'
import * as eventemitter2 from 'eventemitter2'

export abstract class Keyring {
  public deviceEvents: eventemitter2.EventEmitter2 = new eventemitter2.EventEmitter2({ wildcard: true })

  public keepkeys: { [deviceID: string]: KeepKey } = {}

  public get initializedCount (): number {
    return Object.keys(this.keepkeys).length
  }

  public abstract async initialize(...args: any[]): Promise<number>

  public add (keepkey: KeepKey, deviceID?: string): boolean {
    const id = deviceID || keepkey.features.deviceId
    if (!(this.keepkeys[id])) {
      this.keepkeys[id] = keepkey
      this.decorateEvents(deviceID, keepkey.device.events)
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

  public decorateEvents (deviceID: string, events: eventemitter2.EventEmitter2): void {
    events.onAny((e: string, ...values: any[]) => this.deviceEvents.emit([e, deviceID], [deviceID, ...values]))
  }
}
