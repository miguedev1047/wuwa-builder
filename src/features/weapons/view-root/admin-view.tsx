import { EntityViewList, EntityViewRoot } from '#/components/entity-view'
import { Button } from '#/components/ui/button'
import { orpc } from '#/integrations/tanstack-query/orpc-query'
import { useSuspenseQuery } from '@tanstack/react-query'
import { Link } from '@tanstack/react-router'
import { WeaponTooltiped } from '#/features/weapons/view-item/item-tooltiped'
import { RiArrowLeftSLine } from '@remixicon/react'

export function WeaponAdminView() {
  const { data: weapons } = useSuspenseQuery(
    orpc.weapons.weapon.getAll.queryOptions(),
  )

  return (
    <div className="space-y-4 @container/weapons">
      <div className="flex items-center gap-2">
        <Button
          nativeButton={false}
          size="icon"
          render={
            <Link to="/panel/my-roster">
              <RiArrowLeftSLine />
            </Link>
          }
        />

        <Button
          nativeButton={false}
          render={<Link to="/panel/weapons/create">Crear arma</Link>}
        />
      </div>

      <EntityViewRoot className="grid @sm:grid-cols-2 @2xl/weapons:grid-cols-4 @7xl/weapons:grid-cols-8 gap-4">
        <EntityViewList items={weapons}>
          {(item) => <WeaponTooltiped key={item.id} weapon={item} />}
        </EntityViewList>
      </EntityViewRoot>
    </div>
  )
}
