import { Item, ItemActions, ItemContent, ItemTitle } from '#/components/ui/item'
import type { TResonatorLevelTable } from '#/integrations/orpc/routers/resonators'
import { Badge } from '#/components/ui/badge'
import { DeleteLevel } from '#/features/resonators/id/levels/crud/delete'
import { ResonatorLevelUpdateForm } from '#/features/resonators/id/levels/crud/update'

interface LevelItemBaseProps {
  level: TResonatorLevelTable
  isAdmin?: boolean
}

export function LevelBaseItem({ level, isAdmin = false }: LevelItemBaseProps) {
  const [_, currentLevel] = level.level_value.split('_')

  return (
    <Item variant="outline">
      <ItemContent>
        <ItemTitle>Nivel: {currentLevel}</ItemTitle>
        <ul className="flex items-center gap-2">
          <Badge variant="secondary">Vida: {level.hp}</Badge>
          <Badge variant="secondary">Ataque: {level.atk}</Badge>
          <Badge variant="secondary">Defensa: {level.def}</Badge>
        </ul>
      </ItemContent>
      {isAdmin && (
        <ItemActions>
          <ResonatorLevelUpdateForm level={level} />
          <DeleteLevel levelId={level.id} />
        </ItemActions>
      )}
    </Item>
  )
}
