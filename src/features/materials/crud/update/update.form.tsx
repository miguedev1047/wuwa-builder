import { useMaterialUpdate } from '#/features/materials/crud/update'
import { FieldsForm } from '#/features/materials/crud/_form'
import { DialogForm } from '#/components/dialog-form'

export function MaterialUpdateForm() {
  const { form, formId, isPending, isOpen, setIsOpen, material } =
    useMaterialUpdate()

  return (
    <DialogForm
      open={isOpen}
      setIsOpen={setIsOpen}
      title={`Material: ${material.name}`}
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
