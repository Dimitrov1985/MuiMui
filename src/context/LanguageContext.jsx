import { createContext, useContext, useState } from 'react'
import en from '../translations/en'
import th from '../translations/th'

const translations = { en, th }

const LanguageContext = createContext(null)

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState('en')
  const t = translations[lang]
  const toggle = () => setLang(l => (l === 'en' ? 'th' : 'en'))

  return (
    <LanguageContext.Provider value={{ lang, toggle, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLang() {
  return useContext(LanguageContext)
}
