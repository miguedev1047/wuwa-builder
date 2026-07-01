import { EntityDeleteItem } from '#/components/entity-delete-item'
import { useSkillDelete } from '#/features/resonators/id/skills/crud/delete'

interface DeleteSkillProps {
  skillId: string
}

export function DeleteSkill(data: DeleteSkillProps) {
  const { onDelete, isOpen, isPending, setIsOpen } = useSkillDelete(data)

  return (
    <EntityDeleteItem
      title="Eliminar habilidad"
      description="Al eliminar esta habilidad, esta acción es irreversible."
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      isPending={isPending}
      onDelete={onDelete}
    />
  )
}
