import { useWeaponUpdate } from '#/features/weapons/crud/update'
import { FieldsForm } from '#/features/weapons/crud/_form'
import { DialogForm } from '#/components/dialog-form'

export function WeaponUpdateForm() {
  const { form, formId, isPending, isOpen, setIsOpen, weapon } =
    useWeaponUpdate()

  return (
    <DialogForm
      open={isOpen}
      setIsOpen={setIsOpen}
      title={`Arma: ${weapon.name}`}
      formId={formId}
      isPending={isPending}
      isEditing
      onSubmit={(e) => {
        e.preventDefault()
        form.handleSubmit()
      }}
    >
      <FieldsForm form={form} isPending={isPending} />
    </DialogForm>
  )
}
