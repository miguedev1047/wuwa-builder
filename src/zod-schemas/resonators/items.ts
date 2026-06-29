import z from 'zod'
import { tiptapNodeZod } from '#/zod-schemas/general/tiptap-node'

export const resonatorZod = z.object({
  id: z.string().optional(),
  name: z
    .string()
    .min(1, { error: 'El nombre debe tener al menos 1 caracter' }),
  description: tiptapNodeZod,
  weapon_type: z.string().min(1, { error: 'El tipo de arma es requerido' }),
  rarity: z.string().min(1, { error: 'La rareza es requerida' }),
  role: z.string().min(1, { error: 'El rol es requerido' }),
  element: z.string().min(1, { error: 'El elemento es requerido' }),
  is_new: z.boolean(),
  is_public: z.boolean(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
})

export type TResonatorZod = z.infer<typeof resonatorZod>
