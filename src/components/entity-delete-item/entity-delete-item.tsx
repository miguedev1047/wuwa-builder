import type { RemixiconComponentType } from '@remixicon/react'
import { RiDeleteBin2Fill } from '@remixicon/react'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'

interface EntityDeleteItemProps {
  title: string
  description?: string
  onDelete: () => void
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
  IconComponent?: RemixiconComponentType
  isPending?: boolean
}

export function EntityDeleteItem({
  title,
  description,
  onDelete,
  isOpen,
  setIsOpen,
  isPending = false,
  IconComponent = RiDeleteBin2Fill,
}: EntityDeleteItemProps) {
  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogTrigger
        render={
          <Button variant="destructive" size="icon" disabled={isPending}>
            <IconComponent />
          </Button>
        }
      />
      <AlertDialogContent size="sm">
        <AlertDialogHeader>
          <AlertDialogMedia className="bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive">
            <IconComponent />
          </AlertDialogMedia>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          {description && (
            <AlertDialogDescription>{description}</AlertDialogDescription>
          )}
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel variant="outline">Cancelar</AlertDialogCancel>
          <AlertDialogAction
            onClick={onDelete}
            disabled={isPending}
            variant="destructive"
          >
            Proceder
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
