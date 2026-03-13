import Head from 'next/head'
import { Header } from '@/components/Header'
import { HeroSection } from '@/components/HeroSection'
import { AboutSection } from '@/components/AboutSection'
import { YouTubeSection } from '@/components/YouTubeSection'
import { CoursesSection } from '@/components/CoursesSection'
import { ContactSection } from '@/components/ContactSection'
import { Footer } from '@/components/Footer'

export default function Home() {
  return (
    <>
      <Head>
        <title>AprendiendoAndo - Productividad y Desarrollo Web</title>
        <meta
          name="description"
          content="Aprende herramientas para desarrolladores, domina la terminal, Git, WordPress avanzado y maximiza tu productividad en Mac."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />

        {/* Open Graph */}
        <meta property="og:title" content="AprendiendoAndo - Productividad y Desarrollo Web" />
        <meta property="og:description" content="Domina tu terminal, Git, herramientas en Mac y WordPress avanzado. Aprende y mejora tu flujo de trabajo." />
        <meta property="og:type" content="website" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="AprendiendoAndo - Productividad y Desarrollo Web" />
        <meta name="twitter:description" content="Domina tu terminal, Git, herramientas en Mac y WordPress avanzado. Aprende y mejora tu flujo de trabajo." />
      </Head>

      <div className="min-h-screen bg-background">
        <Header />
        <main>
          <HeroSection />
          <CoursesSection />
          <AboutSection />
          <YouTubeSection />
          <ContactSection />
        </main>
        <Footer />
      </div>
    </>
  )
}
