'use client'

import { useLanguage } from './LanguageProvider'

export function LanguageToggle() {
  const { lang, setLang, mounted } = useLanguage()

  if (!mounted) {
    return (
      <button
        type="button"
        className="flex justify-center items-center w-9 h-9 rounded-full text-muted-foreground text-xs font-semibold tracking-tight"
        aria-hidden
      >
        ES
      </button>
    )
  }

  const next = lang === 'es' ? 'en' : 'es'
  const label =
    lang === 'es'
      ? 'Cambiar idioma a inglés'
      : 'Switch language to Spanish'

  return (
    <button
      type="button"
      onClick={() => setLang(next)}
      className="group w-9 h-9 flex items-center justify-center rounded-full text-muted-foreground hover:text-foreground hover:bg-accent/50 transition-[color,background-color,transform] duration-200 ease-[cubic-bezier(0.33,1,0.68,1)] hover:scale-110 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background text-xs font-semibold tracking-tight"
      aria-label={label}
    >
      <span aria-hidden>{lang === 'es' ? 'ES' : 'EN'}</span>
    </button>
  )
}
