import { Card, CardContent, CardHeader, CardTitle } from '#/components/ui/card'
import { BestWeaponHomeList } from '#/features/resonators/id/best-weapons/components/view-list'

export function BestWeaponsHome() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-2xl font-semibold">
            Mejores armas
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <BestWeaponHomeList />
      </CardContent>
    </Card>
  )
}
