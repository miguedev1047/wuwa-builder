import z from 'zod'

export const weaponAdditionalStatZod = z.array(
  z.object({
    value: z.string().min(1, { error: 'El valor es requerido' }),
    value_number: z
      .number()
      .min(1, { error: 'El valor es requerido' })
      .max(200, { error: 'El valor no puede exceder 200' }),
  }),
)
export type TWeaponAdditionalStatZod = z.infer<typeof weaponAdditionalStatZod>
