import { cn } from '#/lib/utils'

interface ImageProps extends React.ComponentProps<'img'> {
  disablePointerEvents?: boolean
  animated?: boolean
  transparent?: boolean
  flickeringBackground?: boolean
}

export function Image({
  src,
  alt,
  className,
  disablePointerEvents = true,
  transparent = false,
  animated = false,
  ...props
}: ImageProps) {
  return (
    <figure
      className={cn(
        'group/image overflow-hidden! rounded-xs relative',
        className,
        transparent ? 'bg-transparent' : 'dark:bg-accent bg-accent-foreground',
      )}
    >
      <img
        src={src}
        alt={alt}
        data-disable-pointer-events={disablePointerEvents}
        data-animated={animated}
        loading="lazy"
        className={cn(
          'size-full object-cover relative z-40',
          'data-[disable-pointer-events=true]:pointer-events-none data-[disable-pointer-events=true]:select-none',
          'data-[animated=true]:group-hover/image:scale-110 data-[animated=true]:duration-300 data-[animated=true]:ease-in-out',
        )}
        {...props}
      />
    </figure>
  )
}
