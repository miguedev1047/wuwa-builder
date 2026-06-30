import { db } from '#/db'
import { materialAssetsTable } from '#/db/schemas/materials'
import {
  imageRemoveZodSchema,
  imageUploadZodSchema,
} from '#/zod-schemas/images'
import { env } from 'cloudflare:workers'
import { eq } from 'drizzle-orm'
import { protectedProcedure } from '#/integrations/orpc'

export const imagesRouter = {
  upload: protectedProcedure
    .input(imageUploadZodSchema)
    .handler(async ({ input }) => {
      const { file, folder, entityName, entityId, order } = input

      try {
        const ext = file.name.split('.').pop() ?? 'webp'

        const lowercaseName = entityName.toLowerCase()
        const compactName = lowercaseName.replaceAll(' ', '-')

        const [assetCreated] = await db
          .insert(materialAssetsTable)
          .values({ material_id: entityId, key: 'none', order })
          .returning({ id: materialAssetsTable.id })

        const assetId = assetCreated.id
        const key = `${folder}/${entityId}/${compactName}-${assetId}.${ext}`

        const buffer = await file.arrayBuffer()
        await env.wuwa_builds_storage.put(key, buffer, {
          httpMetadata: { contentType: file.type },
        })

        await db
          .update(materialAssetsTable)
          .set({ key })
          .where(eq(materialAssetsTable.id, assetId))

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
          .delete(materialAssetsTable)
          .where(eq(materialAssetsTable.id, id))

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
}
