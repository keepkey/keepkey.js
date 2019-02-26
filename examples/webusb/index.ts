import $ from 'jquery'
import * as debug from 'debug'
import { WebUSBKeyring, WebUSBDevice } from '@keepkey/webusb'

window.localStorage.debug = '*'
const loggers: {[deviceID: string]: debug.Debugger} = {}

const $pair = $('#pair')
const $start = $('#start')
const $ping = $('#ping')
const $pingWithButton = $('#ping-with-button')
const $pingWithPIN = $('#ping-with-pin')
const $cancel = $('#cancel')

let keepkey

const keyring = (<any>window).keyring = new WebUSBKeyring({
  onConnectCallback: (deviceID) => {
    console.log('Device Connected: ' + deviceID)
    loggers[deviceID] = debug.debug(deviceID)
  },
  onDisconnectCallback: (deviceID) => {
    console.log('Device Disconnected: ' + deviceID)
    delete loggers[deviceID]
  }
})

$pair.on('click', (e) => {
  e.preventDefault()
  WebUSBDevice.requestPair()
})

$start.on('click', (e) => {
  e.preventDefault()
  keyring.initialize()
    .then(() => {
      console.log(`Found ${Object.keys(keyring.keepkeys).length} KeepKey(s)`)
      if (keyring.initializedCount) {
        keepkey = (<any>window).keepkey = keyring.get()
        console.log('Putting first keepkey on window as window.keepkey: ', keepkey)
      }
      return keyring.exec('getFeatures')
    })
    .then(featuresByDeviceID => {
      console.log('Features by device ID:')
      console.log(featuresByDeviceID)
    })
    .then(() => {
      Object.keys(keyring.keepkeys).forEach((deviceID) => {
        loggers[deviceID] = debug.debug(deviceID)
      })
      keyring.deviceEvents.onAny((_, [deviceID, msg]) => {
        loggers[deviceID](msg)
      })
    })
    .catch(e => {
      console.error('ConnectWebUSB Error')
      console.error(e)
    })
})

$ping.on('click', (e) => {
  e.preventDefault()
  keepkey.ping({ message: 'hi' }).then(console.log).catch(console.error)
})

$pingWithButton.on('click', (e) => {
  e.preventDefault()
  keepkey.ping({ message: 'hi', buttonProtection: true }).then(console.log).catch(console.error)
})

$pingWithPIN.on('click', (e) => {
  e.preventDefault()
  keepkey.ping({ message: 'hi', pinProtection: true }).then(console.log).catch(console.error)
})

$cancel.on('click', (e) => {
  e.preventDefault()
  keepkey.cancel().then(console.log).catch(console.error)
})