export interface AssetItem {
  id: string
  key: string
}

export interface FileInputProps<T extends AssetItem> {
  folder: string
  assetKey: string
  assetItems: T[]
  limitFiles?: number
  isUploading?: boolean
  renderItem: (params: { item: T; imageUrl: string }) => React.ReactNode
  onMutate: (params: {
    files: File[]
    assetKey: string
    folder: string
    assetItems: T[]
  }) => void
}

export type DropzoneState = 'idle' | 'uploading' | 'full'
