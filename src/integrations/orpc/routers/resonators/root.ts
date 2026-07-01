import { resonatorRouter } from '#/integrations/orpc/routers/resonators/resonator'
import { imagesRouter } from '#/integrations/orpc/routers/resonators/images'
import { bestWeaponsRouter } from '#/integrations/orpc/routers/resonators/best-weapons'
import { levelsRouter } from '#/integrations/orpc/routers/resonators/levels'
import { skillsRouter } from '#/integrations/orpc/routers/resonators/skills'

export const resonatorsRouter = {
  resonator: resonatorRouter,
  best_weapons: bestWeaponsRouter,
  skills: skillsRouter,
  levels: levelsRouter,
  images: imagesRouter,
}
