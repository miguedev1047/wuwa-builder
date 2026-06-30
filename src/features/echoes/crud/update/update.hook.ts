import { orpc } from '#/integrations/tanstack-query/orpc-query'
import { useAppForm } from '#/shared/contexts/form.context'
import { echoZod, type TEchoZod } from '#/zod-schemas/echoes'
import { createId } from '@paralleldrive/cuid2'
import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from '@tanstack/react-query'
import { useParams } from '@tanstack/react-router'
import { useState } from 'react'
import { toast } from 'sonner'

export function useEchoUpdate() {
  const formId = `echo-update-${createId()}`

  const [isOpen, setIsOpen] = useState(false)

  const { id: echoId } = useParams({
    from: '/_protected/panel/(admin)/echoes/$id',
  })

  const { data: echo } = useSuspenseQuery(
    orpc.echoes.echo.getById.queryOptions({
      input: { id: echoId },
    }),
  )

  const queryClient = useQueryClient()
  const queryKey = orpc.echoes.echo.getById.queryKey({
    input: { id: echoId },
  })

  const mutation = useMutation(
    orpc.echoes.echo.update.mutationOptions({
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

  const echoSonatas = echo.sonatas.map((sonata) => sonata.echo_sonata_value)

  const form = useAppForm({
    formId,
    defaultValues: {
      id: echo.id,
      name: echo.name,
      description_skill: echo.description_skill,
      echo_class: echo.echo_class,
      echo_sonatas: echoSonatas,
      echo_cost: echo.echo_cost,
    } as TEchoZod,
    validators: {
      onSubmit: echoZod,
    },
    onSubmit: async ({ value }) => {
      mutation.mutate(value)
    },
  })

  const isPending = mutation.isPending

  return { form, formId, isPending, isOpen, setIsOpen, echo }
}
