import { TiptapEditor } from '#/components/editor'
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
} from '#/components/ui/combobox'
import {
  FieldGroup,
  Field,
  FieldLabel,
  FieldError,
} from '#/components/ui/field'
import { Input } from '#/components/ui/input'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '#/components/ui/select'
import {
  ECHO_CLASS,
  ECHO_COST,
  ECHOES_SONATAS,
  type EchoSetTypes,
} from '#/constants/echoes'
import { withForm } from '#/shared/contexts/form.context'
import { type TEchoZod } from '#/zod-schemas/echoes'

export const FieldsForm = withForm({
  defaultValues: {} as TEchoZod,
  props: {} as { isPending: boolean },
  render: function Render({ form, isPending }) {
    const anchor = useComboboxAnchor()
    return (
      <FieldGroup className="@max-md:gap-2">
        <form.Field
          name="name"
          children={(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid
            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name}>Nombre</FieldLabel>
                <Input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  disabled={isPending}
                  aria-invalid={isInvalid}
                  placeholder="Reminiscencia: Fleurdelys"
                  autoComplete="off"
                />
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            )
          }}
        />

        <form.Field
          name="echo_sonatas"
          children={(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid

            const selectedSonatas = ECHOES_SONATAS.filter((set) =>
              field.state.value.includes(set.value),
            )
            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name}>
                  Selecciona un efecto de sonata
                </FieldLabel>
                <Combobox
                  multiple
                  autoHighlight
                  items={ECHOES_SONATAS}
                  id={field.name}
                  value={selectedSonatas}
                  onValueChange={(v) => {
                    const values = v.map((item) => item.value)
                    field.handleChange(values)
                  }}
                  disabled={isPending}
                  itemToStringLabel={(item: EchoSetTypes) => item.label}
                  itemToStringValue={(item: EchoSetTypes) => item.value}
                >
                  <ComboboxChips ref={anchor} className="w-full">
                    <ComboboxValue>
                      {(values: EchoSetTypes[]) => (
                        <>
                          {values.map((item) => (
                            <ComboboxChip key={item.value}>
                              {item.label}
                            </ComboboxChip>
                          ))}
                          <ComboboxChipsInput
                            disabled={isPending}
                            placeholder="Selecciona un efecto de sonata"
                          />
                        </>
                      )}
                    </ComboboxValue>
                  </ComboboxChips>
                  <ComboboxContent anchor={anchor}>
                    <ComboboxEmpty>No hay opciones disponibles.</ComboboxEmpty>
                    <ComboboxList>
                      {(item: EchoSetTypes) => (
                        <ComboboxItem key={item.value} value={item}>
                          {item.label}
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

        <form.Field
          name="echo_cost"
          children={(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid
            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name}>Costo</FieldLabel>
                <Select
                  name={field.name}
                  items={ECHO_COST}
                  value={field.state.value}
                  onValueChange={(v) => field.handleChange(v as string)}
                  disabled={isPending}
                >
                  <SelectTrigger id={field.name} aria-invalid={isInvalid}>
                    <SelectValue placeholder="Selecciona el costo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Costo</SelectLabel>
                      {ECHO_COST.map((item) => (
                        <SelectItem key={item.value} value={item.value}>
                          {item.label}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            )
          }}
        />

        <form.Field
          name="echo_class"
          children={(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid
            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name}>Clase del eco</FieldLabel>
                <Select
                  name={field.name}
                  items={ECHO_CLASS}
                  value={field.state.value}
                  onValueChange={(v) => field.handleChange(v as string)}
                  disabled={isPending}
                >
                  <SelectTrigger id={field.name} aria-invalid={isInvalid}>
                    <SelectValue placeholder="Selecciona una clase" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Clase</SelectLabel>
                      {ECHO_CLASS.map((item) => (
                        <SelectItem key={item.value} value={item.value}>
                          {item.label}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            )
          }}
        />

        <form.Field
          name="description_skill"
          children={(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid
            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name}>
                  Descripción de la habilidad
                </FieldLabel>
                <TiptapEditor
                  value={field.state.value}
                  onValueChange={(value) => field.handleChange(value)}
                  placeholder="Escribe la descripción aquí..."
                  disabled={isPending}
                />
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            )
          }}
        />
      </FieldGroup>
    )
  },
})
