
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { LmSmsSDK } from '..'


describe('exists', async () => {

  test('test-mode', () => {
    const testsdk = LmSmsSDK.test()
    equal(testsdk instanceof LmSmsSDK, true,
      'LmSmsSDK.test() must return a client synchronously')
  })

})
