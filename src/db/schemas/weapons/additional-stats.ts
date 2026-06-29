import { createId } from '@paralleldrive/cuid2'
import {
  integer,
  sqliteTable,
  text,
  uniqueIndex,
} from 'drizzle-orm/sqlite-core'
import { weaponTable } from '#/db/schemas/weapons/items'
import { weaponsRefinamentsTable } from '#/db/schemas/weapons/refinaments'
import { sql } from 'drizzle-orm'

export const weaponAdditionalStatsTable = sqliteTable(
  'weapon_additional_stats',
  {
    id: text('id')
      .primaryKey()
      .$default(() => createId()),
    weapon_id: text('weapon_id')
      .notNull()
      .references(() => weaponTable.id, { onDelete: 'cascade' }),
    refinament_id: text('refinament_id').references(
      () => weaponsRefinamentsTable.id,
      { onDelete: 'cascade' },
    ),
    stat_value: text('stat_value').notNull(),
    stat_value_number: integer('stat_value_number').notNull(),
    order: integer('order').notNull(),
    createdAt: integer('created_at', { mode: 'timestamp_ms' })
      .default(sql`(cast(unixepoch('subsecond') * 1000 as integer))`)
      .notNull(),
    updatedAt: integer('updated_at', { mode: 'timestamp_ms' })
      .default(sql`(cast(unixepoch('subsecond') * 1000 as integer))`)
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
  },
  (table) => [
    uniqueIndex('weapon_additional_stats_weapon_order_id').on(
      table.weapon_id,
      table.refinament_id,
      table.order,
    ),
  ],
)
