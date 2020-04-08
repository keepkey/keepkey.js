window.localStorage.debug = '*'
const loggers = {}

const manager = window.keepkeyManager = new window.keepkey.KeepKeyManager({
  onConnectCallback: (deviceID) => {
    console.log('Device Connected: ' + deviceID)
    loggers[deviceID] = window.debug(deviceID)
  },
  onDisconnectCallback: (deviceID) => {
    console.log('Device Disconnected: ' + deviceID)
    delete loggers[deviceID]
  }
})

window.connectWebUSB = function () {
  manager.initializeWebUSBDevices()
    .then(() => {
      console.log(`Found ${Object.keys(manager.keepkeys).length} KeepKey(s)`)
      if (manager.initializedCount) {
        const k = manager.get()
        console.log('Putting first keepkey on window as window.keepkey: ', k)
        window.keepkey = k
        k.device.events.on('write', data => console.log('Event: write', data))
        k.device.events.on('read', data => console.log('Event: read', data))
        k.device.events.on('reading', () => console.log('Event: reading'))
      }
      return manager.exec('getFeatures')
    })
    .then(featuresByDeviceID => {
      console.log('Features by device ID:')
      console.log(featuresByDeviceID)
    })
    .then(() => {
      Object.keys(manager.keepkeys).forEach((deviceID) => {
        loggers[deviceID] = window.debug(deviceID)
      })
      manager.deviceEvents.offAny()
      manager.deviceEvents.onAny((_, [deviceID, msg]) => {
        loggers[deviceID](msg)
      })
    })
    .catch(e => {
      console.error('ConnectWebUSB Error')
      console.error(String(e))
    })
}

// So we can see which commands aren't resolving
window.allPings = []

const log = (name, p) => {
  console.log('sending', name)
  const details = { name, state: 'pending' }
  details.p = p
    .then(res => {
      console.log(`${name} response:`, res)
      details.state = 'resolved'
    })
    .catch(e => {
      console.error(`${name} error:`, e)
      details.state = 'rejected'
    })
  allPings.push(details)
  return p
}

let pingCount = 0

window.pingWithButton = function () {
  log(`ping ${++pingCount} with button`, manager.exec('ping', { message: 'ping' + pingCount, buttonProtection: true }))
}

window.pingWithPIN = function () {
  log(`ping ${++pingCount} with PIN`, manager.exec('ping', { message: 'ping' + pingCount, pinProtection: true }))
}

window.ping = function () {
  log(`ping ${++pingCount}`, manager.exec('ping', { message: 'ping' + pingCount }))
}

window.cancelPending = function () {
  log('cancelPending', window.keepkey.cancel())
}
