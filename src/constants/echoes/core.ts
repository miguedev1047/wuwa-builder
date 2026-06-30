export const ECHOES_MAINSTATS = {
  cost_4: {
    substats: {
      stat: 'atk',
      values: [30, 54, 78, 102, 126, 150],
    },
    values: [
      {
        label: 'Vida%',
        value: 'hp_pct',
        levels: [6.6, 11.9, 12.7, 22.4, 27.5, 33],
      },
      {
        label: 'Ataque%',
        value: 'atk_pct',
        levels: [6.6, 11.9, 12.7, 22.4, 27.5, 33],
      },
      {
        label: 'Defensa%',
        value: 'def_pct',
        levels: [8.4, 15, 21.7, 28.4, 35.1, 41.8],
      },
      {
        label: 'Prob. Crit.',
        value: 'crit_rate',
        levels: [4.4, 7.9, 11.4, 15, 18.5, 22],
      },
      {
        label: 'Daño Crit.',
        value: 'crit_dmg',
        levels: [8.8, 15.8, 22.9, 29.9, 37, 44],
      },
      {
        label: 'Bono de Curación',
        value: 'healing_bonus',
        levels: [5.3, 9.5, 13.7, 18, 22.2, 26.4],
      },
    ],
  },
  cost_3: {
    substats: {
      stat: 'atk',
      values: [20, 36, 52, 68, 84, 100],
    },
    values: [
      {
        label: 'Ataque%',
        value: 'atk_pct',
        levels: [6, 10.8, 15.6, 20.4, 25.2, 30],
      },
      {
        label: 'Vida%',
        value: 'hp_pct',

        levels: [6, 10.8, 15.6, 20.4, 25.2, 30],
      },
      {
        label: 'Defensa%',
        value: 'def_pct',
        levels: [7.6, 13.7, 19.8, 25.8, 31.9, 38],
      },
      {
        label: 'Recarga de Energía',
        value: 'energy_regen',
        levels: [6.4, 11.5, 16.6, 21.8, 26.9, 32],
      },
      {
        label: 'Bonif. de Daño Fusión',
        value: 'fusion_dmg_bonus',
        levels: [6, 10.8, 15.6, 20.4, 25.2, 30],
      },
      {
        label: 'Bonif. de Daño Glacio',
        value: 'glacio_dmg_bonus',
        levels: [6, 10.8, 15.6, 20.4, 25.2, 30],
      },
      {
        label: 'Bonif. de Daño Aero',
        value: 'aero_dmg_bonus',
        levels: [6, 10.8, 15.6, 20.4, 25.2, 30],
      },
      {
        label: 'Bonif. de Daño Electro',
        value: 'electro_dmg_bonus',
        levels: [6, 10.8, 15.6, 20.4, 25.2, 30],
      },
      {
        label: 'Bonif. de Daño Espectro',
        value: 'spectro_dmg_bonus',
        levels: [6, 10.8, 15.6, 20.4, 25.2, 30],
      },
      {
        label: 'Bonif. de Daño Destrucción',
        value: 'havoc_dmg_bonus',
        levels: [6, 10.8, 15.6, 20.4, 25.2, 30],
      },
      {
        label: 'Bonif. de Curación',
        value: 'healing_bonus',
        levels: [6, 10.8, 15.6, 20.4, 25.2, 30],
      },
    ],
  },
  cost_1: {
    substats: {
      stat: 'hp',
      values: [456, 820, 1185, 1550, 1915, 2280],
    },
    values: [
      {
        label: 'Vida%',
        value: 'hp_pct',
        levels: [4.6, 8.2, 11.9, 15.5, 19.2, 22.8],
      },
      {
        label: 'Ataque%',
        value: 'atk_pct',
        levels: [3.6, 6.5, 9.4, 12.2, 15.1, 18],
      },
      {
        label: 'Defensa%',
        value: 'def_pct',
        levels: [3.6, 6.5, 9.4, 12.2, 15.1, 18],
      },
    ],
  },
}

export const ECHOES_SUBSTATS = [
  {
    label: 'Prob. Crit.',
    value: 'crit_rate',
    levels: [
      { label: '6.3%', value: 6.3 },
      { label: '6.9%', value: 6.9 },
      { label: '7.5%', value: 7.5 },
      { label: '8.1%', value: 8.1 },
      { label: '8.7%', value: 8.7 },
      { label: '9.3%', value: 9.3 },
      { label: '9.9%', value: 9.9 },
      { label: '10.5%', value: 10.5 },
    ],
  },
  {
    label: 'Daño Crit.',
    value: 'crit_dmg',
    levels: [
      { label: '12.6%', value: 12.6 },
      { label: '13.8%', value: 13.8 },
      { label: '15%', value: 15 },
      { label: '16.2%', value: 16.2 },
      { label: '17.4%', value: 17.4 },
      { label: '18.6%', value: 18.6 },
      { label: '19.8%', value: 19.8 },
      { label: '21%', value: 21 },
    ],
  },
  {
    label: 'Vida%',
    value: 'hp_pct',
    levels: [
      { label: '6.4%', value: 6.4 },
      { label: '7.1%', value: 7.1 },
      { label: '7.9%', value: 7.9 },
      { label: '8.6%', value: 8.6 },
      { label: '9.4%', value: 9.4 },
      { label: '10.1%', value: 10.1 },
      { label: '10.9%', value: 10.9 },
      { label: '11.6%', value: 11.6 },
    ],
  },
  {
    label: 'Ataque%',
    value: 'atk_pct',
    levels: [
      { label: '6.4%', value: 6.4 },
      { label: '7.1%', value: 7.1 },
      { label: '7.9%', value: 7.9 },
      { label: '8.6%', value: 8.6 },
      { label: '9.4%', value: 9.4 },
      { label: '10.1%', value: 10.1 },
      { label: '10.9%', value: 10.9 },
      { label: '11.6%', value: 11.6 },
    ],
  },
  {
    label: 'Defensa%',
    value: 'def_pct',
    levels: [
      { label: '8.1%', value: 8.1 },
      { label: '9%', value: 9 },
      { label: '10%', value: 10 },
      { label: '10.9%', value: 10.9 },
      { label: '11.8%', value: 11.8 },
      { label: '12.8%', value: 12.8 },
      { label: '13.8%', value: 13.8 },
      { label: '14.7%', value: 14.7 },
    ],
  },
  {
    label: 'Recarga de Energía',
    value: 'energy_regen',
    levels: [
      { label: '6.8%', value: 6.8 },
      { label: '7.6%', value: 7.6 },
      { label: '8.4%', value: 8.4 },
      { label: '9.2%', value: 9.2 },
      { label: '10%', value: 10 },
      { label: '10.8%', value: 10.8 },
      { label: '11.6%', value: 11.6 },
      { label: '12.4%', value: 12.4 },
    ],
  },
  {
    label: 'Bonif. de Ataque Básico',
    value: 'basic_atk_dmg_bonus',
    levels: [
      { label: '6.4%', value: 6.4 },
      { label: '7.1%', value: 7.1 },
      { label: '7.9%', value: 7.9 },
      { label: '8.6%', value: 8.6 },
      { label: '9.4%', value: 9.4 },
      { label: '10.1%', value: 10.1 },
      { label: '10.9%', value: 10.9 },
      { label: '11.6%', value: 11.6 },
    ],
  },
  {
    label: 'Bonif. de Ataque Cargado',
    value: 'heavy_atk_dmg_bonus',
    levels: [
      { label: '6.4%', value: 6.4 },
      { label: '7.1%', value: 7.1 },
      { label: '7.9%', value: 7.9 },
      { label: '8.6%', value: 8.6 },
      { label: '9.4%', value: 9.4 },
      { label: '10.1%', value: 10.1 },
      { label: '10.9%', value: 10.9 },
      { label: '11.6%', value: 11.6 },
    ],
  },
  {
    label: 'Bonif. de Habilidad de Resonancia',
    value: 'skill_dmg_bonus',
    levels: [
      { label: '6.4%', value: 6.4 },
      { label: '7.1%', value: 7.1 },
      { label: '7.9%', value: 7.9 },
      { label: '8.6%', value: 8.6 },
      { label: '9.4%', value: 9.4 },
      { label: '10.1%', value: 10.1 },
      { label: '10.9%', value: 10.9 },
      { label: '11.6%', value: 11.6 },
    ],
  },
  {
    label: 'Bonif. de Liberación de Resonancia',
    value: 'liberation_dmg_bonus',
    levels: [
      { label: '6.4%', value: 6.4 },
      { label: '7.1%', value: 7.1 },
      { label: '7.9%', value: 7.9 },
      { label: '8.6%', value: 8.6 },
      { label: '9.4%', value: 9.4 },
      { label: '10.1%', value: 10.1 },
      { label: '10.9%', value: 10.9 },
      { label: '11.6%', value: 11.6 },
    ],
  },
  {
    label: 'Vida',
    value: 'hp',
    levels: [
      { label: '320', value: 320 },
      { label: '360', value: 360 },
      { label: '390', value: 390 },
      { label: '430', value: 430 },
      { label: '470', value: 470 },
      { label: '510', value: 510 },
      { label: '540', value: 540 },
      { label: '580', value: 580 },
    ],
  },
  {
    label: 'Ataque',
    value: 'atk',
    levels: [
      { label: '30', value: 30 },
      { label: '40', value: 40 },
      { label: '50', value: 50 },
      { label: '60', value: 60 },
    ],
  },
  {
    label: 'Defensa',
    value: 'def',
    levels: [
      { label: '40', value: 40 },
      { label: '50', value: 50 },
      { label: '60', value: 60 },
      { label: '70', value: 70 },
    ],
  },
]
