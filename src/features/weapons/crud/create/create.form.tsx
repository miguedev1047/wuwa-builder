import { useWeaponCreate } from '#/features/weapons/crud/create'
import { FieldsForm } from '#/features/weapons/crud/_form'
import { CardForm } from '#/components/card-form'

export function WeaponCreateForm() {
  const { form, formId, isPending } = useWeaponCreate()

  return (
    <CardForm
      title="Arma"
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
