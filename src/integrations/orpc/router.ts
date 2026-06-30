import { resonatorsRouter } from '#/integrations/orpc/routers/resonators'
import { weaponsRouter } from '#/integrations/orpc/routers/weapons'
import { echoesRouter } from '#/integrations/orpc/routers/echoes'
import { materialsRouter } from '#/integrations/orpc/routers/materials'

export const appRouter = {
  resonators: resonatorsRouter,
  weapons: weaponsRouter,
  echoes: echoesRouter,
  materials: materialsRouter,
}
