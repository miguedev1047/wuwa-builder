import { orpc } from '#/integrations/tanstack-query/orpc-query'
import { useAppForm } from '#/shared/contexts/form.context'
import {
  resonatorBestWeaponZod,
  type TResonatorBestWeaponZod,
} from '#/zod-schemas/resonators'
import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from '@tanstack/react-query'
import { useParams } from '@tanstack/react-router'
import { useId, useState } from 'react'
import { toast } from 'sonner'

export function useBestWeaponAdd() {
  const queryClient = useQueryClient()
  const [isOpen, setIsOpen] = useState(false)

  const id = useId()
  const formId = `best-weapon-add-${id}`

  const { id: resonatorId } = useParams({
    from: '/_protected/panel/(admin)/resonators/$id',
  })

  const { data: resonator } = useSuspenseQuery(
    orpc.resonators.resonator.getById.queryOptions({
      input: { id: resonatorId },
    }),
  )

  const bestWeapons = resonator.best_weapons
  const bestWeaponsData = bestWeapons.map((item) => item.weapon_id)

  const weaponsCount = bestWeapons.length
  const maxWeapons = weaponsCount >= 5

  const queryKey = orpc.resonators.resonator.getById.queryKey({
    input: { id: resonatorId },
  })

  const defaultValues: TResonatorBestWeaponZod = {
    weapons: bestWeaponsData,
    resonator_id: resonatorId,
  }

  const mutationAdd = useMutation(
    orpc.resonators.best_weapons.add.mutationOptions({
      onSettled: () => {
        queryClient.invalidateQueries({ queryKey })
        setIsOpen(false)
        form.reset()
      },
      onSuccess: ({ message }) => {
        toast.success(message)
      },
      onError: ({ message }) => {
        toast.error(message)
      },
    }),
  )

  const form = useAppForm({
    formId,
    defaultValues,
    validators: {
      onSubmit: resonatorBestWeaponZod,
    },
    onSubmit: ({ value }) => {
      if (maxWeapons) return
      mutationAdd.mutate(value)
    },
  })

  const isPending = mutationAdd.isPending
  const disabled = maxWeapons

  return {
    formId,
    isOpen,
    setIsOpen,
    form,
    isPending,
    disabled,
  }
}
