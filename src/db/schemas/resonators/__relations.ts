import { relations } from 'drizzle-orm'
import {
  resonatorAssetsTable,
  resonatorsTable,
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

export const resonatorRelations = relations(resonatorsTable, ({ many }) => ({
  assets: many(resonatorAssetsTable),
  levels: many(resonatorLevelsTable),
  skills: many(resonatorSkillsTable),
  sequences: many(resonatorSequencesTable),
  bonuses: many(resonatorBonusesTable),
}))

export const resonatorAssetsRelations = relations(
  resonatorAssetsTable,
  ({ one }) => ({
    resonator: one(resonatorsTable, {
      fields: [resonatorAssetsTable.resonator_id],
      references: [resonatorsTable.id],
    }),
  }),
)

export const resonatorLevelRelations = relations(
  resonatorLevelsTable,
  ({ one }) => ({
    resonator: one(resonatorsTable, {
      fields: [resonatorLevelsTable.resonator_id],
      references: [resonatorsTable.id],
    }),
  }),
)

export const resonatorSkillsRelations = relations(
  resonatorSkillsTable,
  ({ one, many }) => ({
    resonator: one(resonatorsTable, {
      fields: [resonatorSkillsTable.resonator_id],
      references: [resonatorsTable.id],
    }),
    assets: many(resonatorSkillsAssetsTable),
  }),
)

export const resonatorSkillsAssetsRelations = relations(
  resonatorSkillsAssetsTable,
  ({ one }) => ({
    skill: one(resonatorSkillsTable, {
      fields: [resonatorSkillsAssetsTable.resonator_id],
      references: [resonatorSkillsTable.id],
    }),
  }),
)

export const resonatorSequencesRelations = relations(
  resonatorSequencesTable,
  ({ one, many }) => ({
    resonator: one(resonatorsTable, {
      fields: [resonatorSequencesTable.resonator_id],
      references: [resonatorsTable.id],
    }),
    assets: many(resonatorSequencesAssetsTable),
  }),
)

export const resonatorSequencesAssetsRelations = relations(
  resonatorSequencesAssetsTable,
  ({ one }) => ({
    sequence: one(resonatorSequencesTable, {
      fields: [resonatorSequencesAssetsTable.resonator_id],
      references: [resonatorSequencesTable.id],
    }),
  }),
)

export const resonatorBonusesRelations = relations(
  resonatorBonusesTable,
  ({ one, many }) => ({
    resonator: one(resonatorsTable, {
      fields: [resonatorBonusesTable.resonator_id],
      references: [resonatorsTable.id],
    }),
    assets: many(resonatorBonusAssetsTable),
  }),
)

export const resonatorBonusAssetsRelations = relations(
  resonatorBonusAssetsTable,
  ({ one }) => ({
    bonus: one(resonatorBonusesTable, {
      fields: [resonatorBonusAssetsTable.resonator_id],
      references: [resonatorBonusesTable.id],
    }),
  }),
)
