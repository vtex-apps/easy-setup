import type { IBrand } from '../../clients/CatalogClient/types'
import { BrandData } from './data/brandData'

export async function BrandsMiddleware(
  ctx: PopulateContext,
  next: () => Promise<any>
) {
  const {
    clients: { catalogClient },
    state: { resources },
    response: { body },
  } = ctx

  try {
    if (!resources.includes('empty') && !resources.includes('brands')) {
      throw new Error('resource not set')
    }

    const results = await Promise.all(
      BrandData.map((brandData: IBrand) => catalogClient.createBrand(brandData))
    )

    ctx.response.body = {
      ...body,
      Brands: {
        results,
        status: 'OK',
      },
    }
  } catch (error) {
    ctx.response.body = {
      ...body,
      Brands: {
        error: error.message,
        status: 'ERROR',
      },
    }
  }

  await next()
}
