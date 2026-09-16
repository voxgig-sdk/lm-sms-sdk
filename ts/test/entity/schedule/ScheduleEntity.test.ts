

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { LmSmsSDK, BaseFeature, stdutil } from '../../..'

import {
  envOverride,
  liveClientOptions,
  liveDelay,
  loadEnvLocal,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
  maybeSkipControl,
} from '../../utility'


// AFTER the imports on purpose: TypeScript hoists `import` above any
// statement in the emitted CommonJS, so a loader placed above them would
// run only after every imported module had already been evaluated - and
// anything reading process.env at module scope would miss these values.
loadEnvLocal(__dirname + '/../../../.env.local')


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
      if (!live && maybeSkipControl(t, 'entityOp', 'schedule.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"id","req":false,"type":"`$STRING`","index$":0},{"active":true,"format":"uuid","name":"messageId","req":false,"type":"`$STRING`","index$":1},{"active":true,"name":"recipient","req":false,"type":"`$STRING`","index$":2},{"active":true,"format":"date-time","name":"scheduledAtDate","req":false,"type":"`$STRING`","index$":3},{"active":true,"format":"date-time","name":"sendAtDate","req":false,"type":"`$STRING`","index$":4},{"active":true,"name":"tag","req":false,"type":"`$STRING`","index$":5}],"id":{"field":"id","name":"id"},"name":"schedule","op":{"list":{"input":"data","name":"list","points":[{"active":true,"args":{"query":[{"active":true,"kind":"query","name":"end","orig":"end","reqd":false,"type":"`$STRING`","index$":0},{"active":true,"example":1,"kind":"query","name":"page","orig":"page","reqd":false,"type":"`$INTEGER`","index$":1},{"active":true,"example":25,"kind":"query","name":"size","orig":"size","reqd":false,"type":"`$INTEGER`","index$":2},{"active":true,"kind":"query","name":"sort","orig":"sort","reqd":false,"type":"`$ARRAY`","index$":3},{"active":true,"kind":"query","name":"start","orig":"start","reqd":false,"type":"`$STRING`","index$":4},{"active":true,"kind":"query","name":"tag","orig":"tag","reqd":false,"type":"`$STRING`","index$":5}]},"contract":{"id":"GET /sms/v1/schedules","json":"{\"parameters\":[{\"description\":\"List of fields used to sort results\",\"in\":\"query\",\"name\":\"sort\",\"schema\":{\"items\":{\"type\":\"string\"},\"type\":\"array\"}},{\"description\":\"Requested page\",\"in\":\"query\",\"name\":\"page\",\"schema\":{\"default\":1,\"format\":\"int32\",\"type\":\"integer\"}},{\"description\":\"Number of items per page\",\"in\":\"query\",\"name\":\"size\",\"schema\":{\"default\":25,\"format\":\"int32\",\"maximum\":100,\"minimum\":0,\"type\":\"integer\"}},{\"description\":\"Return schedule sending related with the same tag\",\"in\":\"query\",\"name\":\"tag\",\"schema\":{\"type\":\"string\"}},{\"description\":\"Return sending with scheduled date after start date\",\"in\":\"query\",\"name\":\"start\",\"schema\":{\"format\":\"date-time\",\"type\":\"string\"}},{\"description\":\"Return sending with scheduled date before end date\",\"in\":\"query\",\"name\":\"end\",\"schema\":{\"format\":\"date-time\",\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"items\":{\"additionalProperties\":false,\"properties\":{\"messageId\":{\"format\":\"uuid\",\"type\":\"string\"},\"recipient\":{\"nullable\":true,\"type\":\"string\"},\"scheduledAtDate\":{\"format\":\"date-time\",\"type\":\"string\"},\"sendAtDate\":{\"format\":\"date-time\",\"type\":\"string\"},\"tag\":{\"nullable\":true,\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"}}},\"description\":\"Success\"},\"400\":{\"content\":{\"application/json\":{\"schema\":{\"additionalProperties\":false,\"properties\":{\"message\":{\"description\":\"Human-readable summary of the problem.\",\"nullable\":true,\"type\":\"string\"},\"requestId\":{\"description\":\"Unique Id of the request made towards LINK\",\"format\":\"uuid\",\"type\":\"string\"}},\"required\":[\"requestId\"],\"type\":\"object\"}}},\"description\":\"Bad Request\"},\"401\":{\"content\":{\"application/json\":{\"schema\":{\"additionalProperties\":false,\"properties\":{\"code\":{\"nullable\":true,\"type\":\"string\"},\"description\":{\"nullable\":true,\"type\":\"string\"},\"requestId\":{\"format\":\"uuid\",\"type\":\"string\"}},\"required\":[\"requestId\"],\"type\":\"object\"}}},\"description\":\"Unauthorized\"},\"403\":{\"description\":\"Forbidden\"},\"429\":{\"content\":{\"application/json\":{\"schema\":{\"additionalProperties\":false,\"properties\":{\"code\":{\"nullable\":true,\"type\":\"string\"},\"description\":{\"nullable\":true,\"type\":\"string\"},\"requestId\":{\"format\":\"uuid\",\"type\":\"string\"}},\"required\":[\"requestId\"],\"type\":\"object\"}}},\"description\":\"Too Many Requests\"},\"500\":{\"content\":{\"application/json\":{\"schema\":{\"additionalProperties\":false,\"properties\":{\"code\":{\"nullable\":true,\"type\":\"string\"},\"description\":{\"nullable\":true,\"type\":\"string\"},\"requestId\":{\"format\":\"uuid\",\"type\":\"string\"}},\"required\":[\"requestId\"],\"type\":\"object\"}}},\"description\":\"Server Error\"},\"502\":{\"content\":{\"application/json\":{\"schema\":{\"additionalProperties\":false,\"properties\":{\"code\":{\"nullable\":true,\"type\":\"string\"},\"description\":{\"nullable\":true,\"type\":\"string\"},\"requestId\":{\"format\":\"uuid\",\"type\":\"string\"}},\"required\":[\"requestId\"],\"type\":\"object\"}}},\"description\":\"Server Error\"}},\"security\":[{\"Bearer\":[]}],\"securitySchemes\":{\"Bearer\":{\"description\":\"Bearer token\",\"flows\":{\"clientCredentials\":{\"scopes\":{},\"tokenUrl\":\"https://sso.linkmobility.com/auth/realms/CPaaS/protocol/openid-connect/token\"}},\"type\":\"oauth2\"}},\"securitySource\":\"definition\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/sms/v1/schedules","segments":[{"lit":"sms"},{"lit":"v1"},{"lit":"schedules"}],"select":{"exist":["end","page","size","sort","start","tag"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"active":true,"args":{"params":[{"active":true,"kind":"param","name":"id","orig":"message_id","reqd":true,"type":"`$STRING`","index$":0}]},"contract":{"id":"GET /sms/v1/schedules/{messageId}","json":"{\"parameters\":[{\"in\":\"path\",\"name\":\"messageId\",\"required\":true,\"schema\":{\"format\":\"uuid\",\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"additionalProperties\":false,\"properties\":{\"messageId\":{\"format\":\"uuid\",\"type\":\"string\"},\"recipient\":{\"nullable\":true,\"type\":\"string\"},\"scheduledAtDate\":{\"format\":\"date-time\",\"type\":\"string\"},\"sendAtDate\":{\"format\":\"date-time\",\"type\":\"string\"},\"tag\":{\"nullable\":true,\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Success\"},\"400\":{\"content\":{\"application/json\":{\"schema\":{\"additionalProperties\":false,\"properties\":{\"code\":{\"nullable\":true,\"type\":\"string\"},\"description\":{\"nullable\":true,\"type\":\"string\"},\"requestId\":{\"format\":\"uuid\",\"type\":\"string\"}},\"required\":[\"requestId\"],\"type\":\"object\"}}},\"description\":\"Bad Request\"},\"401\":{\"content\":{\"application/json\":{\"schema\":{\"additionalProperties\":false,\"properties\":{\"code\":{\"nullable\":true,\"type\":\"string\"},\"description\":{\"nullable\":true,\"type\":\"string\"},\"requestId\":{\"format\":\"uuid\",\"type\":\"string\"}},\"required\":[\"requestId\"],\"type\":\"object\"}}},\"description\":\"Unauthorized\"},\"403\":{\"description\":\"Forbidden\"},\"429\":{\"content\":{\"application/json\":{\"schema\":{\"additionalProperties\":false,\"properties\":{\"code\":{\"nullable\":true,\"type\":\"string\"},\"description\":{\"nullable\":true,\"type\":\"string\"},\"requestId\":{\"format\":\"uuid\",\"type\":\"string\"}},\"required\":[\"requestId\"],\"type\":\"object\"}}},\"description\":\"Too Many Requests\"},\"500\":{\"content\":{\"application/json\":{\"schema\":{\"additionalProperties\":false,\"properties\":{\"code\":{\"nullable\":true,\"type\":\"string\"},\"description\":{\"nullable\":true,\"type\":\"string\"},\"requestId\":{\"format\":\"uuid\",\"type\":\"string\"}},\"required\":[\"requestId\"],\"type\":\"object\"}}},\"description\":\"Server Error\"},\"502\":{\"content\":{\"application/json\":{\"schema\":{\"additionalProperties\":false,\"properties\":{\"code\":{\"nullable\":true,\"type\":\"string\"},\"description\":{\"nullable\":true,\"type\":\"string\"},\"requestId\":{\"format\":\"uuid\",\"type\":\"string\"}},\"required\":[\"requestId\"],\"type\":\"object\"}}},\"description\":\"Server Error\"}},\"security\":[{\"Bearer\":[]}],\"securitySchemes\":{\"Bearer\":{\"description\":\"Bearer token\",\"flows\":{\"clientCredentials\":{\"scopes\":{},\"tokenUrl\":\"https://sso.linkmobility.com/auth/realms/CPaaS/protocol/openid-connect/token\"}},\"type\":\"oauth2\"}},\"securitySource\":\"definition\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/sms/v1/schedules/{messageId}","rename":{"param":{"messageId":"id"}},"segments":[{"lit":"sms"},{"lit":"v1"},{"lit":"schedules"},{"var":"id"}],"select":{"exist":["id"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"},"remove":{"input":"data","name":"remove","points":[{"active":true,"args":{"query":[{"active":true,"kind":"query","name":"message_id","orig":"message_id","reqd":false,"type":"`$STRING`","index$":0},{"active":true,"kind":"query","name":"tag","orig":"tag","reqd":false,"type":"`$STRING`","index$":1}]},"contract":{"id":"DELETE /sms/v1/schedules","json":"{\"parameters\":[{\"in\":\"query\",\"name\":\"messageId\",\"schema\":{\"format\":\"uuid\",\"type\":\"string\"}},{\"in\":\"query\",\"name\":\"tag\",\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"additionalProperties\":false,\"properties\":{\"messageId\":{\"format\":\"uuid\",\"type\":\"string\"},\"recipient\":{\"nullable\":true,\"type\":\"string\"},\"scheduledAtDate\":{\"format\":\"date-time\",\"type\":\"string\"},\"sendAtDate\":{\"format\":\"date-time\",\"type\":\"string\"},\"tag\":{\"nullable\":true,\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Success\"},\"400\":{\"content\":{\"application/json\":{\"schema\":{\"additionalProperties\":false,\"properties\":{\"code\":{\"nullable\":true,\"type\":\"string\"},\"description\":{\"nullable\":true,\"type\":\"string\"},\"requestId\":{\"format\":\"uuid\",\"type\":\"string\"}},\"required\":[\"requestId\"],\"type\":\"object\"}}},\"description\":\"Bad Request\"},\"401\":{\"content\":{\"application/json\":{\"schema\":{\"additionalProperties\":false,\"properties\":{\"code\":{\"nullable\":true,\"type\":\"string\"},\"description\":{\"nullable\":true,\"type\":\"string\"},\"requestId\":{\"format\":\"uuid\",\"type\":\"string\"}},\"required\":[\"requestId\"],\"type\":\"object\"}}},\"description\":\"Unauthorized\"},\"403\":{\"description\":\"Forbidden\"},\"429\":{\"content\":{\"application/json\":{\"schema\":{\"additionalProperties\":false,\"properties\":{\"code\":{\"nullable\":true,\"type\":\"string\"},\"description\":{\"nullable\":true,\"type\":\"string\"},\"requestId\":{\"format\":\"uuid\",\"type\":\"string\"}},\"required\":[\"requestId\"],\"type\":\"object\"}}},\"description\":\"Too Many Requests\"},\"500\":{\"content\":{\"application/json\":{\"schema\":{\"additionalProperties\":false,\"properties\":{\"code\":{\"nullable\":true,\"type\":\"string\"},\"description\":{\"nullable\":true,\"type\":\"string\"},\"requestId\":{\"format\":\"uuid\",\"type\":\"string\"}},\"required\":[\"requestId\"],\"type\":\"object\"}}},\"description\":\"Server Error\"},\"502\":{\"content\":{\"application/json\":{\"schema\":{\"additionalProperties\":false,\"properties\":{\"code\":{\"nullable\":true,\"type\":\"string\"},\"description\":{\"nullable\":true,\"type\":\"string\"},\"requestId\":{\"format\":\"uuid\",\"type\":\"string\"}},\"required\":[\"requestId\"],\"type\":\"object\"}}},\"description\":\"Server Error\"}},\"security\":[{\"Bearer\":[]}],\"securitySchemes\":{\"Bearer\":{\"description\":\"Bearer token\",\"flows\":{\"clientCredentials\":{\"scopes\":{},\"tokenUrl\":\"https://sso.linkmobility.com/auth/realms/CPaaS/protocol/openid-connect/token\"}},\"type\":\"oauth2\"}},\"securitySource\":\"definition\"}","source":"openapi3","version":1},"kind":"http","method":"DELETE","orig":"/sms/v1/schedules","segments":[{"lit":"sms"},{"lit":"v1"},{"lit":"schedules"}],"select":{"exist":["message_id","tag"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"remove"},"update":{"input":"data","name":"update","points":[{"active":true,"args":{"params":[{"active":true,"kind":"param","name":"id","orig":"message_id","reqd":true,"type":"`$STRING`","index$":0}]},"contract":{"id":"PATCH /sms/v1/schedules/{messageId}","json":"{\"parameters\":[{\"in\":\"path\",\"name\":\"messageId\",\"required\":true,\"schema\":{\"format\":\"uuid\",\"type\":\"string\"}}],\"protocol\":\"http\",\"requestBody\":{\"content\":{\"application/json\":{\"schema\":{\"additionalProperties\":false,\"properties\":{\"sendAtDate\":{\"format\":\"date-time\",\"type\":\"string\"}},\"type\":\"object\"}}}},\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"additionalProperties\":false,\"properties\":{\"messageId\":{\"format\":\"uuid\",\"type\":\"string\"},\"recipient\":{\"nullable\":true,\"type\":\"string\"},\"scheduledAtDate\":{\"format\":\"date-time\",\"type\":\"string\"},\"sendAtDate\":{\"format\":\"date-time\",\"type\":\"string\"},\"tag\":{\"nullable\":true,\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Success\"},\"400\":{\"content\":{\"application/json\":{\"schema\":{\"additionalProperties\":false,\"properties\":{\"code\":{\"nullable\":true,\"type\":\"string\"},\"description\":{\"nullable\":true,\"type\":\"string\"},\"requestId\":{\"format\":\"uuid\",\"type\":\"string\"}},\"required\":[\"requestId\"],\"type\":\"object\"}}},\"description\":\"Bad Request\"},\"401\":{\"content\":{\"application/json\":{\"schema\":{\"additionalProperties\":false,\"properties\":{\"code\":{\"nullable\":true,\"type\":\"string\"},\"description\":{\"nullable\":true,\"type\":\"string\"},\"requestId\":{\"format\":\"uuid\",\"type\":\"string\"}},\"required\":[\"requestId\"],\"type\":\"object\"}}},\"description\":\"Unauthorized\"},\"403\":{\"description\":\"Forbidden\"},\"429\":{\"content\":{\"application/json\":{\"schema\":{\"additionalProperties\":false,\"properties\":{\"code\":{\"nullable\":true,\"type\":\"string\"},\"description\":{\"nullable\":true,\"type\":\"string\"},\"requestId\":{\"format\":\"uuid\",\"type\":\"string\"}},\"required\":[\"requestId\"],\"type\":\"object\"}}},\"description\":\"Too Many Requests\"},\"500\":{\"content\":{\"application/json\":{\"schema\":{\"additionalProperties\":false,\"properties\":{\"code\":{\"nullable\":true,\"type\":\"string\"},\"description\":{\"nullable\":true,\"type\":\"string\"},\"requestId\":{\"format\":\"uuid\",\"type\":\"string\"}},\"required\":[\"requestId\"],\"type\":\"object\"}}},\"description\":\"Server Error\"},\"502\":{\"content\":{\"application/json\":{\"schema\":{\"additionalProperties\":false,\"properties\":{\"code\":{\"nullable\":true,\"type\":\"string\"},\"description\":{\"nullable\":true,\"type\":\"string\"},\"requestId\":{\"format\":\"uuid\",\"type\":\"string\"}},\"required\":[\"requestId\"],\"type\":\"object\"}}},\"description\":\"Server Error\"}},\"security\":[{\"Bearer\":[]}],\"securitySchemes\":{\"Bearer\":{\"description\":\"Bearer token\",\"flows\":{\"clientCredentials\":{\"scopes\":{},\"tokenUrl\":\"https://sso.linkmobility.com/auth/realms/CPaaS/protocol/openid-connect/token\"}},\"type\":\"oauth2\"}},\"securitySource\":\"definition\"}","source":"openapi3","version":1},"kind":"http","method":"PATCH","orig":"/sms/v1/schedules/{messageId}","rename":{"param":{"messageId":"id"}},"segments":[{"lit":"sms"},{"lit":"v1"},{"lit":"schedules"},{"var":"id"}],"select":{"exist":["id"]},"transform":{"req":{"sendAtDate":"`reqdata.send_at_date`"},"res":"`body`"},"index$":0}],"key$":"update"}},"relations":{"ancestors":[]},"key$":"schedule","name__orig":"schedule","Name":"Schedule","name_":"schedule","name-":"schedule","NAME":"SCHEDULE","index$":0}, {"active":true,"entity":"schedule","key$":"BasicScheduleFlow","kind":"basic","name":"BasicScheduleFlow","param":{},"step":[{"active":true,"data":{},"input":{},"match":{},"op":"list","spec":[],"valid":[{"apply":"ItemExists","def":{"ref":"schedule_ref01"}}],"index$":0},{"active":true,"data":{},"input":{"ref":"schedule_ref01","srcdatavar":"schedule_ref01_data","suffix":"_up0","textfield":"messageId"},"match":{},"op":"update","spec":[{"apply":"TextFieldMark","def":{"mark":"Mark01-schedule_ref01"}}],"valid":[],"index$":1},{"active":true,"data":{},"input":{"ref":"schedule_ref01","srcdatavar":"schedule_ref01_data","suffix":"_dt0"},"match":{"id":"schedule01"},"op":"load","spec":[],"valid":[{"apply":"TextFieldMark","def":{"mark":"Mark01-schedule_ref01"}}],"index$":2}]}, 'Schedule')
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
    schedule_ref01_data_up0.id = schedule_ref01_data.id

    const schedule_ref01_markdef_up0 = { name: 'messageId', value: 'Mark01-schedule_ref01_' + setup.now }
    ;(schedule_ref01_data_up0 as any)[schedule_ref01_markdef_up0.name] = schedule_ref01_markdef_up0.value

    const schedule_ref01_resdata_up0 = (await schedule_ref01_ent.update(schedule_ref01_data_up0)).data()
    assert(schedule_ref01_resdata_up0.id === schedule_ref01_data_up0.id)

    assert((schedule_ref01_resdata_up0 as any)[schedule_ref01_markdef_up0.name] === schedule_ref01_markdef_up0.value)


    // LOAD
    const schedule_ref01_match_dt0: any = {}
    schedule_ref01_match_dt0.id = schedule_ref01_data.id
    const schedule_ref01_data_dt0 = (await schedule_ref01_ent.load(schedule_ref01_match_dt0)).data()
    assert(schedule_ref01_data_dt0.id === schedule_ref01_data.id)


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

  const env = envOverride({
    'LM_SMS_TEST_SCHEDULE_ENTID': idmap,
    'LM_SMS_TEST_LIVE': 'FALSE',
    'LM_SMS_TEST_EXPLAIN': 'FALSE',
    'LM_SMS_APIKEY': '',
  })

  idmap = env['LM_SMS_TEST_SCHEDULE_ENTID']

  const live = 'TRUE' === env.LM_SMS_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['LM_SMS_TEST_SCHEDULE_ENTID']
    idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {}
    if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
      throw new Error('Live ENTID must be a JSON object')
    }
    client = new LmSmsSDK(merge([
      // FIRST, so the generated fields below win: sdk-test-control.json's
      // test.client.options adds to the live client, it does not redirect it.
      liveClientOptions(),
      {
        apikey: env.LM_SMS_APIKEY,
      },
      // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
      // last entry is undefined, and basicSetup is normally called with no
      // argument at all - so a bare 'extra' silently discarded the apikey
      // and server values above and handed the SDK undefined. Harmless
      // while there was nothing in that object; not harmless now.
      extra || {},
      { system: { fetch: transport.fetch } }
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
    transport,
    now: Date.now(),
  }

  return setup
}
  
