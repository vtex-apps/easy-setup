import { BenefitData } from '../../dataSources/benefitsData'

export async function BenefitsMiddleware(
  ctx: PopulateContext,
  next: () => Promise<unknown>
) {
  const {
    clients: { benefitClient },
    state: { resources },
    response: { body },
  } = ctx

  try {
    if (!resources.includes('empty') && !resources.includes('benefits')) {
      throw new Error('resource not set')
    }

    const collections = await benefitClient.getCollection('_')
    const benefitPayload = BenefitData(collections[0])

    const benefits = await benefitClient.addBenefit(benefitPayload)

    ctx.response.body = {
      ...body,
      Benefits: {
        result: {
          benefits,
        },
        status: 'OK',
      },
    }
  } catch (error) {
    ctx.response.body = {
      ...body,
      Benefits: {
        error: error.message,
        status: 'ERROR',
      },
    }
  }

  await next()
}
