import { createId } from '@paralleldrive/cuid2'
import { sql } from 'drizzle-orm'
import {
  integer,
  sqliteTable,
  text,
  uniqueIndex,
} from 'drizzle-orm/sqlite-core'
import { createAssetColumns } from '#/db/helpers/create-assets-table'
import type { TiptapNodeProps } from '@/zod-schemas/general/tiptap-node'

export const materialTable = sqliteTable('materials', {
  id: text('id')
    .primaryKey()
    .$default(() => createId()),
  name: text('name').notNull(),
  description: text('description', { mode: 'json' })
    .$type<TiptapNodeProps>()
    .notNull(),

  type: text('type').notNull(),
  rarity: text('rarity').notNull(),

  createdAt: integer('created_at', { mode: 'timestamp_ms' })
    .default(sql`(cast(unixepoch('subsecond') * 1000 as integer))`)
    .notNull(),
  updatedAt: integer('updated_at', { mode: 'timestamp_ms' })
    .default(sql`(cast(unixepoch('subsecond') * 1000 as integer))`)
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
})

export const materialAssetsTable = sqliteTable(
  'material_assets',
  {
    ...createAssetColumns(),

    material_id: text('material_id')
      .notNull()
      .references(() => materialTable.id, { onDelete: 'cascade' }),
  },
  (table) => [
    uniqueIndex('material_assets_unique').on(table.material_id, table.order),
  ],
)
