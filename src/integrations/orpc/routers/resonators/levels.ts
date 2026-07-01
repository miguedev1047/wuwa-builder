import { db } from '#/db'
import { resonatorLevelsTable } from '#/db/schemas/resonators'
import { entityIdZod } from '#/zod-schemas/general/entity-id'
import { resonatorLevelZod } from '#/zod-schemas/resonators'
import { ORPCError } from '@orpc/client'
import { protectedProcedure } from '#/integrations/orpc'
import { eq } from 'drizzle-orm'

export const levelsRouter = {
  create: protectedProcedure
    .input(resonatorLevelZod)
    .handler(async ({ input }) => {
      try {
        const { ...levelsData } = input
        await db.insert(resonatorLevelsTable).values({ ...levelsData })

        return {
          code: 'SUCCESS',
          message: 'Nivel agregado',
        }
      } catch {
        return {
          code: 'ERROR',
          message: 'Error al agregar el nivel',
        }
      }
    }),

  update: protectedProcedure
    .input(resonatorLevelZod)
    .handler(async ({ input }) => {
      try {
        const { ...levelData } = input

        if (!levelData.id) {
          throw new ORPCError('BAD_REQUEST', { message: 'El ID es requerido' })
        }

        await db
          .update(resonatorLevelsTable)
          .set({ ...levelData })
          .where(eq(resonatorLevelsTable.id, levelData.id))

        return {
          code: 'SUCCESS',
          message: 'Nivel actualizado',
        }
      } catch (e) {
        console.log(e)

        return {
          code: 'ERROR',
          message: 'Error al actualizar el nivel',
        }
      }
    }),

  delete: protectedProcedure.input(entityIdZod).handler(async ({ input }) => {
    try {
      const { id } = input

      await db
        .delete(resonatorLevelsTable)
        .where(eq(resonatorLevelsTable.id, id))

      return {
        code: 'SUCCESS',
        message: 'Nivel eliminado',
      }
    } catch {
      return {
        code: 'ERROR',
        message: 'Error al eliminar el nivel',
      }
    }
  }),
}
