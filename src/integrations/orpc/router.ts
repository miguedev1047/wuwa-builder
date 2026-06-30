import { resonatorsRouter } from '#/integrations/orpc/routers/resonators'
import { weaponsRouter } from '#/integrations/orpc/routers/weapons'
import { echoesRouter } from '#/integrations/orpc/routers/echoes'

export const appRouter = {
  resonators: resonatorsRouter,
  weapons: weaponsRouter,
  echoes: echoesRouter,
}
