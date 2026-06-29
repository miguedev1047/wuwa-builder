import { ORPCError, os } from '@orpc/server'
import type { Context } from '@/integrations/orpc/context'
import { getSession } from '#/functions/auth.functions'

export const base = os.$context<Context>()

export const authMiddleware = base.middleware(async ({ next }) => {
  const session = await getSession()

  if (!session?.session) {
    throw new ORPCError('UNAUTHORIZED')
  }

  return next({ context: { auth: null, session } })
})

export const publicProcedure = base

export const protectedProcedure = base.use(authMiddleware)
