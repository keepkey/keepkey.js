import Messages from './kkProto/messages_pb'
import { arrayify } from './utils'

// Temporarily copy this in from ethers js until their elliptic dep stops being circular
export interface Transaction {
  hash?: string
  to?: string
  from?: string
  nonce: number
  gasLimit: string // Hex String
  gasPrice: string // Hex String
  data: string
  value: string // Hex String
  chainId: number
  r?: string
  s?: string
  v?: number
}

export interface TokenTx {
  ethereumTx: Transaction
  tokenTo: string
  tokenValue: string
  tokenShortcut: string
}

export function ethTxAsProto (tx: Transaction, nodePath: number[]): Messages.EthereumSignTx {
  const est = new Messages.EthereumSignTx()
  est.setAddressNList(nodePath)

  // For proper rlp encoding when the value of the  parameter is zero,
	// the device expects an empty byte array instead of
  // a byte array with a value of zero
  if (tx.value) {
    est.setValue(emptyOrVal(tx.value))
  }
  if (tx.gasLimit) {
    est.setValue(emptyOrVal(tx.gasLimit))
  }
  if (tx.gasPrice) {
    est.setValue(emptyOrVal(tx.gasPrice))
  }
  return est
}

function emptyOrVal (val: string): Uint8Array {
  if (!val) return new Uint8Array()
  else return arrayify(val)
}

export function newTokenTransaction (tx: Transaction, tShortCut: string, tRecipient: string, tValue: string): TokenTx {
  return {
    ethereumTx: tx,
    tokenShortcut: tShortCut,
    tokenTo: tRecipient,
    tokenValue: tValue
  }
}
