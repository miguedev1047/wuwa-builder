import { orpc } from '#/integrations/tanstack-query/orpc-query'
import { useQueryClient, useMutation } from '@tanstack/react-query'
import { useParams } from '@tanstack/react-router'
import { toast } from 'sonner'

export function useResonatorSkillImageUpload() {
  const { id: resonatorId } = useParams({
    from: '/_protected/panel/(admin)/resonators/$id',
  })

  const queryKey = orpc.resonators.resonator.getById.queryKey({
    input: { id: resonatorId },
  })
  const queryClient = useQueryClient()

  const uploadMutation = useMutation(
    orpc.resonators.skills.images.upload.mutationOptions({
      onSettled: () => {
        queryClient.invalidateQueries({ queryKey })
      },
      onSuccess: ({ message }) => {
        toast.success(message)
      },
      onError: ({ message }) => {
        toast.error(message)
      },
    }),
  )

  return { uploadMutation }
}

export function useResonatorSkillImageRemove() {
  const { id: resonatorId } = useParams({
    from: '/_protected/panel/(admin)/resonators/$id',
  })

  const queryKey = orpc.resonators.resonator.getById.queryKey({
    input: { id: resonatorId },
  })
  const queryClient = useQueryClient()

  const deleteMutation = useMutation(
    orpc.resonators.skills.images.delete.mutationOptions({
      onSettled: () => {
        queryClient.invalidateQueries({ queryKey })
      },
      onSuccess: ({ message }) => {
        toast.success(message)
      },
      onError: ({ message }) => {
        toast.error(message)
      },
    }),
  )

  const isPending = deleteMutation.isPending

  const onRemoveImage = (key: string, id: string) => {
    deleteMutation.mutate({ key, id })
  }

  return { isPending, onRemoveImage }
}
