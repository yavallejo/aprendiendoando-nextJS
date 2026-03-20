'use client'

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'
import { getNested, translations, SUPPORTED_LANGS } from '@/lib/i18n'

const STORAGE_KEY = 'aprendiendoando-lang'

const LanguageContext = createContext(null)

function normalizeLang(value) {
  if (value === 'en' || value === 'es') return value
  return 'es'
}

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState('es')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY)
      if (stored) setLangState(normalizeLang(stored))
    } catch {
      // ignore
    }
  }, [])

  useEffect(() => {
    if (!mounted || typeof document === 'undefined') return
    document.documentElement.lang = lang === 'en' ? 'en' : 'es'
  }, [lang, mounted])

  const setLang = useCallback((next) => {
    const normalized = normalizeLang(next)
    setLangState(normalized)
    try {
      window.localStorage.setItem(STORAGE_KEY, normalized)
    } catch {
      // ignore
    }
  }, [])

  const t = useCallback(
    (key) => {
      const dict = translations[lang] || translations.es
      const value = getNested(dict, key)
      if (value !== undefined && value !== null) return String(value)
      const fallback = getNested(translations.es, key)
      return fallback != null ? String(fallback) : key
    },
    [lang]
  )

  const value = useMemo(
    () => ({
      lang,
      setLang,
      t,
      mounted,
      supportedLangs: SUPPORTED_LANGS,
    }),
    [lang, setLang, t, mounted]
  )

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) {
    throw new Error('useLanguage must be used within LanguageProvider')
  }
  return ctx
}
