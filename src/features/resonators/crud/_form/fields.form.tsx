import { withForm } from '#/shared/contexts/form.context'
import type { TResonatorZod } from '#/zod-schemas/resonators/items'
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
import { RARITIES, WEAPON_TYPES } from '#/constants/core'
import { RESONATOR_ELEMENTS, RESONATOR_ROLES } from '#/constants/resonators'

export const FieldsForm = withForm({
  defaultValues: {} as TResonatorZod,
  props: {} as { formId: string; isPending: boolean },
  render: function Render({ form, formId, isPending }) {
    return (
      <form
        id={formId}
        onSubmit={(e) => {
          e.preventDefault()
          form.handleSubmit()
        }}
      >
        <FieldGroup>
          <form.Field name="name">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid
              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>
                    Nombre del resonador
                  </FieldLabel>
                  <Input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    aria-invalid={isInvalid}
                    placeholder="Cartethyia"
                    autoComplete="off"
                    disabled={isPending}
                  />
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              )
            }}
          </form.Field>

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
                        {RARITIES.slice(3, 5).map((item) => (
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
            name="weapon_type"
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
            name="role"
            children={(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid
              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>Rol</FieldLabel>
                  <Select
                    name={field.name}
                    items={RESONATOR_ROLES}
                    value={field.state.value}
                    onValueChange={(v) => field.handleChange(v as string)}
                    disabled={isPending}
                  >
                    <SelectTrigger id={field.name} aria-invalid={isInvalid}>
                      <SelectValue placeholder="Selecciona un rol" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Rol</SelectLabel>
                        {RESONATOR_ROLES.map((item) => (
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
            name="element"
            children={(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid
              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>Elemento</FieldLabel>
                  <Select
                    name={field.name}
                    items={RESONATOR_ELEMENTS}
                    value={field.state.value}
                    onValueChange={(v) => field.handleChange(v as string)}
                    disabled={isPending}
                  >
                    <SelectTrigger id={field.name} aria-invalid={isInvalid}>
                      <SelectValue placeholder="Selecciona un elemento" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Elemento</SelectLabel>
                        {RESONATOR_ELEMENTS.map((item) => (
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

          <div className="grid grid-cols-2 gap-4 col-span-2">
            <FieldGroup>
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
                        <FieldLabel htmlFor={field.name}>
                          Resonador nuevo
                        </FieldLabel>
                        <FieldDescription>
                          Activa este campo para marcar al resonador como nuevo
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
            </FieldGroup>

            <FieldGroup>
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
                          Activa este campo para marcar al resonador como
                          visible
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
            </FieldGroup>
          </div>
        </FieldGroup>
      </form>
    )
  },
})
