import { SignInButton } from '#/components/sign-in-button'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/auth/login/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="space-y-4">
      <SignInButton provider="github">Iniciar sesión con GitHub</SignInButton>
      <SignInButton provider="google">Iniciar sesión con Google</SignInButton>
      <SignInButton provider="discord">Iniciar sesión con Discord</SignInButton>
    </div>
  )
}
