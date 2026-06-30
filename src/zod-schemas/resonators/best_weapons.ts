import z from 'zod'

export const resonatorBestWeaponZod = z.object({
  id: z.string().optional(),
  resonator_id: z
    .string()
    .min(1, { error: 'El ID del resonador es requerido' }),
  weapons: z.array(z.string()).min(1, { error: 'Agrega un arma al menos' }),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
})

export type TResonatorBestWeaponZod = z.infer<typeof resonatorBestWeaponZod>
