import { ORPCError } from '@orpc/client'
import { deleteEchoAssets } from '#/integrations/orpc/routers/echoes/__helpers'
import { protectedProcedure, publicProcedure } from '#/integrations/orpc'
import { db } from '#/db'
import { entityIdZod } from '#/zod-schemas/general/entity-id'
import { echoZod } from '#/zod-schemas/echoes'
import { echoSonatasTable, echoTable } from '#/db/schemas/echoes'
import { eq } from 'drizzle-orm'

export const echoRouter = {
  getAll: publicProcedure.handler(async () => {
    try {
      const echoes = await db.query.echoTable.findMany({
        with: {
          assets: {
            orderBy: (table, { asc }) => asc(table.order),
          },
          sonatas: true,
        },
        orderBy: (table, { desc }) => desc(table.echo_cost),
      })

      return echoes
    } catch {
      throw new ORPCError('INTERNAL_SERVER_ERROR', {
        data: [],
        message: 'Error al obtener los ecos',
      })
    }
  }),

  getById: publicProcedure.input(entityIdZod).handler(async ({ input }) => {
    try {
      const { id } = input
      const echo = await db.query.echoTable.findFirst({
        where: (table, { eq: equals }) => equals(table.id, id),
        with: {
          assets: {
            orderBy: (table, { asc }) => asc(table.order),
          },
          sonatas: true,
        },
      })

      if (!echo)
        throw new ORPCError('NOT_FOUND', {
          data: null,
          message: 'Eco no encontrado',
        })

      return echo
    } catch {
      throw new ORPCError('INTERNAL_SERVER_ERROR', {
        data: null,
        message: 'Error al obtener este eco',
      })
    }
  }),

  create: protectedProcedure.input(echoZod).handler(async ({ input }) => {
    try {
      const { echo_sonatas, ...materialData } = input

      const [newEcho] = await db
        .insert(echoTable)
        .values({ ...materialData })
        .returning({ id: echoTable.id })

      if (echo_sonatas.length > 0) {
        await db.insert(echoSonatasTable).values(
          echo_sonatas.map((sonata) => ({
            echo_id: newEcho.id,
            echo_sonata_value: sonata,
          })),
        )
      }

      return {
        code: 'SUCCESS',
        message: 'Eco creado',
      }
    } catch {
      return {
        code: 'ERROR',
        message: 'Error al crear el eco',
      }
    }
  }),

  update: protectedProcedure.input(echoZod).handler(async ({ input }) => {
    try {
      const { echo_sonatas, id, ...echoData } = input

      if (!id) {
        return {
          code: 'ERROR',
          message: 'Eco no encontrado',
        }
      }

      await db
        .update(echoTable)
        .set({ ...echoData })
        .where(eq(echoTable.id, id))

      if (echo_sonatas.length > 0) {
        await db
          .delete(echoSonatasTable)
          .where(eq(echoSonatasTable.echo_id, id))

        await db.insert(echoSonatasTable).values(
          echo_sonatas.map((sonata) => ({
            echo_id: id,
            echo_sonata_value: sonata,
          })),
        )
      }

      return {
        code: 'SUCCESS',
        message: 'Eco actualizado',
      }
    } catch {
      return {
        code: 'ERROR',
        message: 'Error al actualizar el eco',
      }
    }
  }),

  delete: protectedProcedure.input(entityIdZod).handler(async ({ input }) => {
    try {
      const { id } = input

      await deleteEchoAssets(id)

      await db.delete(echoTable).where(eq(echoTable.id, id))

      return {
        code: 'SUCCESS',
        message: 'Eco eliminado',
      }
    } catch {
      return {
        code: 'ERROR',
        message: 'Error al eliminar el eco',
      }
    }
  }),
}
