import { TiptapEditor } from '#/components/editor'
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
import { RARITIES } from '#/constants/core'
import { MATERIAL_TYPES } from '#/constants/materials'
import { withForm } from '#/shared/contexts/form.context'
import { type TMaterialZod } from '#/zod-schemas/materials'

export const FieldsForm = withForm({
  defaultValues: {} as TMaterialZod,
  props: {} as { isPending: boolean },
  render: function Render({ form, isPending }) {
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
                  placeholder="Cuando los lirios florecen"
                  autoComplete="off"
                />
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            )
          }}
        />

        <form.Field
          name="rarity"
          children={(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid
            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name}>Rareza</FieldLabel>
                <Select
                  name={field.name}
                  items={RARITIES}
                  value={field.state.value}
                  onValueChange={(v) => field.handleChange(v as string)}
                  disabled={isPending}
                >
                  <SelectTrigger id={field.name} aria-invalid={isInvalid}>
                    <SelectValue placeholder="Selecciona una rareza" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Rareza</SelectLabel>
                      {RARITIES.map((item) => (
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
          name="type"
          children={(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid
            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name}>Tipo de material</FieldLabel>
                <Select
                  name={field.name}
                  items={MATERIAL_TYPES}
                  value={field.state.value}
                  onValueChange={(v) => field.handleChange(v as string)}
                  disabled={isPending}
                >
                  <SelectTrigger id={field.name} aria-invalid={isInvalid}>
                    <SelectValue placeholder="Selecciona el tipo de material" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Tipo de material</SelectLabel>
                      {MATERIAL_TYPES.map((item) => (
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
          name="description"
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
