import { AssetImage } from '#/components/asset-image'
import type {
  TWeaponsTable,
  TWeaponTable,
} from '#/integrations/orpc/routers/weapons'
import { orpc } from '#/integrations/tanstack-query/orpc-query'
import { withForm } from '#/shared/contexts/form.context'
import type { TResonatorBestWeaponZod } from '#/zod-schemas/resonators'
import {
  Combobox,
  ComboboxChip,
  ComboboxChips,
  ComboboxChipsInput,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxItem,
  ComboboxList,
  ComboboxValue,
  useComboboxAnchor,
} from '@/components/ui/combobox'
import { Field, FieldError, FieldGroup } from '@/components/ui/field'
import { Item, ItemContent, ItemMedia, ItemTitle } from '@/components/ui/item'
import { useSuspenseQuery } from '@tanstack/react-query'
import { useParams } from '@tanstack/react-router'
import { Fragment } from 'react'

export const FieldsForm = withForm({
  defaultValues: {} as TResonatorBestWeaponZod,
  props: {} as { isPending: boolean },
  render: function Render({ form, isPending }) {
    const { id } = useParams({
      from: '/_protected/panel/(admin)/resonators/$id',
    })

    const anchor = useComboboxAnchor()

    const { data: resonator } = useSuspenseQuery(
      orpc.resonators.resonator.getById.queryOptions({ input: { id } }),
    )
    const { data: weapons } = useSuspenseQuery(
      orpc.weapons.weapon.getAll.queryOptions(),
    )

    const filteredWeapons = weapons.filter(
      (item) => item.type === resonator.weapon_type,
    )

    return (
      <FieldGroup>
        <form.Field
          name="weapons"
          children={(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid

            const selectedWeapons = weapons.filter((w) =>
              field.state.value.includes(w.id),
            )
            return (
              <Field data-invalid={isInvalid}>
                <Combobox
                  multiple
                  autoHighlight
                  itemToStringLabel={(weapon: TWeaponTable) => weapon.name}
                  itemToStringValue={(weapon: TWeaponTable) => weapon.id}
                  items={filteredWeapons}
                  value={selectedWeapons}
                  disabled={isPending}
                  onValueChange={(value) => {
                    field.handleChange(value.map((item) => item.id))
                  }}
                >
                  <ComboboxChips
                    data-invalid={isInvalid}
                    ref={anchor}
                    className="w-full"
                  >
                    <ComboboxValue data-invalid={isInvalid}>
                      {(values: TWeaponsTable) => (
                        <Fragment>
                          {values.map((value) => (
                            <ComboboxChip key={value.id}>
                              {value.name}
                            </ComboboxChip>
                          ))}
                          <ComboboxChipsInput
                            data-invalid={isInvalid}
                            placeholder="Selecciona una arma..."
                          />
                        </Fragment>
                      )}
                    </ComboboxValue>
                  </ComboboxChips>
                  <ComboboxContent anchor={anchor}>
                    <ComboboxEmpty>No hay armas disponibles.</ComboboxEmpty>
                    <ComboboxList>
                      {(weapon: TWeaponTable) => (
                        <ComboboxItem
                          key={weapon.id}
                          value={weapon}
                          className="p-0"
                        >
                          <Item variant="default">
                            <ItemMedia variant="image">
                              <AssetImage
                                assetItems={weapon.assets}
                                selectAssetNumber={0}
                                className="size-full"
                                disablePointerEvents
                              />
                            </ItemMedia>
                            <ItemContent>
                              <ItemTitle>{weapon.name}</ItemTitle>
                            </ItemContent>
                          </Item>
                        </ComboboxItem>
                      )}
                    </ComboboxList>
                  </ComboboxContent>
                </Combobox>

                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            )
          }}
        />
      </FieldGroup>
    )
  },
})
