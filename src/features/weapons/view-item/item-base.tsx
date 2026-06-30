import { AssetImage } from '#/components/asset-image'
import type { TWeaponTable } from '#/integrations/orpc/routers/weapons/__types'

interface WeaponItemBaseProps {
  weapon: TWeaponTable
}

export function WeaponItemBase({ weapon }: WeaponItemBaseProps) {
  return (
    <div className="aspect-square">
      <AssetImage
        assetItems={weapon.assets}
        selectAssetNumber={0}
        className="size-full"
        animated
        disablePointerEvents
      />
    </div>
  )
}
