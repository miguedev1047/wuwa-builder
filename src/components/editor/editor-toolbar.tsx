import {
  RiBold,
  RiH1,
  RiH2,
  RiH3,
  RiItalic,
  RiPaletteLine,
  RiParagraph,
  RiUnderline,
} from '@remixicon/react'
import { type Editor, useEditorState } from '@tiptap/react'
import { menuBarStateSelector } from '#/components/editor/editor.helpers'
import { Button } from '#/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '#/components/ui/dropdown-menu'
import { Separator } from '#/components/ui/separator'
import { Toggle } from '#/components/ui/toggle'
import { cn } from '#/lib/utils'

interface TiptapToolbarProps {
  editor: Editor
}

const colors = [
  { name: 'Default', value: 'var(--foreground)' },
  { name: 'Fusion', value: 'var(--fusion)' },
  { name: 'Glacio', value: 'var(--glacio)' },
  { name: 'Aero', value: 'var(--aero)' },
  { name: 'Electro', value: 'var(--electro)' },
  { name: 'Spectro', value: 'var(--spectro)' },
  { name: 'Havoc', value: 'var(--havoc)' },
] as const

const headings = [
  { name: 'Parrafo', icon: RiParagraph, level: 0 },
  { name: 'Encabezado 1', icon: RiH1, level: 1 },
  { name: 'Encabezado 2', icon: RiH2, level: 2 },
  { name: 'Encabezado 3', icon: RiH3, level: 3 },
] as const

export function TiptapToolbar(props: TiptapToolbarProps) {
  const { editor } = props

  const editorState = useEditorState({
    editor,
    selector: menuBarStateSelector,
  })

  const onChangeHeading = (level: 0 | 1 | 2 | 3) => {
    if (level === 0) {
      editor.chain().focus().setParagraph().run()
    } else {
      editor.chain().focus().toggleHeading({ level }).run()
    }
  }

  return (
    <div className="flex items-center gap-1 p-2 border-b border-input bg-muted/50">
      <DropdownMenu>
        <DropdownMenuTrigger
          render={
            <Button type="button" variant="ghost" size="sm">
              {editorState.isHeading1 ? (
                <RiH1 />
              ) : editorState.isHeading2 ? (
                <RiH2 />
              ) : editorState.isHeading3 ? (
                <RiH3 />
              ) : (
                <RiParagraph />
              )}
            </Button>
          }
        />
        <DropdownMenuContent>
          {headings.map((heading) => (
            <DropdownMenuItem
              key={heading.level}
              onClick={() => onChangeHeading(heading.level)}
            >
              <div className="flex items-center gap-2">
                {heading.icon && <heading.icon />}
                <p>{heading.name}</p>
              </div>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      <Separator orientation="vertical" className="w-px h-6 my-auto" />

      <Toggle
        type="button"
        size="sm"
        pressed={editorState.isBold}
        onPressedChange={() => editor.chain().focus().toggleBold().run()}
      >
        <RiBold />
      </Toggle>
      <Toggle
        type="button"
        size="sm"
        pressed={editorState.isItalic}
        onPressedChange={() => editor.chain().focus().toggleItalic().run()}
      >
        <RiItalic />
      </Toggle>
      <Toggle
        type="button"
        size="sm"
        pressed={editorState.isUnderline}
        onPressedChange={() => editor.chain().focus().toggleUnderline().run()}
      >
        <RiUnderline />
      </Toggle>

      <Separator orientation="vertical" className="w-px h-6 my-auto" />

      <DropdownMenu>
        <DropdownMenuTrigger
          render={
            <Button type="button" variant="ghost" size="sm">
              <RiPaletteLine />
            </Button>
          }
        />
        <DropdownMenuContent>
          {colors.map((color) => (
            <DropdownMenuItem
              key={color.value}
              onClick={() => editor.chain().focus().setColor(color.value).run()}
              className="flex items-center gap-2"
            >
              <div
                className={cn('w-4 h-4 rounded-full border border-border')}
                style={{ backgroundColor: color.value }}
              />
              <p>{color.name}</p>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
