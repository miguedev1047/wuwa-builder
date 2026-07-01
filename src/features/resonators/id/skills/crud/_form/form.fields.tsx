import {
  FieldGroup,
  Field,
  FieldLabel,
  FieldError,
} from '#/components/ui/field'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { withForm } from '#/shared/contexts/form.context'
import type { TResonatorSkillZod } from '#/zod-schemas/resonators'
import { RESONATOR_SKILLS } from '#/constants/resonators'
import { Input } from '#/components/ui/input'
import { TiptapEditor } from '#/components/editor'

export const FieldsForm = withForm({
  defaultValues: {} as TResonatorSkillZod,
  props: {} as { isPending: boolean; isEditing?: boolean; itemsCount?: number },
  render: function Render({
    form,
    isPending,
    isEditing = false,
    itemsCount = 0,
  }) {
    return (
      <FieldGroup>
        <form.Field
          name="skill_type"
          children={(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid

            const isMaxLevelCount = RESONATOR_SKILLS.length === itemsCount
            const disabled = isPending || isEditing

            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name}>Tipo de habilidad</FieldLabel>

                <Select
                  name={field.name}
                  items={RESONATOR_SKILLS}
                  value={field.state.value}
                  onValueChange={(v) => field.handleChange(v as string)}
                  disabled={disabled || isMaxLevelCount}
                >
                  <SelectTrigger id={field.name} aria-invalid={isInvalid}>
                    <SelectValue placeholder="Selecciona un tipo de habilidad" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Habilidades</SelectLabel>
                      {RESONATOR_SKILLS.map((item) => (
                        <SelectItem
                          key={item.value}
                          value={item.value}
                          disabled={disabled || item.order <= itemsCount - 1}
                        >
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
          name="name"
          children={(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid
            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name}>
                  Nombre de la habilidad
                </FieldLabel>
                <Input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  disabled={isPending}
                  aria-invalid={isInvalid}
                  placeholder="Espada que esculpe mi esencia"
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
      </FieldGroup>
    )
  },
})
