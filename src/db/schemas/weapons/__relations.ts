import { relations } from 'drizzle-orm'
import { weaponAssetsTable, weaponTable } from '#/db/schemas/weapons/items'
import { weaponLevels } from '#/db/schemas/weapons/levels'
import { weaponsRefinamentsTable } from '#/db/schemas/weapons/refinaments'
import { weaponAdditionalStatsTable } from '#/db/schemas/weapons/additional-stats'

export const weaponRelations = relations(weaponTable, ({ many }) => ({
  assets: many(weaponAssetsTable),
  levels: many(weaponLevels),
  refinaments: many(weaponsRefinamentsTable),
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

export const weaponLevelsRelations = relations(weaponLevels, ({ one }) => ({
  weapon: one(weaponTable, {
    fields: [weaponLevels.weapon_id],
    references: [weaponTable.id],
  }),
}))

export const weaponsRefinamentsRelations = relations(
  weaponsRefinamentsTable,
  ({ one, many }) => ({
    weapon: one(weaponTable, {
      fields: [weaponsRefinamentsTable.weapon_id],
      references: [weaponTable.id],
    }),
    additional_stats: many(weaponAdditionalStatsTable),
  }),
)

export const weaponAdditionalStatsRelations = relations(
  weaponAdditionalStatsTable,
  ({ one }) => ({
    refinament: one(weaponsRefinamentsTable, {
      fields: [weaponAdditionalStatsTable.refinament_id],
      references: [weaponsRefinamentsTable.id],
    }),
  }),
)
