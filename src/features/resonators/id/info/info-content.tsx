import { AssetImage } from '#/components/asset-image'
import { TiptapViewer } from '#/components/editor/editor-viewer'
import { Card, CardContent, CardHeader, CardTitle } from '#/components/ui/card'
import { orpc } from '#/integrations/tanstack-query/orpc-query'
import { useSuspenseQuery } from '@tanstack/react-query'
import { useParams } from '@tanstack/react-router'
import { DialogImage } from '#/features/resonators/id/info'
import { ResonatorUpdateForm } from '#/features/resonators/crud/update'
import { DeleteResonator } from '#/features/resonators/crud/delete'

export function InfoContent() {
  const { id } = useParams({ from: '/_protected/panel/(admin)/resonators/$id' })

  const { data: resonator } = useSuspenseQuery(
    orpc.resonators.resonator.getById.queryOptions({ input: { id } }),
  )

  const resonatorAssets = resonator.assets

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>{resonator.name}</CardTitle>
          <div className="flex items-center gap-2">
            <ResonatorUpdateForm />
            <DeleteResonator />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-5 gap-4">
          <div className="col-span-1 relative">
            <AssetImage
              assetItems={resonatorAssets}
              selectAssetNumber={0}
              className="aspect-2/3"
              disablePointerEvents
            />
            <DialogImage />
          </div>

          <div className="col-span-4">
            <TiptapViewer value={resonator.description} />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
