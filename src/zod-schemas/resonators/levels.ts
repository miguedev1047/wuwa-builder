import z from 'zod'

export const resonatorLevelZod = z.object({
  id: z.string().optional(),
  resonator_id: z
    .string()
    .min(1, { error: 'El ID del resonador es requerido' }),
  level_value: z.string().min(1, { error: 'El nivel es requerido' }),
  atk: z
    .number()
    .min(10, { error: 'El ataque no puede ser menor a 10' })
    .max(5000, { error: 'El ataque no puede exceder 5000' }),
  hp: z
    .number()
    .min(10, { error: 'La vida no puede ser menor a 10' })
    .max(100000, { error: 'La vida no puede exceder 100000' }),
  def: z
    .number()
    .min(10, { error: 'La defensa no puede ser menor a 10' })
    .max(5000, { error: 'La defensa no puede exceder 5000' }),
  order: z.number().min(0, { error: 'El orden es requerido' }),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
})

export type TResonatorLevelZod = z.infer<typeof resonatorLevelZod>
