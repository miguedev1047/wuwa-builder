import { orpc } from '#/integrations/tanstack-query/orpc-query'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useParams } from '@tanstack/react-router'
import { useState } from 'react'
import { toast } from 'sonner'

interface DeleteSkillProps {
  skillId: string
}

export function useSkillDelete(data: DeleteSkillProps) {
  const [isOpen, setIsOpen] = useState(false)

  const { id: resonatorId } = useParams({
    from: '/_protected/panel/(admin)/resonators/$id',
  })

  const queryKey = orpc.resonators.resonator.getById.queryKey({
    input: { id: resonatorId },
  })
  const queryClient = useQueryClient()

  const mutation = useMutation(
    orpc.resonators.skills.delete.mutationOptions({
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
    mutation.mutate({ id: data.skillId })
  }

  return { isPending, onDelete, isOpen, setIsOpen }
}
