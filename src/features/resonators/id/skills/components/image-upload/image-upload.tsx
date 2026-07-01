import { FileInput } from '#/components/file-input'
import { ResonatorSkillImageItem } from '#/features/resonators/id/skills/components/image-upload/image-item.tsx'
import { useResonatorSkillImageUpload } from '@/features/resonators/id/skills/components/image-upload/image.hook'
import { handleResonatorSkillImageUpload } from '@/features/resonators/id/skills/components/image-upload/image.handlers'
import type { TResonatorSkillTable } from '#/integrations/orpc/routers/resonators'

interface ResonatorSKillImageUploadProps {
  skill: TResonatorSkillTable
}

export function ResonatorSKillImageUpload({
  skill,
}: ResonatorSKillImageUploadProps) {
  const { uploadMutation } = useResonatorSkillImageUpload()

  return (
    <FileInput
      assetItems={skill.assets}
      assetKey={skill.id}
      folder="resonators/skills/assets"
      isUploading={uploadMutation.isPending}
      limitFiles={1}
      renderItem={({ item, imageUrl }) => (
        <ResonatorSkillImageItem
          key={item.id}
          item={item}
          imageUrl={imageUrl}
          resonatorId={skill.resonator_id}
        />
      )}
      onMutate={(ctx) =>
        handleResonatorSkillImageUpload({
          ...ctx,
          entityName: skill.name,
          upload: uploadMutation.mutate,
        })
      }
    />
  )
}
