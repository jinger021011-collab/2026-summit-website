import i18n from 'i18next'
import { initReactI18next, useTranslation } from 'react-i18next'
import { en } from './locales/en'
import { zh } from './locales/zh'
import { getLanguageFromPath } from './routing'
import type { Language, PageContent } from './types'

const content: Record<Language, PageContent> = { zh, en }

void i18n.use(initReactI18next).init({
  lng: getLanguageFromPath(window.location.pathname),
  fallbackLng: 'zh',
  resources: {
    zh: { translation: { languageName: '中文' } },
    en: { translation: { languageName: 'English' } },
  },
  interpolation: { escapeValue: false },
})

export function usePageContent(): PageContent {
  const { i18n: instance } = useTranslation()
  const language = getLanguageFromPath(window.location.pathname)
  if (instance.resolvedLanguage !== language) void instance.changeLanguage(language)
  return content[language]
}

export { i18n }
export type { Language, PageContent }
