import { DEFAULT_DESCRIPTION } from '#/constants/general'
import { orpc } from '#/integrations/tanstack-query/orpc-query'
import { useAppForm } from '#/shared/contexts/form.context'
import { materialZod, type TMaterialZod } from '#/zod-schemas/materials'
import { createId } from '@paralleldrive/cuid2'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import { toast } from 'sonner'

export function useMaterialCreate() {
  const formId = `material-create-${createId()}`

  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const queryKey = orpc.materials.material.getAll.queryKey()

  const mutation = useMutation(
    orpc.materials.material.create.mutationOptions({
      onSettled: () => {
        queryClient.invalidateQueries({ queryKey })
      },
      onSuccess: ({ message }) => {
        toast.success(message)
        form.reset()
        navigate({ to: '/panel/materials' })
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
      rarity: '',
      type: '',
    } as TMaterialZod,
    validators: {
      onSubmit: materialZod,
    },
    onSubmit: async ({ value }) => {
      mutation.mutate(value)
    },
  })

  const isPending = mutation.isPending

  return { form, formId, isPending }
}
