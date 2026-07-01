import { FileInput } from '#/components/file-input'
import { MaterialImageItem } from './image-item'
import { handleMaterialImageUpload } from './image.handlers'
import { useMaterialImageUpload } from './image.hook'

export function MaterialImageUpload() {
  const { material, uploadMutation } = useMaterialImageUpload()

  return (
    <FileInput
      assetItems={material.assets}
      assetKey={material.id}
      folder="materials/assets"
      isUploading={uploadMutation.isPending}
      limitFiles={1}
      renderItem={({ item, imageUrl }) => (
        <MaterialImageItem key={item.id} item={item} imageUrl={imageUrl} />
      )}
      onMutate={(ctx) =>
        handleMaterialImageUpload({
          ...ctx,
          entityName: material.name,
          upload: uploadMutation.mutate,
        })
      }
    />
  )
}
