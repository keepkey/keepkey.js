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

window.handlePinDigit = function (digit) {
  let input = document.getElementById('#pinInput')
  if (digit === "") {
    input.value = input.value.slice(0, -1);
  } else {
    input.value += digit.toString();
  }
}

window.pinOpen = function () {
  document.getElementById('#pinModal').className = 'modale opened'
}

window.pinEntered = function () {
  let input = document.getElementById('#pinInput')
  window.keepkey.acknowledgeWithPin(input.value);
  document.getElementById('#pinModal').className='modale';
}

window.passphraseOpen = function () {
  document.getElementById('#passphraseModal').className = 'modale opened'
}

window.passphraseEntered = function () {
  let input = document.getElementById('#passphraseInput')
  window.keepkey.acknowledgeWithPassphrase(input.value);
  document.getElementById('#passphraseModal').className='modale';
}

window.showXpub = function (path, coin) {
  if (!window.keepkey.getPublicKey) {
    console.error("Need to pair your KeepKey first!");
    return;
  }

  window.keepkey.getPublicKey({
    addressNList: path,
    showDisplay: true,
    coinName: coin
  })
}

window.tellXpub = async function (path, coin) {
  return await window.keepkey.getPublicKey({
    addressNList: path,
    showDisplay: false,
    coinName: coin
  })
  .then((pk) => pk[1])
}

window.accountIdx = 0;

window.prevAccount = function (selector) {
  window.accountIdx = window.accountIdx > 0 ? window.accountIdx - 1 : 0;
  window.buildXpubTable(selector)
}

window.nextAccount = function (selector) {
  window.accountIdx++;
  window.buildXpubTable(selector)
}

window.buildXpubTable = async function (selector) {
  if (!window.keepkey.getPublicKey) {
    console.error("Need to pair your KeepKey first!");
    return;
  }

  let tbl = document.getElementById(selector)
  tbl.innerHTML = '';

  let tr;
  let th;

  // Header
  tbl.insertAdjacentHTML('beforeend', "<tr><th>Icon</th><th>Account Name</th><th>BIP32 Path</th><th>XPUB</th><th>Show</th></tr>")


  let makeButton = function (ticker, coin, slip44, account) {
    return "<button class='button button-outline' onclick='showXpub([0x80000000+44, 0x80000000+" + slip44 + ", 0x80000000+" + account + "], \"" + coin + "\")'>View</button>"
  }

  let makeRow = async function (ticker, coin, slip44, account) {
    return (
      "<tr>" +
        "<td><img src=\"https://static.coincap.io/assets/icons/svg/" + ticker + ".svg\"/></td>" +
        "<td style=\"white-space:nowrap;\">" + coin + " Account #" + account + "</td>" +
        "<td>m/44'/" + slip44 + "'/" + account + "'</td>" +
        "<td style=\"word-break:break-all;\">" + (await window.tellXpub([0x80000000+44, 0x80000000+slip44,0x80000000+account], coin)) + "</td>" +
        "<td>" + makeButton(ticker, coin, slip44, account) + "</td>" +
      "</tr>"
    );
  }

  // Rows
  tbl.insertAdjacentHTML('beforeend', await makeRow('btc', 'Bitcoin', 0, window.accountIdx))
  tbl.insertAdjacentHTML('beforeend', await makeRow('bch', 'BitcoinCash', 0x91, window.accountIdx))
  tbl.insertAdjacentHTML('beforeend', await makeRow('btg', 'BitcoinGold', 0x9c, window.accountIdx))
  tbl.insertAdjacentHTML('beforeend', await makeRow('ltc', 'Litecoin', 2, window.accountIdx))
  tbl.insertAdjacentHTML('beforeend', await makeRow('dash', 'Dash', 5, window.accountIdx))
  tbl.insertAdjacentHTML('beforeend', await makeRow('doge', 'Dogecoin', 3, window.accountIdx))
}

window.pairUnlockAndBuildTable = async function (selector) {
  await window.keepkey.WebUSBDevice.requestPair();

  manager.initializeWebUSBDevices()
    .then(() => {
      if (manager.initializedCount) {
        const k = manager.get()
        window.keepkey = k
      }
    })
    .catch(e => {
      console.error('Error connecting over WebUSB')
      console.error(String(e))
    })
    .then(() => {
      const MESSAGETYPE_PINMATRIXREQUEST = 18; // FIXME: how do I retrieve this the 'right' way?
      const MESSAGETYPE_PASSPHRASEREQUEST = 41; // FIXME
      window.keepkey.device.events.on(String(MESSAGETYPE_PINMATRIXREQUEST), (event) => {
        window.pinOpen();
      });
      window.keepkey.device.events.on(String(MESSAGETYPE_PASSPHRASEREQUEST), (event) => {
        window.passphraseOpen();
      });
    })
    .then(() => {
      // Ask the device to prompt for PIN/Passphrase, if needed.
      return manager.exec('ping', {
        message: "unlock",
        buttonProtection: false,
        pinProtection: true,
        passphraseProtection: true
      });
    })
    .then(() => window.buildXpubTable(selector))
}
