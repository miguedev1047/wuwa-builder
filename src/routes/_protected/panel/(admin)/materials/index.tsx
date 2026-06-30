import { orpc } from '#/integrations/tanstack-query/orpc-query'
import { createFileRoute } from '@tanstack/react-router'
import { MaterialAdminView } from '#/features/materials/view-root'

export const Route = createFileRoute('/_protected/panel/(admin)/materials/')({
  pendingComponent: () => <div>Loading...</div>,
  errorComponent: () => (
    <div>Ha ocurrido un error al obtener los materiales</div>
  ),
  loader: ({ context }) => {
    context.queryClient.ensureQueryData(
      orpc.materials.material.getAll.queryOptions(),
    )
  },
  component: () => <MaterialAdminView />,
})
