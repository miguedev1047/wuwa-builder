import type { TResonatorSkillTable } from '#/integrations/orpc/routers/resonators'
import { Badge } from '#/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '#/components/ui/card'
import { TiptapViewer } from '#/components/editor/editor-viewer'
import { ResonatorSkillUpdateForm } from '#/features/resonators/id/skills/crud/update'
import { DeleteSkill } from '#/features/resonators/id/skills/crud/delete'
import { AssetImage } from '#/components/asset-image'
import { ResonatorSkillImageUploadDialog } from '#/features/resonators/id/skills/components/image-upload-dialog'

interface SkillItemBaseProps {
  skill: TResonatorSkillTable
  isAdmin?: boolean
}

export function SkillBaseItem({ skill, isAdmin = false }: SkillItemBaseProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <AssetImage
              assetItems={skill.assets}
              selectAssetNumber={0}
              className="size-20"
              disablePointerEvents
            />
            <div className="space-y-1">
              <CardTitle className="text-lg font-bold">{skill.name}</CardTitle>
              <Badge>{skill.skill_type}</Badge>
            </div>
          </div>

          {isAdmin && (
            <div className="flex items-center gap-2">
              <ResonatorSkillImageUploadDialog skill={skill} />
              <ResonatorSkillUpdateForm skill={skill} />
              <DeleteSkill skillId={skill.id} />
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <TiptapViewer value={skill.description} />
      </CardContent>
    </Card>
  )
}
