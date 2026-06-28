import z from 'zod'

export const imageRemoveZodSchema = z.object({
  key: z
    .string({
      error: 'La llave es inválida',
    })
    .min(1, {
      error: 'La llave es requerida',
    })
    .or(z.array(z.string().min(1))),
  id: z
    .string({
      error: 'El ID de la imagen es requerido',
    })
    .min(1, {
      error: 'El ID de la imagen no puede estar vacío',
    }),
})
