import {
  useFileInput,
  DropzoneContent,
  dropzoneContainerStyles,
  type AssetItem,
  type FileInputProps,
} from '#/components/file-input'
import { getImageUrl } from '#/helpers/general/get-image-url'

export function FileInput<T extends AssetItem>({
  folder,
  assetKey,
  assetItems,
  renderItem,
  limitFiles = 1,
  isUploading = false,
  onMutate,
}: FileInputProps<T>) {
  const { dropzoneState, getRootProps, getInputProps, isDragActive } =
    useFileInput({
      folder,
      assetKey,
      assetItems,
      limitFiles,
      isUploading,
      onMutate,
    })

  return (
    <div className="space-y-2 w-full">
      <div
        {...getRootProps()}
        className={dropzoneContainerStyles({ state: dropzoneState })}
      >
        <input {...getInputProps()} />
        <DropzoneContent state={dropzoneState} isDragActive={isDragActive} />
      </div>

      {assetItems.length > 0 &&
        assetItems.map((item) => {
          const imageUrl = getImageUrl(item.key)
          return renderItem({ item, imageUrl })
        })}
    </div>
  )
}
