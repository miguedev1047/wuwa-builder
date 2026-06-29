import '#/styles/editor.css'
import type { TiptapNodeProps } from '#/zod-schemas/general/tiptap-node'

import StarterKit from '@tiptap/starter-kit'

import { Color } from '@tiptap/extension-color'
import { Placeholder } from '@tiptap/extension-placeholder'
import { TextStyle } from '@tiptap/extension-text-style'
import { EditorContent, useEditor } from '@tiptap/react'
import { TiptapToolbar } from '#/components/editor'
import { Skeleton } from '#/components/ui/skeleton'
import { cn } from '#/lib/utils'

interface TiptapEditorProps {
  value?: string
  onValueChange?: (value: TiptapNodeProps) => void
  placeholder?: string
  className?: string
  editable?: boolean
  disabled?: boolean
}

export function TiptapEditor({
  value = '',
  onValueChange,
  placeholder = 'Escribe aquí...',
  className,
  editable = true,
  disabled = false,
}: TiptapEditorProps) {
  const isEditable = editable && !disabled

  const editor = useEditor({
    immediatelyRender: false,
    editable: isEditable,
    content: value,
    onUpdate: (ctx) => {
      const json = ctx.editor.getJSON()
      onValueChange?.(json)
    },
    extensions: [
      StarterKit.configure({ heading: { levels: [1, 2, 3, 4, 5, 6] } }),
      TextStyle,
      Color,
      Placeholder.configure({ placeholder }),
    ],
    editorProps: {
      attributes: {
        class:
          'tiptap-editor max-w-none p-3 min-h-[120px] focus-visible:outline-none',
      },
    },
  })

  if (!editor) {
    return <TiptapSkeleton />
  }

  return (
    <div
      data-disabled={disabled}
      className={cn(
        'border border-input rounded-xs overflow-hidden',
        'data-[disabled=true]:opacity-50 data-[disabled=true]:cursor-not-allowed',
        className,
      )}
    >
      <TiptapToolbar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  )
}

export function TiptapSkeleton() {
  return <Skeleton className="w-full h-40" />
}
