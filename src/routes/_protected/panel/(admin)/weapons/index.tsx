import { WeaponAdminView } from '#/features/weapons/view-root'
import { orpc } from '#/integrations/tanstack-query/orpc-query'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_protected/panel/(admin)/weapons/')({
  pendingComponent: () => <div>Loading...</div>,
  errorComponent: () => <div>Ha ocurrido un error al obtener las armas</div>,
  loader: ({ context }) => {
    context.queryClient.ensureQueryData(
      orpc.weapons.weapon.getAll.queryOptions(),
    )
  },
  component: () => <WeaponAdminView />,
})
