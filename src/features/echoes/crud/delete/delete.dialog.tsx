import { EntityDeleteItem } from '#/components/entity-delete-item'
import { useEchoDelete } from '#/features/echoes/crud/delete'

export function DeleteEcho() {
  const { isOpen, isPending, onDelete, setIsOpen } = useEchoDelete()

  return (
    <EntityDeleteItem
      title="Eliminar eco"
      description="Al eliminar este eco, esta acción es irreversible."
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      onDelete={onDelete}
      isPending={isPending}
    />
  )
}
