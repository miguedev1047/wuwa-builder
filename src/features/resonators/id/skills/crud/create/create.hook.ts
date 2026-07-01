import { DEFAULT_DESCRIPTION } from '#/constants/general'
import { RESONATOR_SKILLS } from '#/constants/resonators'
import { orpc } from '#/integrations/tanstack-query/orpc-query'
import { useAppForm } from '#/shared/contexts/form.context'
import {
  resonatorSkillZod,
  type TResonatorSkillZod,
} from '#/zod-schemas/resonators'
import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from '@tanstack/react-query'
import { useParams } from '@tanstack/react-router'
import { useId, useState } from 'react'
import { toast } from 'sonner'

export function useResonatorSkillCreate() {
  const queryClient = useQueryClient()
  const [isOpen, setIsOpen] = useState(false)

  const id = useId()
  const formId = `skill-create-${id}`

  const { id: resonatorId } = useParams({
    from: '/_protected/panel/(admin)/resonators/$id',
  })

  const { data: resonator } = useSuspenseQuery(
    orpc.resonators.resonator.getById.queryOptions({
      input: { id: resonatorId },
    }),
  )

  const currentSkillCount = resonator.skills.length
  const maxSkills = RESONATOR_SKILLS.length

  const queryKey = orpc.resonators.resonator.getById.queryKey({
    input: { id: resonatorId },
  })

  const mutation = useMutation(
    orpc.resonators.skills.create.mutationOptions({
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
      name: '',
      description: DEFAULT_DESCRIPTION,
      skill_type: '',
      order: currentSkillCount,
      resonator_id: resonatorId,
    } as TResonatorSkillZod,
    validators: {
      onSubmit: resonatorSkillZod,
    },
    onSubmit: async ({ value }) => {
      if (currentSkillCount >= maxSkills) return
      mutation.mutate({ ...value, order: currentSkillCount })
    },
  })

  const isPending = mutation.isPending
  const isDisabled = currentSkillCount >= maxSkills

  return {
    form,
    formId,
    isPending,
    isOpen,
    setIsOpen,
    currentSkillCount,
    isDisabled,
  }
}
