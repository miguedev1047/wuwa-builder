import { DialogForm } from '#/components/dialog-form'
import { FieldsForm } from '#/features/resonators/id/levels/crud/_form'
import { useResonatorLevelCreate } from '#/features/resonators/id/levels/crud/create'

export function ResonatorLevelCreateForm() {
  const {
    form,
    formId,
    isPending,
    isOpen,
    setIsOpen,
    isDisabled,
    currentLevels,
  } = useResonatorLevelCreate()

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
        itemsCount={currentLevels}
      />
    </DialogForm>
  )
}
