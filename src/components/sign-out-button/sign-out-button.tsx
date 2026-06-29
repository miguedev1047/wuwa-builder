import { authClient } from '#/lib/auth-client'
import { toast } from 'sonner'
import { Button } from '#/components/ui/button'
import { useTransition } from 'react'
import { Spinner } from '#/components/ui/spinner'
import { useNavigate } from '@tanstack/react-router'

export function SignOutButton() {
  const [isPending, startTransition] = useTransition()

  const navigate = useNavigate()

  const signOut = () =>
    startTransition(async () => {
      await authClient.signOut({
        fetchOptions: {
          onSuccess: () => {
            toast.success('Iniciando sesión')
            navigate({ to: '/' })
          },
          onError: () => {
            toast.error('Error al iniciar sesión')
          },
        },
      })
    })

  return (
    <div>
      <Button onClick={signOut} disabled={isPending}>
        {isPending && <Spinner />}
        Cerrar sesión
      </Button>
    </div>
  )
}
