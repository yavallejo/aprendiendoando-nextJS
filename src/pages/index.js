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
        <title>Aprendiendoando - Desarrollo Web y Cursos</title>
        <meta
          name="description"
          content="Aprendiendoando - Comunidad de desarrollo web, cursos premium y contenido educativo sobre desarrollo frontend. +11 años de experiencia compartiendo conocimiento."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Aprendiendoando - Desarrollo Web y Cursos" />
        <meta property="og:description" content="Comunidad de desarrollo web, cursos premium y contenido educativo sobre desarrollo frontend." />
        <meta property="og:type" content="website" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Aprendiendoando - Desarrollo Web y Cursos" />
        <meta name="twitter:description" content="Comunidad de desarrollo web, cursos premium y contenido educativo sobre desarrollo frontend." />
      </Head>
      
      <div className="min-h-screen bg-background">
        <Header />
        <main>
          <HeroSection />
          <AboutSection />
          <YouTubeSection />
          <CoursesSection />
          <ContactSection />
        </main>
        <Footer />
      </div>
    </>
  )
}
