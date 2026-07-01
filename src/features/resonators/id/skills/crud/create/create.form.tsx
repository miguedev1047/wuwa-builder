import { DialogForm } from '#/components/dialog-form'
import { FieldsForm } from '#/features/resonators/id/skills/crud/_form'
import { useResonatorSkillCreate } from '#/features/resonators/id/skills/crud/create'

export function ResonatorSkillCreateForm() {
  const {
    form,
    formId,
    isPending,
    isOpen,
    setIsOpen,
    isDisabled,
    currentSkillCount,
  } = useResonatorSkillCreate()

  return (
    <DialogForm
      open={isOpen}
      setIsOpen={setIsOpen}
      title="Nivel"
      formId={formId}
      isPending={isPending}
      disabled={isDisabled}
      size="sm"
      onSubmit={(e) => {
        e.preventDefault()
        form.handleSubmit()
      }}
    >
      <FieldsForm
        form={form}
        isPending={isPending}
        itemsCount={currentSkillCount}
      />
    </DialogForm>
  )
}
