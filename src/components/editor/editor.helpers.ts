import type { Editor, EditorStateSnapshot } from '@tiptap/react'

export type MenuBarState = ReturnType<typeof menuBarStateSelector>

export function menuBarStateSelector(ctx: EditorStateSnapshot<Editor>) {
  return {
    isBold: ctx.editor.isActive('bold'),
    canBold: ctx.editor.can().chain().toggleBold().run(),
    isItalic: ctx.editor.isActive('italic'),
    canItalic: ctx.editor.can().chain().toggleItalic().run(),
    isStrike: ctx.editor.isActive('strike'),
    canStrike: ctx.editor.can().chain().toggleStrike().run(),
    isUnderline: ctx.editor.isActive('underline'),
    canUnderline: ctx.editor.can().chain().toggleUnderline().run(),
    canClearMarks: ctx.editor.can().chain().unsetAllMarks().run(),

    isParagraph: ctx.editor.isActive('paragraph'),
    isHeading1: ctx.editor.isActive('heading', { level: 1 }),
    isHeading2: ctx.editor.isActive('heading', { level: 2 }),
    isHeading3: ctx.editor.isActive('heading', { level: 3 }),

    isBulletList: ctx.editor.isActive('bulletList'),
    isOrderedList: ctx.editor.isActive('orderedList'),
    isCodeBlock: ctx.editor.isActive('codeBlock'),
    isBlockquote: ctx.editor.isActive('blockquote'),
  }
}
