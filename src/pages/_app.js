import dynamic from 'next/dynamic'
import '@/styles/globals.css'
import { rethinkSans, geist } from '@/lib/fonts'
import { ThemeProvider } from '@/components/ThemeProvider'
import { ThemeTransition } from '@/components/ThemeTransition'

const LenisProvider = dynamic(
  () => import('@/components/LenisProvider').then((m) => m.LenisProvider),
  { ssr: false }
)

const GSAPProvider = dynamic(
  () => import('@/components/GSAPProvider').then((m) => m.GSAPProvider),
  { ssr: false }
)

export default function App({ Component, pageProps }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem
      disableTransitionOnChange
    >
      <div className={`${rethinkSans.variable} ${geist.variable} font-body`}>
        <LenisProvider>
          <GSAPProvider>
            <Component {...pageProps} />
            <ThemeTransition />
          </GSAPProvider>
        </LenisProvider>
      </div>
    </ThemeProvider>
  )
}
