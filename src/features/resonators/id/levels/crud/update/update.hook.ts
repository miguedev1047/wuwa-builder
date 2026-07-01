import type { TResonatorLevelTable } from '#/integrations/orpc/routers/resonators'
import { orpc } from '#/integrations/tanstack-query/orpc-query'
import { useAppForm } from '#/shared/contexts/form.context'
import {
  resonatorLevelZod,
  type TResonatorLevelZod,
} from '#/zod-schemas/resonators'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useParams } from '@tanstack/react-router'
import { useId, useState } from 'react'
import { toast } from 'sonner'

export function useResonatorLevelUpdate(data: TResonatorLevelTable) {
  const queryClient = useQueryClient()
  const [isOpen, setIsOpen] = useState(false)

  const id = useId()
  const formId = `level-update-${id}`

  const { id: resonatorId } = useParams({
    from: '/_protected/panel/(admin)/resonators/$id',
  })

  const [_, currentLevel] = data.level_value.split('_')

  const queryKey = orpc.resonators.resonator.getById.queryKey({
    input: { id: resonatorId },
  })

  const mutation = useMutation(
    orpc.resonators.levels.update.mutationOptions({
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
      atk: data.atk,
      hp: data.hp,
      def: data.def,
      level_value: data.level_value,
      order: data.order,
      resonator_id: data.resonator_id,
    } as TResonatorLevelZod,
    validators: {
      onSubmit: resonatorLevelZod,
    },
    onSubmit: async ({ value }) => {
      mutation.mutate(value)
    },
  })

  const isPending = mutation.isPending

  return { form, formId, isPending, isOpen, setIsOpen, currentLevel }
}
