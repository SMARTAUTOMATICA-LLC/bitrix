import { ListParams, Method } from '../../methods'
import { GetPayload, ListPayload } from '../../payloads'
import { Fields } from '../common'
import { Quote } from './entities'

export type QuotesMethods = {
  readonly [Method.CRM_QUOTE_FIELDS]: {
    readonly type: Quote
    readonly payload: GetPayload<Fields>
    readonly params?: Record<string, unknown>
  }

  readonly [Method.CRM_QUOTE_ADD]: {
    readonly type: Quote
    readonly payload: GetPayload<number>
    readonly params: {
      readonly fields: Partial<Quote>
      readonly params?: {
        readonly REGISTER_SONET_EVENT: 'Y' | 'N'
      }
    }
  }
  readonly [Method.CRM_QUOTE_GET]: {
    readonly type: Quote
    readonly payload: GetPayload<Quote>
    readonly params: {
      readonly id: string
    }
  }
  readonly [Method.CRM_QUOTE_LIST]: {
    readonly type: Quote
    readonly payload: ListPayload<Quote>
    readonly params: ListParams
  }
  readonly [Method.CRM_QUOTE_UPDATE]: {
    readonly type: Quote
    readonly payload: GetPayload<boolean>
    readonly params: {
      readonly id: string
      readonly fields: Record<string, unknown>
      readonly params?: {
        readonly REGISTER_SONET_EVENT: 'Y' | 'N'
      }
    }
  }
}
