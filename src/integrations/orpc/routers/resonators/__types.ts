import type { InferRouterOutputs } from '@orpc/server'
import type { resonatorRouter } from './resonator'

export type ResonatorOutputs = InferRouterOutputs<typeof resonatorRouter>

export type TResonatorTable = ResonatorOutputs['getById']
export type TResonatorsTable = ResonatorOutputs['getAll']

export type TResonatorAssetsTable = TResonatorTable['assets']
export type TResonatorAssetTable = TResonatorAssetsTable[number]

export type TResonatorBestWeaponsTable = TResonatorTable['best_weapons']
export type TResonatorBestWeaponTable = TResonatorBestWeaponsTable[number]

export type TResonatorLevelsTable = TResonatorTable['levels']
export type TResonatorLevelTable = TResonatorLevelsTable[number]

export type TResonatorSkillsTable = TResonatorTable['skills']
export type TResonatorSkillTable = TResonatorSkillsTable[number]

export type TResonatorSequencesTable = TResonatorTable['sequences']
export type TResonatorSequenceTable = TResonatorSequencesTable[number]

export type TResonatorBonusesTable = TResonatorTable['bonuses']
export type TResonatorBonusTable = TResonatorBonusesTable[number]
