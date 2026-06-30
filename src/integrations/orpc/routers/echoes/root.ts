import { echoRouter } from '#/integrations/orpc/routers/echoes/echo'
import { imagesRouter } from '#/integrations/orpc/routers/echoes/images'

export const echoesRouter = {
  echo: echoRouter,
  images: imagesRouter,
}
