import { db } from '#/db'
import { echoAssetsTable } from '#/db/schemas/echoes'
import { env } from 'cloudflare:workers'
import { eq } from 'drizzle-orm'

export async function deleteEchoAssets(echoId: string) {
  const assets = await db.query.echoAssetsTable.findMany({
    where: (table, { eq: equals }) => equals(table.echo_id, echoId),
  })

  const keys = assets.map((asset) => asset.key)

  if (keys.length > 0) {
    await env.wuwa_builds_storage.delete(keys)
  }

  await db.delete(echoAssetsTable).where(eq(echoAssetsTable.echo_id, echoId))
}
