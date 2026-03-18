import { Providers } from './providers'

const siteName = 'AprendiendoAndo'
const siteUrl = 'https://www.aprendiendoando.com'
const defaultTitle = 'AprendiendoAndo - Productividad y desarrollo web para Mac'
const defaultDescription =
  'Aprende productividad para desarrolladores en Mac: terminal, Git, herramientas y WordPress avanzado para optimizar tu flujo de trabajo diario.'

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: defaultTitle,
    template: '%s | AprendiendoAndo',
  },
  description: defaultDescription,
  openGraph: {
    title: defaultTitle,
    description: defaultDescription,
    url: siteUrl,
    siteName,
    type: 'website',
    locale: 'es_ES',
    images: [
      {
        url: '/yan-vallejo.jpg',
        width: 1200,
        height: 630,
        alt: 'Yan Vallejo - AprendiendoAndo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: defaultTitle,
    description: defaultDescription,
    images: ['/yan-vallejo.jpg'],
  },
  alternates: {
    canonical: siteUrl,
  },
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

