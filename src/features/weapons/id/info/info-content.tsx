import { AssetImage } from '#/components/asset-image'
import { TiptapViewer } from '#/components/editor/editor-viewer'
import { Card, CardContent, CardHeader, CardTitle } from '#/components/ui/card'
import { orpc } from '#/integrations/tanstack-query/orpc-query'
import { useSuspenseQuery } from '@tanstack/react-query'
import { useParams } from '@tanstack/react-router'
import { DialogImage } from '#/features/weapons/id/info'
import { WeaponUpdateForm } from '#/features/weapons/crud/update'
import { DeleteWeapon } from '#/features/weapons/crud/delete'

export function InfoContent() {
  const { id } = useParams({ from: '/_protected/panel/(admin)/weapons/$id' })

  const { data: weapon } = useSuspenseQuery(
    orpc.weapons.weapon.getById.queryOptions({ input: { id } }),
  )

  const weaponAssets = weapon.assets

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>{weapon.name}</CardTitle>
          <div className="flex items-center gap-2">
            <WeaponUpdateForm />
            <DeleteWeapon />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-5 gap-4">
          <div className="col-span-1 relative">
            <AssetImage
              assetItems={weaponAssets}
              selectAssetNumber={0}
              className="aspect-square"
              disablePointerEvents
            />
            <DialogImage />
          </div>

          <div className="col-span-4">
            <TiptapViewer value={weapon.description} />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
