import { FileInput } from '#/components/file-input'
import { WeaponImageItem } from './image-item'
import { useWeaponImageUpload } from './image.hook'
import { handleWeaponImageUpload } from './image.handlers'

export function WeaponImageUpload() {
  const { weapon, uploadMutation } = useWeaponImageUpload()

  return (
    <FileInput
      assetItems={weapon.assets}
      assetKey={weapon.id}
      folder="weapons/assets"
      isUploading={uploadMutation.isPending}
      limitFiles={1}
      renderItem={({ item, imageUrl }) => (
        <WeaponImageItem key={item.id} item={item} imageUrl={imageUrl} />
      )}
      onMutate={(ctx) =>
        handleWeaponImageUpload({
          ...ctx,
          entityName: weapon.name,
          upload: uploadMutation.mutate,
        })
      }
    />
  )
}
