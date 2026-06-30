import { resonatorRouter } from '#/integrations/orpc/routers/resonators/resonator'
import { imagesRouter } from '#/integrations/orpc/routers/resonators/images'
import { bestWeaponsRouter } from '#/integrations/orpc/routers/resonators/best-weapons'

export const resonatorsRouter = {
  resonator: resonatorRouter,
  best_weapons: bestWeaponsRouter,
  images: imagesRouter,
}
