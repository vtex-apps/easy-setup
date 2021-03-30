import type { InstanceOptions, IOContext } from '@vtex/api'
import { ExternalClient } from '@vtex/api'

export default class PricingClient extends ExternalClient {
  constructor(context: IOContext, options?: InstanceOptions) {
    super(`http://${context.account}.myvtex.com/api/pricing`, context, {
      ...options,
      headers: {
        ...options?.headers,
        Accept: 'application/vnd.vtex.pricing.v3+json',
        'Cache-Control': 'no-cache',
        'Content-Type': 'application/json',
        'X-Vtex-Use-Https': 'true',
        VtexIdclientAutcookie: context.adminUserAuthToken ?? '',
      },
    })
  }

  public addPrice(skuId: string | number, pricePayload: any) {
    return this.http.put<any>(`/prices/${skuId}`, pricePayload)
  }

  public createPriceTable = (tradePolicyId: string) =>
    this.http.put(`/tables/${tradePolicyId}`)

  public addPriceTableRules = (data: UpdatePriceTableData) =>
    this.http.put(`/pipeline/catalog/${data.tradePolicyId}`, data)
}

export interface UpdatePriceTableData {
  tradePolicyId: string
  rules: Rule[]
}

export interface Rule {
  id: number
  tradePolicyId: string
  percentualModifier: number
  dateRangeStatus: null
  context: Context
}

export interface Context {
  categories: Record<string, never>
  brands: Record<string, never>
  markupRange: null
  dateRange: null
}
