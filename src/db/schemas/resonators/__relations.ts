import { relations } from 'drizzle-orm'
import { weaponTable } from '#/db/schemas/weapons/items'
import {
  resonatorAssetsTable,
  resonatorTable,
} from '#/db/schemas/resonators/items'
import {
  resonatorSkillsTable,
  resonatorSkillsAssetsTable,
} from '#/db/schemas/resonators/skills'
import {
  resonatorSequencesTable,
  resonatorSequencesAssetsTable,
} from '#/db/schemas/resonators/sequences'
import {
  resonatorBonusesTable,
  resonatorBonusAssetsTable,
} from '#/db/schemas/resonators/bonuses'
import { resonatorLevelsTable } from '#/db/schemas/resonators/levels'
import { resonatorBestWeaponsTable } from '#/db/schemas/resonators/best-weapons'

export const resonatorRelations = relations(resonatorTable, ({ many }) => ({
  assets: many(resonatorAssetsTable),
  best_weapons: many(resonatorBestWeaponsTable),
  levels: many(resonatorLevelsTable),
  skills: many(resonatorSkillsTable),
  sequences: many(resonatorSequencesTable),
  bonuses: many(resonatorBonusesTable),
}))

export const resonatorAssetsRelations = relations(
  resonatorAssetsTable,
  ({ one }) => ({
    resonator: one(resonatorTable, {
      fields: [resonatorAssetsTable.resonator_id],
      references: [resonatorTable.id],
    }),
  }),
)

export const resonatorBestWeaponsRelations = relations(
  resonatorBestWeaponsTable,
  ({ one }) => ({
    resonator: one(resonatorTable, {
      fields: [resonatorBestWeaponsTable.resonator_id],
      references: [resonatorTable.id],
    }),
    weapon: one(weaponTable, {
      fields: [resonatorBestWeaponsTable.weapon_id],
      references: [weaponTable.id],
    }),
  }),
)

export const resonatorLevelRelations = relations(
  resonatorLevelsTable,
  ({ one }) => ({
    resonator: one(resonatorTable, {
      fields: [resonatorLevelsTable.resonator_id],
      references: [resonatorTable.id],
    }),
  }),
)

export const resonatorSkillsRelations = relations(
  resonatorSkillsTable,
  ({ one, many }) => ({
    resonator: one(resonatorTable, {
      fields: [resonatorSkillsTable.resonator_id],
      references: [resonatorTable.id],
    }),
    assets: many(resonatorSkillsAssetsTable),
  }),
)

export const resonatorSkillsAssetsRelations = relations(
  resonatorSkillsAssetsTable,
  ({ one }) => ({
    skill: one(resonatorSkillsTable, {
      fields: [resonatorSkillsAssetsTable.skill_id],
      references: [resonatorSkillsTable.id],
    }),
  }),
)

export const resonatorSequencesRelations = relations(
  resonatorSequencesTable,
  ({ one, many }) => ({
    resonator: one(resonatorTable, {
      fields: [resonatorSequencesTable.resonator_id],
      references: [resonatorTable.id],
    }),
    assets: many(resonatorSequencesAssetsTable),
  }),
)

export const resonatorSequencesAssetsRelations = relations(
  resonatorSequencesAssetsTable,
  ({ one }) => ({
    sequence: one(resonatorSequencesTable, {
      fields: [resonatorSequencesAssetsTable.sequence_id],
      references: [resonatorSequencesTable.id],
    }),
  }),
)

export const resonatorBonusesRelations = relations(
  resonatorBonusesTable,
  ({ one, many }) => ({
    resonator: one(resonatorTable, {
      fields: [resonatorBonusesTable.resonator_id],
      references: [resonatorTable.id],
    }),
    assets: many(resonatorBonusAssetsTable),
  }),
)

export const resonatorBonusAssetsRelations = relations(
  resonatorBonusAssetsTable,
  ({ one }) => ({
    bonus: one(resonatorBonusesTable, {
      fields: [resonatorBonusAssetsTable.bonus_id],
      references: [resonatorBonusesTable.id],
    }),
  }),
)
