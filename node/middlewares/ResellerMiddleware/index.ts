import schemaBody from './reseller.schema'

export interface CreateSchemaInput {
  dataEntity: string
  schemaName: string
  schemaBody: Record<string, unknown>
}

export interface CreateOrUpdateSchemaResponse {
  Message: string
}

export async function ResellerMiddleware(
  ctx: PopulateContext,
  next: () => Promise<any>
) {
  const {
    clients: { masterdata },
    state: { resources },
    response: { body },
  } = ctx

  try {
    if (!resources.includes('empty') && !resources.includes('reseller')) {
      throw new Error('resource not set')
    }

    const result = await masterdata
      .createOrUpdateSchema<CreateOrUpdateSchemaResponse>({
        dataEntity: 'Reseller',
        schemaName: 'v2',
        schemaBody,
      })
      .catch(error => {
        // 304 means schema was not updated therefore we do not treat as an error
        if (error.response.status !== 304) throw error

        return { Message: 'Not Modified' }
      })

    ctx.response.body = {
      ...body,
      Reseller: {
        result,
        status: 'OK',
      },
    }
  } catch (error) {
    ctx.response.body = {
      ...body,
      Reseller: {
        error: error.message,
        status: 'ERROR',
      },
    }
  }

  await next()
}
