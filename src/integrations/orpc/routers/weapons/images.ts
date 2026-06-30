import { db } from '#/db'
import { weaponAssetsTable } from '#/db/schemas/weapons'
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

        const [assetCreated] = await db
          .insert(weaponAssetsTable)
          .values({ weapon_id: entityId, key: 'none', order })
          .returning({ id: weaponAssetsTable.id })

        const assetId = assetCreated.id
        const key = `${folder}/${entityId}/${entityName}-${assetId}.${ext}`

        const buffer = await file.arrayBuffer()
        await env.wuwa_builds_storage.put(key, buffer, {
          httpMetadata: { contentType: file.type },
        })

        await db
          .update(weaponAssetsTable)
          .set({ key })
          .where(eq(weaponAssetsTable.id, assetId))

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

        await db.delete(weaponAssetsTable).where(eq(weaponAssetsTable.id, id))

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
