'use client'

import { useTheme } from 'next-themes'
import { Moon, Sun } from 'lucide-react'
import { useEffect, useState } from 'react'
import { setThemeTransitionOrigin } from '@/lib/themeTransitionOrigin'

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <button className="w-9 h-9 flex items-center justify-center rounded-full text-muted-foreground">
        <Sun size={18} />
      </button>
    )
  }

  const handleToggle = (e) => {
    setThemeTransitionOrigin(e.clientX, e.clientY)
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  return (
    <button
      onClick={handleToggle}
      className="group w-9 h-9 flex items-center justify-center rounded-full text-muted-foreground hover:text-foreground hover:bg-accent/50 transition-[color,background-color,transform] duration-200 ease-[cubic-bezier(0.33,1,0.68,1)] hover:scale-110 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      aria-label="Toggle theme"
    >
      <span className="transition-transform duration-200 group-hover:rotate-12 inline-block" aria-hidden>
        {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
      </span>
    </button>
  )
}
