import type { Language } from './types'

interface LocationParts {
  pathname: string
  search: string
  hash: string
}

export function getLanguageFromPath(pathname: string): Language {
  return /^\/en(?:\/|$)/.test(pathname) ? 'en' : 'zh'
}

export function getLocalizedUrl(language: Language, location: LocationParts = window.location): string {
  const pathname = language === 'en' ? '/en' : '/'
  return `${pathname}${location.search}${location.hash}`
}
