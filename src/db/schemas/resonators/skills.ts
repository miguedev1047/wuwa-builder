import { createAssetColumns } from '#/db/helpers/create-assets-table'
import { sql } from 'drizzle-orm'
import {
  integer,
  sqliteTable,
  text,
  uniqueIndex,
} from 'drizzle-orm/sqlite-core'
import { createId } from '@paralleldrive/cuid2'
import { resonatorsTable } from '#/db/schemas/resonators/items'
import type { TiptapNodeProps } from '#/zod-schemas/general/tiptap-node'

export const resonatorSkillsTable = sqliteTable(
  'resonator_skills',
  {
    id: text('id')
      .primaryKey()
      .$default(() => createId()),
    resonator_id: text('resonator_id')
      .notNull()
      .references(() => resonatorsTable.id, { onDelete: 'cascade' }),
    name: text('name').notNull(),
    image_url: text('image_url').notNull(),
    description: text('description', { mode: 'json' })
      .$type<TiptapNodeProps>()
      .notNull(),
    skill_type: text('skill_type').notNull(),
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
    uniqueIndex('resonator_skills_resonator_id_order').on(
      table.resonator_id,
      table.order,
    ),
  ],
)

export const resonatorSkillsAssetsTable = sqliteTable(
  'resonator_skills_assets',
  {
    ...createAssetColumns(),

    resonator_id: text('resonator_id')
      .notNull()
      .references(() => resonatorSkillsTable.id, { onDelete: 'cascade' }),
  },
  (table) => [
    uniqueIndex('resonator_skills_assets_unique').on(table.resonator_id, table.order),
  ],
)
