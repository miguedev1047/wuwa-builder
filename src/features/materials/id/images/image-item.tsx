import { Image } from '#/components/image'
import { Button } from '#/components/ui/button'
import {
  Item,
  ItemActions,
  ItemContent,
  ItemMedia,
  ItemTitle,
} from '#/components/ui/item'
import type { TMaterialAssetTable } from '#/integrations/orpc/routers/materials'
import { orpc } from '#/integrations/tanstack-query/orpc-query'
import { RiDeleteBin2Fill } from '@remixicon/react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

interface MaterialImageItemProps {
  item: TMaterialAssetTable
  imageUrl: string
}

export function MaterialImageItem({ item, imageUrl }: MaterialImageItemProps) {
  const queryKey = orpc.materials.material.getById.queryKey({
    input: { id: item.material_id },
  })
  const queryClient = useQueryClient()

  const deleteMutation = useMutation(
    orpc.materials.images.delete.mutationOptions({
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
