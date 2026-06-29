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

export const resonatorSequencesTable = sqliteTable(
  'resonator_sequences',
  {
    id: text('id')
      .primaryKey()
      .$default(() => createId()),
    name: text('name').notNull(),
    description: text('description').notNull(),
    level: integer('level').notNull(),
    order: integer('order').notNull(),
    resonator_id: text('resonator_id')
      .notNull()
      .references(() => resonatorsTable.id, { onDelete: 'cascade' }),
    createdAt: integer('created_at', { mode: 'timestamp_ms' })
      .default(sql`(cast(unixepoch('subsecond') * 1000 as integer))`)
      .notNull(),
    updatedAt: integer('updated_at', { mode: 'timestamp_ms' })
      .default(sql`(cast(unixepoch('subsecond') * 1000 as integer))`)
      .$onUpdate(() => new Date())
      .notNull(),
  },
  (table) => [
    uniqueIndex('resonator_sequences_resonator_id_order').on(
      table.resonator_id,
      table.order,
    ),
  ],
)

export const resonatorSequencesAssetsTable = sqliteTable(
  'resonator_sequences_assets',
  {
    ...createAssetColumns(),

    resonator_id: text('resonator_id')
      .notNull()
      .references(() => resonatorSequencesTable.id, { onDelete: 'cascade' }),
  },
  (table) => [
    uniqueIndex('resonator_sequences_assets_unique').on(table.resonator_id, table.order),
  ],
)
