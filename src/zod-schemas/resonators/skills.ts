import z from 'zod'
import { tiptapNodeZod } from '#/zod-schemas/general/tiptap-node'

export const resonatorSkillZod = z.object({
  id: z.string().optional(),
  resonator_id: z
    .string()
    .min(1, { error: 'El ID del resonador es requerido' }),
  name: z.string().min(1, { error: 'El nombre es requerido' }),
  description: tiptapNodeZod,
  skill_type: z.string().min(1, { error: 'El tipo de habilidad es requerido' }),
  order: z.number().min(0, { error: 'El orden es requerido' }),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
})

export type TResonatorSkillZod = z.infer<typeof resonatorSkillZod>
