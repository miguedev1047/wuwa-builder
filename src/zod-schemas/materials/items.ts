import z from 'zod'
import { tiptapNodeZod } from '#/zod-schemas/general/tiptap-node'

export const materialZod = z.object({
  id: z.string().optional(),
  name: z
    .string()
    .min(1, { error: 'El nombre debe tener al menos 1 caracter' }),
  description: tiptapNodeZod,
  type: z.string().min(1, {
    error: 'El tipo de material es requerido',
  }),
  rarity: z.string().min(1, { error: 'La rareza es requerida' }),

  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
})

export type TMaterialZod = z.infer<typeof materialZod>
