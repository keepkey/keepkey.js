console.log('!!!')
window.localStorage.debug = '*'
// const loggers = {}

// const manager = window.keepkeyManager = new window.keepkey.KeepKeyManager({
//   onConnectCallback: (deviceID) => {
//     console.log('Device Connected: ' + deviceID)
//     loggers[deviceID] = window.debug(deviceID)
//   },
//   onDisconnectCallback: (deviceID) => {
//     console.log('Device Disconnected: ' + deviceID)
//     delete loggers[deviceID]
//   }
// })

// window.connectWebUSB = function () {
//   manager.initializeWebUSBDevices()
//     .then(() => {
//       console.log(`Found ${Object.keys(manager.keepkeys).length} KeepKey(s)`)
//       if (manager.initializedCount) {
//         const k = manager.get()
//         console.log('Putting first keepkey on window as window.k: ', k)
//         window.k = k
//       }
//       // return manager.exec('getFeatures')
//     })
//     // .then(featuresByDeviceID => {
//     //   console.log('Features by device ID:')
//     //   console.log(featuresByDeviceID)
//     // })
//     // .then(() => {
//     //   Object.keys(manager.keepkeys).forEach((deviceID) => {
//     //     loggers[deviceID] = window.debug(deviceID)
//     //   })
//     //   manager.deviceEvents.offAny()
//     //   manager.deviceEvents.onAny((_, [deviceID, msg]) => {
//     //     loggers[deviceID](msg)
//     //   })
//     // })
//     // .catch(e => {
//     //   console.error('ConnectWebUSB Error')
//     //   console.error(e)
//     // })
// }

// window.ping = function () {
//   window.k.ping({ message: 'hi', pinProtection: true }).then(console.log).catch(console.error)
// }