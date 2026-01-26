import '@/styles/globals.css'
import { rethinkSans, geist } from '@/lib/fonts'
import { ThemeProvider } from '@/components/ThemeProvider'
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
        <GSAPProvider>
          <Component {...pageProps} />
        </GSAPProvider>
      </div>
    </ThemeProvider>
  )
}
