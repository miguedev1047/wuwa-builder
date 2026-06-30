import { Button } from '#/components/ui/button'
import { MaterialCreateForm } from '#/features/materials/crud/create'
import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_protected/panel/(admin)/materials/create',
)({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="space-y-4">
      <div>
        <Button
          nativeButton={false}
          render={<Link to="/panel/materials">Volver</Link>}
        />
      </div>

      <MaterialCreateForm />
    </div>
  )
}
