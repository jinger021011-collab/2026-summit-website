import { useEffect, useState } from 'react'
import { BrainCircuit, Building2, CalendarDays, DatabaseZap, MapPin, UsersRound } from 'lucide-react'
import { SITE } from '../data/site'
import { ASSETS } from '../data/assets'
import { usePageContent } from '../i18n'
import { RegistrationLink } from './RegistrationLink'

const highlightIcons = [DatabaseZap, BrainCircuit, Building2, UsersRound]

function XIcon() {
  return <svg aria-hidden="true" viewBox="0 0 24 24" fill="none"><path d="M5 4.5 19 19.5M19 4.5 5 19.5" /></svg>
}

function WechatIcon() {
  return <svg aria-hidden="true" viewBox="0 0 24 24" fill="none">
    <path d="M13.8 14.8c-1.1.7-2.5 1.1-4 1.1-.8 0-1.6-.1-2.3-.3L4 17.3l.8-3.1C3.7 13.2 3 11.9 3 10.5 3 7.5 6 5 9.8 5s6.8 2.5 6.8 5.5c0 .4-.1.8-.2 1.2" />
    <path d="M21 15.1c0 1.2-.6 2.3-1.5 3.1l.6 2.4-2.7-1.3c-.6.2-1.2.3-1.9.3-3 0-5.5-2-5.5-4.5s2.5-4.5 5.5-4.5 5.5 2 5.5 4.5Z" />
    <path d="M7.3 9.1h.1M12 9.1h.1M14.1 14.2h.1M18 14.2h.1" />
  </svg>
}

export function HeroSection() {
  const content = usePageContent()
  return <section id="top" className="hero" aria-labelledby="hero-title">
    <div className="hero-stage">
      <div className="hero-visual" aria-hidden="true">
        <img className="hero-art" src={content.site.heroImage} alt="" fetchPriority="high" />
      </div>
      <h1 id="hero-title" className="sr-only">{content.site.name}</h1>
      <div className="hero-info-bar">
        <div className="hero-fact"><CalendarDays aria-hidden="true" /><span><small>{content.site.dateLabel}</small><strong><time dateTime="2026-08-22">{content.site.dateShort}</time></strong></span></div>
        <div className="hero-fact"><MapPin aria-hidden="true" /><span><small>{content.site.venueLabel}</small><strong>{content.site.venue}</strong></span></div>
        <RegistrationLink position="hero_bottom" className="button button-primary">{content.common.register}</RegistrationLink>
      </div>
    </div>
  </section>
}

export function AboutSection() {
  const content = usePageContent()
  return <section id="about" className="section section-light" aria-labelledby="about-title"><div className="container">
    <header className="section-heading"><p className="section-kicker">ABOUT THE SUMMIT</p><h2 id="about-title">{content.sections.about}</h2></header>
    <div className="about-copy">{content.about.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div>
    <div className="highlight-grid">{content.about.highlights.map((item, index) => { const Icon = highlightIcons[index]; return <article className="highlight-card" key={item.title}><span className="highlight-icon"><Icon aria-hidden="true" /></span><h3>{item.title}</h3><p>{item.description}</p></article> })}</div>
  </div></section>
}

export function RegisterSection() {
  const content = usePageContent()
  return <section id="register" className="register-section" aria-labelledby="register-title"><div className="register-glow" /><div className="container register-content"><p className="section-kicker">JOIN US IN BEIJING</p><h2 id="register-title">{content.register.heading[0]}<br />{content.register.heading[1]}</h2><p>{content.register.supporting}</p><RegistrationLink position="final_cta" className="button button-bright">{content.common.register}</RegistrationLink><small>{content.register.limited}</small></div></section>
}

export function Footer() {
  const content = usePageContent()
  const [desktopNavigation, setDesktopNavigation] = useState(() => typeof window === 'undefined' || window.matchMedia('(min-width: 601px)').matches)
  const [wechatPinned, setWechatPinned] = useState(false)
  const [wechatHovered, setWechatHovered] = useState(false)
  const [wechatFocused, setWechatFocused] = useState(false)
  const wechatVisible = wechatPinned || wechatHovered || wechatFocused

  useEffect(() => {
    const media = window.matchMedia('(min-width: 601px)')
    const updateNavigationMode = () => setDesktopNavigation(media.matches)
    updateNavigationMode()
    media.addEventListener('change', updateNavigationMode)
    return () => media.removeEventListener('change', updateNavigationMode)
  }, [])

  const focusContact = () => {
    const contact = document.querySelector<HTMLElement>('[data-testid="official-contact"]')
    contact?.scrollIntoView?.({ behavior: 'smooth', block: 'center' })
    contact?.focus({ preventScroll: true })
  }

  return <div id="footer-area" className={`footer-area footer-${content.language}`}>
    <footer id="site-footer" className="footer">
      <div className="official-footer-container">
        <div className="official-footer-main">
          <nav className="official-footer-nav" aria-label={content.footer.navigationLabel}>
            {content.footer.navigation.map((group, groupIndex) => <details className="footer-nav-group" key={`${group.title}-${desktopNavigation}`} open={desktopNavigation}>
              <summary><span>{group.title}</span></summary>
              <ul>{group.links.map((label, linkIndex) => <li key={`${group.title}-${label}`}><a href={SITE.footer.navigationUrls[content.language][groupIndex][linkIndex]} target="_blank" rel="noopener noreferrer">{label}</a></li>)}{groupIndex === content.footer.navigation.length - 1 && <li><button type="button" onClick={focusContact}>{content.footer.contactUs}</button></li>}</ul>
            </details>)}
          </nav>
          <div className="footer-social-links" aria-label={content.footer.socialLabel}>
            {content.language === 'zh' ? <>
            <div
              className="footer-wechat"
              onMouseEnter={() => setWechatHovered(true)}
              onMouseLeave={() => setWechatHovered(false)}
              onFocusCapture={() => setWechatFocused(true)}
              onBlurCapture={(event) => {
                if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setWechatFocused(false)
              }}
            >
              <button
                className="footer-social-control"
                type="button"
                aria-label={content.footer.wechatButton}
                aria-expanded={wechatVisible}
                aria-haspopup="dialog"
                aria-controls="footer-wechat-qr"
                onClick={() => {
                  setWechatFocused(false)
                  setWechatPinned((visible) => !visible)
                }}
              ><WechatIcon /></button>
              <div id="footer-wechat-qr" className="wechat-qr-popover" data-testid="wechat-qr-popover" role="dialog" aria-label={content.footer.wechatDialog} hidden={!wechatVisible}>
                <img src={ASSETS.social.wechatQr} alt={content.footer.wechatImageAlt} />
              </div>
            </div>
            <a className="footer-social-control" href={SITE.footer.socialLinks[1].href} target="_blank" rel="noopener noreferrer" aria-label={content.footer.twitterLabel}><XIcon /></a>
            <a className="footer-social-control" href={SITE.footer.socialLinks[3].href} target="_blank" rel="noopener noreferrer" aria-label={content.footer.githubLabel}><img className="footer-github-icon" src={ASSETS.social.github} alt="" width="21" height="21" /></a>
            </> : <>
              <a className="footer-social-control" href={SITE.footer.socialLinks[0].href} target="_blank" rel="noopener noreferrer" aria-label={content.footer.slackLabel}><img className="footer-brand-icon" src={ASSETS.social.slack} alt="" width="21" height="21" /></a>
              <a className="footer-social-control" href={SITE.footer.socialLinks[1].href} target="_blank" rel="noopener noreferrer" aria-label={content.footer.twitterLabel}><XIcon /></a>
              <a className="footer-social-control" href={SITE.footer.socialLinks[2].href} target="_blank" rel="noopener noreferrer" aria-label={content.footer.linkedinLabel}><img className="footer-brand-icon" src={ASSETS.social.linkedin} alt="" width="21" height="21" /></a>
              <a className="footer-social-control" href={SITE.footer.socialLinks[3].href} target="_blank" rel="noopener noreferrer" aria-label={content.footer.githubLabel}><img className="footer-github-icon" src={ASSETS.social.github} alt="" width="21" height="21" /></a>
            </>}
          </div>
        </div>

        <div className="footer-contact-row">
          <div className="footer-contact" data-testid="official-contact" tabIndex={-1}>
            <p><span>{content.footer.addressLabel}</span>{content.footer.address}</p>
            {content.language === 'zh' && <p><span>{content.footer.phoneLabel}</span><a href="tel:010-62780978">010-62780978</a></p>}
          </div>
          <div className="footer-legal-copy">
            <p>{content.footer.copyright}{content.footer.poweredByHalo && <> Powered by <a href={SITE.links.halo} target="_blank" rel="noopener noreferrer">Halo</a>.</>}</p>
            <p>{content.footer.trademark}</p>
          </div>
        </div>

        <div className="footer-compliance-row">
          <a href={content.language === 'en' ? SITE.links.globalPrivacy : SITE.links.privacy} target="_blank" rel="noopener noreferrer">{content.footer.privacy}</a>
          {content.footer.record && <a href={SITE.footer.recordUrl} target="_blank" rel="noopener noreferrer">{content.footer.record}</a>}
        </div>
      </div>
    </footer>
  </div>
}
