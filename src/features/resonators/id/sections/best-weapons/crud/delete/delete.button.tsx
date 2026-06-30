import { EntityDeleteItem } from '#/components/entity-delete-item'
import { useBestWeaponDelete } from '#/features/resonators/id/sections/best-weapons/crud/delete'

interface DeleteBestWeaponProps {
  bestWeaponId: string
}

export function DeleteBestWeapon(data: DeleteBestWeaponProps) {
  const { onDelete, isOpen, isPending, setIsOpen } = useBestWeaponDelete(data)

  return (
    <EntityDeleteItem
      title="Eliminar arma"
      description="Al eliminar esta arma, esta acción es irreversible."
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      isPending={isPending}
      onDelete={onDelete}
    />
  )
}
