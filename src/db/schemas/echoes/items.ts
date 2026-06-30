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

export const echoTable = sqliteTable('echoes', {
  id: text('id')
    .primaryKey()
    .$default(() => createId()),
  name: text('name').notNull(),
  description_skill: text('description_skill', { mode: 'json' })
    .$type<TiptapNodeProps>()
    .notNull(),

  echo_class: text('echo_class').notNull(),
  echo_cost: text('echo_cost').notNull(),

  createdAt: integer('created_at', { mode: 'timestamp_ms' })
    .default(sql`(cast(unixepoch('subsecond') * 1000 as integer))`)
    .notNull(),
  updatedAt: integer('updated_at', { mode: 'timestamp_ms' })
    .default(sql`(cast(unixepoch('subsecond') * 1000 as integer))`)
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
})

export const echoAssetsTable = sqliteTable(
  'echo_assets',
  {
    ...createAssetColumns(),

    echo_id: text('echo_id')
      .notNull()
      .references(() => echoTable.id, { onDelete: 'cascade' }),
  },
  (table) => [uniqueIndex('echo_assets_unique').on(table.echo_id, table.order)],
)

export const echoSonatasTable = sqliteTable('echo_sonatas', {
  id: text('id')
    .primaryKey()
    .$default(() => createId()),
  echo_id: text('echo_id')
    .notNull()
    .references(() => echoTable.id, { onDelete: 'cascade' }),

  echo_sonata_value: text('echo_sonata_value').notNull(),

  createdAt: integer('created_at', { mode: 'timestamp_ms' })
    .default(sql`(cast(unixepoch('subsecond') * 1000 as integer))`)
    .notNull(),
  updatedAt: integer('updated_at', { mode: 'timestamp_ms' })
    .default(sql`(cast(unixepoch('subsecond') * 1000 as integer))`)
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
})
