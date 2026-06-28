import * as schema from './schemas/__root'

import { createServerOnlyFn } from '@tanstack/react-start'
import { drizzle } from 'drizzle-orm/d1'
import { env } from 'cloudflare:workers'

export const createDb = createServerOnlyFn((d1: D1Database) => {
  return drizzle(d1, { schema })
})

export const db = createDb(env.wuwa_builds_db)

export type Database = ReturnType<typeof createDb>
