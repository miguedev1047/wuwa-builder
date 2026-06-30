import { orpc } from '#/integrations/tanstack-query/orpc-query'
import { useAppForm } from '#/shared/contexts/form.context'
import { weaponZod, type TWeaponZod } from '#/zod-schemas/weapons'
import { createId } from '@paralleldrive/cuid2'
import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from '@tanstack/react-query'
import { useParams } from '@tanstack/react-router'
import { useState } from 'react'
import { toast } from 'sonner'

export function useWeaponUpdate() {
  const formId = `weapon-update-${createId()}`

  const [isOpen, setIsOpen] = useState(false)

  const { id: weaponId } = useParams({
    from: '/_protected/panel/(admin)/weapons/$id',
  })

  const { data: weapon } = useSuspenseQuery(
    orpc.weapons.weapon.getById.queryOptions({
      input: { id: weaponId },
    }),
  )

  const queryClient = useQueryClient()
  const queryKey = orpc.weapons.weapon.getById.queryKey({
    input: { id: weaponId },
  })

  const mutation = useMutation(
    orpc.weapons.weapon.update.mutationOptions({
      onSettled: () => {
        queryClient.invalidateQueries({ queryKey })
      },
      onSuccess: ({ message }) => {
        toast.success(message)
        setIsOpen(false)
      },
      onError: ({ message }) => {
        toast.error(message)
      },
    }),
  )

  const form = useAppForm({
    formId,
    defaultValues: {
      id: weapon.id,
      name: weapon.name,
      description: weapon.description,
      is_new: weapon.is_new,
      is_public: weapon.is_public,
      main_stat_value: weapon.main_stat_value,
      rarity: weapon.rarity,
      type: weapon.type,
    } as TWeaponZod,
    validators: {
      onSubmit: weaponZod,
    },
    onSubmit: async ({ value }) => {
      mutation.mutate(value)
    },
  })

  const isPending = mutation.isPending

  return { form, formId, isPending, isOpen, setIsOpen, weapon }
}
