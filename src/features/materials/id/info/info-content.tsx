import { AssetImage } from '#/components/asset-image'
import { TiptapViewer } from '#/components/editor/editor-viewer'
import { Card, CardContent, CardHeader, CardTitle } from '#/components/ui/card'
import { orpc } from '#/integrations/tanstack-query/orpc-query'
import { useSuspenseQuery } from '@tanstack/react-query'
import { useParams } from '@tanstack/react-router'
import { DialogImage } from '#/features/materials/id/info'
import { MaterialUpdateForm } from '#/features/materials/crud/update'
import { DeleteMaterial } from '#/features/materials/crud/delete'

export function InfoContent() {
  const { id } = useParams({ from: '/_protected/panel/(admin)/materials/$id' })

  const { data: material } = useSuspenseQuery(
    orpc.materials.material.getById.queryOptions({ input: { id } }),
  )

  const materialAssets = material.assets

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>{material.name}</CardTitle>
          <div className="flex items-center gap-2">
            <MaterialUpdateForm />
            <DeleteMaterial />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-5 gap-4">
          <div className="col-span-1 relative">
            <AssetImage
              assetItems={materialAssets}
              selectAssetNumber={0}
              className="aspect-square"
              disablePointerEvents
            />
            <DialogImage />
          </div>

          <div className="col-span-4">
            <TiptapViewer value={material.description} />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
