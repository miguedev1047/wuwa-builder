import { EntityViewList, EntityViewRoot } from '#/components/entity-view'
import { orpc } from '#/integrations/tanstack-query/orpc-query'
import { useSuspenseQuery } from '@tanstack/react-query'
import { useParams } from '@tanstack/react-router'
import { SkillBaseItem } from '#/features/resonators/id/skills/components/view-item'
import { orderList } from '#/features/resonators/id/skills/helpers/order-list'

export function SkillPanelList() {
  const { id } = useParams({ from: '/_protected/panel/(admin)/resonators/$id' })

  const { data: resonator } = useSuspenseQuery(
    orpc.resonators.resonator.getById.queryOptions({ input: { id } }),
  )

  const skills = orderList(resonator.skills)

  return (
    <EntityViewRoot className="grid grid-cols-1 gap-2">
      <EntityViewList
        items={skills}
        emptyContent={{
          title: 'Sin habilidades',
          description:
            'No hay habilidades disponibles para mostrar. Agrega una habilidad para mostrarla aquí.',
        }}
      >
        {(item) => <SkillBaseItem key={item.id} skill={item} isAdmin />}
      </EntityViewList>
    </EntityViewRoot>
  )
}
