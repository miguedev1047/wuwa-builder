import z from 'zod'
import { tiptapNodeZod } from '#/zod-schemas/general/tiptap-node'

export const weaponZod = z.object({
  id: z.string().optional(),
  name: z
    .string()
    .min(1, { error: 'El nombre debe tener al menos 1 caracter' }),
  description: tiptapNodeZod,
  type: z.string().min(1, { error: 'El tipo de arma es requerido' }),
  main_stat_value: z
    .string()
    .min(1, { error: 'La estadística principal es requerida' }),
  rarity: z.string().min(1, { error: 'La rareza es requerida' }),
  is_new: z.boolean(),
  is_public: z.boolean(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
})

export type TWeaponZod = z.infer<typeof weaponZod>
