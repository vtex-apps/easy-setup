import type { AxiosError } from 'axios'

import type { CreateOrUpdateSchemaResponse } from '../clients/MasterdataClient'

export const throwIfNotModified = (error: AxiosError) => {
  // 304 means document was not updated therefore we do not treat as an error
  if (error.response?.status !== 304) throw error
}

export const returnDocumentIdOrTrhow = (error: AxiosError) => {
  throwIfNotModified(error)

  return error.response?.headers?.['x-vtex-document-id'] ?? ''
}

export const returnMessageOrThrow = (
  error: AxiosError
): CreateOrUpdateSchemaResponse => {
  throwIfNotModified(error)

  return { Message: 'Not Modified' }
}

export const returnDataIfConflictOrThrow = (data: any) => (
  error: AxiosError
) => {
  // If SKU already exists catalog API will return 409
  if (error.response?.status === 409) return data
  throw error
}
