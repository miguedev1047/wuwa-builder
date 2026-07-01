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
import { ResonatorSKillImageUpload } from '#/features/resonators/id/skills/components/image-upload'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '#/components/ui/tooltip'
import type { TResonatorSkillTable } from '#/integrations/orpc/routers/resonators'

interface ResonatorSkillImageUploadDialogProps {
  skill: TResonatorSkillTable
}

export function ResonatorSkillImageUploadDialog({
  skill,
}: ResonatorSkillImageUploadDialogProps) {
  return (
    <Tooltip>
      <Dialog>
        <DialogTrigger
          render={
            <TooltipTrigger
              render={
                <Button size="icon">
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

          <ResonatorSKillImageUpload skill={skill} />

          <DialogFooter>
            <DialogClose render={<Button>Cerrar</Button>} />
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <TooltipContent side="bottom">Subir imagenes</TooltipContent>
    </Tooltip>
  )
}
