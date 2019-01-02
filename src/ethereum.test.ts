import * as ethereum from './ethereum'

const sampleTransaction: ethereum.Transaction = {
  nonce: 0,
  gasLimit: '0x0',
  gasPrice: '0x0',
  data: 'test',
  value: '0x0',
  chainId: 0
}

describe('ethereum', () => {
  test('newTokenTransaction', () => {
    expect(ethereum.newTokenTransaction(sampleTransaction, 'shortCut', 'recipient', 'value')).toEqual(
      expect.objectContaining({
        ethereumTx: expect.objectContaining(sampleTransaction),
        tokenShortcut: 'shortCut',
        tokenTo: 'recipient',
        tokenValue: 'value'
      })
    )
  })
})
