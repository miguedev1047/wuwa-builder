import { EntityDeleteItem } from '#/components/entity-delete-item'
import { orpc } from '#/integrations/tanstack-query/orpc-query'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate, useParams } from '@tanstack/react-router'
import { useState } from 'react'
import { toast } from 'sonner'

export function DeleteResonator() {
  const [isOpen, setIsOpen] = useState(false)

  const { id } = useParams({ from: '/_protected/panel/(admin)/resonators/$id' })

  const queryKey = orpc.resonators.resonator.getAll.queryKey()
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const mutation = useMutation(
    orpc.resonators.resonator.delete.mutationOptions({
      onSettled: () => {
        queryClient.invalidateQueries({ queryKey })
      },
      onSuccess: ({ message }) => {
        toast.success(message)
        setIsOpen(false)
        navigate({ to: '/panel/resonators' })
      },
      onError: ({ message }) => {
        toast.error(message)
      },
    }),
  )

  const isPending = mutation.isPending

  const onDelete = () => {
    mutation.mutate({ id })
  }

  return (
    <EntityDeleteItem
      title="Eliminar resonador"
      description="Al eliminar este resonador, esta acción es irreversible."
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      onDelete={onDelete}
      isPending={isPending}
    />
  )
}
