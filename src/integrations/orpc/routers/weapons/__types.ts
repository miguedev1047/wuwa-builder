import type { InferRouterOutputs } from '@orpc/server'
import type { weaponRouter } from './weapon'

export type WeaponOutputs = InferRouterOutputs<typeof weaponRouter>

export type TWeaponTable = WeaponOutputs['getById']
export type TWeaponsTable = WeaponOutputs['getAll']

export type TWeaponAssetsTable = TWeaponTable['assets']
export type TWeaponAssetTable = TWeaponTable['assets'][number]

export type TWeaponLevelsTable = TWeaponTable['levels']
export type TWeaponLevelTable = TWeaponTable['levels'][number]

export type TWeaponRefinamentsTable = TWeaponTable['refinaments']
export type TWeaponRefinamentTable = TWeaponTable['refinaments'][number]

export type TWeaponAdditionalStatsTable =
  TWeaponTable['refinaments'][number]['additional_stats']
export type TWeaponAdditionalStatTable =
  TWeaponTable['refinaments'][number]['additional_stats'][number]
