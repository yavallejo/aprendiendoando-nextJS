import '@/styles/globals.css'
import { rethinkSans, geist } from '@/lib/fonts'
import { ThemeProvider } from '@/components/ThemeProvider'

export default function App({ Component, pageProps }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem
      disableTransitionOnChange
    >
      <div className={`${rethinkSans.variable} ${geist.variable} font-body`}>
        <Component {...pageProps} />
      </div>
    </ThemeProvider>
  )
}
