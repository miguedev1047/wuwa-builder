import { resonatorsRouter } from '#/integrations/orpc/routers/resonators'
import { weaponsRouter } from '#/integrations/orpc/routers/weapons'

export const appRouter = {
  resonators: resonatorsRouter,
  weapons: weaponsRouter,
}
