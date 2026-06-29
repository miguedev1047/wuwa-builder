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

export const weaponsTable = sqliteTable('weapons', {
  id: text('id')
    .primaryKey()
    .$default(() => createId()),
  name: text('name').notNull(),
  description: text('description', { mode: 'json' })
    .$type<TiptapNodeProps>()
    .notNull(),
  type: text('type').notNull(),
  main_stat_value: text('main_stat_value').notNull(),
  rarity: text('rarity').notNull(),
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

export const weaponAssetsSchemaTable = sqliteTable(
  'weapon_assets',
  {
    ...createAssetColumns(),

    weapon_id: text('weapon_id')
      .notNull()
      .references(() => weaponsTable.id, { onDelete: 'cascade' }),
  },
  (table) => [
    uniqueIndex('weapon_assets_unique').on(table.weapon_id, table.order),
  ],
)
