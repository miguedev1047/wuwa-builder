import { relations } from 'drizzle-orm'
import { echoTable, echoAssetsTable, echoSonatasTable } from '#/db/schemas/echoes/items'

export const echoRelations = relations(echoTable, ({ many }) => ({
  sonatas: many(echoSonatasTable),
  assets: many(echoAssetsTable),
}))

export const echoSonatasRelations = relations(echoSonatasTable, ({ one }) => ({
  echo: one(echoTable, {
    fields: [echoSonatasTable.echo_id],
    references: [echoTable.id],
  }),
}))

export const echoAssetsRelations = relations(echoAssetsTable, ({ one }) => ({
  echo: one(echoTable, {
    fields: [echoAssetsTable.echo_id],
    references: [echoTable.id],
  }),
}))
