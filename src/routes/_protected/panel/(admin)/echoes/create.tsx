import { Button } from '#/components/ui/button'
import { EchoCreateForm } from '#/features/echoes/crud/create'
import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/_protected/panel/(admin)/echoes/create')(
  {
    component: RouteComponent,
  },
)

function RouteComponent() {
  return (
    <div className="space-y-4">
      <div>
        <Button
          nativeButton={false}
          render={<Link to="/panel/echoes">Volver</Link>}
        />
      </div>

      <EchoCreateForm />
    </div>
  )
}
