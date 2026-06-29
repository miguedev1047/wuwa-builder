import { relations } from 'drizzle-orm'
import {
  weaponAssetsSchemaTable,
  weaponsTable,
} from '#/db/schemas/weapons/items'
import { weaponLevels } from '#/db/schemas/weapons/levels'
import { weaponsRefinamentsTable } from '#/db/schemas/weapons/refinaments'
import { weaponAdditionalStatsTable } from '#/db/schemas/weapons/additional-stats'

export const weaponRelations = relations(weaponsTable, ({ many }) => ({
  assets: many(weaponAssetsSchemaTable),
  levels: many(weaponLevels),
  refinaments: many(weaponsRefinamentsTable),
}))

export const weaponAssetsRelations = relations(
  weaponAssetsSchemaTable,
  ({ one }) => ({
    weapon: one(weaponsTable, {
      fields: [weaponAssetsSchemaTable.weapon_id],
      references: [weaponsTable.id],
    }),
  }),
)

export const weaponLevelsRelations = relations(weaponLevels, ({ one }) => ({
  weapon: one(weaponsTable, {
    fields: [weaponLevels.weapon_id],
    references: [weaponsTable.id],
  }),
}))

export const weaponsRefinamentsRelations = relations(
  weaponsRefinamentsTable,
  ({ one, many }) => ({
    weapon: one(weaponsTable, {
      fields: [weaponsRefinamentsTable.weapon_id],
      references: [weaponsTable.id],
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
