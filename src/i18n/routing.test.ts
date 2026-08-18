import { describe, expect, it } from 'vitest'
import { getLanguageFromPath, getLocalizedUrl } from './routing'

describe('language routing', () => {
  it('uses Chinese for the root path and English for /en', () => {
    expect(getLanguageFromPath('/')).toBe('zh')
    expect(getLanguageFromPath('/en')).toBe('en')
    expect(getLanguageFromPath('/en/')).toBe('en')
  })

  it('builds localized URLs without losing search parameters or the active section', () => {
    const location = { pathname: '/', search: '?source=nav', hash: '#agenda' }

    expect(getLocalizedUrl('en', location)).toBe('/en?source=nav#agenda')
    expect(getLocalizedUrl('zh', { ...location, pathname: '/en' })).toBe('/?source=nav#agenda')
  })
})
