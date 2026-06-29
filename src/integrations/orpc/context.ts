import { getSession } from '#/functions/auth.functions'

export async function createContext() {
  const session = await getSession()
  return { auth: null, session }
}

export type Context = Awaited<ReturnType<typeof createContext>>
