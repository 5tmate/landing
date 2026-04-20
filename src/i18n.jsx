import { createContext, useContext, useState } from 'react'
import { setLocale, getLocale } from '@/paraglide/runtime.js'

const LocaleContext = createContext(null)

export const LOCALES = [
  { code: 'en',    label: 'English',    short: 'EN'   },
  { code: 'zh-TW', label: '繁體中文',   short: '繁中' },
  { code: 'zh-SG', label: '简体中文',   short: '简中' },
  { code: 'id',    label: 'Bahasa',     short: 'ID'   },
  { code: 'th',    label: 'ภาษาไทย',   short: 'TH'   },
]

export function LanguageProvider({ children }) {
  const [locale, setLocaleState] = useState(getLocale())

  function changeLocale(newLocale) {
    setLocale(newLocale)
    setLocaleState(newLocale)
  }

  return (
    <LocaleContext.Provider value={{ locale, setLocale: changeLocale }}>
      {children}
    </LocaleContext.Provider>
  )
}

export function useLocale() {
  return useContext(LocaleContext)
}
