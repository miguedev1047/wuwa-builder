import { LEVELS } from '#/constants/core'
import { orpc } from '#/integrations/tanstack-query/orpc-query'
import { useAppForm } from '#/shared/contexts/form.context'
import {
  resonatorLevelZod,
  type TResonatorLevelZod,
} from '#/zod-schemas/resonators'
import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from '@tanstack/react-query'
import { useParams } from '@tanstack/react-router'
import { useId, useState } from 'react'
import { toast } from 'sonner'

export function useResonatorLevelCreate() {
  const queryClient = useQueryClient()
  const [isOpen, setIsOpen] = useState(false)

  const id = useId()
  const formId = `level-create-${id}`

  const { id: resonatorId } = useParams({
    from: '/_protected/panel/(admin)/resonators/$id',
  })

  const { data: resonator } = useSuspenseQuery(
    orpc.resonators.resonator.getById.queryOptions({
      input: { id: resonatorId },
    }),
  )

  const currentLevels = resonator.levels.length
  const maxLevels = LEVELS.length

  const queryKey = orpc.resonators.resonator.getById.queryKey({
    input: { id: resonatorId },
  })

  const mutation = useMutation(
    orpc.resonators.levels.create.mutationOptions({
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
      atk: 0,
      hp: 0,
      def: 0,
      level_value: '',
      order: currentLevels,
      resonator_id: resonatorId,
    } as TResonatorLevelZod,
    validators: {
      onSubmit: resonatorLevelZod,
    },
    onSubmit: async ({ value }) => {
      if (currentLevels >= maxLevels) return
      mutation.mutate(value)
    },
  })

  const isPending = mutation.isPending
  const isDisabled = currentLevels >= maxLevels

  return {
    form,
    formId,
    isPending,
    isOpen,
    setIsOpen,
    currentLevels,
    isDisabled,
  }
}
