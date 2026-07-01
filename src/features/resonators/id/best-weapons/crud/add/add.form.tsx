import { DialogForm } from '#/components/dialog-form'
import { Suspense } from 'react'
import { FieldsForm } from '../_form'
import { useBestWeaponAdd } from './add.hook'
import { Spinner } from '#/components/ui/spinner'

export function BestWeaponAddForm() {
  const { form, formId, isPending, isOpen, setIsOpen, disabled } =
    useBestWeaponAdd()

  return (
    <DialogForm
      open={isOpen}
      setIsOpen={setIsOpen}
      disabled={disabled}
      title="armas"
      formId={formId}
      isPending={isPending}
      size="sm"
      onSubmit={(e) => {
        e.preventDefault()
        form.handleSubmit()
      }}
    >
      <Suspense fallback={<Spinner />}>
        <FieldsForm form={form} isPending={isPending} />
      </Suspense>
    </DialogForm>
  )
}
