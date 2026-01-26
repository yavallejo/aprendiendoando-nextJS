import { Rethink_Sans } from 'next/font/google'
import { Geist } from 'next/font/google'

export const rethinkSans = Rethink_Sans({
  subsets: ['latin'],
  variable: '--font-rethink-sans',
  display: 'swap',
})

export const geist = Geist({
  subsets: ['latin'],
  variable: '--font-geist',
  display: 'swap',
})
