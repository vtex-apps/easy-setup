import { json } from 'co-body'

export async function PopulateMiddleware(
  ctx: PopulateContext,
  next: () => Promise<any>
) {
  ctx.set('Cache-Control', 'no-cache')
  // ctx.state.appKey = ctx.req.headers['x-vtex-api-appkey']
  // ctx.state.appToken = ctx.req.headers['x-vtex-api-apptoken']

  try {
    const { resources } = await json(ctx)

    // console.log({ resources })

    ctx.state.resources = resources || ['empty']

    // If there's empty setup, remove all others
    if (
      ctx.state.resources.includes('empty') &&
      ctx.state.resources.length > 1
    ) {
      ctx.state.resources = ['empty']
    }
  } catch (error) {
    ctx.response.body = { error }
  }

  await next()
}
