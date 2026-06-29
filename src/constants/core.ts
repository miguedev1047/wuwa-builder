export const WeaponTypeEnum = [
  'sword',
  'boardblade',
  'gloves',
  'pistols',
  'rectifier',
] as const
export const WEAPON_TYPES = [
  {
    label: 'Espada',
    value: 'sword',
  },
  {
    label: 'Mandoble',
    value: 'boardblade',
  },
  {
    label: 'Guantes',
    value: 'guantlets',
  },
  {
    label: 'Pistolas',
    value: 'pistols',
  },
  {
    label: 'Rectificador',
    value: 'rectifier',
  },
]

export const RarityEnum = [
  'rarity_1',
  'rarity_2',
  'rarity_3',
  'rarity_4',
  'rarity_5',
] as const
export const RARITIES = [
  {
    label: '1 Estrella',
    value: 'rarity_1',
  },
  {
    label: '2 Estrellas',
    value: 'rarity_2',
  },
  {
    label: '3 Estrellas',
    value: 'rarity_3',
  },
  {
    label: '4 Estrellas',
    value: 'rarity_4',
  },
  {
    label: '5 Estrellas',
    value: 'rarity_5',
  },
]

export const GeneralStatEnum = [
  'hp',
  'atk',
  'def',
  'hp_pct',
  'atk_pct',
  'def_pct',
  'crit_rate',
  'crit_dmg',
  'energy_regen',
  'basic_atk_dmg_bonus',
  'heavy_atk_dmg_bonus',
  'skill_dmg_bonus',
  'liberation_dmg_bonus',
  'fusion_dmg_bonus',
  'glacio_dmg_bonus',
  'aero_dmg_bonus',
  'electro_dmg_bonus',
  'spectro_dmg_bonus',
  'havoc_dmg_bonus',
  'healing_bonus',
] as const
export const GENERAL_STATS = [
  { label: 'Vida', value: 'hp' },
  { label: 'Ataque', value: 'atk' },
  { label: 'Defensa', value: 'def' },
  { label: 'Vida%', value: 'hp_pct' },
  { label: 'Ataque%', value: 'atk_pct' },
  { label: 'Defensa%', value: 'def_pct' },
  { label: 'Prob. Crit.', value: 'crit_rate' },
  { label: 'Daño Crit.', value: 'crit_dmg' },
  { label: 'Recarga de Energía', value: 'energy_regen' },
  { label: 'Ataque Básico', value: 'basic_atk_dmg_bonus' },
  { label: 'Ataque Cargado', value: 'heavy_atk_dmg_bonus' },
  { label: 'Hab. de Resonancia', value: 'skill_dmg_bonus' },
  { label: 'Lib. de Resonancia', value: 'liberation_dmg_bonus' },
  { label: 'Bono Daño Fusión', value: 'fusion_dmg_bonus' },
  { label: 'Bono Daño Glacio', value: 'glacio_dmg_bonus' },
  { label: 'Bono Daño Aero', value: 'aero_dmg_bonus' },
  { label: 'Bono Daño Electro', value: 'electro_dmg_bonus' },
  { label: 'Bono Daño Spectro', value: 'spectro_dmg_bonus' },
  { label: 'Bono Daño Havoc', value: 'havoc_dmg_bonus' },
  { label: 'Bono de Curación', value: 'healing_bonus' },
]

export const WuwaRegionEnum = ['america', 'europa', 'asia', 'china'] as const
export const WUWA_REGIONS = [
  { label: 'América', value: 'america' },
  { label: 'Europa', value: 'europa' },
  { label: 'Asia', value: 'asia' },
  { label: 'China', value: 'china' },
]

export const DEFAULT_LEVELS = {
  label: 'N/A',
  value: 'level_0',
  order: 0,
}
export const LEVELS = [
  {
    label: 'Nivel 1',
    value: 'level_1',
    order: 0,
  },
  {
    label: 'Nivel 20',
    value: 'level_20',
    order: 1,
  },
  {
    label: 'Nivel 40',
    value: 'level_40',
    order: 2,
  },
  {
    label: 'Nivel 50',
    value: 'level_50',
    order: 3,
  },
  {
    label: 'Nivel 60',
    value: 'level_60',
    order: 4,
  },
  {
    label: 'Nivel 70',
    value: 'level_70',
    order: 5,
  },
  {
    label: 'Nivel 80',
    value: 'level_80',
    order: 6,
  },
  {
    label: 'Nivel 90',
    value: 'level_90',
    order: 7,
  },
]
