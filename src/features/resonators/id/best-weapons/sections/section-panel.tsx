import { Card, CardContent, CardHeader, CardTitle } from '#/components/ui/card'
import { BestWeaponAddForm } from '#/features/resonators/id/best-weapons/crud/add'
import { BestWeaponPanelList } from '#/features/resonators/id/best-weapons/components/view-list'

export function BestWeaponsPanel() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-2xl font-semibold">
            Mejores armas
          </CardTitle>
          <BestWeaponAddForm />
        </div>
      </CardHeader>
      <CardContent>
        <BestWeaponPanelList />
      </CardContent>
    </Card>
  )
}
