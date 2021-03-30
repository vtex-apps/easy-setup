import type { InstanceOptions, IOContext, IOResponse } from '@vtex/api'
import { ExternalClient } from '@vtex/api'

import type { IOrderFormConfiguration, IOrderConfiguration } from './types'

export default class CheckoutClient extends ExternalClient {
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

  public async getOrderFormConfiguration(): Promise<
    IOResponse<IOrderFormConfiguration>
  > {
    try {
      return this.http.getRaw('/api/checkout/pvt/configuration/orderForm')
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

  public async getOrderConfiguration(): Promise<
    IOResponse<IOrderConfiguration>
  > {
    try {
      return this.http.getRaw('/api/checkout/pvt/configuration/order')
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

  public async updateOrderFormConfiguration(
    OrderFormConfigurationPayload: IOrderFormConfiguration
  ): Promise<IOResponse<IOrderFormConfiguration>> {
    try {
      return this.http.post(
        '/api/checkout/pvt/configuration/orderForm',
        OrderFormConfigurationPayload
      )
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

  public async updateOrderConfiguration(
    OrderConfigurationPayload: IOrderConfiguration
  ): Promise<IOResponse<IOrderConfiguration>> {
    try {
      return this.http.post(
        '/api/checkout/pvt/configuration/order',
        OrderConfigurationPayload
      )
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
}
