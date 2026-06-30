import { orpc } from '#/integrations/tanstack-query/orpc-query'
import { useAppForm } from '#/shared/contexts/form.context'
import { materialZod, type TMaterialZod } from '#/zod-schemas/materials'
import { createId } from '@paralleldrive/cuid2'
import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from '@tanstack/react-query'
import { useParams } from '@tanstack/react-router'
import { useState } from 'react'
import { toast } from 'sonner'

export function useMaterialUpdate() {
  const formId = `material-update-${createId()}`

  const [isOpen, setIsOpen] = useState(false)

  const { id: materialId } = useParams({
    from: '/_protected/panel/(admin)/materials/$id',
  })

  const { data: material } = useSuspenseQuery(
    orpc.materials.material.getById.queryOptions({
      input: { id: materialId },
    }),
  )

  const queryClient = useQueryClient()
  const queryKey = orpc.materials.material.getById.queryKey({
    input: { id: materialId },
  })

  const mutation = useMutation(
    orpc.materials.material.update.mutationOptions({
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
      id: material.id,
      name: material.name,
      description: material.description,
      rarity: material.rarity,
      type: material.type,
    } as TMaterialZod,
    validators: {
      onSubmit: materialZod,
    },
    onSubmit: async ({ value }) => {
      mutation.mutate(value)
    },
  })

  const isPending = mutation.isPending

  return { form, formId, isPending, isOpen, setIsOpen, material }
}
