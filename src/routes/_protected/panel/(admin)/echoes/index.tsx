import { orpc } from '#/integrations/tanstack-query/orpc-query'
import { createFileRoute } from '@tanstack/react-router'
import { EchoAdminView } from '#/features/echoes/view-root'

export const Route = createFileRoute('/_protected/panel/(admin)/echoes/')({
  pendingComponent: () => <div>Loading...</div>,
  errorComponent: () => <div>Ha ocurrido un error al obtener los ecos</div>,
  loader: ({ context }) => {
    context.queryClient.ensureQueryData(orpc.echoes.echo.getAll.queryOptions())
  },
  component: () => <EchoAdminView />,
})
