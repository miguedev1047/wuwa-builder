import { useResonatorUpdate } from '#/features/resonators/crud/update'
import { FieldsForm } from '#/features/resonators/crud/_form'
import { DialogForm } from '#/components/dialog-form'

export function ResonatorUpdateForm() {
  const { form, formId, isPending, isOpen, setIsOpen, resonator } =
    useResonatorUpdate()

  return (
    <DialogForm
      open={isOpen}
      setIsOpen={setIsOpen}
      title={`Resonador: ${resonator.name}`}
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
