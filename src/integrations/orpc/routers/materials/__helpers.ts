import { db } from '#/db'
import { echoAssetsTable } from '#/db/schemas/echoes'
import { env } from 'cloudflare:workers'
import { eq } from 'drizzle-orm'

export async function deleteMaterialAssets(materialId: string) {
  const assets = await db.query.materialAssetsTable.findMany({
    where: (table, { eq: equals }) => equals(table.material_id, materialId),
  })

  const keys = assets.map((asset) => asset.key)

  if (keys.length > 0) {
    await env.wuwa_builds_storage.delete(keys)
  }

  await db
    .delete(echoAssetsTable)
    .where(eq(echoAssetsTable.echo_id, materialId))
}
