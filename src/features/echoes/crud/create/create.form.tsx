import { useEchoCreate } from '#/features/echoes/crud/create'
import { FieldsForm } from '#/features/echoes/crud/_form'
import { CardForm } from '#/components/card-form'

export function EchoCreateForm() {
  const { form, formId, isPending } = useEchoCreate()

  return (
    <CardForm
      title="Eco"
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
