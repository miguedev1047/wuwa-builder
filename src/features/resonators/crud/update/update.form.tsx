import { Button } from '#/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '#/components/ui/dialog'
import { useResonatorUpdate } from '#/features/resonators/crud/update'
import { RiPencilAi2Fill } from '@remixicon/react'
import { FieldsForm } from '../_form'

export function ResonatorUpdateForm() {
  const { form, formId, isPending, isOpen, setIsOpen } = useResonatorUpdate()

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger
        render={
          <Button size="icon" value="outline">
            <RiPencilAi2Fill />
          </Button>
        }
      />
      <DialogContent className="sm:max-w-5xl">
        <DialogHeader>
          <DialogTitle>Actualizar del resonador</DialogTitle>
        </DialogHeader>

        <FieldsForm formId={formId} form={form} isPending={isPending} />

        <DialogFooter>
          <Button type="submit" form={formId}>
            Guardar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
