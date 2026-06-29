import { Button } from '#/components/ui/button'
import {
  Card,
  CardAction,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '#/components/ui/card'
import { Spinner } from '#/components/ui/spinner'
import { useResonatorCreate } from '#/features/resonators/crud/create'
import { FieldsForm } from '#/features/resonators/crud/_form'

export function ResonatorCreateForm() {
  const { form, formId, isPending } = useResonatorCreate()

  return (
    <Card>
      <CardHeader>
        <CardTitle>Información del resonador</CardTitle>
      </CardHeader>
      <CardContent>
        <FieldsForm formId={formId} form={form} isPending={isPending} />
      </CardContent>
      <CardFooter>
        <CardAction>
          <Button type="submit" form={formId} disabled={isPending}>
            {isPending && <Spinner />}
            {isPending ? 'Guardando...' : 'Guardar'}
          </Button>
        </CardAction>
      </CardFooter>
    </Card>
  )
}
