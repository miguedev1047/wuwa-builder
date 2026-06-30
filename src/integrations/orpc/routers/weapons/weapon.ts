import { db } from '#/db'
import { deleteWeaponAssets } from '#/integrations/orpc/routers/weapons/__helpers'
import { weaponAssetsTable, weaponTable } from '#/db/schemas/weapons'
import { entityIdZod } from '#/zod-schemas/general/entity-id'
import { weaponZod } from '#/zod-schemas/weapons'
import { protectedProcedure, publicProcedure } from '@/integrations/orpc'
import { ORPCError } from '@orpc/server'
import { eq as equals } from 'drizzle-orm'

export const weaponRouter = {
  getAll: publicProcedure.handler(async () => {
    try {
      const weapons = await db.query.weaponTable.findMany({
        with: {
          assets: {
            orderBy: (table, { asc }) => asc(table.order),
          },
          levels: {
            orderBy: (table, { asc }) => asc(table.order),
          },
          refinaments: {
            orderBy: (table, { asc }) => asc(table.order),
            with: {
              additional_stats: {
                orderBy: (table, { asc }) => asc(table.order),
              },
            },
          },
        },
      })
      return weapons
    } catch {
      throw new ORPCError('INTERNAL_SERVER_ERROR', {
        data: [],
        message: 'Ha ocurrido un error al obtener las armas',
      })
    }
  }),

  getById: publicProcedure.input(entityIdZod).handler(async ({ input }) => {
    const { id } = input
    try {
      const weapon = await db.query.weaponTable.findFirst({
        where: (table, { eq }) => eq(table.id, id),
        with: {
          assets: {
            orderBy: (table, { asc }) => asc(table.order),
          },
          levels: {
            orderBy: (table, { asc }) => asc(table.order),
          },
          refinaments: {
            orderBy: (table, { asc }) => asc(table.order),
            with: {
              additional_stats: {
                orderBy: (table, { asc }) => asc(table.order),
              },
            },
          },
        },
      })

      if (!weapon)
        throw new ORPCError('NOT_FOUND', {
          data: null,
          message: 'Arma no encontrada',
        })

      return weapon
    } catch {
      throw new ORPCError('INTERNAL_SERVER_ERROR', {
        data: null,
        message: 'Ha ocurrido un error al obtener el arma',
      })
    }
  }),

  create: protectedProcedure.input(weaponZod).handler(async ({ input }) => {
    const { ...weaponData } = input

    try {
      await db.insert(weaponTable).values(weaponData)

      return {
        code: 'SUCCESS',
        message: 'Arma agregada',
      }
    } catch {
      return {
        code: 'ERROR',
        message: 'Error al agregar el arma',
      }
    }
  }),

  update: protectedProcedure.input(weaponZod).handler(async ({ input }) => {
    const { ...weaponData } = input

    if (!weaponData.id) {
      throw new ORPCError('NOT_FOUND', {
        message: 'Arma no encontrado',
      })
    }

    try {
      await db
        .update(weaponTable)
        .set(weaponData)
        .where(equals(weaponTable.id, weaponData.id))

      return {
        code: 'SUCCESS',
        message: 'Arma actualizada',
      }
    } catch {
      return {
        code: 'ERROR',
        message: 'Error al actualizar el arma',
      }
    }
  }),

  delete: protectedProcedure.input(entityIdZod).handler(async ({ input }) => {
    try {
      const { id } = input

      await deleteWeaponAssets(id)

      await db.delete(weaponTable).where(equals(weaponTable.id, id))

      await db
        .delete(weaponAssetsTable)
        .where(equals(weaponAssetsTable.weapon_id, id))

      return {
        code: 'SUCCESS',
        message: 'Arma eliminada',
      }
    } catch {
      return {
        code: 'ERROR',
        message: 'Error al eliminar el arma',
      }
    }
  }),
}
