import { orpc } from '#/integrations/tanstack-query/orpc-query'
import {
  useQueryClient,
  useMutation,
  useSuspenseQuery,
} from '@tanstack/react-query'
import { useParams } from '@tanstack/react-router'
import { toast } from 'sonner'

export function useResonatorImageUpload() {
  const { id: resonatorId } = useParams({
    from: '/_protected/panel/(admin)/resonators/$id',
  })

  const { data: resonator } = useSuspenseQuery(
    orpc.resonators.resonator.getById.queryOptions({ input: { id: resonatorId } }),
  )

  const queryKey = orpc.resonators.resonator.getById.queryKey({
    input: { id: resonatorId },
  })
  const queryClient = useQueryClient()

  const uploadMutation = useMutation(
    orpc.resonators.images.upload.mutationOptions({
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

  return { resonator, uploadMutation }
}
