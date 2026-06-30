import { orpc } from '#/integrations/tanstack-query/orpc-query'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useParams } from '@tanstack/react-router'
import { useState } from 'react'
import { toast } from 'sonner'

interface DeleteBestWeaponProps {
  bestWeaponId: string
}

export function useBestWeaponDelete(data: DeleteBestWeaponProps) {
  const [isOpen, setIsOpen] = useState(false)

  const { id } = useParams({ from: '/_protected/panel/(admin)/resonators/$id' })

  const queryKey = orpc.resonators.resonator.getById.queryKey({ input: { id } })
  const queryClient = useQueryClient()

  const mutation = useMutation(
    orpc.resonators.best_weapons.delete.mutationOptions({
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

  const isPending = mutation.isPending

  const onDelete = () => {
    mutation.mutate({ id: data.bestWeaponId })
  }

  return { isPending, onDelete, isOpen, setIsOpen }
}
