import { FileInput } from '#/components/file-input'
import { EchoImageItem } from '@/features/echoes/id/images'
import { handleEchoImageUpload } from '@/features/echoes/id/images/image.handlers'
import { useEchoImageUpload } from '@/features/echoes/id/images/image.hook'

export function EchoImageUpload() {
  const { echo, uploadMutation } = useEchoImageUpload()

  return (
    <FileInput
      assetItems={echo.assets}
      assetKey={echo.id}
      folder="echoes/assets"
      isUploading={uploadMutation.isPending}
      limitFiles={2}
      renderItem={({ item, imageUrl }) => (
        <EchoImageItem key={item.id} item={item} imageUrl={imageUrl} />
      )}
      onMutate={(ctx) =>
        handleEchoImageUpload({
          ...ctx,
          entityName: echo.name,
          upload: uploadMutation.mutate,
        })
      }
    />
  )
}
