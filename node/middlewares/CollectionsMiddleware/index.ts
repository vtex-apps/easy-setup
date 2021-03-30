import type { ISubCollectionResponse } from '../../clients/CatalogClient/types'
import {
  BrandSubCollectionData,
  CollectionData,
  SubCollectionData,
} from './data/collectionData'

export async function CollectionsMiddleware(
  ctx: PopulateContext,
  next: () => Promise<any>
) {
  const {
    clients: { catalogClient },
    state: { resources },
    response: { body },
  } = ctx

  try {
    if (!resources.includes('empty') && !resources.includes('collections')) {
      throw new Error('resource not set')
    }

    const collectionItems: any = await Promise.all(
      CollectionData.map((collectionData: any) =>
        catalogClient.createCollection(collectionData)
      )
    )

    const subCollectionItems: any = await Promise.all(
      collectionItems.map((collectionItem: ISubCollectionResponse) =>
        catalogClient.createSubCollection(SubCollectionData(collectionItem.Id))
      )
    )

    const brandSubCollectionItems: any = await Promise.all(
      subCollectionItems.map((subCollectionItem: any) =>
        catalogClient.setBrandSubCollection(
          subCollectionItem.Id,
          BrandSubCollectionData
        )
      )
    )

    ctx.response.body = {
      ...body,
      Collections: {
        results: {
          brandSubCollections: brandSubCollectionItems,
          collections: collectionItems,
          subCollections: subCollectionItems,
        },
        status: 'OK',
      },
    }
  } catch (error) {
    ctx.response.body = {
      ...body,
      Collections: {
        error: error.message,
        status: 'ERROR',
      },
    }
  }

  await next()
}
