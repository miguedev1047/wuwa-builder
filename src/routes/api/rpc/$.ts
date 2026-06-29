import { RPCHandler } from '@orpc/server/fetch'
import { onError } from '@orpc/server'
import { createFileRoute } from '@tanstack/react-router'
import { createContext } from '@/integrations/orpc/context'
import { appRouter } from '@/integrations/orpc/router'

const rpcHandler = new RPCHandler(appRouter, {
  interceptors: [
    onError((error) => {
      console.error(error)
    }),
  ],
})

async function handle({ request }: { request: Request }) {
  const rpcResult = await rpcHandler.handle(request, {
    prefix: '/api/rpc',
    context: await createContext(),
  })
  if (rpcResult.response) return rpcResult.response

  return new Response('Not found', { status: 404 })
}

export const Route = createFileRoute('/api/rpc/$')({
  server: {
    handlers: {
      HEAD: handle,
      GET: handle,
      POST: handle,
      PUT: handle,
      PATCH: handle,
      DELETE: handle,
    },
  },
})
