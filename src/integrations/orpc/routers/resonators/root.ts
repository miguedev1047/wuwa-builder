import { resonatorRouter } from '#/integrations/orpc/routers/resonators/resonator'
import { imagesRouter } from '#/integrations/orpc/routers/resonators/images'
import { bestWeaponsRouter } from '#/integrations/orpc/routers/resonators/best-weapons'
import { levelsRouter } from '#/integrations/orpc/routers/resonators/levels'

export const resonatorsRouter = {
  resonator: resonatorRouter,
  best_weapons: bestWeaponsRouter,
  levels: levelsRouter,
  images: imagesRouter,
}
