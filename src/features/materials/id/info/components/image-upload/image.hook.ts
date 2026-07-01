import { orpc } from '#/integrations/tanstack-query/orpc-query'
import {
  useQueryClient,
  useMutation,
  useSuspenseQuery,
} from '@tanstack/react-query'
import { useParams } from '@tanstack/react-router'
import { toast } from 'sonner'

export function useMaterialImageUpload() {
  const { id: materialId } = useParams({
    from: '/_protected/panel/(admin)/materials/$id',
  })

  const { data: material } = useSuspenseQuery(
    orpc.materials.material.getById.queryOptions({ input: { id: materialId } }),
  )

  const queryKey = orpc.materials.material.getById.queryKey({
    input: { id: materialId },
  })
  const queryClient = useQueryClient()

  const uploadMutation = useMutation(
    orpc.materials.images.upload.mutationOptions({
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

  return { material, uploadMutation }
}
