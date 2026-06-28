import {
  HeadContent,
  Scripts,
  createRootRouteWithContext,
} from '@tanstack/react-router'
import { TanstackAppDevTools } from '@/integrations/tanstack-query/devtools'
import type { QueryClient } from '@tanstack/react-query'

import appCss from '../styles/main.css?url'
import { ThemeProvider } from '#/components/theme-provider'
import { Toaster } from '#/components/ui/sonner'

interface MyRouterContext {
  queryClient: QueryClient
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        title: 'TanStack Start Starter',
      },
    ],
    links: [
      {
        rel: 'stylesheet',
        href: appCss,
      },
    ],
  }),
  shellComponent: RootDocument,
})

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body>
        <ThemeProvider>
          {children}
          <TanstackAppDevTools />
          <Toaster />
        </ThemeProvider>
        <Scripts />
      </body>
    </html>
  )
}
