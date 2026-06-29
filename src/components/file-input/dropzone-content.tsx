import { RiImage2Fill } from '@remixicon/react'
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '#/components/ui/empty'
import { emptyAreaStyles, type DropzoneState } from '#/components/file-input'
import { Spinner } from '#/components/ui/spinner'

const STATE_COPY: Record<
  DropzoneState,
  { title: string; description: string }
> = {
  idle: {
    title: 'Subir imagen',
    description:
      'Arrastra y suelta una imagen aquí o haz clic para seleccionarla.',
  },
  uploading: {
    title: 'Subiendo...',
    description: 'Por favor espera mientras se sube la imagen.',
  },
  full: {
    title: 'Límite alcanzado',
    description: 'Máximo de imágenes alcanzado.',
  },
}

interface DropzoneContentProps {
  state: DropzoneState
  isDragActive: boolean
}

export function DropzoneContent({ state, isDragActive }: DropzoneContentProps) {
  const { title, description } = STATE_COPY[state]

  return (
    <Empty className={emptyAreaStyles({ dragActive: isDragActive })}>
      <EmptyHeader>
        <EmptyMedia>
          {state === 'uploading' ? <Spinner /> : <RiImage2Fill />}
        </EmptyMedia>
        <EmptyTitle>{title}</EmptyTitle>
        <EmptyDescription>{description}</EmptyDescription>
      </EmptyHeader>
    </Empty>
  )
}
