import { AssetImage } from '#/components/asset-image'
import {
  Item,
  ItemActions,
  ItemContent,
  ItemMedia,
  ItemTitle,
} from '#/components/ui/item'
import type { TResonatorBestWeaponTable } from '#/integrations/orpc/routers/resonators'
import { DeleteBestWeapon } from '#/features/resonators/id/sections/best-weapons/crud/delete'

interface BestWeaponItemProps {
  bestWeapon: TResonatorBestWeaponTable
}

export function BestWeaponItem({ bestWeapon }: BestWeaponItemProps) {
  return (
    <Item variant="outline">
      <ItemMedia variant="image">
        <AssetImage
          assetItems={bestWeapon.weapon.assets}
          selectAssetNumber={0}
          className="size-full"
        />
      </ItemMedia>
      <ItemContent>
        <ItemTitle>{bestWeapon.weapon.name}</ItemTitle>
      </ItemContent>
      <ItemActions>
        <DeleteBestWeapon bestWeaponId={bestWeapon.id} />
      </ItemActions>
    </Item>
  )
}
