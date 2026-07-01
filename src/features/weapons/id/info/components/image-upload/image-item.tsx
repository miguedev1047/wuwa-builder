import { Image } from '#/components/image'
import { Button } from '#/components/ui/button'
import {
  Item,
  ItemActions,
  ItemContent,
  ItemMedia,
  ItemTitle,
} from '#/components/ui/item'
import type { TWeaponAssetTable } from '#/integrations/orpc/routers/weapons'
import { orpc } from '#/integrations/tanstack-query/orpc-query'
import { RiDeleteBin2Fill } from '@remixicon/react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

interface WeaponImageItemProps {
  item: TWeaponAssetTable
  imageUrl: string
}

export function WeaponImageItem({ item, imageUrl }: WeaponImageItemProps) {
  const queryKey = orpc.weapons.weapon.getById.queryKey({
    input: { id: item.weapon_id },
  })
  const queryClient = useQueryClient()

  const deleteMutation = useMutation(
    orpc.weapons.images.delete.mutationOptions({
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

  const onRemoveImage = () => {
    deleteMutation.mutate({ key: item.key, id: item.id })
  }

  return (
    <Item variant="outline">
      <ItemMedia variant="image">
        <Image
          src={imageUrl}
          alt={item.key}
          className="w-20 h-20 object-cover"
        />
      </ItemMedia>
      <ItemContent>
        <ItemTitle>{item.key}</ItemTitle>
      </ItemContent>
      <ItemActions>
        <Button
          size="icon"
          variant="ghost"
          disabled={isPending}
          onClick={onRemoveImage}
        >
          <RiDeleteBin2Fill />
        </Button>
      </ItemActions>
    </Item>
  )
}
