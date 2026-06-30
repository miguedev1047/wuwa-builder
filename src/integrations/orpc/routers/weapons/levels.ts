import { db } from '#/db'
import { entityIdZod } from '#/zod-schemas/general/entity-id'
import { weaponLevelZod } from '#/zod-schemas/weapons'
import { protectedProcedure } from '#/integrations/orpc'
import { weaponLevelsTable } from '#/db/schemas/weapons'
import { ORPCError } from '@orpc/client'
import { eq } from 'drizzle-orm'

export const levelsRouter = {
  create: protectedProcedure
    .input(weaponLevelZod)
    .handler(async ({ input }) => {
      try {
        const { ...levelsData } = input

        await db.insert(weaponLevelsTable).values({ ...levelsData })

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
    .input(weaponLevelZod)
    .handler(async ({ input }) => {
      try {
        const { id, ...levelsData } = input
        const levelId = id

        if (!levelId) {
          throw new ORPCError('BAD_REQUEST', {
            message: 'El nivel de este arma no se encontró',
          })
        }

        await db
          .update(weaponLevelsTable)
          .set({ ...levelsData })
          .where(eq(weaponLevelsTable.id, levelId))

        return {
          code: 'SUCCESS',
          message: 'Nivel actualizado',
        }
      } catch {
        return {
          code: 'ERROR',
          message: 'Error al actualizar el nivel',
        }
      }
    }),

  delete: protectedProcedure.input(entityIdZod).handler(async ({ input }) => {
    try {
      const { id } = input

      await db.delete(weaponLevelsTable).where(eq(weaponLevelsTable.id, id))

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
