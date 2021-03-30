import type { InstanceOptions, IOContext, IOResponse } from '@vtex/api'
import { ExternalClient } from '@vtex/api'

import type {
  ICreditAccountPayload,
  OpenOrChangeAccountRequest,
  OpenOrChangeAccountResponse,
} from './types'

export default class CreditClient extends ExternalClient {
  constructor(context: IOContext, options?: InstanceOptions) {
    super(`http://${context.account}.vtexcommercestable.com.br`, context, {
      ...options,
      headers: {
        Accept: 'application/json',
        'Cache-Control': 'no-cache',
        'Content-Type': 'application/json',
        VtexIdclientAutcookie: context.adminUserAuthToken as string,
        'X-Vtex-Use-Https': 'true',
      },
    })
  }

  public async openAccount(
    CreditAccountPayload: ICreditAccountPayload
  ): Promise<IOResponse<string>> {
    try {
      return this.http.post('/api/creditcontrol/accounts', CreditAccountPayload)
    } catch (error) {
      const {
        response: { data, status },
        headers,
      } = error

      return {
        data,
        headers,
        status,
      }
    }
  }

  public openOrChangeAccount = (data: OpenOrChangeAccountRequest) =>
    this.http.put<OpenOrChangeAccountResponse>(
      `/api/creditcontrol/accounts/${data.id}`,
      data
    )
}
