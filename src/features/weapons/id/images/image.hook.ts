import { orpc } from '#/integrations/tanstack-query/orpc-query'
import {
  useQueryClient,
  useMutation,
  useSuspenseQuery,
} from '@tanstack/react-query'
import { useParams } from '@tanstack/react-router'
import { toast } from 'sonner'

export function useWeaponImageUpload() {
  const { id: weaponId } = useParams({
    from: '/_protected/panel/(admin)/weapons/$id',
  })

  const { data: weapon } = useSuspenseQuery(
    orpc.weapons.weapon.getById.queryOptions({ input: { id: weaponId } }),
  )

  const queryKey = orpc.weapons.weapon.getById.queryKey({
    input: { id: weaponId },
  })
  const queryClient = useQueryClient()

  const uploadMutation = useMutation(
    orpc.weapons.images.upload.mutationOptions({
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

  return { weapon, uploadMutation }
}
