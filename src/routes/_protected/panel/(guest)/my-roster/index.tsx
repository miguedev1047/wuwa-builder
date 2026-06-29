import { SignOutButton } from '#/components/sign-out-button'
import { Button } from '#/components/ui/button'
import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/_protected/panel/(guest)/my-roster/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="space-y-4">
      <h2>Hello "/_protected/panel/"!</h2>

      <div className="flex items-center gap-2">
        <Button
          nativeButton={false}
          render={<Link to="/panel/resonators">Resonadores</Link>}
        />
      </div>

      <SignOutButton />
    </div>
  )
}
