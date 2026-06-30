import z from 'zod'
import { tiptapNodeZod } from '#/zod-schemas/general/tiptap-node'
import { weaponAdditionalStatZod } from '#/zod-schemas/weapons/additional-stats'

export const weaponRefinamentZod = z.object({
  id: z.string().optional(),
  weapon_id: z.string().min(1, { error: 'El ID del arma es requerido' }),
  refinament_value: z.string().min(1, { error: 'El valor es requerido' }),
  additional_stats: weaponAdditionalStatZod,
  refinament_description: tiptapNodeZod,
  order: z.number().min(0, { error: 'El orden es requerido' }),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
})

export type TWeaponRefinamentZod = z.infer<typeof weaponRefinamentZod>
