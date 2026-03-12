import '@/styles/globals.css'
import { rethinkSans, geist } from '@/lib/fonts'
import { ThemeProvider } from '@/components/ThemeProvider'
import { ThemeTransition } from '@/components/ThemeTransition'
import { LenisProvider } from '@/components/LenisProvider'
import { GSAPProvider } from '@/components/GSAPProvider'

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
