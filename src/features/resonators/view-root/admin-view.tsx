import { EntityViewList, EntityViewRoot } from '#/components/entity-view'
import { Button } from '#/components/ui/button'
import { orpc } from '#/integrations/tanstack-query/orpc-query'
import { useSuspenseQuery } from '@tanstack/react-query'
import { Link } from '@tanstack/react-router'
import { ResonatorTooltiped } from '#/features/resonators/view-item/item-tooltiped'
import { RiArrowLeftSLine } from '@remixicon/react'

export function ResonatorAdminView() {
  const { data: resonators } = useSuspenseQuery(
    orpc.resonators.resonator.getAll.queryOptions(),
  )

  return (
    <div className="space-y-4 @container/resonators">
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
          render={<Link to="/panel/resonators/create">Crear resonador</Link>}
        />
      </div>

      <EntityViewRoot className="grid @sm:grid-cols-2 @2xl/resonators:grid-cols-4 @7xl/resonators:grid-cols-8 gap-4">
        <EntityViewList items={resonators}>
          {(item) => <ResonatorTooltiped key={item.id} resonator={item} />}
        </EntityViewList>
      </EntityViewRoot>
    </div>
  )
}
