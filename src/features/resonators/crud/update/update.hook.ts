import { orpc } from '#/integrations/tanstack-query/orpc-query'
import { useAppForm } from '#/shared/contexts/form.context'
import {
  resonatorZod,
  type TResonatorZod,
} from '#/zod-schemas/resonators/items'
import { createId } from '@paralleldrive/cuid2'
import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from '@tanstack/react-query'
import { useParams } from '@tanstack/react-router'
import { useState } from 'react'
import { toast } from 'sonner'

export function useResonatorUpdate() {
  const formId = `resonator-update-${createId()}`

  const [isOpen, setIsOpen] = useState(false)

  const { id: resonatorId } = useParams({
    from: '/_protected/panel/(admin)/resonators/$id',
  })

  const { data: resonator } = useSuspenseQuery(
    orpc.resonators.resonator.getById.queryOptions({ input: { id: resonatorId } }),
  )

  const queryClient = useQueryClient()
  const queryKey = orpc.resonators.resonator.getById.queryKey({
    input: { id: resonatorId },
  })

  const mutation = useMutation(
    orpc.resonators.resonator.update.mutationOptions({
      onSettled: () => {
        queryClient.invalidateQueries({ queryKey })
      },
      onSuccess: ({ message }) => {
        toast.success(message)
        setIsOpen(false)
      },
      onError: ({ message }) => {
        toast.error(message)
      },
    }),
  )

  const form = useAppForm({
    formId,
    defaultValues: {
      id: resonator.id,
      name: resonator.name,
      description: resonator.description,
      is_new: resonator.is_new,
      is_public: resonator.is_public,
      rarity: resonator.rarity,
      role: resonator.role,
      element: resonator.element,
      weapon_type: resonator.weapon_type,
    } as TResonatorZod,
    validators: {
      onSubmit: resonatorZod,
    },
    onSubmit: async ({ value }) => {
      mutation.mutate(value)
    },
  })

  const isPending = mutation.isPending

  return { form, formId, isPending, isOpen, setIsOpen }
}
