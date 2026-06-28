import { IMAGE_MIME_TYPES, MAX_FILE_SIZE } from '#/constants/images'
import z from 'zod'

export const imageUploadZodSchema = z.object({
  file: z
    .file()
    .max(MAX_FILE_SIZE, {
      error: 'La imagen no puede superar 5MB',
    })
    .mime(IMAGE_MIME_TYPES, {
      error: 'Solo se permiten imágenes PNG, JPEG o WEBP',
    }),
  folderName: z
    .string({
      error: 'El nombre de la carpeta es requerido',
    })
    .min(1, {
      error: 'El nombre de la carpeta no puede estar vacío',
    }),
  imageName: z
    .string({
      error: 'El nombre de la imagen es requerido',
    })
    .min(1, {
      error: 'El nombre de la imagen no puede estar vacío',
    }),
  order: z
    .number({
      error: 'El orden es requerido',
    })
    .min(0, {
      error: 'El orden no puede ser negativo',
    }),
})
