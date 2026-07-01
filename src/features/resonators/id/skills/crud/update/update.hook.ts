import type { TResonatorSkillTable } from '#/integrations/orpc/routers/resonators'
import { orpc } from '#/integrations/tanstack-query/orpc-query'
import { useAppForm } from '#/shared/contexts/form.context'
import {
  resonatorSkillZod,
  type TResonatorSkillZod,
} from '#/zod-schemas/resonators'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useParams } from '@tanstack/react-router'
import { useId, useState } from 'react'
import { toast } from 'sonner'

export function useResonatorSkillUpdate(data: TResonatorSkillTable) {
  const queryClient = useQueryClient()
  const [isOpen, setIsOpen] = useState(false)

  const id = useId()
  const formId = `skill-update-${id}`

  const { id: resonatorId } = useParams({
    from: '/_protected/panel/(admin)/resonators/$id',
  })

  const queryKey = orpc.resonators.resonator.getById.queryKey({
    input: { id: resonatorId },
  })

  const mutation = useMutation(
    orpc.resonators.skills.update.mutationOptions({
      onSettled: () => {
        queryClient.invalidateQueries({ queryKey })
        setIsOpen(false)
      },
      onSuccess: ({ message }) => {
        toast.success(message)
        form.reset()
      },
      onError: ({ message }) => {
        toast.error(message)
      },
    }),
  )

  const form = useAppForm({
    formId,
    defaultValues: {
      id: data.id,
      name: data.name,
      description: data.description,
      skill_type: data.skill_type,
      order: data.order,
      resonator_id: data.resonator_id,
    } as TResonatorSkillZod,
    validators: {
      onSubmit: resonatorSkillZod,
    },
    onSubmit: async ({ value }) => {
      mutation.mutate(value)
    },
  })

  const isPending = mutation.isPending

  return { form, formId, isPending, isOpen, setIsOpen }
}
