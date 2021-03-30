import { TaxData } from '../../dataSources/benefitsData'

export async function TaxesMiddleware(
  ctx: PopulateContext,
  next: () => Promise<any>
) {
  const {
    clients: { benefitClient },
    state: { resources },
    response: { body },
  } = ctx

  try {
    if (!resources.includes('empty') && !resources.includes('taxes')) {
      throw new Error('resource not set')
    }

    const taxes = await Promise.all(
      TaxData.map(taxItem => {
        return benefitClient.addBenefit(taxItem)
      })
    )

    ctx.response.body = {
      ...body,
      Taxes: {
        result: {
          taxes,
        },
        status: 'OK',
      },
    }
  } catch (error) {
    ctx.response.body = {
      ...body,
      Taxes: {
        error: error.message,
        status: 'ERROR',
      },
    }
  }

  await next()
}
