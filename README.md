# keepkey.js 

[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
[![Coveralls](https://img.shields.io/coveralls/keepkey/keepkey.js.svg)](https://coveralls.io/github/keepkey/keepkey.js)
[![Dev Dependencies](https://david-dm.org/keepkey/keepkey.js/dev-status.svg)](https://david-dm.org/keepkey/keepkey.js?type=dev)

A library for interacting with a KeepKey hardware wallet over WebUSB.

### [Documentation](https://keepkey.github.io/keepkey.js/index.html)

WebUSB requires `https` to work, try the library out here! [https://example-ldjlfnposh.now.sh](https://example-ldjlfnposh.now.sh)

- [keepkey.js](#keepkeyjs)
    - [Documentation](#documentation)
    - [Installation](#installation)
    - [Importing library](#importing-library)
    - [Usage](#usage)
    - [Handling Prompt Events](#handling-prompt-events)
      - [Event Types](#event-types)
    - [Recovering a device with a seed phrase](#recovering-a-device-with-a-seed-phrase)
    - [Building](#building)
      - [Updating `device-protocol` proto's](#updating-device-protocol-protos)
    - [Developing](#developing)

### Installation

```bash
yarn add @keepkey/keepkey.js
```

### Importing library

You can import the generated bundle to use the whole library generated by this starter:

```javascript
import { KeepKeyManager, KeepKey, WebUSBDevice, Messages, Types, messageTypeRegistry, ... } from 'keepkey'
```

Additionally, you can import the transpiled modules from `dist/lib` in case you have a modular library:

```javascript
import KeepKey from 'keepkey/dist/lib/keepkey'
import WebUSBDevice from 'keepkey/dist/lib/webUSBDevice'
```

### Usage

The recommended way to use the library is with the KeepKeyManager interface, which will handle initializing, getting, and removing KeepKeys. WebUSB is Chrome only.

```javascript
import { KeepKeyManager, WebUSBDevice } from 'keepkey'

await WebUSBDevice.requestPair() // Prompt the user to pair a KeepKey

const keepkeyManager = new KeepKeyManager({
  onConnectCallback: (deviceID) => console.log('device was connected!'), // These callbacks only work with webUSB at the moment
  onDisconnectCallback: (deviceID) => console.log('device was disconnected!') 
})

await keepkeyManager.initializeWebUSBDevices()

// Ping all connected devices with a TEST message
const pingsByDeviceID = keepkeyManager.exec('ping', 'TEST')
// { "YOUR-DEVICE-ID": "TEST" }

// Get the KeepKey for the first deviceID in the manager
const keepkey = manager.get()

// You can also pass a deviceID if you're dealing with multiple devices
const keepkey = manager.get("YOUR-DEVICE-ID")

// all public keepkey methods return promises
const { message } = await keepkey.ping('test') 
keepkey.ping('test').then(response => console.log(response.message))
```

You can also use a device instance to roll your own messaging

```javascript

import { WebUSBDevice, Messages } from 'keepkey'

const usbDevice = await WebUSBDevice.requestPair()

const device = new WebUSBDevice({ usbDevice })

const ping = new Messages.Ping()
ping.setMessage('TEST')

// responseTypeEnum will be 2, because ping responds with a success message
// responseMessage will be an instance Messages.Success
const [responseTypeEnum, responseMessage] = await device.exchange(
  Messages.MessaageType.MESSAGETYPE_PING,
  ping
)

console.log(responseMessage.toObject().message) // will be 'TEST'

```

### Handling Prompt Events

The `KeepKeyManager` exposes an event emitter - `keepkeyManager.deviceEvents` that decorates all events emitted by `keepkey.device.promptEvents` with the ID of the device that emitted it.

Both `keepkeyManager.deviceEvents` and `keepkey.device.promptEvents` are instances of [eventemitter2](https://www.npmjs.com/package/eventemitter2) because the `KeepKeyManager` can emit events for all initialized devices.

Devices that have already been paired, and get connected during your app's runtime will automatically be added to the `KeepKeyManager` and start emitting events.

```javascript

import { KeepKeyManager, Messages } from 'keepkey'
const { MessageType: { MESSAGETYPE_FAILURE } } = Messages

const keepkeyManager = new KeepKeyManager()

// Will automatically initialize devices and bubble up events for found devices
await keepkeyManager.initializeWebUSBDevices()

// This will listen for the failure event on all devices
keepkeyManager.deviceEvents.on([String(MESSAGETYPE_FAILURE), '*'], (deviceID, ...args) => {
  console.log(`${deviceID} emitted an error. UH OH`)
})

// You can also subscribe to the actual device id
keepkeyManager.deviceEvents.on([String(MESSAGETYPE_FAILURE), '5B58BDA6CE3B9404BA6B660D'], (deviceID, ...args) => {
  console.log(`5B58BDA6CE3B9404BA6B660D emitted an error. UH OH`)
})

// or just listen to the keepkey's prompt events directly:
keepkeyManager.get('5B58BDA6CE3B9404BA6B660D').device.promptEvents.on(String(MESSAGETYPE_FAILURE), (deviceID, ...args) => {
  console.log(`I emitted an error. UH OH`)
})

```

#### Event Types

Here are the prompt events that get emitted in response to various prompts:

```javascript
import { KeepKeyManager, Messages } from 'keepkey'
const { MessageType: {
    // The following are emitted in response to received messages so your application
    // can respond appropriately by calling a method like `keepkey.acknowledgeWinPin()`
    MESSAGETYPE_PINMATRIXACK,
    MESSAGETYPE_FAILURE,
    MESSAGETYPE_BUTTONREQUEST,
    MESSAGETYPE_PINMATRIXREQUEST,
    MESSAGETYPE_PASSPHRASEREQUEST,
    MESSAGETYPE_CHARACTERREQUEST
}} = Messages

```

When the device prompts a user for a button press, or pin, the device will emit an event on its `k.device.promptEvents` event emitter.

```javascript

import { KeepKey, Messages } from 'keepkey'

const { MessageType } = Messages

const {
  MESSAGETYPE_BUTTONREQUEST,
  MESSAGETYPE_PINMATRIXREQUEST,
  MESSAGETYPE_PASSPHRASEREQUEST
} = MessageType

// Initialize KeepKey
const keepkey = KeepKey.withWebUSB()

keepkey.device.promptEvents.on(String(MESSAGETYPE_BUTTONREQUEST), (btnRequestMsg) => {
  const { code, data } = btnRequest
})

keepkey.changePin() // Will cause prompt events to fire

```

### Recovering a device with a seed phrase

Recovering with seed words using a wiped device.
```javascript
window.k.recoveryDevice(12, false, false, "Testy McTestFace")
```

At this point, KeepKey will display a one-time-pad alphebet cipher.
Using the cipher displayed on KeepKey's screen to translate characters,
input the seed word character sequence. Note that the cipher will mutate
after each character is input.
```javascript
window.k.acknowledgeWithCharacter("X")
```

When KeepKey displays a checkmark next to a complete word that you are entering,
you move to the next word input by sending KeepKey a space character.
```javascript
window.k.acknowledgeWithCharacter(" ")
```

Two additional methods facilitate deletion and completion of the
recovery sequence.
```javascript
window.k.acknowledgeWithCharacterDelete()
window.k.acknowledgeWithCharacterDone()
```

### Building

First, run `yarn` to get dependencies.

Run `yarn make:protos` to compile KeepKey proto files into `src/proto.json` and `src/kkProto` code and type definitions.

Run `yarn build` to create `umd`, `commonjs`, and `browser` bundles in the `/dist` direcory.

Run `yarn make:example` to build, and copy browser bundles to the `/example` static site. You can then deploy the the `example` directory to a webserver with `https` so `WebUSB` works. For example: `yarn make:example && now example`

#### Updating `device-protocol` proto's

Grab the desired commit hash from [github.com/KeepKey/device-protocol](github.com/KeepKey/device-protocol) and update it in `package.json` a la:

```json
{
  "dependencies": {
    "device-protocol": "git+https://git@github.com/KeepKey/device-protocol.git#4ee29339fb8a9c916bcba9079aebd5254a16df08",
  }
}
```

then run `yarn make:protos` to compile new code from the updated protos.

### Developing

When developing with WebUSB devices, you'll need an `https` connection, and configure your browser to `allow insecure localhost`

To compile and watch the browser bundle, run `yarn dev:example`

Then, `cd example`, and `python server.py` to run a server with ssl that runs on  `localhost:8888`
`