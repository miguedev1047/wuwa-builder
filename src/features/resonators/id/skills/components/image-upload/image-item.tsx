import { Image } from '#/components/image'
import { Button } from '#/components/ui/button'
import {
  Item,
  ItemActions,
  ItemContent,
  ItemMedia,
  ItemTitle,
} from '#/components/ui/item'
import type { AssetItem } from '#/components/file-input/file-input.types'
import { RiDeleteBin2Fill } from '@remixicon/react'
import { useResonatorSkillImageRemove } from '#/features/resonators/id/skills/components/image-upload/image.hook.ts'

interface ResonatorSkillImageItemProps {
  item: AssetItem
  imageUrl: string
}

export function ResonatorSkillImageItem({
  item,
  imageUrl,
}: ResonatorSkillImageItemProps) {
  const { isPending, onRemoveImage } = useResonatorSkillImageRemove()

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
          onClick={() => onRemoveImage(item.key, item.id)}
        >
          <RiDeleteBin2Fill />
        </Button>
      </ItemActions>
    </Item>
  )
}
