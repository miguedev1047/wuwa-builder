import { AssetImage } from '#/components/asset-image'
import type { TResonatorTable } from '#/integrations/orpc/routers/resonators/__types'

interface ResonatorItemBaseProps {
  resonator: TResonatorTable
}

export function ResonatorItemBase({ resonator }: ResonatorItemBaseProps) {
  return (
    <div className="aspect-2/3">
      <AssetImage
        assetItems={resonator.assets}
        selectAssetNumber={0}
        className="size-full"
        animated
        disablePointerEvents
      />
    </div>
  )
}
