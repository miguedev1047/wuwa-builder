import z from 'zod'

export const entityIdZodSchema = z.object({
  id: z
    .string({ error: 'Campo id inválido' })
    .min(1, { error: 'El campo ID es requerido' }),
})

export type TEntityIdZod = z.infer<typeof entityIdZodSchema>
