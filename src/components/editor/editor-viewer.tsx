import '#/styles/editor.css'

import StarterKit from '@tiptap/starter-kit'

import { Color, TextStyle } from '@tiptap/extension-text-style'
import { generateHTML } from '@tiptap/html'
import { Suspense } from 'react'
import { cn } from '#/lib/utils'
import type { TiptapNodeProps } from '#/zod-schemas/general/tiptap-node'

interface TiptapViewerProps {
  value: TiptapNodeProps
  className?: string
}

export function TiptapViewer(props: TiptapViewerProps) {
  return (
    <Suspense>
      <TiptapViewerComponent {...props} />
    </Suspense>
  )
}

function TiptapViewerComponent({ value, className }: TiptapViewerProps) {
  const html = generateHTML(value, [
    StarterKit,
    TextStyle.configure({
      HTMLAttributes: {
        className: 'opacity-90 text-xs',
      },
    }),
    Color,
  ])

  return (
    <div className={cn('tiptap-viewer', className)}>
      <div
        dangerouslySetInnerHTML={{ __html: html }}
        className="opacity-90 [&>p]:text-xs [&>span]:text-xs"
      />
    </div>
  )
}
