import { Menu, X } from 'lucide-react'
import { useEffect, useRef, useState, type MouseEvent } from 'react'
import { useTranslation } from 'react-i18next'
import { SITE } from '../data/site'
import { ASSETS } from '../data/assets'
import { usePageContent } from '../i18n'
import { getLocalizedUrl } from '../i18n/routing'
import type { Language } from '../i18n/types'
import { RegistrationLink } from './RegistrationLink'

interface HeaderProps {
  activeSection: string
}

export function Header({ activeSection }: HeaderProps) {
  const content = usePageContent()
  const { i18n } = useTranslation()
  const [open, setOpen] = useState(false)
  const menuButton = useRef<HTMLButtonElement>(null)
  const closeButton = useRef<HTMLButtonElement>(null)
  const mobileMenu = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!open) return
    const originalOverflow = document.body.style.overflow
    const triggerElement = menuButton.current
    document.body.style.overflow = 'hidden'
    closeButton.current?.focus()
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false)
      } else if (event.key === 'Tab' && mobileMenu.current) {
        const focusable = Array.from(mobileMenu.current.querySelectorAll<HTMLElement>('a, button'))
        const first = focusable[0]
        const last = focusable[focusable.length - 1]
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault()
          last.focus()
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault()
          first.focus()
        }
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.style.overflow = originalOverflow
      window.removeEventListener('keydown', onKeyDown)
      triggerElement?.focus()
    }
  }, [open])

  const switchLanguage = (language: Language) => (event: MouseEvent<HTMLAnchorElement>) => {
    if (content.language === language) return
    event.preventDefault()
    const target = getLocalizedUrl(language)
    window.history.pushState(null, '', target)
    void i18n.changeLanguage(language)
  }

  const languageSwitcher = <nav className="language-switcher" aria-label={content.header.languageNavigation}>
    <a href={getLocalizedUrl('zh')} aria-current={content.language === 'zh' ? 'page' : undefined} onClick={switchLanguage('zh')}>中文</a>
    <span aria-hidden="true">/</span>
    <a href={getLocalizedUrl('en')} aria-current={content.language === 'en' ? 'page' : undefined} onClick={switchLanguage('en')}>EN</a>
  </nav>

  return <>
    <header className="site-header">
      <div className="header-inner">
        <a className="brand" href={SITE.links.timecho} target="_blank" rel="noopener noreferrer" aria-label={content.header.homeLabel}>
          <img src={ASSETS.headerLogo} alt={content.header.logoAlt} />
        </a>
        <nav className="desktop-nav" aria-label={content.header.mainNavigation}>
          {content.site.navigation.map((item) => (
            <a key={item.href} href={item.href} aria-current={activeSection === item.href.slice(1) ? 'location' : undefined}>
              {item.label}
            </a>
          ))}
        </nav>
        {languageSwitcher}
        <RegistrationLink position="navigation" className="button button-small header-cta">{content.common.register}</RegistrationLink>
        <button
          ref={menuButton}
          className="menu-trigger"
          type="button"
          aria-label={content.header.openMenu}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen(true)}
        >
          <Menu aria-hidden="true" />
        </button>
      </div>
    </header>
    {open && (
      <div className="mobile-menu-layer">
        <button className="menu-scrim" type="button" aria-label={content.header.closeMenu} onClick={() => setOpen(false)} />
        <nav ref={mobileMenu} id="mobile-menu" className="mobile-menu" aria-label={content.header.mobileNavigation}>
          <div className="mobile-menu-head">
            <span>{content.header.navigation}</span>
            <button ref={closeButton} type="button" aria-label={content.header.closeMenu} onClick={() => setOpen(false)}>
              <X aria-hidden="true" />
            </button>
          </div>
          {content.site.navigation.map((item) => (
            <a key={item.href} href={item.href} onClick={() => setOpen(false)}>{item.label}</a>
          ))}
          {languageSwitcher}
        </nav>
      </div>
    )}
  </>
}
