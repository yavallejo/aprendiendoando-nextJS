import Head from 'next/head'
import { Header } from '@/components/Header'
import { HeroSection } from '@/components/HeroSection'
import { AboutSection } from '@/components/AboutSection'
import { YouTubeSection } from '@/components/YouTubeSection'
import { ContactSection } from '@/components/ContactSection'
import { Footer } from '@/components/Footer'

export default function Home() {
  return (
    <>
      <Head>
        <title>AprendiendoAndo - Productividad y desarrollo web para Mac</title>
        <meta
          name="description"
          content="Aprende productividad para desarrolladores en Mac: terminal, Git, herramientas y WordPress avanzado para optimizar tu flujo de trabajo diario."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />

        {/* Open Graph */}
        <meta property="og:title" content="AprendiendoAndo - Productividad y Desarrollo Web" />
        <meta property="og:description" content="Domina tu terminal, Git, herramientas en Mac y WordPress avanzado. Aprende y mejora tu flujo de trabajo." />
        <meta property="og:type" content="website" />

        {/* Organization structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Person',
              name: 'AprendiendoAndo - Yan Vallejo',
              url: 'https://aprendiendoando.com',
              sameAs: [
                'https://www.youtube.com/@AprendiendoAndo',
                'https://twitter.com/AprendiendoAndo',
                'https://github.com/AprendiendoAndo',
                'https://linkedin.com/in/AprendiendoAndo',
              ],
              description:
                'Contenido sobre productividad para desarrolladores en Mac, terminal, Git y WordPress avanzado para mejorar tu flujo de trabajo.',
            }),
          }}
        />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="AprendiendoAndo - Productividad y Desarrollo Web" />
        <meta name="twitter:description" content="Domina tu terminal, Git, herramientas en Mac y WordPress avanzado. Aprende y mejora tu flujo de trabajo." />
      </Head>

      <div className="min-h-screen bg-background">
        <Header />
        <main>
          <HeroSection />
          <AboutSection />
          <YouTubeSection />
          <ContactSection />
        </main>
        <Footer />
      </div>
    </>
  )
}
