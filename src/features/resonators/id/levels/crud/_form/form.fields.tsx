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
import {
  NumberField,
  NumberFieldDecrement,
  NumberFieldGroup,
  NumberFieldIncrement,
  NumberFieldInput,
} from '@/components/ui/number-field'
import { LEVELS } from '@/constants/core'
import { withForm } from '#/shared/contexts/form.context'
import type { TResonatorLevelZod } from '#/zod-schemas/resonators'

export const FieldsForm = withForm({
  defaultValues: {} as TResonatorLevelZod,
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
          name="level_value"
          children={(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid

            const isMaxLevelCount = LEVELS.length === itemsCount
            const disabled = isPending || isEditing

            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name}>Nivel</FieldLabel>

                <Select
                  name={field.name}
                  items={LEVELS}
                  value={field.state.value}
                  onValueChange={(v) => field.handleChange(v as string)}
                  disabled={disabled}
                >
                  <SelectTrigger
                    id={field.name}
                    aria-invalid={isInvalid}
                    disabled={disabled || isMaxLevelCount}
                  >
                    <SelectValue placeholder="Selecciona una nivel" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Niveles</SelectLabel>
                      {LEVELS.map((item) => (
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
          name="hp"
          children={(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid
            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name}>Vida</FieldLabel>

                <NumberField
                  name={field.name}
                  disabled={isPending}
                  data-invalid={isInvalid}
                  value={field.state.value}
                  onValueChange={(v) => field.handleChange(v as number)}
                  onBlur={field.handleBlur}
                  step="any"
                  smallStep={0.1}
                  min={1}
                  max={100000}
                >
                  <NumberFieldGroup>
                    <NumberFieldDecrement />
                    <NumberFieldInput />
                    <NumberFieldIncrement />
                  </NumberFieldGroup>
                </NumberField>

                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            )
          }}
        />

        <form.Field
          name="atk"
          children={(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid
            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name}>Ataque</FieldLabel>

                <NumberField
                  name={field.name}
                  disabled={isPending}
                  data-invalid={isInvalid}
                  value={field.state.value}
                  onValueChange={(v) => field.handleChange(v as number)}
                  onBlur={field.handleBlur}
                  step="any"
                  smallStep={0.1}
                  min={1}
                  max={5000}
                >
                  <NumberFieldGroup>
                    <NumberFieldDecrement />
                    <NumberFieldInput />
                    <NumberFieldIncrement />
                  </NumberFieldGroup>
                </NumberField>

                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            )
          }}
        />

        <form.Field
          name="def"
          children={(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid
            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name}>Defensa</FieldLabel>

                <NumberField
                  name={field.name}
                  disabled={isPending}
                  data-invalid={isInvalid}
                  value={field.state.value}
                  onValueChange={(v) => field.handleChange(v as number)}
                  onBlur={field.handleBlur}
                  step="any"
                  smallStep={0.1}
                  min={1}
                  max={5000}
                >
                  <NumberFieldGroup>
                    <NumberFieldDecrement />
                    <NumberFieldInput />
                    <NumberFieldIncrement />
                  </NumberFieldGroup>
                </NumberField>

                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            )
          }}
        />
      </FieldGroup>
    )
  },
})
