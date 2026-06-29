import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/_protected/panel/')({
  beforeLoad: () => {
    throw redirect({ to: '/panel/my-roster' })
  },
})
