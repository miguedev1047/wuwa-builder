import { EntityDeleteItem } from '#/components/entity-delete-item'
import { useMaterialDelete } from '#/features/materials/crud/delete'

export function DeleteMaterial() {
  const { isOpen, isPending, onDelete, setIsOpen } = useMaterialDelete()

  return (
    <EntityDeleteItem
      title="Eliminar material"
      description="Al eliminar este material, esta acción es irreversible."
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      onDelete={onDelete}
      isPending={isPending}
    />
  )
}
