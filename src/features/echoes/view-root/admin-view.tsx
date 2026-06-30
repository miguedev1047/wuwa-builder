import { EntityViewList, EntityViewRoot } from '#/components/entity-view'
import { Button } from '#/components/ui/button'
import { orpc } from '#/integrations/tanstack-query/orpc-query'
import { useSuspenseQuery } from '@tanstack/react-query'
import { Link } from '@tanstack/react-router'
import { EchoTooltiped } from '#/features/echoes/view-item/item-tooltiped'
import { RiArrowLeftSLine } from '@remixicon/react'

export function EchoAdminView() {
  const { data: echoes } = useSuspenseQuery(
    orpc.echoes.echo.getAll.queryOptions(),
  )

  return (
    <div className="space-y-4 @container/echoes">
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
          render={<Link to="/panel/echoes/create">Crear eco</Link>}
        />
      </div>

      <EntityViewRoot className="grid @sm:grid-cols-2 @2xl/echoes:grid-cols-4 @7xl/echoes:grid-cols-8 gap-4">
        <EntityViewList items={echoes}>
          {(item) => <EchoTooltiped key={item.id} echo={item} />}
        </EntityViewList>
      </EntityViewRoot>
    </div>
  )
}
