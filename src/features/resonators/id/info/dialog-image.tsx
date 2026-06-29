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
import { RiUploadCloud2Fill } from '@remixicon/react'
import { ResonatorImageUpload } from '../images'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '#/components/ui/tooltip'

export function DialogImage() {
  return (
    <Tooltip>
      <Dialog>
        <DialogTrigger
          render={
            <TooltipTrigger
              render={
                <Button
                  size="icon"
                  variant="outline"
                  className="absolute top-2 right-2"
                >
                  <RiUploadCloud2Fill />
                </Button>
              }
            />
          }
        />
        <DialogContent className="sm:max-w-5xl!">
          <DialogHeader>
            <DialogTitle>Subir imagenes</DialogTitle>
          </DialogHeader>

          <ResonatorImageUpload />

          <DialogFooter>
            <DialogClose render={<Button>Cerrar</Button>} />
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <TooltipContent side="bottom">Subir imagenes</TooltipContent>
    </Tooltip>
  )
}
