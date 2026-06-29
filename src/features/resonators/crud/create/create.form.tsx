import { useResonatorCreate } from '#/features/resonators/crud/create'
import { FieldsForm } from '#/features/resonators/crud/_form'
import { CardForm } from '#/components/card-form'

export function ResonatorCreateForm() {
  const { form, formId, isPending } = useResonatorCreate()

  return (
    <CardForm
      title="Resonador"
      formId={formId}
      isPending={isPending}
      onSubmit={(e) => {
        e.preventDefault()
        form.handleSubmit()
      }}
    >
      <FieldsForm form={form} isPending={isPending} />
    </CardForm>
  )
}
