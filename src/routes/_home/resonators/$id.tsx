import { Button } from '#/components/ui/button'
import { BestWeaponsHome } from '#/features/resonators/id/best-weapons/sections'
import { InfoContentHome } from '#/features/resonators/id/info/sections'
import { orpc } from '#/integrations/tanstack-query/orpc-query'
import { RiArrowLeftSLine } from '@remixicon/react'
import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/_home/resonators/$id')({
  component: RouteComponent,
  pendingComponent: () => <div>Loading...</div>,
  errorComponent: () => <div>Ha ocurrido un error al obtener el resonador</div>,
  loader: ({ context, params }) => {
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
            <Link to="/resonators">
              <RiArrowLeftSLine />
            </Link>
          }
        />
      </header>

      <div className="space-y-6">
        <InfoContentHome />
        <BestWeaponsHome />
      </div>
    </div>
  )
}
