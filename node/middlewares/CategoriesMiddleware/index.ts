import { CategoriesData } from './data'

export async function CategoriesMiddleware(
  ctx: PopulateContext,
  next: () => Promise<any>
) {
  const {
    clients: { catalogClient },
    state: { resources },
    response: { body },
  } = ctx

  try {
    if (!resources.includes('empty') && !resources.includes('categories')) {
      throw new Error('resource not set')
    }

    let delay = 0
    const delayIncrement = 500
    const results = await Promise.all(
      CategoriesData.map((categoryData: any) => {
        delay += delayIncrement
        // console.log('timeout...')

        return new Promise(resolve => setTimeout(resolve, delay)).then(() =>
          catalogClient.createCategory(categoryData)
        )
      })
    )

    ctx.response.body = {
      ...body,
      Categories: {
        results,
        status: 'OK',
      },
    }
  } catch (error) {
    ctx.response.body = {
      ...body,
      Categories: {
        error: error.message,
        status: 'ERROR',
      },
    }
  }

  await next()
}
