import { EntityViewList, EntityViewRoot } from '#/components/entity-view'
import { Button } from '#/components/ui/button'
import { orpc } from '#/integrations/tanstack-query/orpc-query'
import { RiArrowLeftSLine } from '@remixicon/react'
import { useSuspenseQuery } from '@tanstack/react-query'
import { Link } from '@tanstack/react-router'
import { ResonatorTooltiped } from '#/features/resonators/view-item'

export function ResonatorHomeView() {
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
            <Link to="/">
              <RiArrowLeftSLine />
            </Link>
          }
        />
      </div>

      <EntityViewRoot className="grid @sm:grid-cols-2 @2xl/resonators:grid-cols-4 @7xl/resonators:grid-cols-8 gap-4">
        <EntityViewList items={resonators}>
          {(item) => (
            <ResonatorTooltiped
              key={item.id}
              resonator={item}
              to="/resonators/$id"
            />
          )}
        </EntityViewList>
      </EntityViewRoot>
    </div>
  )
}
