import type { IOResponse } from '@vtex/api'
import { MasterData } from '@vtex/api'

import {
  returnDocumentIdOrTrhow,
  returnMessageOrThrow,
} from '../../utils/errors'
import type {
  IMasterdataNewDocument,
  IMasterdataClientDocumentPayload,
} from './types'

export interface CreateOrUpdateInput {
  dataEntity: string
  fields: Record<string, unknown>
  id?: string
  schema?: string
}

export interface CreateSchemaInput {
  dataEntity: string
  schemaName: string
  schemaBody: Record<string, unknown>
}

export interface CreateOrUpdateSchemaResponse {
  Message: string
}

export default class MasterdataClient extends MasterData {
  /**
   * Add MasterData Document
   * @param clientDocumentPayload Document Payload
   */
  public async add(
    clientDocumentPayload: IMasterdataClientDocumentPayload
  ): Promise<IOResponse<IMasterdataNewDocument>> {
    try {
      return await this.http.post(`/documents`, clientDocumentPayload, {
        metric: 'masterdata-CL-add',
      })
    } catch (error) {
      const {
        response: { data, status },
        headers,
      } = error

      return {
        headers,
        status,
        data,
      }
    }
  }

  /**
   * Add or Update MasterData Document
   * @param clientDocumentPayload Document Payload
   */
  public async addOrUpdateDocument(
    clientDocumentPayload: IMasterdataClientDocumentPayload
  ): Promise<IOResponse<IMasterdataNewDocument>> {
    try {
      return await this.http.put('/documents', clientDocumentPayload, {
        metric: 'masterdata-CL-addOrUpdateDocument',
      })
    } catch (error) {
      const {
        response: { data, status },
        headers,
      } = error

      return {
        status,
        data: data || `${clientDocumentPayload.email} - duplicated entry`,
        headers,
      }
    }
  }

  public create = (data: CreateOrUpdateInput) =>
    this.createOrUpdateEntireDocument(data)
      .then(({ DocumentId }) => DocumentId)
      .catch<string>(returnDocumentIdOrTrhow)

  public createSchema = (schema: CreateSchemaInput) =>
    this.createOrUpdateSchema<CreateOrUpdateSchemaResponse>(schema).catch(
      returnMessageOrThrow
    )
}
