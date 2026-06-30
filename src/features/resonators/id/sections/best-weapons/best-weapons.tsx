import { Card, CardContent, CardHeader, CardTitle } from '#/components/ui/card'
import { BestWeaponAddForm } from '#/features/resonators/id/sections/best-weapons/crud/add'
import { BestWeaponList } from '#/features/resonators/id/sections/best-weapons/components/best-weapon-list'

export function BestWeapons() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Mejores armas</CardTitle>
          <BestWeaponAddForm />
        </div>
      </CardHeader>
      <CardContent>
        <BestWeaponList />
      </CardContent>
    </Card>
  )
}
