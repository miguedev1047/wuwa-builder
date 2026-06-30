import { useEchoUpdate } from '#/features/echoes/crud/update'
import { FieldsForm } from '#/features/echoes/crud/_form'
import { DialogForm } from '#/components/dialog-form'

export function EchoUpdateForm() {
  const { form, formId, isPending, isOpen, setIsOpen, echo } = useEchoUpdate()

  return (
    <DialogForm
      open={isOpen}
      setIsOpen={setIsOpen}
      title={`Eco: ${echo.name}`}
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
