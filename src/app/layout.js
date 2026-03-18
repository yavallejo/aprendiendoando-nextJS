import { Providers } from './providers'

export const metadata = {
  title: {
    default: 'AprendiendoAndo - Productividad y desarrollo web para Mac',
    template: '%s | AprendiendoAndo',
  },
  description:
    'Aprende productividad para desarrolladores en Mac: terminal, Git, herramientas y WordPress avanzado para optimizar tu flujo de trabajo diario.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}

