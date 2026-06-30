import { materialRouter } from '#/integrations/orpc/routers/materials/material'
import { imagesRouter } from '#/integrations/orpc/routers/materials/images'

export const materialsRouter = {
  material: materialRouter,
  images: imagesRouter,
}
