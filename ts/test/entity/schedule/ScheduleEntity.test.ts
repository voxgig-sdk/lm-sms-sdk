
const envlocal = __dirname + '/../../../.env.local'
require('dotenv').config({ quiet: true, path: [envlocal] })

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'


import { LmSmsSDK, BaseFeature, stdutil } from '../../..'

import {
  envOverride,
  liveDelay,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
  maybeSkipControl,
} from '../../utility'


describe('ScheduleEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when LM_SMS_TEST_LIVE=TRUE.
  afterEach(liveDelay('LM_SMS_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = LmSmsSDK.test()
    const ent = testsdk.Schedule()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.LM_SMS_TEST_LIVE
    for (const op of ['list', 'update', 'load']) {
      if (maybeSkipControl(t, 'entityOp', 'schedule.' + op, live)) return
    }

    const setup = basicSetup()
    // The basic flow consumes synthetic IDs and field values from the
    // fixture (entity TestData.json). Those don't exist on the live API.
    // Skip live runs unless the user provided a real ENTID env override.
    if (setup.syntheticOnly) {
      t.skip('live entity test uses synthetic IDs from fixture — set LM_SMS_TEST_SCHEDULE_ENTID JSON to run live')
      return
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let schedule_ref01_data = Object.values(setup.data.existing.schedule)[0] as any

    // LIST
    const schedule_ref01_ent = client.Schedule()
    const schedule_ref01_match: any = {}

    const schedule_ref01_list = (await schedule_ref01_ent.list(schedule_ref01_match)).map((e: any) => e.data())


    // UPDATE
    const schedule_ref01_data_up0: any = {}

    const schedule_ref01_markdef_up0 = { name: 'messageId', value: 'Mark01-schedule_ref01_' + setup.now }
    ;(schedule_ref01_data_up0 as any)[schedule_ref01_markdef_up0.name] = schedule_ref01_markdef_up0.value

    const schedule_ref01_resdata_up0 = (await schedule_ref01_ent.update(schedule_ref01_data_up0)).data()
    assert(null != schedule_ref01_resdata_up0)

    assert((schedule_ref01_resdata_up0 as any)[schedule_ref01_markdef_up0.name] === schedule_ref01_markdef_up0.value)



  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/schedule/ScheduleTestData.json')

  // TODO: file ready util needed?
  const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8')

  // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
  const entityData = JSON.parse(entityDataSource)

  options.entity = entityData.existing

  let client = LmSmsSDK.test(options, extra)
  const struct = client.utility().struct
  const merge = struct.merge
  const transform = struct.transform

  let idmap = transform(
    ['schedule01','schedule02','schedule03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  // Detect whether the user provided a real ENTID JSON via env var. The
  // basic flow consumes synthetic IDs from the fixture file; without an
  // override those synthetic IDs reach the live API and 4xx. Surface this
  // to the test so it can skip rather than fail.
  const idmapEnvVal = process.env['LM_SMS_TEST_SCHEDULE_ENTID']
  const idmapOverridden = null != idmapEnvVal && idmapEnvVal.trim().startsWith('{')

  const env = envOverride({
    'LM_SMS_TEST_SCHEDULE_ENTID': idmap,
    'LM_SMS_TEST_LIVE': 'FALSE',
    'LM_SMS_TEST_EXPLAIN': 'FALSE',
    'LM_SMS_APIKEY': 'NONE',
  })

  idmap = env['LM_SMS_TEST_SCHEDULE_ENTID']

  const live = 'TRUE' === env.LM_SMS_TEST_LIVE

  if (live) {
    client = new LmSmsSDK(merge([
      {
        apikey: env.LM_SMS_APIKEY,
      },
      extra
    ]))
  }

  const setup = {
    idmap,
    env,
    options,
    client,
    struct,
    data: entityData,
    explain: 'TRUE' === env.LM_SMS_TEST_EXPLAIN,
    live,
    syntheticOnly: live && !idmapOverridden,
    now: Date.now(),
  }

  return setup
}
  
