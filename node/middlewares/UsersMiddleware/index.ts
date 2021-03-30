import { Users } from './data/users'
import { CreditData } from './data/credit'

export async function UsersMiddleware(
  ctx: PopulateContext,
  next: () => Promise<any>
) {
  const {
    clients: { masterdataClient, creditClient },
    state: { resources },
    response: { body },
  } = ctx

  try {
    if (!resources.includes('empty') && !resources.includes('users')) {
      throw new Error('resource not set')
    }

    const users = await Promise.all(
      Users.map(fields => masterdataClient.create({ dataEntity: 'CL', fields }))
    )

    const credit = await Promise.all(
      CreditData.map(creditData => creditClient.openOrChangeAccount(creditData))
    )

    ctx.response.body = {
      ...body,
      Users: {
        users,
        credit,
        status: 'OK',
      },
    }
  } catch (error) {
    ctx.response.body = {
      ...body,
      User: {
        error: error.message,
        status: 'ERROR',
      },
    }
  }

  await next()
}
