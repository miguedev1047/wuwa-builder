export const EchoClassEnum = ['calamity', 'tsunami', 'elite', 'common'] as const
export const ECHO_CLASS = [
  {
    label: 'Calamidad',
    value: 'calamity',
  },
  {
    label: 'Tsunami',
    value: 'tsunami',
  },
  {
    label: 'Elite',
    value: 'elite',
  },
  {
    label: 'Comun',
    value: 'common',
  },
]

export const EchoCostEnum = ['cost_1', 'cost_3', 'cost_4'] as const
export const ECHO_COST = [
  {
    label: 'Costo 1',
    value: 'cost_1',
  },
  {
    label: 'Costo 3',
    value: 'cost_3',
  },
  {
    label: 'Costo 4',
    value: 'cost_4',
  },
]

export const ECHOES_LEVELS = [
  {
    label: 'Nivel 1',
    value: 1,
    order: 0,
  },
  {
    label: 'Nivel 5',
    value: 5,
    order: 1,
  },
  {
    label: 'Nivel 10',
    value: 10,
    order: 2,
  },
  {
    label: 'Nivel 15',
    value: 15,
    order: 3,
  },
  {
    label: 'Nivel 20',
    value: 20,
    order: 4,
  },
  {
    label: 'Nivel 25',
    value: 25,
    order: 5,
  },
]
export const DEFAULT_ECHOES_LEVELS = {
  label: 'N/A',
  value: 0,
  order: 0,
}

export const EchoesSonatasEnum = [
  'freezing_frost',
  'molten_rift',
  'void_thunder',
  'sierra_gale',
  'celestial_light',
  'havoc_eclipse',
  'rejuvenating_glow',
  'moonlit_clouds',
  'lingering_tunes',
  'frosty_resolve',
  'eternal_radiance',
  'midnight_veil',
  'empyrean_anthem',
  'tidebreaking_courage',
  'gusts_of_welkin',
  'windward_pilgrimage',
  'flaming_clawprint',
  'dream_of_the_lost',
  'crown_of_valor',
  'law_of_harmony',
  'flamewings_shadow',
  'thread_of_severed_fate',
  'halo_of_starry_radiance',
  'pact_of_neonlight_leap',
  'rite_of_gilded_revelation',
  'trailblazing_star',
  'chromatic_foam',
  'sound_of_true_name',
] as const
export const ECHOES_SONATAS = [
  {
    label: 'Escarcha Helada',
    value: 'freezing_frost',
    description: [
      '2 Piezas: Daño Glacio +10%.',
      '5 Piezas: Al usar Ataque Básico o Ataque Cargado, el Daño Glacio +10%, acumulándose hasta 3 veces durante 15s.',
    ],
    additional_stats: [
      {
        stat: 'glacio_dmg_bonus',
        value: 10,
      },
    ],
  },
  {
    label: 'Grieta Ardiente',
    value: 'molten_rift',
    description: [
      '2 Piezas: Daño Fusión +10%.',
      '5 Piezas: Al usar Habilidad de Resonancia, el Daño Fusión +30% durante 15s.',
    ],
    additional_stats: [
      {
        stat: 'fusion_dmg_bonus',
        value: 10,
      },
    ],
  },
  {
    label: 'Trueno Vacío',
    value: 'void_thunder',
    description: [
      '2 Piezas: Daño Electro +10%.',
      '5 Piezas: Al usar Ataque Cargado o Habilidad de Resonancia, el Daño Electro +15%, acumulándose hasta 2 veces, cada acumulación dura 15s.',
    ],
    additional_stats: [
      {
        stat: 'electro_dmg_bonus',
        value: 10,
      },
    ],
  },
  {
    label: 'Vendaval Serrano',
    value: 'sierra_gale',
    description: [
      '2 Piezas: Daño Aero +10%.',
      '5 Piezas: Al usar Habilidad de Intro, el Daño Aero +30% durante 15s.',
    ],
    additional_stats: [
      {
        stat: 'aero_dmg_bonus',
        value: 10,
      },
    ],
  },
  {
    label: 'Luz Celestial',
    value: 'celestial_light',
    description: [
      '2 Piezas: Daño Espectro +10%.',
      '5 Piezas: Al usar Habilidad de Intro, el Daño Espectro +30% durante 15s.',
    ],
    additional_stats: [
      {
        stat: 'spectro_dmg_bonus',
        value: 10,
      },
    ],
  },
  {
    label: 'Eclipse Havoc',
    value: 'havoc_eclipse',
    description: [
      '2 Piezas: Daño Destruccion +10%.',
      '5 Piezas: Al usar Ataque Básico o Ataque Cargado, el Daño Destruccion +7.5%, acumulándose hasta 4 veces durante 15s.',
    ],
    additional_stats: [
      {
        stat: 'havoc_dmg_bonus',
        value: 10,
      },
    ],
  },
  {
    label: 'Resplandor Rejuvenecedor',
    value: 'rejuvenating_glow',
    description: [
      '2 Piezas: Bono de Curación +10%.',
      '5 Piezas: Al curar a aliados, el ATK de todo el equipo +15% durante 30s.',
    ],
    additional_stats: [
      {
        stat: 'healing_bonus',
        value: 10,
      },
    ],
  },
  {
    label: 'Nubes Lunares',
    value: 'moonlit_clouds',
    description: [
      '2 Piezas: Recarga de Energía +10%.',
      '5 Piezas: Al usar Habilidad de Outro, el ATK del siguiente Resonador +22.5% durante 15s.',
    ],
    additional_stats: [
      {
        stat: 'energy_regen',
        value: 10,
      },
    ],
  },
  {
    label: 'Melodías Persistentes',
    value: 'lingering_tunes',
    description: [
      '2 Piezas: ATK +10%.',
      '5 Piezas: Mientras está en campo, el ATK +5% cada 1.5s, acumulándose hasta 4 veces. El Daño de Habilidad de Outro +60%.',
    ],
    additional_stats: [
      {
        stat: 'atk_pct',
        value: 10,
      },
    ],
  },
  {
    label: 'Resolución Gélida',
    value: 'frosty_resolve',
    description: [
      '2 Piezas: Daño de Habilidad de Resonancia +12%.',
      '5 Piezas: Al lanzar Habilidad de Resonancia, el Bono de Daño Glacio +22.5% durante 15s. Al lanzar Liberación de Resonancia, el Daño de Habilidad de Resonancia +18% durante 5s. Este efecto se acumula hasta 2 veces.',
    ],
    additional_stats: [
      {
        stat: 'skill_dmg_bonus',
        value: 10,
      },
    ],
  },
  {
    label: 'Resplandor Eterno',
    value: 'eternal_radiance',
    description: [
      '2 Piezas: Daño Espectro +10%.',
      '5 Piezas: Infligir Desgaste Espectro a los enemigos aumenta la Prob. Crit. +20% durante 15s. Atacar enemigos con 10 acumulaciones de Desgaste Espectro otorga +15% de Bono de Daño Espectro durante 15s.',
    ],
    additional_stats: [
      {
        stat: 'skill_dmg_bonus',
        value: 10,
      },
    ],
  },
  {
    label: 'Velo de Medianoche',
    value: 'midnight_veil',
    description: [
      '2 Piezas: Daño Destruccion +10%.',
      '5 Piezas: Al activar Habilidad de Outro, inflige 480% de Daño Destruccion adicional a los enemigos cercanos (considerado Daño de Outro) y otorga al Resonador entrante +15% de Bono de Daño Destruccion durante 15s.',
    ],
    additional_stats: [
      {
        stat: 'havoc_dmg_bonus',
        value: 10,
      },
    ],
  },
  {
    label: 'Himno Empíreo',
    value: 'empyrean_anthem',
    description: [
      '2 Piezas: Recarga de Energía +10%.',
      '5 Piezas: El Daño de Ataque Coordinado del Resonador +80%. Al obtener un golpe crítico con Ataque Coordinado, el ATK del Resonador activo +20% durante 4s.',
    ],
    additional_stats: [
      {
        stat: 'energy_regen',
        value: 10,
      },
    ],
  },
  {
    label: 'Coraje Rompemareas',
    value: 'tidebreaking_courage',
    description: [
      '2 Piezas: Recarga de Energía +10%.',
      '5 Piezas: El ATK del Resonador +15%. Al alcanzar 250% de Recarga de Energía, el Daño de todos los Atributos del Resonador +30%.',
    ],
    additional_stats: [
      {
        stat: 'energy_regen',
        value: 10,
      },
    ],
  },
  {
    label: 'Ráfagas del Firmamento',
    value: 'gusts_of_welkin',
    description: [
      '2 Piezas: Daño Aero +10%.',
      '5 Piezas: Infligir Erosión Aero a los enemigos aumenta el Daño Aero de todo el equipo +15%, y adicionalmente +15% para el Resonador que activa el efecto, durante 20s.',
    ],
    additional_stats: [
      {
        stat: 'aero_dmg_bonus',
        value: 10,
      },
    ],
  },
  {
    label: 'Peregrinaje del Viento',
    value: 'windward_pilgrimage',
    description: [
      '2 Piezas: Daño Aero +10%.',
      '5 Piezas: Golpear un objetivo con Erosión Aero aumenta la Prob. Crit. +10% y otorga +30% de Bono de Daño Aero durante 10s.',
    ],
    additional_stats: [
      {
        stat: 'aero_dmg_bonus',
        value: 10,
      },
    ],
  },
  {
    label: 'Huella Llameante',
    value: 'flaming_clawprint',
    description: [
      '2 Piezas: Daño Fusión +10%.',
      '5 Piezas: Al lanzar Liberación de Resonancia, todo el equipo obtiene +15% de Bono de Daño Fusión y el lanzador +20% de Bono de Daño de Liberación de Resonancia durante 35s.',
    ],
    additional_stats: [
      {
        stat: 'fusion_dmg_bonus',
        value: 10,
      },
    ],
  },
  {
    label: 'Sueño del Perdido',
    value: 'dream_of_the_lost',
    description: [
      '3 Piezas: Sin Energía de Resonancia, la Prob. Crit. +20% y se otorga +35% de Bono de Daño de Habilidad de Eco.',
    ],
    additional_stats: [
      {
        stat: 'crit_rate',
        value: 20,
      },
    ],
  },
  {
    label: 'Corona de Valor',
    value: 'crown_of_valor',
    description: [
      '3 Piezas: Al obtener un Escudo, el ATK del Resonador +6% y el Daño Crit. +4% durante 4s. Este efecto puede activarse una vez cada 0.5s y se acumula hasta 5 veces.',
    ],
    additional_stats: [
      {
        stat: 'none',
        value: 0,
      },
    ],
  },
  {
    label: 'Ley de Armonía',
    value: 'law_of_harmony',
    description: [
      '3 Piezas: Al lanzar Habilidad de Eco, el Bono de Daño de Ataque Cargado +30% durante 4s. Adicionalmente, todos los Resonadores del equipo obtienen +4% de Bono de Daño de Habilidad de Eco durante 30s, acumulándose hasta 4 veces. El mismo Eco solo puede activar este efecto una vez. Al llegar a 4 acumulaciones, lanzar Habilidad de Eco de nuevo reinicia la duración del efecto.',
    ],
    additional_stats: [
      {
        stat: 'none',
        value: 0,
      },
    ],
  },
  {
    label: 'Sombra del Ala Llameante',
    value: 'flamewings_shadow',
    description: [
      '3 Piezas: Infligir Daño de Habilidad de Eco aumenta la Prob. Crit. de Ataque Cargado +20% durante 6s. Infligir Daño de Ataque Cargado aumenta la Prob. Crit. de Habilidad de Eco +20% durante 6s. Mientras ambos efectos estén activos, se otorga +16% de Bono de Daño Fusión.',
    ],
    additional_stats: [
      {
        stat: 'none',
        value: 0,
      },
    ],
  },
  {
    label: 'Hilo del Destino Cortado',
    value: 'thread_of_severed_fate',
    description: [
      '3 Piezas: Infligir Maldición Destruccion aumenta el ATK del Resonador +20% y otorga +30% de Bono de Daño de Liberación de Resonancia durante 5s.',
    ],
    additional_stats: [
      {
        stat: 'none',
        value: 0,
      },
    ],
  },
  {
    label: 'Halo de Resplandor Estelar',
    value: 'halo_of_starry_radiance',
    description: [
      '2 Piezas: Bono de Curación +10%.',
      '5 Piezas: Al curar a un Resonador del equipo, cada 1% de Tasa de Acumulación Desafinada otorga +0.2% de ATK a todo el equipo durante 4s, hasta un máximo de 25%. Los efectos del mismo nombre no se acumulan.',
    ],
    additional_stats: [
      {
        stat: 'healing_bonus',
        value: 10,
      },
    ],
  },
  {
    label: 'Pacto del Salto de Neón',
    value: 'pact_of_neonlight_leap',
    description: [
      '2 Piezas: Daño Espectro +10%.',
      '5 Piezas: Al lanzar Habilidad de Outro, el ATK del Resonador entrante +15%, con cada punto de Potenciador de Ruptura de Sintonía aumentando adicionalmente el ATK +0.3%, hasta un máximo de +15%. Este efecto dura 15s o hasta que el Resonador sea cambiado.',
    ],
    additional_stats: [
      {
        stat: 'spectro_dmg_bonus',
        value: 10,
      },
    ],
  },
  {
    label: 'Rito de la Revelación Dorada',
    value: 'rite_of_gilded_revelation',
    description: [
      '2 Piezas: Daño Espectro +10%.',
      '5 Piezas: Infligir Daño de Ataque Básico aumenta el Daño Espectro +10% durante 5s, acumulándose hasta 3 veces. Con 3 acumulaciones, lanzar Liberación de Resonancia otorga +40% de Bono de Daño de Ataque Básico.',
    ],
    additional_stats: [
      {
        stat: 'spectro_dmg_bonus',
        value: 10,
      },
    ],
  },
  {
    label: 'Estrella Pionera',
    value: 'trailblazing_star',
    description: [
      '2 Piezas: Daño Fusión +10%.',
      '5 Piezas: Infligir Explosión Fusión o Ruptura de Sintonía - Desplazamiento aumenta la Prob. Crit. del Resonador +20% y otorga +20% de Bono de Daño Fusión durante 8s.',
    ],
    additional_stats: [
      {
        stat: 'fusion_dmg_bonus',
        value: 10,
      },
    ],
  },
  {
    label: 'Espuma Cromática',
    value: 'chromatic_foam',
    description: [
      '2 Piezas: Daño Fusión +10%.',
      '5 Piezas: Al infligir Explosión Fusión a los enemigos, el Resonador gana los siguientes efectos: Bono de Daño Fusión +10% durante 15s. Mientras este efecto esté activo, lanzar Habilidad de Outro otorga al Resonador entrante +25% de Bono de Daño Fusión durante 15s.',
    ],
    additional_stats: [
      {
        stat: 'fusion_dmg_bonus',
        value: 10,
      },
    ],
  },
  {
    label: 'Sonido del Nombre Verdadero',
    value: 'sound_of_true_name',
    description: [
      '2 Piezas: Daño Aero +10%.',
      '5 Piezas: Infligir Daño de Habilidad de Eco a los enemigos aumenta la Prob. Crit. de Habilidad de Eco del Resonador +20% y otorga +15% de Bono de Daño Aero durante 5s.',
    ],
    additional_stats: [
      {
        stat: 'aero_dmg_bonus',
        value: 10,
      },
    ],
  },
  {
    label: 'Deseos de una nevada tranquila',
    value: 'wishes_of_quiet_snowfall',
    description: [
      '2 Piezas: Daño Gelio +10%',
      `5 Piezas: Al aplicar Rozadura gélida a los enemigos, el portador aumenta su Daño Gelio un 10% durante 15 s y obtiene el efecto Nevada durante 15 s. Este efecto puede activarse una vez cada 25 s. Mientras Nevada esté activo:
            · Al infligir daño de Liberación de resonancia, se elimina Nevada y la Prob. CRIT del portador aumenta un 25% durante 6 s. Durante este efecto, volver a infligir daño de Liberación de resonancia prolonga su duración en 4 s. Este efecto puede activarse una vez cada 0.5 s, hasta un máximo de 6 veces por cada eliminación de Nevada.
            · Al lanzar la Habilidad Outro, se elimina Nevada y aumenta el Daño Gelio del personaje entrante un 25% durante 15 s.
            Cada vez que se elimina Nevada, solo se activa uno de los efectos anteriores.`,
    ],
    additional_stats: [
      {
        stat: 'glacio_dmg_bonus',
        value: 10,
      },
    ],
  },
  {
    label: 'Carrete de recuerdos empalmados',
    value: 'reel_of_spliced_memories',
    description: [
      '2 Piezas: ATQ +10%',
      '5 Piezas: Al aplicar Impacto de Tonalidad: Transición o Tensión de Tonalidad: Transición a los enemigos, el Impulso de Ruptura de Tonalidad de los personajes del equipo aumenta en 20 durante 30 s. Los efectos del mismo nombre no se acumulan.',
    ],
    additional_stats: [
      {
        stat: 'atk_pct',
        value: 10,
      },
    ],
  },
] as const
export const DEFAULT_SONATA_ECHOES = {
  label: 'Indefinido',
  value: 'none',
  description: ['Este set no tiene efectos definidos.'],
}

export type EchoSetTypes = (typeof ECHOES_SONATAS)[number]
