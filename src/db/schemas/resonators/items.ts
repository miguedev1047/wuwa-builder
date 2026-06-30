import { createAssetColumns } from '#/db/helpers/create-assets-table'
import type { TiptapNodeProps } from '#/zod-schemas/general/tiptap-node'
import { createId } from '@paralleldrive/cuid2'
import { sql } from 'drizzle-orm'
import {
  integer,
  sqliteTable,
  text,
  uniqueIndex,
} from 'drizzle-orm/sqlite-core'

export const resonatorTable = sqliteTable('resonators', {
  id: text('id')
    .primaryKey()
    .$default(() => createId()),
  name: text('name').notNull(),
  description: text('description', { mode: 'json' })
    .$type<TiptapNodeProps>()
    .notNull(),
  weapon_type: text('weapon_type').notNull(),
  rarity: text('rarity').notNull(),
  element: text('element').notNull(),
  role: text('role').notNull(),
  is_new: integer('is_new', { mode: 'boolean' }).notNull().default(false),
  is_public: integer('is_public', { mode: 'boolean' }).notNull().default(false),
  createdAt: integer('created_at', { mode: 'timestamp_ms' })
    .default(sql`(cast(unixepoch('subsecond') * 1000 as integer))`)
    .notNull(),
  updatedAt: integer('updated_at', { mode: 'timestamp_ms' })
    .default(sql`(cast(unixepoch('subsecond') * 1000 as integer))`)
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
})

export const resonatorAssetsTable = sqliteTable(
  'resonator_assets',
  {
    ...createAssetColumns(),

    resonator_id: text('resonator_id')
      .notNull()
      .references(() => resonatorTable.id, { onDelete: 'cascade' }),
  },
  (table) => [
    uniqueIndex('resonator_assets_unique').on(table.resonator_id, table.order),
  ],
)
