import { RESONATOR_SKILLS } from '#/constants/resonators'
import type { TResonatorSkillsTable } from '#/integrations/orpc/routers/resonators'

export const orderList = (skills: TResonatorSkillsTable) => {
  return [...skills].sort((a, b) => {
    const orderA =
      RESONATOR_SKILLS.find((s) => s.value === a.skill_type)?.order ?? 0
    const orderB =
      RESONATOR_SKILLS.find((s) => s.value === b.skill_type)?.order ?? 0
    return orderA - orderB
  })
}
