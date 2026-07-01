import { EntityDeleteItem } from '#/components/entity-delete-item'
import { useLevelDelete } from '#/features/resonators/id/levels/crud/delete'

interface DeleteLevelProps {
  levelId: string
}

export function DeleteLevel(data: DeleteLevelProps) {
  const { onDelete, isOpen, isPending, setIsOpen } = useLevelDelete(data)

  return (
    <EntityDeleteItem
      title="Eliminar nivel"
      description="Al eliminar este nivel, esta acción es irreversible."
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      isPending={isPending}
      onDelete={onDelete}
    />
  )
}
