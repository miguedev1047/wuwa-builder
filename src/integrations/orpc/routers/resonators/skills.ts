import { db } from '#/db'
import {
  resonatorSkillsAssetsTable,
  resonatorSkillsTable,
} from '#/db/schemas/resonators'
import { resonatorSkillZod } from '#/zod-schemas/resonators/skills'
import { protectedProcedure } from '#/integrations/orpc'
import { eq } from 'drizzle-orm'
import { ORPCError } from '@orpc/client'
import { entityIdZod } from '#/zod-schemas/general/entity-id'
import { deleteResonatorSkillsAssets } from './__helpers'
import {
  imageRemoveZodSchema,
  imageUploadZodSchema,
} from '#/zod-schemas/images'
import { env } from 'cloudflare:workers'

export const skillsRouter = {
  create: protectedProcedure
    .input(resonatorSkillZod)
    .handler(async ({ input }) => {
      try {
        const { ...skillData } = input

        console.log(skillData)

        await db.insert(resonatorSkillsTable).values({ ...skillData })

        return {
          code: 'SUCCESS',
          message: 'Habilidad creada',
        }
      } catch (e) {
        return {
          code: 'ERROR',
          message: 'Error al crear la habilidad',
        }
      }
    }),

  update: protectedProcedure
    .input(resonatorSkillZod)
    .handler(async ({ input }) => {
      try {
        const { ...skillData } = input

        if (!skillData.id) {
          throw new ORPCError('BAD_REQUEST', {
            message: 'Esta habilidad no existe',
          })
        }

        await db
          .update(resonatorSkillsTable)
          .set({ ...skillData })
          .where(eq(resonatorSkillsTable.id, skillData.id))

        return {
          code: 'SUCCESS',
          message: 'Habilidad actualizada',
        }
      } catch {
        return {
          code: 'ERROR',
          message: 'Error al actualizar la habilidad',
        }
      }
    }),

  delete: protectedProcedure.input(entityIdZod).handler(async ({ input }) => {
    try {
      const { id: skillId } = input

      await deleteResonatorSkillsAssets(skillId)

      await db
        .delete(resonatorSkillsTable)
        .where(eq(resonatorSkillsTable.id, skillId))

      return {
        code: 'SUCCESS',
        message: 'Habilidad eliminada',
      }
    } catch {
      return {
        code: 'ERROR',
        message: 'Error al eliminar la habilidad',
      }
    }
  }),

  images: {
    upload: protectedProcedure
      .input(imageUploadZodSchema)
      .handler(async ({ input }) => {
        const { file, folder, entityName, entityId, order } = input

        try {
          const ext = file.name.split('.').pop() ?? 'webp'

          const lowercaseName = entityName.toLowerCase()
          const compactName = lowercaseName.replaceAll(' ', '-')

          const [assetCreated] = await db
            .insert(resonatorSkillsAssetsTable)
            .values({ skill_id: entityId, key: 'none', order })
            .returning({ id: resonatorSkillsAssetsTable.id })

          const assetId = assetCreated.id
          const key = `${folder}/${entityId}/${compactName}-${assetId}.${ext}`

          const buffer = await file.arrayBuffer()
          await env.wuwa_builds_storage.put(key, buffer, {
            httpMetadata: { contentType: file.type },
          })

          await db
            .update(resonatorSkillsAssetsTable)
            .set({ key })
            .where(eq(resonatorSkillsAssetsTable.id, assetId))

          return {
            code: 'SUCCESS',
            message: 'Imagen subida correctamente',
            key,
          }
        } catch {
          return {
            code: 'ERROR',
            message: 'Error al subir la imagen',
            key: null,
          }
        }
      }),

    delete: protectedProcedure
      .input(imageRemoveZodSchema)
      .handler(async ({ input }) => {
        const { key, id } = input

        try {
          const keys = Array.isArray(key) ? key : [key]

          await Promise.all(keys.map((k) => env.wuwa_builds_storage.delete(k)))

          await db
            .delete(resonatorSkillsAssetsTable)
            .where(eq(resonatorSkillsAssetsTable.id, id))

          return {
            code: 'SUCCESS',
            message: 'Imagen eliminada correctamente',
          }
        } catch {
          return {
            code: 'ERROR',
            message: 'Error al eliminar la imagen',
          }
        }
      }),
  },
}
