import { createAssetColumns } from '#/db/helpers/create-assets-table'
import { sql } from 'drizzle-orm'
import {
  integer,
  real,
  sqliteTable,
  text,
  uniqueIndex,
} from 'drizzle-orm/sqlite-core'
import { createId } from '@paralleldrive/cuid2'
import { resonatorTable } from '#/db/schemas/resonators/items'
import type { TiptapNodeProps } from '#/zod-schemas/general/tiptap-node'

export const resonatorBonusesTable = sqliteTable('resonator_bonuses', {
  id: text('id')
    .primaryKey()
    .$default(() => createId()),
  resonator_id: text('resonator_id')
    .notNull()
    .references(() => resonatorTable.id, { onDelete: 'cascade' }),
  bonus_type: text('bonus_type').notNull(),
  bonus_value: text('bonus_value').notNull(),
  bonus_value_number: real('bonus_value_number').notNull(),
  bonus_title: text('bonus_title').notNull(),
  image_url: text('image_url').notNull(),
  bonus_description: text('bonus_description', { mode: 'json' })
    .$type<TiptapNodeProps>()
    .notNull(),
  createdAt: integer('created_at', { mode: 'timestamp_ms' })
    .default(sql`(cast(unixepoch('subsecond') * 1000 as integer))`)
    .notNull(),
  updatedAt: integer('updated_at', { mode: 'timestamp_ms' })
    .default(sql`(cast(unixepoch('subsecond') * 1000 as integer))`)
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
})

export const resonatorBonusAssetsTable = sqliteTable(
  'resonator_bonus_assets',
  {
    ...createAssetColumns(),

    resonator_id: text('resonator_id')
      .notNull()
      .references(() => resonatorBonusesTable.id, { onDelete: 'cascade' }),
  },
  (table) => [
    uniqueIndex('resonator_bonuses_assets_unique').on(
      table.resonator_id,
      table.order,
    ),
  ],
)
