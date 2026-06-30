import { relations } from 'drizzle-orm'
import { weaponAssetsTable, weaponTable } from '#/db/schemas/weapons/items'
import { weaponLevelsTable } from '#/db/schemas/weapons/levels'
import { weaponRefinamentsTable } from '#/db/schemas/weapons/refinaments'
import { weaponAdditionalStatsTable } from '#/db/schemas/weapons/additional-stats'

export const weaponRelations = relations(weaponTable, ({ many }) => ({
  assets: many(weaponAssetsTable),
  levels: many(weaponLevelsTable),
  refinaments: many(weaponRefinamentsTable),
}))

export const weaponAssetsRelations = relations(
  weaponAssetsTable,
  ({ one }) => ({
    weapon: one(weaponTable, {
      fields: [weaponAssetsTable.weapon_id],
      references: [weaponTable.id],
    }),
  }),
)

export const weaponLevelsRelations = relations(
  weaponLevelsTable,
  ({ one }) => ({
    weapon: one(weaponTable, {
      fields: [weaponLevelsTable.weapon_id],
      references: [weaponTable.id],
    }),
  }),
)

export const weaponsRefinamentsRelations = relations(
  weaponRefinamentsTable,
  ({ one, many }) => ({
    weapon: one(weaponTable, {
      fields: [weaponRefinamentsTable.weapon_id],
      references: [weaponTable.id],
    }),
    additional_stats: many(weaponAdditionalStatsTable),
  }),
)

export const weaponAdditionalStatsRelations = relations(
  weaponAdditionalStatsTable,
  ({ one }) => ({
    refinament: one(weaponRefinamentsTable, {
      fields: [weaponAdditionalStatsTable.refinament_id],
      references: [weaponRefinamentsTable.id],
    }),
  }),
)
