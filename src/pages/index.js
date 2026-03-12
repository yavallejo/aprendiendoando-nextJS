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
        <title>AprendiendoAndo - Web Development & Courses</title>
        <meta
          name="description"
          content="Learn frontend development with 11+ years of experience. Free tutorials, premium courses (React, Next.js, WordPress), and a community that ships real projects."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />

        {/* Open Graph */}
        <meta property="og:title" content="AprendiendoAndo - Web Development & Courses" />
        <meta property="og:description" content="Learn frontend development. Free tutorials, premium courses, and a community that ships real projects. React, Next.js, WordPress." />
        <meta property="og:type" content="website" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="AprendiendoAndo - Web Development & Courses" />
        <meta name="twitter:description" content="Learn frontend development. Free tutorials, premium courses, and a community that ships real projects. React, Next.js, WordPress." />
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
