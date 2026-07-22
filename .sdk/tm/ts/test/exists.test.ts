
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { LmSmsSDK } from '..'


describe('exists', async () => {

  test('test-mode', async () => {
    const testsdk = await LmSmsSDK.test()
    equal(null !== testsdk, true)
  })

})
