import { db } from '#/db'
import { resonatorAssetsTable, resonatorTable } from '#/db/schemas/resonators'
import { deleteResonatorAssets } from '#/integrations/orpc/routers/resonators/__helpers'
import { entityIdZod } from '#/zod-schemas/general/entity-id'
import { resonatorZod } from '#/zod-schemas/resonators'
import { protectedProcedure, publicProcedure } from '@/integrations/orpc'
import { ORPCError } from '@orpc/server'
import { eq } from 'drizzle-orm'

export const resonatorRouter = {
  getAll: publicProcedure.handler(async () => {
    try {
      const resonators = await db.query.resonatorTable.findMany({
        with: {
          assets: {
            orderBy: (table, { asc }) => asc(table.order),
          },
          best_weapons: {
            orderBy: (table, { asc }) => asc(table.order),
            with: {
              weapon: {
                with: {
                  assets: true,
                  levels: true,
                  refinaments: {
                    with: {
                      additional_stats: true,
                    },
                  },
                },
              },
            },
          },
          levels: {
            orderBy: (table, { asc }) => asc(table.order),
          },
          sequences: {
            orderBy: (table, { asc }) => asc(table.order),
          },
          skills: {
            orderBy: (table, { asc }) => asc(table.order),
          },
          bonuses: true,
        },
      })
      return resonators
    } catch {
      throw new ORPCError('INTERNAL_SERVER_ERROR', {
        data: [],
        message: 'Ha ocurrido un error al obtener los resonadores',
      })
    }
  }),

  getById: publicProcedure.input(entityIdZod).handler(async ({ input }) => {
    const { id } = input
    try {
      const resonator = await db.query.resonatorTable.findFirst({
        where: (table, { eq: equals }) => equals(table.id, id),
        with: {
          assets: {
            orderBy: (table, { asc }) => asc(table.order),
          },
          best_weapons: {
            orderBy: (table, { asc }) => asc(table.order),
            with: {
              weapon: {
                with: {
                  assets: true,
                  levels: true,
                  refinaments: {
                    with: {
                      additional_stats: true,
                    },
                  },
                },
              },
            },
          },
          levels: {
            orderBy: (table, { asc }) => asc(table.order),
          },
          sequences: {
            orderBy: (table, { asc }) => asc(table.order),
          },
          skills: {
            orderBy: (table, { asc }) => asc(table.order),
          },
          bonuses: true,
        },
      })

      if (!resonator)
        throw new ORPCError('NOT_FOUND', {
          data: null,
          message: 'Resonador no encontrado',
        })

      return resonator
    } catch {
      throw new ORPCError('INTERNAL_SERVER_ERROR', {
        data: null,
        message: 'Ha ocurrido un error al obtener los resonadores',
      })
    }
  }),

  create: protectedProcedure.input(resonatorZod).handler(async ({ input }) => {
    const { ...resonatorData } = input

    try {
      await db.insert(resonatorTable).values(resonatorData)

      return {
        code: 'SUCCESS',
        message: 'Resonador agregado',
      }
    } catch {
      return {
        code: 'ERROR',
        message: 'Error al agregar el resonador',
      }
    }
  }),

  update: protectedProcedure.input(resonatorZod).handler(async ({ input }) => {
    const { ...resonatorData } = input

    if (!resonatorData.id) {
      throw new ORPCError('NOT_FOUND', {
        message: 'Resonador no encontrado',
      })
    }

    try {
      await db
        .update(resonatorTable)
        .set(resonatorData)
        .where(eq(resonatorTable.id, resonatorData.id))

      return {
        code: 'SUCCESS',
        message: 'Resonador actualizado',
      }
    } catch {
      return {
        code: 'ERROR',
        message: 'Error al actualizar el resonador',
      }
    }
  }),

  delete: protectedProcedure.input(entityIdZod).handler(async ({ input }) => {
    try {
      const { id } = input

      await deleteResonatorAssets(id)

      await db.delete(resonatorTable).where(eq(resonatorTable.id, id))

      await db
        .delete(resonatorAssetsTable)
        .where(eq(resonatorAssetsTable.resonator_id, id))

      return {
        code: 'SUCCESS',
        message: 'Resonador eliminado',
      }
    } catch {
      return {
        code: 'ERROR',
        message: 'Error al eliminar el resonador',
      }
    }
  }),
}
