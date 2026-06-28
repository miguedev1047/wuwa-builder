import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { toast } from 'sonner'

export function getContext() {
  const queryClient = new QueryClient({
    queryCache: new QueryCache({
      onError: () => {
        toast.error('Ha ocurrido un error al cargar los datos', {
          action: {
            label: 'Reintentar',
            onClick: () => queryClient.invalidateQueries(),
          },
        })
      },
    }),
  })
  return { queryClient }
}

export function TanstackQueryProvider({
  children,
  client,
}: {
  children: React.ReactNode
  client: QueryClient
}) {
  return <QueryClientProvider client={client}>{children}</QueryClientProvider>
}
