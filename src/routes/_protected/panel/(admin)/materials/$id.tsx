import { Button } from '#/components/ui/button'
import { MaterialInfoContentPanel } from '#/features/materials/id/info/sections'
import { orpc } from '#/integrations/tanstack-query/orpc-query'
import { RiArrowLeftSLine } from '@remixicon/react'
import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/_protected/panel/(admin)/materials/$id')(
  {
    component: RouteComponent,
    pendingComponent: () => <div>Loading...</div>,
    errorComponent: () => (
      <div>Ha ocurrido un error al obtener el material</div>
    ),
    loader: ({ context, params }) => {
      context.queryClient.ensureQueryData(
        orpc.materials.material.getById.queryOptions({
          input: { id: params.id },
        }),
      )
    },
  },
)

function RouteComponent() {
  return (
    <div className="space-y-4">
      <header className="flex items-center gap-2">
        <Button
          nativeButton={false}
          size="icon"
          render={
            <Link to="/panel/materials">
              <RiArrowLeftSLine />
            </Link>
          }
        />
      </header>

      <MaterialInfoContentPanel />
    </div>
  )
}
