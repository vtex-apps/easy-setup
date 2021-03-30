import { CustomData } from './data/customData'

export async function CheckoutMiddleware(
  ctx: PopulateContext,
  next: () => Promise<any>
) {
  const {
    clients: { checkoutClient },
    state: { resources },
    response: { body },
  } = ctx

  try {
    if (!resources.includes('empty') && !resources.includes('checkout')) {
      throw new Error('resource not set')
    }

    const orderFormConfigPayload = await checkoutClient.getOrderFormConfiguration()

    orderFormConfigPayload.data.minimumValueAccumulated = 5000
    orderFormConfigPayload.data.apps = CustomData
    const orderFormConfigResponse = await checkoutClient.updateOrderFormConfiguration(
      orderFormConfigPayload.data
    )

    const orderConfigPayload = await checkoutClient.getOrderConfiguration()

    orderConfigPayload.data.allowOrderEdition = true
    const orderConfigResponse = await checkoutClient.updateOrderConfiguration(
      orderConfigPayload.data
    )

    ctx.response.body = {
      ...body,
      Checkout: {
        result: {
          orderFormConfigResponse,
          orderConfigResponse,
        },
        status: 'OK',
      },
    }
  } catch (error) {
    // console.log('CHECKOUT', error)
    ctx.response.body = {
      ...body,
      Checkout: {
        error: error.message,
        status: 'ERROR',
      },
    }
  }

  await next()
}
