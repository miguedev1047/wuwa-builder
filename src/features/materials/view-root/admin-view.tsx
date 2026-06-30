import { EntityViewList, EntityViewRoot } from '#/components/entity-view'
import { Button } from '#/components/ui/button'
import { orpc } from '#/integrations/tanstack-query/orpc-query'
import { useSuspenseQuery } from '@tanstack/react-query'
import { Link } from '@tanstack/react-router'
import { MaterialTooltiped } from '#/features/materials/view-item/item-tooltiped'
import { RiArrowLeftSLine } from '@remixicon/react'

export function MaterialAdminView() {
  const { data: materials } = useSuspenseQuery(
    orpc.materials.material.getAll.queryOptions(),
  )

  return (
    <div className="space-y-4 @container/materials">
      <div className="flex items-center gap-2">
        <Button
          nativeButton={false}
          size="icon"
          render={
            <Link to="/panel/roster">
              <RiArrowLeftSLine />
            </Link>
          }
        />

        <Button
          nativeButton={false}
          render={<Link to="/panel/materials/create">Crear material</Link>}
        />
      </div>

      <EntityViewRoot className="grid @sm:grid-cols-2 @2xl/materials:grid-cols-4 @7xl/materials:grid-cols-8 gap-4">
        <EntityViewList items={materials}>
          {(item) => <MaterialTooltiped key={item.id} material={item} />}
        </EntityViewList>
      </EntityViewRoot>
    </div>
  )
}
