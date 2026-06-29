import { LOCAL_URL, PRODUCTION_URL } from '#/constants/general'

export const MAX_FILE_SIZE = 5 * 1024 * 1024
export const IMAGE_MIME_TYPES = ['image/png', 'image/jpeg', 'image/webp']

export const HOST = import.meta.env.DEV ? LOCAL_URL : PRODUCTION_URL
export const CDN_IMAGE_URL = `${HOST}/api/images/search?image_key=`
