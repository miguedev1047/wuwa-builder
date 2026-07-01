import { orpc } from '#/integrations/tanstack-query/orpc-query'
import {
  useQueryClient,
  useMutation,
  useSuspenseQuery,
} from '@tanstack/react-query'
import { useParams } from '@tanstack/react-router'
import { toast } from 'sonner'

export function useEchoImageUpload() {
  const { id: echoId } = useParams({
    from: '/_protected/panel/(admin)/echoes/$id',
  })

  const { data: echo } = useSuspenseQuery(
    orpc.echoes.echo.getById.queryOptions({ input: { id: echoId } }),
  )

  const queryKey = orpc.echoes.echo.getById.queryKey({
    input: { id: echoId },
  })
  const queryClient = useQueryClient()

  const uploadMutation = useMutation(
    orpc.echoes.images.upload.mutationOptions({
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

  return { echo, uploadMutation }
}
