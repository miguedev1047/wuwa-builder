import { DEFAULT_DESCRIPTION } from '#/constants/general'
import { orpc } from '#/integrations/tanstack-query/orpc-query'
import { useAppForm } from '#/shared/contexts/form.context'
import { resonatorZod, type TResonatorZod } from '#/zod-schemas/resonators'
import { createId } from '@paralleldrive/cuid2'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import { toast } from 'sonner'

export function useResonatorCreate() {
  const formId = `resonator-create-${createId()}`

  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const queryKey = orpc.resonators.resonator.getAll.queryKey()

  const mutation = useMutation(
    orpc.resonators.resonator.create.mutationOptions({
      onSettled: () => {
        queryClient.invalidateQueries({ queryKey })
      },
      onSuccess: ({ message }) => {
        toast.success(message)
        form.reset()
        navigate({ to: '/panel/resonators' })
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
      description: DEFAULT_DESCRIPTION,
      is_new: false,
      is_public: false,
      rarity: '',
      role: '',
      element: '',
      weapon_type: '',
    } as TResonatorZod,
    validators: {
      onSubmit: resonatorZod,
    },
    onSubmit: async ({ value }) => {
      mutation.mutate(value)
    },
  })

  const isPending = mutation.isPending

  return { form, formId, isPending }
}
