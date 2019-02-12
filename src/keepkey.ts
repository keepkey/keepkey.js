import { Device } from "./device"
import { WebUSBDevice } from "./webUSBDevice"

export class KeepKey {
  protected device: Device
  constructor() {
    this.device = new WebUSBDevice()
  }
}