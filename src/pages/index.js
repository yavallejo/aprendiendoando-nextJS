import Head from 'next/head'
import { Header } from '@/components/Header'
import { AboutSection } from '@/components/AboutSection'
import { YouTubeSection } from '@/components/YouTubeSection'
import { CoursesSection } from '@/components/CoursesSection'
import { ContactSection } from '@/components/ContactSection'

export default function Home() {
  return (
    <>
      <Head>
        <title>Aprendiendoando - Desarrollo Web y Cursos</title>
        <meta
          name="description"
          content="Aprendiendoando - Comunidad de desarrollo web, cursos premium y contenido educativo sobre desarrollo frontend"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="min-h-screen bg-background">
        <Header />
        <main>
          <AboutSection />
          <YouTubeSection />
          <CoursesSection />
          <ContactSection />
        </main>
      </div>
    </>
  )
}
