import { useDropzone } from 'react-dropzone'
import { MAX_FILE_SIZE } from '#/constants/images'
import type {
  AssetItem,
  DropzoneState,
  FileInputProps,
} from './file-input.types'

export function useFileInput<T extends AssetItem>({
  folder,
  assetKey,
  assetItems,
  limitFiles,
  isUploading,
  onMutate,
}: Pick<
  FileInputProps<T>,
  | 'folder'
  | 'assetKey'
  | 'assetItems'
  | 'limitFiles'
  | 'isUploading'
  | 'onMutate'
>) {
  const isFull = assetItems.length >= (limitFiles ?? 1)
  const isDisabled = isUploading || isFull

  const dropzoneState: DropzoneState = isUploading
    ? 'uploading'
    : isFull
      ? 'full'
      : 'idle'

  const dropzone = useDropzone({
    onDrop: (acceptedFiles: File[]) => {
      onMutate({ files: acceptedFiles, assetKey, folder, assetItems })
    },
    maxSize: MAX_FILE_SIZE,
    maxFiles: 1,
    disabled: isDisabled,
  })

  return { dropzoneState, isDisabled, ...dropzone }
}
