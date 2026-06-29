import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/auth/error/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div>
      <h2>Ha ocurrido un error al iniciar sesión</h2>
    </div>
  )
}
