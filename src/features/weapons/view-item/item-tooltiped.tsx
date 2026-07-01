import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '#/components/ui/tooltip'
import type { TWeaponTable } from '#/integrations/orpc/routers/weapons/__types'
import { WeaponItemBase } from '#/features/weapons/view-item/item-base'
import { Link } from '@tanstack/react-router'

interface WeaponTooltipedProps {
  weapon: TWeaponTable
  to?: string
}

export function WeaponTooltiped({ weapon, to = '/panel/weapons/$id' }: WeaponTooltipedProps) {
  return (
    <Tooltip>
      <TooltipTrigger
        render={
          <Link to={to} params={{ id: weapon.id }}>
            <WeaponItemBase weapon={weapon} />
          </Link>
        }
      />
      <TooltipContent side="bottom">{weapon.name}</TooltipContent>
    </Tooltip>
  )
}
