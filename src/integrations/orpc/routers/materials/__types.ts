import type { InferRouterOutputs } from '@orpc/server'
import type { materialRouter } from './material'

export type MaterialOutputs = InferRouterOutputs<typeof materialRouter>

export type TMaterialTable = MaterialOutputs['getById']
export type TMaterialsTable = MaterialOutputs['getAll']

export type TMaterialAssetsTable = TMaterialTable['assets']
export type TMaterialAssetTable = TMaterialTable['assets'][number]
