import { Header } from '@/components/Header'
import { HeroSection } from '@/components/HeroSection'
import { AboutSection } from '@/components/AboutSection'
import dynamic from 'next/dynamic'
import { Footer } from '@/components/Footer'

const YouTubeSection = dynamic(
  () => import('@/components/YouTubeSection').then((m) => m.YouTubeSection),
  { ssr: true }
)

const ContactSection = dynamic(
  () => import('@/components/ContactSection').then((m) => m.ContactSection),
  { ssr: true }
)

export const metadata = {
  title: 'AprendiendoAndo - Productividad y desarrollo web para Mac',
  description:
    'Aprende productividad para desarrolladores en Mac: terminal, Git, herramientas y WordPress avanzado para optimizar tu flujo de trabajo diario.',
}

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main style={{ paddingTop: 'var(--header-height)' }}>
        <HeroSection />
        <AboutSection />
        <YouTubeSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  )
}

