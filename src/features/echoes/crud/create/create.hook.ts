import { DEFAULT_DESCRIPTION } from '#/constants/general'
import { orpc } from '#/integrations/tanstack-query/orpc-query'
import { useAppForm } from '#/shared/contexts/form.context'
import { echoZod, type TEchoZod } from '#/zod-schemas/echoes'
import { createId } from '@paralleldrive/cuid2'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import { toast } from 'sonner'

export function useEchoCreate() {
  const formId = `echo-create-${createId()}`

  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const queryKey = orpc.echoes.echo.getAll.queryKey()

  const mutation = useMutation(
    orpc.echoes.echo.create.mutationOptions({
      onSettled: () => {
        queryClient.invalidateQueries({ queryKey })
      },
      onSuccess: ({ message }) => {
        toast.success(message)
        form.reset()
        navigate({ to: '/panel/echoes' })
      },
      onError: ({ message }) => {
        toast.error(message)
      },
    }),
  )

  const form = useAppForm({
    formId,
    defaultValues: {
      id: createId(),
      name: '',
      description_skill: DEFAULT_DESCRIPTION,
      echo_class: '',
      echo_cost: '',
      echo_sonatas: [],
    } as TEchoZod,
    validators: {
      onSubmit: echoZod,
    },
    onSubmit: async ({ value }) => {
      mutation.mutate(value)
    },
  })

  const isPending = mutation.isPending

  return { form, formId, isPending }
}
