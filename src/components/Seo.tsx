import { useEffect } from 'react'
import { usePageContent } from '../i18n'

function ensureMeta(name: string) {
  let element = document.head.querySelector<HTMLMetaElement>(`meta[name="${name}"]`)
  if (!element) {
    element = document.createElement('meta')
    element.name = name
    document.head.append(element)
  }
  return element
}

function ensureAlternate(hreflang: string) {
  let element = document.head.querySelector<HTMLLinkElement>(`link[rel="alternate"][hreflang="${hreflang}"]`)
  if (!element) {
    element = document.createElement('link')
    element.rel = 'alternate'
    element.hreflang = hreflang
    document.head.append(element)
  }
  return element
}

export function Seo() {
  const content = usePageContent()

  useEffect(() => {
    document.documentElement.lang = content.language === 'en' ? 'en' : 'zh-CN'
    document.title = content.seo.title
    ensureMeta('description').content = content.seo.description
    ensureAlternate('zh-CN').href = '/'
    ensureAlternate('en').href = '/en'
    ensureAlternate('x-default').href = '/'
  }, [content])

  return null
}
