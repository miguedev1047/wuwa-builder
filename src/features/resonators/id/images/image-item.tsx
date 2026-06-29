import { Image } from '#/components/image'
import { Button } from '#/components/ui/button'
import {
  Item,
  ItemActions,
  ItemContent,
  ItemMedia,
  ItemTitle,
} from '#/components/ui/item'
import type { TResonatorAssetsTable } from '#/integrations/orpc/routers/resonators/__types'
import { orpc } from '#/integrations/tanstack-query/orpc-query'
import { RiDeleteBin2Fill } from '@remixicon/react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

interface ResonatorImageItemProps {
  item: TResonatorAssetsTable
  imageUrl: string
}

export function ResonatorImageItem({
  item,
  imageUrl,
}: ResonatorImageItemProps) {
  const queryKey = orpc.resonators.resonator.getById.queryKey({
    input: { id: item.resonator_id },
  })
  const queryClient = useQueryClient()

  const deleteMutation = useMutation(
    orpc.resonators.images.delete.mutationOptions({
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
