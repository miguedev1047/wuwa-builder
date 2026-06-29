import { RiAddFill, RiEdit2Fill } from '@remixicon/react'
import { Button } from '#/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '#/components/ui/dialog'
import { Spinner } from '#/components/ui/spinner'

interface DialogFormProps {
  isEditing?: boolean
  formId: string
  title: string
  isPending?: boolean
  disabled?: boolean
  children: React.ReactNode
  open: boolean
  setIsOpen: (open: boolean) => void
  onSubmit: (e: React.ChangeEvent<HTMLFormElement>) => void
}

export function DialogForm({
  children,
  formId,
  onSubmit,
  open,
  setIsOpen,
  title,
  disabled,
  isEditing,
  isPending = false,
}: DialogFormProps) {
  return (
    <Dialog open={open} onOpenChange={setIsOpen}>
      <DialogTrigger
        render={
          <Button size="icon" disabled={disabled}>
            {isEditing ? <RiEdit2Fill /> : <RiAddFill />}
          </Button>
        }
      />
      <DialogContent className="sm:max-w-5xl!">
        <DialogHeader>
          <DialogTitle>
            {isEditing ? 'Editar' : 'Agregar'} {title}
          </DialogTitle>
        </DialogHeader>

        <div
          className="-mx-4 no-scrollbar max-h-[70vh] overflow-y-auto px-4"
          key={+isPending}
        >
          <form id={formId} onSubmit={onSubmit}>
            {children}
          </form>
        </div>

        <DialogFooter>
          <DialogClose render={<Button variant="secondary">Cerrar</Button>} />
          <Button type="submit" form={formId} disabled={disabled || isPending}>
            {isPending && <Spinner />}
            {isEditing ? 'Guardar' : 'Agregar'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
