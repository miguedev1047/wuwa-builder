import z from 'zod'

export const weaponLevelZod = z.object({
  id: z.string().optional(),
  weapon_id: z.string().min(1, { error: 'El ID del arma es requerido' }),
  level_value: z.string().min(1, { error: 'El nivel es requerido' }),
  atk: z
    .number()
    .min(5, { error: 'El ataque es requerido' })
    .max(10000, { error: 'El ataque no puede exceder 10000' }),
  main_stat_number: z
    .number()
    .min(1, { error: 'La estadística principal es requerida' })
    .max(10000, { error: 'La estadística principal no puede exceder 10000' }),
  order: z.number().min(0, { error: 'El orden es requerido' }),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
})

export type TWeaponLevelZod = z.infer<typeof weaponLevelZod>
