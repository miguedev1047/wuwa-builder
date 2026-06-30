import { AssetImage } from '#/components/asset-image'
import type { TEchoTable } from '#/integrations/orpc/routers/echoes'

interface EchoItemBaseProps {
  echo: TEchoTable
}

export function EchoItemBase({ echo }: EchoItemBaseProps) {
  return (
    <div className="aspect-square">
      <AssetImage
        assetItems={echo.assets}
        selectAssetNumber={0}
        className="size-full"
        animated
        disablePointerEvents
      />
    </div>
  )
}
