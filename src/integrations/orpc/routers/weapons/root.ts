import { weaponRouter } from '#/integrations/orpc/routers/weapons/weapon'
import { imagesRouter } from '#/integrations/orpc/routers/weapons/images'
import { refinamentsRouter } from '#/integrations/orpc/routers/weapons/refinaments'
import { levelsRouter } from '#/integrations/orpc/routers/weapons/levels'

export const weaponsRouter = {
  images: imagesRouter,
  weapon: weaponRouter,
  levels: levelsRouter,
  refinaments: refinamentsRouter,
}
