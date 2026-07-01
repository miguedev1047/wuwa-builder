import { FileInput } from '#/components/file-input'
import { ResonatorImageItem } from '@/features/resonators/id/info/components/image-upload/image-item'
import { useResonatorImageUpload } from '@/features/resonators/id/info/components/image-upload/image.hook'
import { handleResonatorImageUpload } from '@/features/resonators/id/info/components/image-upload/image.handlers'

export function ResonatorImageUpload() {
  const { resonator, uploadMutation } = useResonatorImageUpload()

  return (
    <FileInput
      assetItems={resonator.assets}
      assetKey={resonator.id}
      folder="resonators/assets"
      isUploading={uploadMutation.isPending}
      limitFiles={3}
      renderItem={({ item, imageUrl }) => (
        <ResonatorImageItem key={item.id} item={item} imageUrl={imageUrl} />
      )}
      onMutate={(ctx) =>
        handleResonatorImageUpload({
          ...ctx,
          entityName: resonator.name,
          upload: uploadMutation.mutate,
        })
      }
    />
  )
}
