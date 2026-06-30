import z from 'zod'
import { tiptapNodeZod } from '#/zod-schemas/general/tiptap-node'

export const echoZod = z.object({
  id: z.string().optional(),
  name: z.string(),
  description_skill: tiptapNodeZod,
  echo_sonatas: z
    .array(z.string())
    .min(1, { error: 'Agrega al menos un efecto de sonata' }),
  echo_class: z.string().min(1, {
    error: 'La clase es requerida',
  }),
  echo_cost: z.string().min(1, {
    error: 'El costo es requerido',
  }),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
})

export type TEchoZod = z.infer<typeof echoZod>
