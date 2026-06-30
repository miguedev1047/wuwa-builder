import { EntityViewList, EntityViewRoot } from '#/components/entity-view'
import { orpc } from '#/integrations/tanstack-query/orpc-query'
import { useSuspenseQuery } from '@tanstack/react-query'
import { useParams } from '@tanstack/react-router'
import { BestWeaponItem } from '#/features/resonators/id/sections/best-weapons/components/best-weapon-item'

export function BestWeaponList() {
  const { id } = useParams({ from: '/_protected/panel/(admin)/resonators/$id' })

  const { data: resonator } = useSuspenseQuery(
    orpc.resonators.resonator.getById.queryOptions({ input: { id } }),
  )

  const bestWeapons = resonator.best_weapons

  return (
    <EntityViewRoot className="grid grid-cols-1 gap-2">
      <EntityViewList items={bestWeapons}>
        {(item) => <BestWeaponItem key={item.weapon.id} bestWeapon={item} />}
      </EntityViewList>
    </EntityViewRoot>
  )
}
