import { createTanstackQueryUtils } from '@orpc/tanstack-query'
import { client } from '#/integrations/orpc/lib'

export const orpc = createTanstackQueryUtils(client)
