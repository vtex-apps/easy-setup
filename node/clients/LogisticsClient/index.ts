import type { InstanceOptions, IOContext, IOResponse } from '@vtex/api'
import { ExternalClient } from '@vtex/api'

import type { ISKUPayload } from '../CatalogClient/types'
import type {
  CreateOrUpdateCarrierData,
  IDockPayload,
  IFreightValuePayload,
  IInventoryPayload,
  IWarehousePayload,
} from './types'

export default class LogisticsClient extends ExternalClient {
  constructor(context: IOContext, options?: InstanceOptions) {
    super(
      `http://${context.account}.vtexcommercestable.com.br/api/logistics/pvt`,
      context,
      {
        ...(options ?? {}),
        headers: {
          ...(options?.headers ?? {}),
          Accept: 'application/json',
          'Cache-Control': 'no-cache',
          'Content-Type': 'application/json',
          VtexIdclientAutcookie: context?.adminUserAuthToken ?? '',
          'X-Vtex-Use-Https': 'true',
        },
      }
    )
  }

  public async setFreightValues(
    carrierId: string,
    FreightValuePayload: IFreightValuePayload
  ): Promise<IOResponse<string>> {
    try {
      return this.http.post(
        `/configuration/freights/${carrierId}/values/update`,
        [FreightValuePayload]
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

  public async updateDock(
    DockPayload: IDockPayload
  ): Promise<IOResponse<boolean>> {
    try {
      return this.http.post('/configuration/docks', DockPayload)
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

  public async setInventory(
    SKU: ISKUPayload,
    InventoryPayload: IInventoryPayload
  ): Promise<IOResponse<boolean>> {
    try {
      return this.http.put(
        `/inventory/skus/${SKU.Id}/warehouses/1_1`,
        InventoryPayload
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

  public async updateWarehouse(
    WarehousePayload: IWarehousePayload
  ): Promise<IOResponse<boolean>> {
    try {
      return this.http.post('/configuration/warehouses', WarehousePayload)
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

  public createOrUpdateCarrier = (data: CreateOrUpdateCarrierData) =>
    this.http.post(`/configuration/carriers`, data)
}
