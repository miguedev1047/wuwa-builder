import { RiErrorWarningLine, RiFileListLine } from '@remixicon/react'
import { cva, type VariantProps } from 'class-variance-authority'
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '#/components/ui/empty'
import { cn } from '#/lib/utils'

const entityEmptyVariants = cva(
  'col-span-2 w-full h-full border border-dashed',
  {
    variants: {
      variant: {
        default: 'border-border',
        destructive:
          'border-destructive/40 bg-destructive/5 dark:border-destructive/30 dark:bg-destructive/10',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
)

const entityEmptyIconVariants = cva(
  "flex size-8 shrink-0 items-center justify-center rounded-lg [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default: 'bg-muted text-foreground',
        destructive:
          'bg-destructive/10 text-destructive dark:bg-destructive/20',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
)

const entityEmptyTitleVariants = cva('', {
  variants: {
    variant: {
      default: 'text-foreground',
      destructive: 'text-destructive',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
})

interface EntityEmptyProps extends VariantProps<typeof entityEmptyVariants> {
  title: string
  description: string
  renderButton?: React.ReactNode
  disableIcon?: boolean
  className?: string
}

const ICONS: Record<
  NonNullable<VariantProps<typeof entityEmptyVariants>['variant']>,
  React.ReactNode
> = {
  default: <RiFileListLine />,
  destructive: <RiErrorWarningLine />,
}

export function EntityEmpty(props: EntityEmptyProps) {
  const {
    title,
    description,
    renderButton,
    variant = 'default',
    disableIcon = false,
    className,
  } = props

  return (
    <Empty className={cn(entityEmptyVariants({ variant }), className)}>
      <EmptyHeader>
        {!disableIcon && (
          <EmptyMedia
            variant="icon"
            className={entityEmptyIconVariants({ variant })}
          >
            {ICONS[variant ?? 'default']}
          </EmptyMedia>
        )}
        <EmptyTitle className={entityEmptyTitleVariants({ variant })}>
          {title}
        </EmptyTitle>
        <EmptyDescription>{description}</EmptyDescription>
      </EmptyHeader>
      <EmptyContent>{renderButton ?? null}</EmptyContent>
    </Empty>
  )
}
