import type { InstanceOptions, IOContext } from '@vtex/api'
import { ExternalClient } from '@vtex/api'

export default class BenefitClient extends ExternalClient {
  constructor(context: IOContext, options?: InstanceOptions) {
    super(
      `http://${context.account}.vtexcommercestable.com.br/api/rnb/pvt`,
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

  public getCollection(collectionName: string) {
    return this.http.get(`/collections/${collectionName}`)
  }

  public addBenefit = (data: unknown) =>
    this.http.post('/calculatorconfiguration/', data)
}
