import { getImageUrl } from '#/helpers/general/get-image-url'
import { Image } from '#/components/image'
import { RiImage2Fill } from '@remixicon/react'
import { cn } from '#/lib/utils'

interface AssetItemsProps {
  id: string
  createdAt: Date
  updatedAt: Date
  key: string
  order: number
  [key: string]: any
}

interface AssetImageProps extends Omit<
  React.ComponentProps<typeof Image>,
  'src' | 'alt'
> {
  assetItems: AssetItemsProps[]
  selectAssetNumber?: number
}

export function AssetImage({
  assetItems,
  selectAssetNumber = 0,
  ...props
}: AssetImageProps) {
  if (assetItems.length <= 0) {
    return (
      <figure
        className={cn(props.className, 'grid place-items-center bg-accent')}
      >
        <RiImage2Fill className="size-20" />
      </figure>
    )
  }

  const asset = assetItems[selectAssetNumber]
  const { key } = asset

  return <Image src={getImageUrl(key)} alt={`Asset ${key}`} {...props} />
}
