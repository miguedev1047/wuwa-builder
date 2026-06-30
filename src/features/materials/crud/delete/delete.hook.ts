import { orpc } from '#/integrations/tanstack-query/orpc-query'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate, useParams } from '@tanstack/react-router'
import { useState } from 'react'
import { toast } from 'sonner'

export function useMaterialDelete() {
  const [isOpen, setIsOpen] = useState(false)

  const { id } = useParams({ from: '/_protected/panel/(admin)/materials/$id' })

  const queryKey = orpc.materials.material.getAll.queryKey()
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const mutation = useMutation(
    orpc.materials.material.delete.mutationOptions({
      onSettled: () => {
        queryClient.invalidateQueries({ queryKey })
      },
      onSuccess: ({ message }) => {
        toast.success(message)
        setIsOpen(false)
        navigate({ to: '/panel/materials' })
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

  return { isPending, onDelete, isOpen, setIsOpen }
}
