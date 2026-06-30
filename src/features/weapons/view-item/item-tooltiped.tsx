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
}

export function WeaponTooltiped({ weapon }: WeaponTooltipedProps) {
  return (
    <Tooltip>
      <TooltipTrigger
        render={
          <Link to="/panel/weapons/$id" params={{ id: weapon.id }}>
            <WeaponItemBase weapon={weapon} />
          </Link>
        }
      />
      <TooltipContent side="bottom">{weapon.name}</TooltipContent>
    </Tooltip>
  )
}
