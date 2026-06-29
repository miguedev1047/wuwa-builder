import { ResonatorAdminView } from '#/features/resonators/view-root'
import { orpc } from '#/integrations/tanstack-query/orpc-query'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_protected/panel/(admin)/resonators/')({
  pendingComponent: () => <div>Loading...</div>,
  errorComponent: () => (
    <div>Ha ocurrido un error al obtener los resonadores</div>
  ),
  loader: ({ context }) => {
    context.queryClient.ensureQueryData(
      orpc.resonators.items.getAll.queryOptions(),
    )
  },
  component: () => <ResonatorAdminView />,
})
