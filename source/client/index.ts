// tslint:disable:object-literal-sort-keys

import got from 'got'
import Queue from 'p-queue'
import addAccessToken from './hooks/addAccessToken'
import Batch from './methods/batch'
import Call from './methods/call'
import List from './methods/list'

const BITRIX_API_RATE_LIMIT = 2
const BITRIX_API_RATE_INTERVAL = 1000 // 1 second

/**
 * Construct a Bitrix client with generic methods
 * @param restURI REST endpoint, like a `https://hello.bitrix24.ru/rest` or an inbound webhook endpoint,
 *                like a `https://hello.bitrix24.ru/rest/1/WEBHOOK_TOKEN`.
 * @param accessToken Bitrix application Access Token. Do not specify in case inbound webhook endpoint used.
 */
export default (restURI: string, accessToken?: string) => {
  const client = got.extend({
    prefixUrl: restURI,
    headers: {
      'user-agent': '@2bad/bitrix'
    },
    responseType: 'json',
    hooks: {
      beforeRequest: [
        addAccessToken(accessToken)
      ]
    }
  })

  const queue = new Queue({
    intervalCap: BITRIX_API_RATE_LIMIT,
    interval: BITRIX_API_RATE_INTERVAL
  })

  const queuedGet = (...args: Parameters<typeof client.get>) =>
    queue.add(() => client.get(...args))

  // @ts-ignore @todo remove after issue is resolved (https://github.com/sindresorhus/got/issues/954)
  const call = Call({ get: queuedGet })
  // @ts-ignore @todo remove after issue is resolved (https://github.com/sindresorhus/got/issues/954)
  const batch = Batch({ get: queuedGet })
  const list = List({ call, batch })

  return {
    call,
    batch,
    list
  }
}
