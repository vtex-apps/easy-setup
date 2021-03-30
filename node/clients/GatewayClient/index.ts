import { ExternalClient } from '@vtex/api'
import type { InstanceOptions, IOContext } from '@vtex/api'
import type { AxiosError } from 'axios'

export default class GatewayClient extends ExternalClient {
  constructor(context: IOContext, options?: InstanceOptions) {
    super(
      `http://${context.account}.vtexcommercestable.com.br/api/payments/pvt`,
      context,
      {
        ...options,
        headers: {
          Accept: 'application/json',
          'Cache-Control': 'no-cache',
          'Content-Type': 'application/json',
          VtexIdclientAutcookie: context.adminUserAuthToken as string,
          'X-Vtex-Use-Https': 'true',
        },
      }
    )
  }

  public addPayment(paymentPayload: any) {
    return this.http.post<any>(
      `/${paymentPayload.type}/${paymentPayload.id}/config`,
      paymentPayload
    )
  }

  public addAffiliation = (data: any) => this.post('/affiliations', data)

  public addPaymentCondition = (data: any) => this.post('/rules', data)

  private post = <T = any>(url: string, data: T) =>
    this.http.post<T>(url, data).catch<T>((error: AxiosError) => {
      if (
        error.response?.status !== 400 &&
        error.response?.statusText !== 'Bad Request' &&
        error.response?.data.error.code !== 400 &&
        error.response?.data.error.message !==
          'Affiliation name is already used'
      ) {
        throw error
      }

      return data
    })
}
