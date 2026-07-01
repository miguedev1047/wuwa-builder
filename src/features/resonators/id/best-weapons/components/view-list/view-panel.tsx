import { EntityViewList, EntityViewRoot } from '#/components/entity-view'
import { orpc } from '#/integrations/tanstack-query/orpc-query'
import { useSuspenseQuery } from '@tanstack/react-query'
import { BestWeaponBaseItem } from '#/features/resonators/id/best-weapons/components/view-item'
import { useParams } from '@tanstack/react-router'

export function BestWeaponPanelList() {
  const { id } = useParams({ from: '/_protected/panel/(admin)/resonators/$id' })

  const { data: resonator } = useSuspenseQuery(
    orpc.resonators.resonator.getById.queryOptions({ input: { id } }),
  )

  const bestWeapons = resonator.best_weapons

  return (
    <EntityViewRoot className="grid grid-cols-1 gap-2">
      <EntityViewList
        items={bestWeapons}
        emptyContent={{
          title: 'Sin armas',
          description:
            'No hay armas disponibles para mostrar. Agrega una nueva arma para mostrarla aquí.',
        }}
      >
        {(item) => (
          <BestWeaponBaseItem key={item.weapon.id} bestWeapon={item} isAdmin />
        )}
      </EntityViewList>
    </EntityViewRoot>
  )
}
