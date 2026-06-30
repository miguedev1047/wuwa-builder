import { EntityEmpty } from '#/components/entity-empty'

const DEFAULT_EMPTY_CONTENT = {
  title: 'Sin elementos',
  description: 'Esta lista está vacía',
}

interface EntityViewRootProps extends React.ComponentProps<'ul'> {}

export function EntityViewRoot({ children, ...props }: EntityViewRootProps) {
  return <ul {...props}>{children}</ul>
}

interface EntityViewListProps<T> {
  items: T[]
  emptyContent?: { title: string; description: string }
  keyExtractor?: (item: T, index: number) => string
  children: (item: T, index: number) => React.ReactNode
}

export function EntityViewList<T>({
  children,
  emptyContent = DEFAULT_EMPTY_CONTENT,
  items,
  keyExtractor,
}: EntityViewListProps<T>) {
  if (!items.length) {
    return (
      <EntityEmpty
        title={emptyContent.title}
        description={emptyContent.description}
        className="col-span-full h-80"
      />
    )
  }

  return items.map((item, index) => {
    const key = keyExtractor ? keyExtractor(item, index) : index
    return <li key={key}>{children(item, index)}</li>
  })
}
