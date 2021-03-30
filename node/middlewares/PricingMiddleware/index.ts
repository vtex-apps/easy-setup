import {
  FixedPrice,
  PriceData,
  PriceTableData,
} from '../../dataSources/priceData'
import { sleep } from '../../utils'
import { SKUData } from '../SkuMiddleware/data/skuData'

export async function PricingMiddleware(
  ctx: PopulateContext,
  next: () => Promise<void>
) {
  const {
    clients: { pricingClient },
    state: { resources },
    response: { body },
  } = ctx

  try {
    if (!resources.includes('empty') && !resources.includes('prices')) {
      throw new Error('resource not set')
    }

    const RATE_LIMIT_MS = 1000 / 40

    for await (const priceTable of PriceTableData) {
      await pricingClient.createPriceTable(priceTable.tradePolicyId)

      await sleep(RATE_LIMIT_MS)

      await pricingClient.addPriceTableRules(priceTable)

      await sleep(RATE_LIMIT_MS)
    }

    for await (const sku of SKUData) {
      if (sku.Id === 880100) {
        await pricingClient.addPrice(sku.Id, FixedPrice)
      } else if (sku.Id === 880320 || sku.Id === 880321) {
        await pricingClient.addPrice(sku.Id, FixedPrice)
      } else {
        await pricingClient.addPrice(sku.Id, PriceData)
      }

      await sleep(RATE_LIMIT_MS)
    }

    ctx.response.body = {
      ...body,
      Prices: {
        status: 'OK',
      },
    }
  } catch (error) {
    ctx.response.body = {
      ...body,
      Prices: {
        error: error.message,
        status: 'ERROR',
      },
    }
  }

  await next()
}
