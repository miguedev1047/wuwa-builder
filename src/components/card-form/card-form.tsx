import { Button } from '#/components/ui/button'
import { Spinner } from '#/components/ui/spinner'
import {
  Card,
  CardAction,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '#/components/ui/card'

interface CardFormProps {
  isEditing?: boolean
  formId: string
  title: string
  isPending?: boolean
  disabled?: boolean
  children: React.ReactNode
  onSubmit: (e: React.ChangeEvent<HTMLFormElement>) => void
}

export function CardForm({
  children,
  formId,
  onSubmit,
  title,
  disabled,
  isEditing,
  isPending = false,
}: CardFormProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {isEditing ? 'Editar' : 'Agregar'} {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form id={formId} onSubmit={onSubmit}>
          {children}
        </form>
      </CardContent>
      <CardFooter>
        <CardAction>
          <Button type="submit" form={formId} disabled={disabled || isPending}>
            {isPending && <Spinner />}
            {isEditing ? 'Guardar' : 'Agregar'}
          </Button>
        </CardAction>
      </CardFooter>
    </Card>
  )
}
