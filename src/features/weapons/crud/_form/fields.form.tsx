import { withForm } from '#/shared/contexts/form.context'
import type { TWeaponZod } from '#/zod-schemas/weapons'
import { TiptapEditor } from '#/components/editor'
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
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
import { Switch } from '#/components/ui/switch'
import { GENERAL_STATS, RARITIES, WEAPON_TYPES } from '#/constants/core'

export const FieldsForm = withForm({
  defaultValues: {} as TWeaponZod,
  props: {} as { isPending: boolean },
  render: function Render({ form, isPending }) {
    return (
      <FieldGroup className="md:gap-2">
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
                  placeholder="Espina de la Desafiadora"
                  autoComplete="off"
                />
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
                <FieldLabel htmlFor={field.name}>Descripción</FieldLabel>
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
                      {RARITIES.slice(2, 5).map((item) => (
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
                <FieldLabel htmlFor={field.name}>Tipo de arma</FieldLabel>
                <Select
                  name={field.name}

                  items={WEAPON_TYPES}
                  value={field.state.value}
                  onValueChange={(v) => field.handleChange(v as string)}
                  disabled={isPending}
                >
                  <SelectTrigger id={field.name} aria-invalid={isInvalid}>
                    <SelectValue placeholder="Selecciona un tipo de arma" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Tipo de arma</SelectLabel>
                      {WEAPON_TYPES.map((item) => (
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
          name="main_stat_value"
          children={(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid
            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name}>
                  Estadística Principal
                </FieldLabel>
                <Select
                  name={field.name}

                  items={GENERAL_STATS}
                  value={field.state.value}
                  onValueChange={(v) => field.handleChange(v as string)}
                  disabled={isPending}
                >
                  <SelectTrigger id={field.name} aria-invalid={isInvalid}>
                    <SelectValue placeholder="Selecciona una estadística" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Estadística</SelectLabel>
                      {GENERAL_STATS.map((item) => (
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

        <div className="grid md:grid-cols-2 gap-2 md:gap-4 col-span-2">
          <form.Field
            name="is_new"
            children={(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid
              return (
                <Field
                  className="bg-card border p-4"
                  orientation="horizontal"
                  data-invalid={isInvalid}
                >
                  <FieldContent>
                    <FieldLabel htmlFor={field.name}>Arma nueva</FieldLabel>
                    <FieldDescription>
                      Activa este campo para marcar al arma como nueva
                    </FieldDescription>
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </FieldContent>
                  <Switch
                    id={field.name}
                    name={field.name}
                    checked={field.state.value}
                    onCheckedChange={field.handleChange}
                    aria-invalid={isInvalid}
                    disabled={isPending}
                  />
                </Field>
              )
            }}
          />

          <form.Field
            name="is_public"
            children={(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid
              return (
                <Field
                  className="bg-card border p-4"
                  orientation="horizontal"
                  data-invalid={isInvalid}
                >
                  <FieldContent>
                    <FieldLabel htmlFor={field.name}>Publico</FieldLabel>
                    <FieldDescription>
                      Activa este campo para marcar al arma como visible
                    </FieldDescription>
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </FieldContent>
                  <Switch
                    id={field.name}
                    name={field.name}
                    checked={field.state.value}
                    onCheckedChange={field.handleChange}
                    aria-invalid={isInvalid}
                    disabled={isPending}
                  />
                </Field>
              )
            }}
          />
        </div>
      </FieldGroup>
    )
  },
})
