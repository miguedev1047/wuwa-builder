import { relations } from 'drizzle-orm'
import {
  materialTable,
  materialAssetsTable,
} from '#/db/schemas/materials/items'

export const materialRelations = relations(materialTable, ({ many }) => ({
  assets: many(materialAssetsTable),
}))

export const materialAssetsRelations = relations(
  materialAssetsTable,
  ({ one }) => ({
    material: one(materialTable, {
      fields: [materialAssetsTable.material_id],
      references: [materialTable.id],
    }),
  }),
)
