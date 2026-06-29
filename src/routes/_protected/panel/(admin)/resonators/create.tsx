import { Button } from '#/components/ui/button'
import { ResonatorCreateForm } from '#/features/resonators/crud/create'
import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_protected/panel/(admin)/resonators/create',
)({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="space-y-4">
      <div>
        <Button
          nativeButton={false}
          render={<Link to="/panel/resonators">Volver</Link>}
        />
      </div>

      <ResonatorCreateForm />
    </div>
  )
}
