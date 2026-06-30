import { createId } from '@paralleldrive/cuid2'
import {
  integer,
  sqliteTable,
  text,
  uniqueIndex,
} from 'drizzle-orm/sqlite-core'
import { resonatorTable } from '#/db/schemas/resonators/items'
import { sql } from 'drizzle-orm'

export const resonatorLevelsTable = sqliteTable(
  'resonator_levels',
  {
    id: text('id')
      .primaryKey()
      .$default(() => createId()),
    resonator_id: text('resonator_id')
      .notNull()
      .references(() => resonatorTable.id, { onDelete: 'cascade' }),
    level_value: text('level_value').notNull(),
    atk: integer('atk').notNull(),
    hp: integer('hp').notNull(),
    def: integer('def').notNull(),
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
    uniqueIndex('resonator_levels_resonator_id_order').on(
      table.resonator_id,
      table.order,
    ),
  ],
)
