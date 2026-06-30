import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '#/components/ui/tooltip'
import type { TMaterialTable } from '#/integrations/orpc/routers/materials'
import { MaterialItemBase } from '#/features/materials/view-item/item-base'
import { Link } from '@tanstack/react-router'

interface MaterialTooltipedProps {
  material: TMaterialTable
}

export function MaterialTooltiped({ material }: MaterialTooltipedProps) {
  return (
    <Tooltip>
      <TooltipTrigger
        render={
          <Link to="/panel/materials/$id" params={{ id: material.id }}>
            <MaterialItemBase material={material} />
          </Link>
        }
      />
      <TooltipContent side="bottom">{material.name}</TooltipContent>
    </Tooltip>
  )
}
