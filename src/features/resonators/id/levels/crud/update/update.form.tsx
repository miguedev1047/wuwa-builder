import { DialogForm } from '#/components/dialog-form'
import { FieldsForm } from '#/features/resonators/id/levels/crud/_form'
import { useResonatorLevelUpdate } from '#/features/resonators/id/levels/crud/update'
import type { TResonatorLevelTable } from '#/integrations/orpc/routers/resonators'

interface ResonatorLevelUpdateFormProps {
  level: TResonatorLevelTable
}

export function ResonatorLevelUpdateForm({
  level,
}: ResonatorLevelUpdateFormProps) {
  const { form, formId, isPending, isOpen, setIsOpen, currentLevel } =
    useResonatorLevelUpdate(level)

  return (
    <DialogForm
      open={isOpen}
      setIsOpen={setIsOpen}
      title={`Nivel: ${currentLevel}`}
      formId={formId}
      isPending={isPending}
      isEditing
      onSubmit={(e) => {
        e.preventDefault()
        form.handleSubmit()
      }}
    >
      <FieldsForm form={form} isPending={isPending} isEditing />
    </DialogForm>
  )
}
