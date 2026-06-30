import { Button } from '#/components/ui/button'
import { InfoContent } from '#/features/echoes/id/info'
import { orpc } from '#/integrations/tanstack-query/orpc-query'
import { RiArrowLeftSLine } from '@remixicon/react'
import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/_protected/panel/(admin)/echoes/$id')({
  component: RouteComponent,
  pendingComponent: () => <div>Loading...</div>,
  errorComponent: () => <div>Ha ocurrido un error al obtener el eco</div>,
  loader: ({ context, params }) => {
    context.queryClient.ensureQueryData(
      orpc.echoes.echo.getById.queryOptions({ input: { id: params.id } }),
    )
  },
})

function RouteComponent() {
  return (
    <div className="space-y-4">
      <header className="flex items-center gap-2">
        <Button
          nativeButton={false}
          size="icon"
          render={
            <Link to="/panel/echoes">
              <RiArrowLeftSLine />
            </Link>
          }
        />
      </header>

      <InfoContent />
    </div>
  )
}
