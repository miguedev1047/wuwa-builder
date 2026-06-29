import { imageRemoveZodSchema } from '#/zod-schemas/images/remove'
import { imageUploadZodSchema } from '#/zod-schemas/images/upload'
import { entityIdZod } from '#/zod-schemas/general/entity-id'

export const resonatorImageUploadZodSchema =
  imageUploadZodSchema.extend(entityIdZod)

export const resonatorImageRemoveZodSchema =
  imageRemoveZodSchema.extend(entityIdZod)
