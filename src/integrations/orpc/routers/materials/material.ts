import { ORPCError } from '@orpc/client'
import { deleteMaterialAssets } from '#/integrations/orpc/routers/materials/__helpers'
import { protectedProcedure, publicProcedure } from '#/integrations/orpc'
import { db } from '#/db'
import { entityIdZod } from '#/zod-schemas/general/entity-id'
import { eq } from 'drizzle-orm'
import { materialTable } from '#/db/schemas/materials'
import { materialZod } from '#/zod-schemas/materials'

export const materialRouter = {
  getAll: publicProcedure.handler(async () => {
    try {
      const materials = await db.query.materialTable.findMany({
        with: {
          assets: {
            orderBy: (table, { asc }) => asc(table.order),
          },
        },
      })

      return materials
    } catch {
      throw new ORPCError('INTERNAL_SERVER_ERROR', {
        data: [],
        message: 'Error al obtener los materiales',
      })
    }
  }),

  getById: publicProcedure.input(entityIdZod).handler(async ({ input }) => {
    try {
      const { id } = input

      const material = await db.query.materialTable.findFirst({
        where: (table, { eq: equals }) => equals(table.id, id),
        with: {
          assets: {
            orderBy: (table, { asc }) => asc(table.order),
          },
        },
      })

      if (!material)
        throw new ORPCError('NOT_FOUND', {
          data: null,
          message: 'Material no encontrado',
        })

      return material
    } catch {
      throw new ORPCError('INTERNAL_SERVER_ERROR', {
        data: null,
        message: 'Error al obtener este material',
      })
    }
  }),

  create: protectedProcedure.input(materialZod).handler(async ({ input }) => {
    try {
      const { ...materialData } = input

      await db.insert(materialTable).values({ ...materialData })

      return {
        code: 'SUCCESS',
        message: 'Material creado',
      }
    } catch {
      return {
        code: 'ERROR',
        message: 'Error al crear el material',
      }
    }
  }),

  update: protectedProcedure.input(materialZod).handler(async ({ input }) => {
    try {
      const { id, ...materialData } = input

      if (!id) {
        return {
          code: 'ERROR',
          message: 'Material no encontrado',
        }
      }

      await db
        .update(materialTable)
        .set({ ...materialData })
        .where(eq(materialTable.id, id))

      return {
        code: 'SUCCESS',
        message: 'Material actualizado',
      }
    } catch {
      return {
        code: 'ERROR',
        message: 'Error al actualizar el material',
      }
    }
  }),

  delete: protectedProcedure.input(entityIdZod).handler(async ({ input }) => {
    try {
      const { id } = input

      await deleteMaterialAssets(id)

      await db.delete(materialTable).where(eq(materialTable.id, id))

      return {
        code: 'SUCCESS',
        message: 'Material eliminado',
      }
    } catch {
      return {
        code: 'ERROR',
        message: 'Error al eliminar el material',
      }
    }
  }),
}
