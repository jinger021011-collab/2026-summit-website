import { Menu, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { SITE } from '../data/site'
import { RegistrationLink } from './RegistrationLink'

interface HeaderProps {
  activeSection: string
}

export function Header({ activeSection }: HeaderProps) {
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

  return (
    <header className="site-header">
      <div className="header-inner">
        <a className="brand" href="#top" aria-label="2026 时序数据技术创新大会首页">
          <img src="/logos/承办单位/20260813-161454.png" alt="Timecho 天谋科技" />
        </a>
        <nav className="desktop-nav" aria-label="主导航">
          {SITE.navigation.map((item) => (
            <a key={item.href} href={item.href} aria-current={activeSection === item.href.slice(1) ? 'location' : undefined}>
              {item.label}
            </a>
          ))}
        </nav>
        <RegistrationLink position="navigation" className="button button-small header-cta">立即报名</RegistrationLink>
        <button
          ref={menuButton}
          className="menu-trigger"
          type="button"
          aria-label="打开导航菜单"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen(true)}
        >
          <Menu aria-hidden="true" />
        </button>
      </div>
      {open && (
        <div className="mobile-menu-layer">
          <button className="menu-scrim" type="button" aria-label="关闭导航菜单" onClick={() => setOpen(false)} />
          <nav ref={mobileMenu} id="mobile-menu" className="mobile-menu" aria-label="移动端导航">
            <div className="mobile-menu-head">
              <span>导航</span>
              <button ref={closeButton} type="button" aria-label="关闭导航菜单" onClick={() => setOpen(false)}>
                <X aria-hidden="true" />
              </button>
            </div>
            {SITE.navigation.map((item) => (
              <a key={item.href} href={item.href} onClick={() => setOpen(false)}>{item.label}</a>
            ))}
          </nav>
        </div>
      )}
    </header>
  )
}
