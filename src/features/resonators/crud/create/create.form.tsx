import { Button } from '#/components/ui/button'
import {
  Card,
  CardAction,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '#/components/ui/card'
import { useResonatorCreate } from '#/features/resonators/crud/create'
import { FieldsForm } from '../_form'

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
          <Button type="submit" form={formId}>
            Guardar
          </Button>
        </CardAction>
      </CardFooter>
    </Card>
  )
}
