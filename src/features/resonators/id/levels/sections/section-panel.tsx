import { Card, CardContent, CardHeader, CardTitle } from '#/components/ui/card'
import { ResonatorLevelCreateForm } from '#/features/resonators/id/levels/crud/create'
import { LevelsPanelList } from '#/features/resonators/id/levels/components/view-list'

export function LevelsPanel() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-2xl font-semibold">Niveles</CardTitle>
          <ResonatorLevelCreateForm />
        </div>
      </CardHeader>
      <CardContent>
        <LevelsPanelList />
      </CardContent>
    </Card>
  )
}
