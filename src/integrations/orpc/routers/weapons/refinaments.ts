import { entityIdZod } from '#/zod-schemas/general/entity-id'
import { weaponRefinamentZod } from '#/zod-schemas/weapons'
import { protectedProcedure } from '#/integrations/orpc'
import { db } from '#/db'
import {
  weaponAdditionalStatsTable,
  weaponRefinamentsTable,
} from '#/db/schemas/weapons'
import { eq } from 'drizzle-orm'
import { ORPCError } from '@orpc/client'

export const refinamentsRouter = {
  create: protectedProcedure
    .input(weaponRefinamentZod)
    .handler(async ({ input }) => {
      try {
        const { additional_stats, ...refinamentData } = input

        const [newRefinament] = await db
          .insert(weaponRefinamentsTable)
          .values({ ...refinamentData })
          .returning({ id: weaponRefinamentsTable.id })

        if (additional_stats.length > 0) {
          const refinamentId = newRefinament.id
          const weaponId = refinamentData.weapon_id

          const mappedAdditionalStats = additional_stats.map((stat, index) => ({
            order: index + 1,
            stat_value: stat.value,
            stat_value_number: stat.value_number,
            weapon_id: weaponId,
            refinement_id: refinamentId,
          }))

          await db
            .insert(weaponAdditionalStatsTable)
            .values(mappedAdditionalStats)
        }

        return {
          code: 'SUCCESS',
          message: 'Refinamiento agregado',
        }
      } catch {
        return {
          code: 'ERROR',
          message: 'Error al agregar el refinamiento',
        }
      }
    }),

  update: protectedProcedure
    .input(weaponRefinamentZod)
    .handler(async ({ input }) => {
      try {
        const { additional_stats, ...refinamentData } = input
        const refinamentId = refinamentData.id

        if (!refinamentId) {
          throw new ORPCError('BAD_REQUEST', {
            message: 'El refinamiento de esta arma no se encontró',
          })
        }

        const [updatedRefinament] = await db
          .update(weaponRefinamentsTable)
          .set({ ...refinamentData })
          .where(eq(weaponRefinamentsTable.id, refinamentId))
          .returning({ id: weaponRefinamentsTable.id })

        if (additional_stats.length > 0) {
          const updatedRefinamentId = updatedRefinament.id
          const weaponId = refinamentData.weapon_id

          await db
            .delete(weaponAdditionalStatsTable)
            .where(
              eq(weaponAdditionalStatsTable.refinament_id, updatedRefinamentId),
            )

          const mappedAdditionalStats = additional_stats.map((stat, index) => ({
            order: index + 1,
            stat_value: stat.value,
            stat_value_number: stat.value_number,
            weapon_id: weaponId,
            refinament_id: updatedRefinamentId,
          }))

          await db
            .insert(weaponAdditionalStatsTable)
            .values(mappedAdditionalStats)
        }

        return {
          code: 'SUCCESS',
          message: 'Refinamiento actualizado',
        }
      } catch {
        return {
          code: 'ERROR',
          message: 'Error al actualizar el refinamiento',
        }
      }
    }),

  delete: protectedProcedure.input(entityIdZod).handler(async ({ input }) => {
    try {
      const { id } = input

      await db
        .delete(weaponRefinamentsTable)
        .where(eq(weaponRefinamentsTable.id, id))

      return {
        code: 'SUCCESS',
        message: 'Refinamiento eliminado',
      }
    } catch {
      return {
        code: 'ERROR',
        message: 'Error al eliminar el refinamiento',
      }
    }
  }),
}
