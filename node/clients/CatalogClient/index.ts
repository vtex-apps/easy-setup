import type { InstanceOptions, IOContext, IOResponse } from '@vtex/api'
import { ExternalClient } from '@vtex/api'

import type { SpecificationField } from '../../dataSources/fieldsData'
import type { IGroupResponse } from '../../dataSources/groupData'
import { returnDataIfConflictOrThrow } from '../../utils/errors'
import type {
  AssociateSKUAttachmentData,
  AssociateSKUAttachmentResponse,
  CreateAttachmentData,
  CreateAttachmentResponse,
  CreateProductData,
  CreateProductResponse,
  CreateSKUFileData,
  CreateSKUFileResponse,
  IBrand,
  ICollectionPayload,
  ICollectionResponse,
  ISKUPayload,
  ISubCollectionPayload,
  ISubCollectionResponse,
} from './types'

export default class CatalogClient extends ExternalClient {
  constructor(context: IOContext, options?: InstanceOptions) {
    super(`http://${context.account}.vtexcommercestable.com.br`, context, {
      ...options,
      headers: {
        Accept: 'application/json',
        'Cache-Control': 'no-cache',
        'Content-Type': 'application/json',
        VtexIdclientAutcookie: context.adminUserAuthToken as string,
        'X-Vtex-Use-Https': 'true',
      },
    })
  }

  public async createBrand(BrandPayload: IBrand): Promise<IOResponse<IBrand>> {
    try {
      return await this.http.post('/api/catalog/pvt/brand', BrandPayload)
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

  public createCollection(
    collectionPayload: ICollectionPayload
  ): Promise<IOResponse<ICollectionResponse>> {
    return this.http.post('/api/catalog/pvt/collection', collectionPayload)
  }

  public createSubCollection(
    subCollectionPayload: ISubCollectionPayload
  ): Promise<IOResponse<ISubCollectionResponse>> {
    return this.http.post(
      '/api/catalog/pvt/subcollection',
      subCollectionPayload
    )
  }

  public setBrandSubCollection(
    subCollectionId: number,
    BrandSubCollectionData: any
  ): Promise<IOResponse<ISubCollectionResponse>> {
    return this.http.post(
      `/api/catalog/pvt/subcollection/${subCollectionId}/brand`,
      BrandSubCollectionData
    )
  }

  public async createCategory(categoryPayload: any): Promise<IOResponse<any>> {
    try {
      return await this.http.post(`/api/catalog/pvt/category`, categoryPayload)
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

  public createSkuSpecificationGroup = (groupData: any) =>
    this.post<IGroupResponse>(
      'api/catalog_system/pvt/specification/group',
      groupData
    )

  public createSkuSpecificationField = (
    specificationField: SpecificationField
  ) =>
    this.post('/api/catalog_system/pvt/specification/field', specificationField)

  public createSkuSpecificationFieldValue = (fieldValue: any) =>
    this.post('/api/catalog_system/pvt/specification/fieldValue', fieldValue)

  public createProduct = (
    data: CreateProductData
  ): Promise<CreateProductResponse> =>
    this.post<CreateProductResponse>('/api/catalog/pvt/product', data)

  /* public createSKU = (
      data: ISKUPayload
    ): Promise<ISKUPayload> =>
      this.post<ISKUPayload>('/api/catalog/pvt/stockkeepingunit', data)
  */

  public async createSKU(
    skuPayLoad: ISKUPayload
  ): Promise<IOResponse<ISKUPayload>> {
    try {
      return await this.http.post(
        `/api/catalog/pvt/stockkeepingunit`,
        skuPayLoad
      )
    } catch (error) {
      const {
        response: { data, status },
        headers,
      } = error

      console.log(
        `${skuPayLoad.Id}-RefId:${skuPayLoad.RefId}-ProductId:${skuPayLoad.ProductId}`
      )
      console.log(error)

      return {
        data,
        headers,
        status,
      }
    }
  }

  public createSKUFile = (skuId: string | number, data: CreateSKUFileData) =>
    this.post<CreateSKUFileResponse>(
      `/api/catalog/pvt/stockkeepingunit/${skuId}/file`,
      data
    )

  public setSkuSubscription = (data: AssociateSKUAttachmentData) =>
    this.post<AssociateSKUAttachmentResponse>(
      '/api/catalog/pvt/skuattachment',
      data
    )

  public createAttachment = (data: CreateAttachmentData) =>
    this.post<CreateAttachmentResponse>(`/api/catalog/pvt/attachment`, data)

  private post = <T = any>(url: string, data: any) =>
    this.http.post<T>(url, data).catch<T>(returnDataIfConflictOrThrow(data))
}
