import { CDN_IMAGE_URL } from '@/constants/images'

export const getImageUrl = (src: string | undefined) => {
  const url = `${CDN_IMAGE_URL}${src}`
  return url
}
