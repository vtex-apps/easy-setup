import type { SpecificationField } from '../../dataSources/fieldsData'
import { FieldsData } from '../../dataSources/fieldsData'
import { FieldValuesData } from '../../dataSources/fieldValuesData'
import { GroupData } from '../../dataSources/groupData'

export async function FieldsMiddleware(
  ctx: PopulateContext,
  next: () => Promise<any>
) {
  const {
    clients: { catalogClient },
    state: { resources },
    response: { body },
  } = ctx

  try {
    if (!resources.includes('empty') && !resources.includes('fields')) {
      throw new Error('resource not set')
    }

    const groupResponse = await catalogClient.createSkuSpecificationGroup(
      GroupData
    )

    if (groupResponse) {
      const fields = await Promise.all(
        FieldsData(groupResponse.Id).map(
          async (specificationField: SpecificationField) => {
            return {
              fieldId: await catalogClient.createSkuSpecificationField(
                specificationField
              ),
              ...specificationField,
            }
          }
        )
      )

      const fieldValues = await Promise.all(
        fields.map(fieldResponse => {
          const fieldValuesData = FieldValuesData(
            fieldResponse.fieldId as number
          ).filter(
            fieldValue => fieldValue.CategoryId === fieldResponse.CategoryId
          )

          if (fieldValuesData.length > 0) {
            return Promise.all(
              fieldValuesData[0].FieldValues.map(FieldValueData =>
                catalogClient.createSkuSpecificationFieldValue(FieldValueData)
              )
            )
          }

          return {}
        })
      )

      ctx.response.body = {
        ...body,
        Fields: {
          results: {
            fields,
            fieldValues,
          },
          status: 'OK',
        },
      }
    }
  } catch (error) {
    ctx.response.body = {
      ...body,
      Fields: {
        error: error.message,
        status: 'ERROR',
      },
    }
  }

  await next()
}
