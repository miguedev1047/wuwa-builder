import type { InferRouterOutputs } from '@orpc/server'
import type { echoRouter } from './echo'

export type EchoOutputs = InferRouterOutputs<typeof echoRouter>

export type TEchoTable = EchoOutputs['getById']
export type TEchoesTable = EchoOutputs['getAll']

export type TEchoAssetsTable = TEchoTable['assets']
export type TEchoAssetTable = TEchoTable['assets'][number]

export type TEchoSonatasTable = TEchoTable['sonatas']
export type TEchoSonataTable = TEchoTable['sonatas'][number]
