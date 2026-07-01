import { EntityViewList, EntityViewRoot } from '#/components/entity-view'
import { orpc } from '#/integrations/tanstack-query/orpc-query'
import { useSuspenseQuery } from '@tanstack/react-query'
import { useParams } from '@tanstack/react-router'
import { LevelBaseItem } from '#/features/resonators/id/levels/components/view-item'

export function LevelsPanelList() {
  const { id } = useParams({ from: '/_protected/panel/(admin)/resonators/$id' })

  const { data: resonator } = useSuspenseQuery(
    orpc.resonators.resonator.getById.queryOptions({ input: { id } }),
  )

  const levels = resonator.levels

  return (
    <EntityViewRoot className="grid grid-cols-1 gap-2">
      <EntityViewList
        items={levels}
        emptyContent={{
          title: 'Sin niveles',
          description:
            'No hay niveles disponibles para mostrar. Agrega un nivel para mostrarlo aquí.',
        }}
      >
        {(item) => <LevelBaseItem key={item.id} level={item} isAdmin />}
      </EntityViewList>
    </EntityViewRoot>
  )
}
