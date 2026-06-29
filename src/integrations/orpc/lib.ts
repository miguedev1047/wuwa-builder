import { createRouterClient, type RouterClient } from '@orpc/server'
import { createIsomorphicFn } from '@tanstack/react-start'
import { appRouter } from './router'
import { createContext } from './context'
import { RPCLink } from '@orpc/client/fetch'
import { createORPCClient } from '@orpc/client'

const getORPCClient = createIsomorphicFn()
  .server(() =>
    createRouterClient(appRouter, {
      context: async () => {
        return createContext()
      },
    }),
  )
  .client((): RouterClient<typeof appRouter> => {
    const link = new RPCLink({
      url: `${window.location.origin}/api/rpc`,
    })
    return createORPCClient(link)
  })

export const client: RouterClient<typeof appRouter> = getORPCClient()
