import { ThemeProvider as StartThemeProvider } from 'next-themes'

export function ThemeProvider({ children }: React.PropsWithChildren) {
  return (
    <StartThemeProvider
      attribute="class"
      defaultTheme="dark"
      disableTransitionOnChange
      enableSystem
    >
      {children}
    </StartThemeProvider>
  )
}
