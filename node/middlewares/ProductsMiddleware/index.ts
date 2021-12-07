import {
  AttachmentData,
  SubscriptionData,
} from '../../dataSources/attachmentData'
import { ImagesData } from '../../dataSources/imageData'
import { ProductData } from '../../dataSources/productData'
import { SKUData } from '../../dataSources/skuData'
import { sleep } from '../../utils/index'

export async function ProductsMiddleware(
  ctx: PopulateContext,
  next: () => Promise<any>
) {
  const {
    clients: { catalogClient },
    state: { resources },
    response: { body },
  } = ctx

  try {
    if (!resources.includes('empty') && !resources.includes('products')) {
      throw new Error('resource not set')
    }

    const subscriptionSkus = [
      880260,
      880270,
      880280,
      880290,
      880300,
      880310,
      880320,
      // 880390,
    ]

    const products = await Promise.all(
      ProductData.map(product => catalogClient.createProduct(product))
    )

    for await (const sku of SKUData) {
      await catalogClient.createSKU(sku)
      await sleep(100)
    }

    const attachments = await Promise.all(
      [AttachmentData, SubscriptionData].map(attachment =>
        catalogClient.createAttachment(attachment)
      )
    )

    const productSkusAttachments = await Promise.all(
      subscriptionSkus.map(SkuId =>
        catalogClient.setSkuSubscription({
          SkuId,
          AttachmentId: SubscriptionData.Id,
        })
      )
    )

    const productSkuImages = await Promise.all(
      SKUData.map(({ ProductId: SKUProductId, Id: SkuId }) =>
        ImagesData.filter(
          ({ ProductId }) => String(ProductId) === SKUProductId
        ).map(({ ImageData }) => catalogClient.createSKUFile(SkuId, ImageData))
      )
    )

    // await this.setSpecifications(product.CategoryId)

    ctx.response.body = {
      ...body,
      Products: {
        results: {
          products,
          // productSkus,
          attachments,
          productSkusAttachments,
          productSkuImages,
        },
        status: 'OK',
      },
    }
  } catch (error) {
    ctx.response.body = {
      ...body,
      Products: {
        error: error.message,
        status: 'ERROR',
      },
    }
  }

  await next()
}
