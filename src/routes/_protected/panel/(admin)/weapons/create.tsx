import { Button } from '#/components/ui/button'
import { WeaponCreateForm } from '#/features/weapons/crud/create'
import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_protected/panel/(admin)/weapons/create',
)({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="space-y-4">
      <div>
        <Button
          nativeButton={false}
          render={<Link to="/panel/weapons">Volver</Link>}
        />
      </div>

      <WeaponCreateForm />
    </div>
  )
}
