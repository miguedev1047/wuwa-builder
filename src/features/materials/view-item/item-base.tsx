import { AssetImage } from '#/components/asset-image'
import type { TMaterialTable } from '#/integrations/orpc/routers/materials'

interface MaterialItemBaseProps {
  material: TMaterialTable
}

export function MaterialItemBase({ material }: MaterialItemBaseProps) {
  return (
    <div className="aspect-square">
      <AssetImage
        assetItems={material.assets}
        selectAssetNumber={0}
        className="size-full"
        animated
        disablePointerEvents
      />
    </div>
  )
}
