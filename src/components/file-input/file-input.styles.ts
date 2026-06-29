import { cva } from 'class-variance-authority'

export const dropzoneContainerStyles = cva('', {
  variants: {
    state: {
      idle: '',
      uploading: 'opacity-50 pointer-events-none',
      full: 'opacity-50 pointer-events-none',
    },
  },
})

export const emptyAreaStyles = cva(
  'w-full h-40 cursor-pointer border border-dashed',
  {
    variants: {
      dragActive: {
        true: 'border-success',
        false: '',
      },
    },
  },
)
