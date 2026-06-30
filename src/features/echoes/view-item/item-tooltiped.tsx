import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '#/components/ui/tooltip'
import type { TEchoTable } from '#/integrations/orpc/routers/echoes'
import { EchoItemBase } from '#/features/echoes/view-item/item-base'
import { Link } from '@tanstack/react-router'

interface EchoTooltipedProps {
  echo: TEchoTable
}

export function EchoTooltiped({ echo }: EchoTooltipedProps) {
  return (
    <Tooltip>
      <TooltipTrigger
        render={
          <Link to="/panel/echoes/$id" params={{ id: echo.id }}>
            <EchoItemBase echo={echo} />
          </Link>
        }
      />
      <TooltipContent side="bottom">{echo.name}</TooltipContent>
    </Tooltip>
  )
}
