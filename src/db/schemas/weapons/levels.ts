import { integer, real, sqliteTable, text } from 'drizzle-orm/sqlite-core'
import { weaponTable } from '#/db/schemas/weapons/items'
import { createId } from '@paralleldrive/cuid2'
import { sql } from 'drizzle-orm'

export const weaponLevels = sqliteTable('weapon_levels', {
  id: text('id')
    .primaryKey()
    .$default(() => createId()),
  weapon_id: text('weapon_id')
    .notNull()
    .references(() => weaponTable.id, { onDelete: 'cascade' }),
  level_value: text('level_value').notNull(),
  atk: real('atk').notNull(),
  main_stat_number: real('main_stat_number').notNull(),
  order: integer('order').notNull(),
  createdAt: integer('created_at', { mode: 'timestamp_ms' })
    .default(sql`(cast(unixepoch('subsecond') * 1000 as integer))`)
    .notNull(),
  updatedAt: integer('updated_at', { mode: 'timestamp_ms' })
    .default(sql`(cast(unixepoch('subsecond') * 1000 as integer))`)
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
})
