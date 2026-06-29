import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '#/components/ui/tooltip'
import type { TResonatorTable } from '#/integrations/orpc/routers/resonators/__types'
import { ResonatorItemBase } from '#/features/resonators/view-item/item-base'
import { Link } from '@tanstack/react-router'

interface ItemCardTooltipedProps {
  resonator: TResonatorTable
}

export function ResonatorTooltiped({ resonator }: ItemCardTooltipedProps) {
  return (
    <Tooltip>
      <TooltipTrigger
        render={
          <Link to="/panel/resonators/$id" params={{ id: resonator.id }}>
            <ResonatorItemBase resonator={resonator} />
          </Link>
        }
      />
      <TooltipContent side="bottom">{resonator.name}</TooltipContent>
    </Tooltip>
  )
}
