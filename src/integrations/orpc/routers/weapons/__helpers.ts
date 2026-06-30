import { db } from '#/db'
import { weaponAssetsTable } from '#/db/schemas/weapons'
import { env } from 'cloudflare:workers'
import { eq } from 'drizzle-orm'

export async function deleteWeaponAssets(weaponId: string) {
  const assets = await db.query.weaponAssetsTable.findMany({
    where: (table, { eq: equals }) => equals(table.weapon_id, weaponId),
  })

  const keys = assets.map((asset) => asset.key)

  if (keys.length > 0) {
    await env.wuwa_builds_storage.delete(keys)
  }

  await db
    .delete(weaponAssetsTable)
    .where(eq(weaponAssetsTable.weapon_id, weaponId))
}
