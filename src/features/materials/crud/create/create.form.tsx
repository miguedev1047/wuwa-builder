import { useMaterialCreate } from '#/features/materials/crud/create'
import { FieldsForm } from '#/features/materials/crud/_form'
import { CardForm } from '#/components/card-form'

export function MaterialCreateForm() {
  const { form, formId, isPending } = useMaterialCreate()

  return (
    <CardForm
      title="Material"
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
