import { authClient } from '#/lib/auth-client'
import { toast } from 'sonner'
import { Button } from '#/components/ui/button'
import { useTransition } from 'react'
import { Spinner } from '#/components/ui/spinner'

interface SignInButtonProps {
  provider: 'google' | 'github' | 'discord'
  children: React.ReactNode
}

export function SignInButton({ provider, children }: SignInButtonProps) {
  const [isPending, startTransition] = useTransition()

  const signIn = () => {
    startTransition(async () => {
      await authClient.signIn.social({
        provider: provider,
        callbackURL: '/panel',
        fetchOptions: {
          onSuccess: () => {
            toast.success('Iniciando sesión')
          },
          onError: () => {
            toast.error('Error al iniciar sesión')
          },
        },
      })
    })
  }

  return (
    <div>
      <Button onClick={signIn} disabled={isPending}>
        {isPending && <Spinner />}
        {children}
      </Button>
    </div>
  )
}
