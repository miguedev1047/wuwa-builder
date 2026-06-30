import { db } from '#/db'
import { resonatorBestWeaponsTable } from '#/db/schemas/resonators'
import { resonatorBestWeaponZod } from '#/zod-schemas/resonators'
import { eq } from 'drizzle-orm'
import { protectedProcedure } from '#/integrations/orpc'
import { entityIdZod } from '#/zod-schemas/general/entity-id'

export const bestWeaponsRouter = {
  add: protectedProcedure
    .input(resonatorBestWeaponZod)
    .handler(async ({ input }) => {
      const { weapons, ...weaponData } = input

      const isMultiple = weapons.length > 1

      const mappedWeapons = weapons.map((item, index) => ({
        order: index + 1,
        resonator_id: weaponData.resonator_id,
        weapon_id: item,
      }))

      try {
        const getWeapons = await db.query.resonatorBestWeaponsTable.findMany({
          where: (table, { eq: equals }) =>
            equals(table.resonator_id, weaponData.resonator_id),
        })

        if (getWeapons.length > 0) {
          await db
            .delete(resonatorBestWeaponsTable)
            .where(
              eq(
                resonatorBestWeaponsTable.resonator_id,
                weaponData.resonator_id,
              ),
            )
        }

        await db.insert(resonatorBestWeaponsTable).values(mappedWeapons)

        return {
          code: 'SUCCESS',
          message: isMultiple ? 'Armas agregadas' : 'Arma agregada',
        }
      } catch {
        return {
          code: 'ERROR',
          message: isMultiple
            ? 'Error al agregar las armas'
            : 'Error al agregar el arma',
        }
      }
    }),

  delete: protectedProcedure.input(entityIdZod).handler(async ({ input }) => {
    try {
      const { id } = input

      await db
        .delete(resonatorBestWeaponsTable)
        .where(eq(resonatorBestWeaponsTable.id, id))

      return {
        code: 'SUCCESS',
        message: 'Arma eliminada',
      }
    } catch {
      return {
        code: 'ERROR',
        message: 'Error al eliminar el arma',
      }
    }
  }),
}
