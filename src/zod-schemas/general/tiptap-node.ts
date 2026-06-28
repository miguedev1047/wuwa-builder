import z from 'zod'

export interface TiptapNodeProps {
  type: string
  content?: TiptapNodeProps[]
  attrs?: Record<string, any>
  text?: string
  marks?: { type: string; attrs?: Record<string, any> }[]
}

export const tiptapNodeZod: z.ZodType<any> = z.lazy(() =>
  z.object({
    type: z.string(),
    content: z.array(tiptapNodeZod).optional(),
    attrs: z.record(z.string(), z.any()).optional(),
    text: z.string().optional(),
    marks: z
      .array(
        z.object({
          type: z.string(),
          attrs: z.record(z.string(), z.any()).optional(),
        }),
      )
      .optional(),
  }),
)

export type TTiptapNodeZod = z.infer<typeof tiptapNodeZod>
