import {
  AffiliationData,
  PaymentConditionData,
  PromissoryData,
} from '../../dataSources/paymentData'

export async function PaymentsMiddleware(
  ctx: PopulateContext,
  next: () => Promise<any>
) {
  const {
    clients: { gatewayClient },
    state: { resources },
    response: { body },
  } = ctx

  try {
    if (!resources.includes('empty') && !resources.includes('payments')) {
      throw new Error('resource not set')
    }

    const payment = await gatewayClient.addPayment(PromissoryData)

    const affiliations = await Promise.all(
      AffiliationData.map((affiliation: any) => {
        return gatewayClient.addAffiliation(affiliation)
      })
    )

    const paymentCondition = await Promise.all(
      affiliations.map((affiliation: any, index: number) => {
        const payload = PaymentConditionData(affiliation.id)[index]

        return gatewayClient.addPaymentCondition(payload)
      })
    )

    ctx.response.body = {
      ...body,
      Payments: {
        result: {
          payment,
          affiliations,
          paymentCondition,
        },
        status: 'OK',
      },
    }
  } catch (error) {
    ctx.response.body = {
      ...body,
      Payments: {
        error: error.message,
        status: 'ERROR',
      },
    }
  }

  await next()
}
