import type { TiptapNodeProps } from '#/zod-schemas/general/tiptap-node'
import { sql } from 'drizzle-orm'
import {
  integer,
  sqliteTable,
  text,
  uniqueIndex,
} from 'drizzle-orm/sqlite-core'
import { weaponsTable } from '#/db/schemas/weapons/items'
import { createId } from '@paralleldrive/cuid2'

export const weaponsRefinamentsTable = sqliteTable(
  'weapons_refinaments',
  {
    id: text('id')
      .primaryKey()
      .$default(() => createId()),
    weapon_id: text('weapon_id')
      .notNull()
      .references(() => weaponsTable.id, { onDelete: 'cascade' }),
    refinament_value: text('refinament_value').notNull(),
    refinament_description: text('refinament_description', { mode: 'json' })
      .$type<TiptapNodeProps>()
      .notNull(),
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
    uniqueIndex('weapons_refinaments_weapon_id_order').on(
      table.weapon_id,
      table.order,
    ),
  ],
)
