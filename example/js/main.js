window.watchtowerPayload = {
  'success': true,
  'data': {
    'inputs': [
      {
        'txid': '1e9280fd6feedd19eacb771ef8a1cf91e00e169c270251e897c31e0bb02c72dd',
        'vout': 0,
        'address': '14UeQ9fKbhnbF7TS9hHq6kNuSWhXZ7pZ6G',
        'amount': 708140,
        'confirmations': 2345,
        'tx': {
          'txid': '1e9280fd6feedd19eacb771ef8a1cf91e00e169c270251e897c31e0bb02c72dd',
          'version': 2,
          'locktime': 545133,
          'vin': [
            {
              'txid': 'ed9bc9a10f83ede934130bcc59c18bb23f52717101351aa30ed8470af928f863',
              'vout': 1,
              'sequence': 4294967293,
              'n': 0,
              'scriptSig': {
                'hex': '160014621a0561c6ee66e30ca3619f4d396e57a634fe3a',
                'asm': '0014621a0561c6ee66e30ca3619f4d396e57a634fe3a'
              },
              'addr': '33HtYRiMWs8kczfYaYiSvB864fW377G88X',
              'valueSat': 1360532,
              'value': 0.01360532,
              'doubleSpentTxID': null
            },
            {
              'txid': '4d52235ed86fb674acf86effbb07e0cdcb2f421c661a0ffb08208d2b61a728ae',
              'vout': 0,
              'sequence': 4294967293,
              'n': 1,
              'scriptSig': {
                'hex': '160014bb458753e889bb6925537a6c3f38e2b48fb14646',
                'asm': '0014bb458753e889bb6925537a6c3f38e2b48fb14646'
              },
              'addr': '3K6UybJHCfCdsahAwfwBsdKTAmnnE1sLFE',
              'valueSat': 1193209,
              'value': 0.01193209,
              'doubleSpentTxID': null
            }
          ],
          'vout': [
            {
              'value': '0.00708140',
              'n': 0,
              'scriptPubKey': {
                'hex': '76a9142622d3d9888f5d8ae053a64b1765a9e144baff0288ac',
                'asm': 'OP_DUP OP_HASH160 2622d3d9888f5d8ae053a64b1765a9e144baff02 OP_EQUALVERIFY OP_CHECKSIG',
                'addresses': [
                  '14UeQ9fKbhnbF7TS9hHq6kNuSWhXZ7pZ6G'
                ],
                'type': 'pubkeyhash'
              },
              'spentTxId': null,
              'spentIndex': null,
              'spentHeight': null
            },
            {
              'value': '0.01840421',
              'n': 1,
              'scriptPubKey': {
                'hex': 'a9148784016eabe787fb2badb719cfcace0312ae69c687',
                'asm': 'OP_HASH160 8784016eabe787fb2badb719cfcace0312ae69c6 OP_EQUAL',
                'addresses': [
                  '3E3ZHMGyWd8CTK6xkqCVH594gP449gFF2V'
                ],
                'type': 'scripthash'
              },
              'spentTxId': '121968c8eb252a380eefb626a25e319321757ee953a80e93294535cc799a3893',
              'spentIndex': 0,
              'spentHeight': 545140
            }
          ],
          'blockhash': '0000000000000000001ea5b0e590eed57bba8282170b611117b1a10990c0b48c',
          'blockheight': 545134,
          'confirmations': 2345,
          'time': 1539159137,
          'blocktime': 1539159137,
          'valueOut': 0.02548561,
          'size': 204,
          'valueIn': 0.02553741,
          'fees': 0.0000518
        }
      }
    ],
    'outputs': [
      {
        'address': '14UeQ9fKbhnbF7TS9hHq6kNuSWhXZ7pZ6G',
        'amount': 20000,
        'is_change': false
      },
      {
        'address': '1HDF6nL3PS7QeQ3FoSLryV7US1v94vdSnp',
        'amount': 685719,
        'is_change': true,
        'index': 0,
        'relpath': '1/0'
      }
    ],
    'fee': 2421
  }
}

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

window.allPings = []

const log = (name, p) => {
  console.log('sending', name)
  return window.allPings.push(p.then(res => console.log(`${name} response:`, res))
    .catch(e => console.error(`${name} error:`, e)))
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
  log('cancelPending', window.keepkey.device.cancelPending())
}
