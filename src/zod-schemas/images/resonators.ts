import { imageRemoveZodSchema } from '#/zod-schemas/images/remove'
import { imageUploadZodSchema } from '#/zod-schemas/images/upload'
import { entityIdZodSchema } from '#/zod-schemas/general/entity-id'

export const resonatorImageUploadZodSchema =
  imageUploadZodSchema.extend(entityIdZodSchema)

export const resonatorImageRemoveZodSchema =
  imageRemoveZodSchema.extend(entityIdZodSchema)
