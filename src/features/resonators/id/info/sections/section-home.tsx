import { AssetImage } from '#/components/asset-image'
import { TiptapViewer } from '#/components/editor/editor-viewer'
import { Card, CardContent, CardHeader, CardTitle } from '#/components/ui/card'
import { orpc } from '#/integrations/tanstack-query/orpc-query'
import { useSuspenseQuery } from '@tanstack/react-query'
import { useParams } from '@tanstack/react-router'

export function InfoContentHome() {
  const { id } = useParams({ from: '/_home/resonators/$id' })

  const { data: resonator } = useSuspenseQuery(
    orpc.resonators.resonator.getById.queryOptions({ input: { id } }),
  )

  const resonatorAssets = resonator.assets

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-2xl font-semibold">
            {resonator.name}
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-5 gap-4">
          <div className="col-span-5 md:col-span-1 relative">
            <AssetImage
              assetItems={resonatorAssets}
              selectAssetNumber={0}
              className="aspect-2/3"
              disablePointerEvents
            />
          </div>

          <div className="col-span-5 md:col-span-4">
            <TiptapViewer value={resonator.description} />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
