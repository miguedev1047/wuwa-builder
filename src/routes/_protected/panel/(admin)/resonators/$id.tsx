import { Button } from '#/components/ui/button'
import { BestWeaponsPanel } from '#/features/resonators/id/best-weapons/sections'
import { InfoContentPanel } from '#/features/resonators/id/info/sections'
import { LevelsPanel } from '#/features/resonators/id/levels/sections'
import { orpc } from '#/integrations/tanstack-query/orpc-query'
import { RiArrowLeftSLine } from '@remixicon/react'
import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_protected/panel/(admin)/resonators/$id',
)({
  component: RouteComponent,
  pendingComponent: () => <div>Loading...</div>,
  errorComponent: () => <div>Ha ocurrido un error al obtener el resonador</div>,
  loader: ({ context, params }) => {
    context.queryClient.ensureQueryData(
      orpc.weapons.weapon.getAll.queryOptions(),
    )

    context.queryClient.ensureQueryData(
      orpc.resonators.resonator.getById.queryOptions({
        input: { id: params.id },
      }),
    )
  },
})

function RouteComponent() {
  return (
    <div className="space-y-4 @container/resonators">
      <header className="flex items-center gap-2">
        <Button
          nativeButton={false}
          size="icon"
          render={
            <Link to="/panel/resonators">
              <RiArrowLeftSLine />
            </Link>
          }
        />
      </header>

      <div className="space-y-6">
        <InfoContentPanel />
        <BestWeaponsPanel />
        <LevelsPanel />
      </div>
    </div>
  )
}
