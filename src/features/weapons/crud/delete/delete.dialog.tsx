import { EntityDeleteItem } from '#/components/entity-delete-item'
import { useWeaponDelete } from '#/features/weapons/crud/delete'

export function DeleteWeapon() {
  const { isOpen, isPending, onDelete, setIsOpen } = useWeaponDelete()

  return (
    <EntityDeleteItem
      title="Eliminar arma"
      description="Al eliminar este arma, esta acción es irreversible."
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      onDelete={onDelete}
      isPending={isPending}
    />
  )
}
