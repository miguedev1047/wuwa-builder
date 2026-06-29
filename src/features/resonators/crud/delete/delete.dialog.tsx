import { EntityDeleteItem } from '#/components/entity-delete-item'
import { useDeleteResonator } from '#/features/resonators/crud/delete'

export function DeleteResonator() {
  const { isOpen, isPending, onDelete, setIsOpen } = useDeleteResonator()

  return (
    <EntityDeleteItem
      title="Eliminar resonador"
      description="Al eliminar este resonador, esta acción es irreversible."
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      onDelete={onDelete}
      isPending={isPending}
    />
  )
}
