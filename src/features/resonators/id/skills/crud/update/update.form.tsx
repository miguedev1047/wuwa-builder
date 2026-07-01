import { DialogForm } from '#/components/dialog-form'
import { FieldsForm } from '#/features/resonators/id/skills/crud/_form'
import { useResonatorSkillUpdate } from '#/features/resonators/id/skills/crud/update'
import type { TResonatorSkillTable } from '#/integrations/orpc/routers/resonators'

interface ResonatorSkillUpdateFormProps {
  skill: TResonatorSkillTable
}

export function ResonatorSkillUpdateForm({
  skill,
}: ResonatorSkillUpdateFormProps) {
  const { form, formId, isPending, isOpen, setIsOpen } =
    useResonatorSkillUpdate(skill)

  return (
    <DialogForm
      open={isOpen}
      setIsOpen={setIsOpen}
      title="Habilidad"
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
