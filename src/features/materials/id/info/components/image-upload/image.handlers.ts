import type { AssetItem } from '@/components/file-input/file-input.types'

interface HandleMaterialImageUploadParams<T extends AssetItem> {
  files: File[]
  assetKey: string
  folder: string
  assetItems: T[]
  entityName: string
  upload: (input: {
    file: File
    entityId: string
    folder: string
    order: number
    entityName: string
  }) => void
}

export function handleMaterialImageUpload<T extends AssetItem>({
  files,
  assetKey,
  folder,
  assetItems,
  entityName,
  upload,
}: HandleMaterialImageUploadParams<T>) {
  const [file] = files

  upload({
    file,
    entityId: assetKey,
    folder,
    order: assetItems.length,
    entityName,
  })
}
