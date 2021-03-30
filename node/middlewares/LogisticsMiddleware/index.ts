import { SKUData } from '../SkuMiddleware/data/skuData'
import {
  CarrierData,
  DockData,
  FreightValueData,
  InventoryData,
  WarehouseData,
} from './data/logisticsData'

export async function LogisticsMiddleware(
  ctx: PopulateContext,
  next: () => Promise<any>
) {
  const {
    clients: { logisticsClient },
    state: { resources },
    response: { body },
  } = ctx

  try {
    if (!resources.includes('empty') && !resources.includes('logistics')) {
      throw new Error('resource not set')
    }

    const carrier = await logisticsClient.createOrUpdateCarrier(CarrierData)

    const loadingDocks = await Promise.all(
      DockData.map(dockData => logisticsClient.updateDock(dockData))
    )

    const warehouse = await logisticsClient.updateWarehouse(WarehouseData)

    const inventory = await Promise.all(
      SKUData.map(skuData =>
        logisticsClient.setInventory(skuData, InventoryData)
      )
    )

    const freightValues = await Promise.all(
      FreightValueData.map(freightValueData => {
        return logisticsClient.setFreightValues(
          CarrierData.id,
          freightValueData
        )
      })
    )

    ctx.response.body = {
      ...body,
      Logistics: {
        result: {
          loadingDocks,
          warehouse,
          carrier,
          inventory,
          freightValues,
        },
        status: 'OK',
      },
    }
  } catch (error) {
    ctx.response.body = {
      ...body,
      Logistics: {
        error: error.message,
        status: 'ERROR',
      },
    }
  }

  await next()
}
