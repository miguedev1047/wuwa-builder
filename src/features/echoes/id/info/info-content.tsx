import { AssetImage } from '#/components/asset-image'
import { TiptapViewer } from '#/components/editor/editor-viewer'
import { Card, CardContent, CardHeader, CardTitle } from '#/components/ui/card'
import { orpc } from '#/integrations/tanstack-query/orpc-query'
import { useSuspenseQuery } from '@tanstack/react-query'
import { useParams } from '@tanstack/react-router'
import { DialogImage } from '#/features/echoes/id/info'
import { EchoUpdateForm } from '#/features/echoes/crud/update'
import { DeleteEcho } from '#/features/echoes/crud/delete'

export function InfoContent() {
  const { id } = useParams({ from: '/_protected/panel/(admin)/echoes/$id' })

  const { data: echo } = useSuspenseQuery(
    orpc.echoes.echo.getById.queryOptions({ input: { id } }),
  )

  const echoAssets = echo.assets

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>{echo.name}</CardTitle>
          <div className="flex items-center gap-2">
            <EchoUpdateForm />
            <DeleteEcho />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-5 gap-4">
          <div className="col-span-1 relative">
            <AssetImage
              assetItems={echoAssets}
              selectAssetNumber={0}
              className="aspect-square"
              disablePointerEvents
            />
            <DialogImage />
          </div>

          <div className="col-span-4">
            <TiptapViewer value={echo.description_skill} />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
