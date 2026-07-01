import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/_home')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <main className="py-4 container mx-auto">
      <Outlet />
    </main>
  )
}
