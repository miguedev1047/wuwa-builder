import { Button } from '#/components/ui/button'
import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/_home/')({ component: Home })

function Home() {
  return (
    <div className="p-8 space-y-4">
      <h1 className="text-4xl font-bold">Welcome to TanStack Start</h1>

      <div className="flex items-center gap-2">
        <Button
          nativeButton={false}
          render={<Link to="/resonators">Resonadores</Link>}
        />
        <Button nativeButton={false} render={<Link to="/">Armas</Link>} />
        <Button nativeButton={false} render={<Link to="/">Ecos</Link>} />
        <Button nativeButton={false} render={<Link to="/">Materiales</Link>} />
      </div>

      <Button nativeButton={false} render={<Link to="/panel/roster" />}>
        Panel
      </Button>
    </div>
  )
}
