import { createId } from '@paralleldrive/cuid2'
import {
  integer,
  sqliteTable,
  text,
  uniqueIndex,
} from 'drizzle-orm/sqlite-core'
import { sql } from 'drizzle-orm'
import { resonatorTable } from '#/db/schemas/resonators/items'
import { weaponTable } from '#/db/schemas/weapons'

export const resonatorBestWeaponsTable = sqliteTable(
  'resonator_best_weapons',
  {
    id: text('id')
      .primaryKey()
      .$default(() => createId()),
    resonator_id: text('resonator_id')
      .notNull()
      .references(() => resonatorTable.id, { onDelete: 'cascade' }),
    weapon_id: text('weapon_id')
      .notNull()
      .references(() => weaponTable.id, { onDelete: 'cascade' }),
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
    uniqueIndex('resonator_best_weapons_resonator_id_order').on(
      table.resonator_id,
      table.weapon_id,
      table.order,
    ),
  ],
)
