import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '#/components/ui/tooltip'
import type { TResonatorTable } from '#/integrations/orpc/routers/resonators/__types'
import { ResonatorItemBase } from '#/features/resonators/view-item/item-base'
import { Link, type LinkProps } from '@tanstack/react-router'

interface ItemCardTooltipedProps {
  resonator: TResonatorTable
  to: LinkProps['to']
}

export function ResonatorTooltiped({
  resonator,
  to = '/panel/resonators/$id',
}: ItemCardTooltipedProps) {
  return (
    <Tooltip>
      <TooltipTrigger
        render={
          <Link to={to} params={{ id: resonator.id }}>
            <ResonatorItemBase resonator={resonator} />
          </Link>
        }
      />
      <TooltipContent side="bottom">{resonator.name}</TooltipContent>
    </Tooltip>
  )
}
