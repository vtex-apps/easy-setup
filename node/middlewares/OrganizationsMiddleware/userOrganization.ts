import type { AxiosError } from 'axios'

export interface CreateUserOrganizationFields {
  id: string
  email: string
  businessOrganizationId: string
  roleId: string
  status: string
}

export async function createUserOrganization(
  ctx: PopulateContext,
  fields: CreateUserOrganizationFields
): Promise<string> {
  const {
    clients: { masterdata },
  } = ctx

  const dataEntity = 'UserOrganization'
  const schema = 'user-organization-schema-v1'

  return masterdata
    .createOrUpdateEntireDocument({
      dataEntity,
      schema,
      fields,
    })
    .then<string>(({ DocumentId }) => DocumentId)
    .catch<string>(error => {
      // 304 means schema was not updated therefore we do not treat as an error
      if (error.response.status !== 304 || !error.isAxiosError) throw error
      const axiosError = error as AxiosError

      return axiosError.response?.headers?.['x-vtex-document-id'] ?? ''
    })
}
