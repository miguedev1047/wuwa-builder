import { Card, CardContent, CardHeader, CardTitle } from '#/components/ui/card'
import { ResonatorSkillCreateForm } from '#/features/resonators/id/skills/crud/create'
import { SkillPanelList } from '#/features/resonators/id/skills/components/view-list'

export function SkillsPanel() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-2xl font-semibold">Habilidades</CardTitle>
          <ResonatorSkillCreateForm />
        </div>
      </CardHeader>
      <CardContent>
        <SkillPanelList />
      </CardContent>
    </Card>
  )
}
