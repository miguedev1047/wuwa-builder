import { db } from '#/db'
import { resonatorAssetsTable } from '#/db/schemas/resonators'
import { env } from 'cloudflare:workers'
import { eq } from 'drizzle-orm'

export async function deleteResonatorAssets(resonatorId: string) {
  const assets = await db.query.resonatorAssetsTable.findMany({
    where: (table, { eq: equals }) => equals(table.resonator_id, resonatorId),
  })

  const keys = assets.map((asset) => asset.key)

  if (keys.length > 0) {
    await env.wuwa_builds_storage.delete(keys)
  }

  await db
    .delete(resonatorAssetsTable)
    .where(eq(resonatorAssetsTable.resonator_id, resonatorId))
}
