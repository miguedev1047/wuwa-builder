import { DEFAULT_DESCRIPTION } from '#/constants/general'
import { orpc } from '#/integrations/tanstack-query/orpc-query'
import { useAppForm } from '#/shared/contexts/form.context'
import { weaponZod, type TWeaponZod } from '#/zod-schemas/weapons'
import { createId } from '@paralleldrive/cuid2'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import { toast } from 'sonner'

export function useWeaponCreate() {
  const formId = `weapon-create-${createId()}`

  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const queryKey = orpc.weapons.weapon.getAll.queryKey()

  const mutation = useMutation(
    orpc.weapons.weapon.create.mutationOptions({
      onSettled: () => {
        queryClient.invalidateQueries({ queryKey })
      },
      onSuccess: ({ message }) => {
        toast.success(message)
        form.reset()
        navigate({ to: '/panel/weapons' })
      },
      onError: ({ message }) => {
        toast.error(message)
      },
    }),
  )

  const form = useAppForm({
    formId,
    defaultValues: {
      id: createId(),
      name: '',
      description: DEFAULT_DESCRIPTION,
      is_new: false,
      is_public: false,
      main_stat_value: '',
      rarity: '',
      type: '',
    } as TWeaponZod,
    validators: {
      onSubmit: weaponZod,
    },
    onSubmit: async ({ value }) => {
      mutation.mutate(value)
    },
  })

  const isPending = mutation.isPending

  return { form, formId, isPending }
}
