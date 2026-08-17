import { useEffect, useState } from 'react'
import { BrainCircuit, Building2, CalendarDays, DatabaseZap, MapPin, UsersRound } from 'lucide-react'
import { HIGHLIGHTS, SITE } from '../data/site'
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
  return <section id="top" className="hero" aria-labelledby="hero-title">
    <div className="hero-stage">
      <div className="hero-visual" aria-hidden="true">
        <img className="hero-art" src="/hero/【平面设计稿-非实物】2026时序数据技术创新大会(2)_02.png" alt="" fetchPriority="high" />
      </div>
      <h1 id="hero-title" className="sr-only">{SITE.name}</h1>
      <div className="hero-info-bar">
        <div className="hero-fact"><CalendarDays aria-hidden="true" /><span><small>大会时间</small><strong><time dateTime="2026-08-22">{SITE.dateShort}</time></strong></span></div>
        <div className="hero-fact"><MapPin aria-hidden="true" /><span><small>大会地点</small><strong>{SITE.venue}</strong></span></div>
        <RegistrationLink position="hero_bottom" className="button button-primary">立即报名</RegistrationLink>
      </div>
    </div>
  </section>
}

export function AboutSection() {
  return <section id="about" className="section section-light" aria-labelledby="about-title"><div className="container">
    <header className="section-heading"><p className="section-kicker">ABOUT THE SUMMIT</p><h2 id="about-title">关于大会</h2></header>
    <div className="about-copy"><p>2026 时序数据技术创新大会以“DB × AI”为主题，汇聚产学研各界专家、企业技术负责人及行业实践者，围绕时序数据库、时序大模型与工业数据智能展开深入交流。</p><p>大会将发布 TimechoDB 与 TimechoAI 全新融合产品矩阵，分享时序数据库与人工智能在航空航天、能源电力、石油化工、工业制造等场景中的实践成果，共同探讨数据库与 AI 深度融合的技术趋势与产业机会。</p></div>
    <div className="highlight-grid">{HIGHLIGHTS.map((item, index) => { const Icon = highlightIcons[index]; return <article className="highlight-card" key={item.title}><span className="highlight-icon"><Icon aria-hidden="true" /></span><h3>{item.title}</h3><p>{item.description}</p></article> })}</div>
  </div></section>
}

export function RegisterSection() {
  return <section id="register" className="register-section" aria-labelledby="register-title"><div className="register-glow" /><div className="container register-content"><p className="section-kicker">JOIN US IN BEIJING</p><h2 id="register-title">DB × AI<br />探索时序数据与人工智能融合的新未来</h2><p>2026 年 8 月 22 日，北京见！</p><RegistrationLink position="final_cta" className="button button-bright">立即报名</RegistrationLink><small>席位有限，请提前报名</small></div></section>
}

export function Footer() {
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

  return <div id="footer-area" className="footer-area">
    <footer id="site-footer" className="footer">
      <div className="official-footer-container">
        <div className="official-footer-main">
          <nav className="official-footer-nav" aria-label="Timecho 官网导航">
            {SITE.footer.navigation.map((group) => <details className="footer-nav-group" key={`${group.title}-${desktopNavigation}`} open={desktopNavigation}>
              <summary><span>{group.title}</span></summary>
              <ul>{group.links.map((link) => <li key={`${group.title}-${link.label}`}><a href={link.href} target="_blank" rel="noopener noreferrer">{link.label}</a></li>)}{group.title === '关于我们' && <li><button type="button" onClick={focusContact}>联系我们</button></li>}</ul>
            </details>)}
          </nav>
          <div className="footer-social-links" aria-label="Timecho 社交媒体">
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
                aria-label="显示 Timecho 公众号二维码"
                aria-expanded={wechatVisible}
                aria-haspopup="dialog"
                aria-controls="footer-wechat-qr"
                onClick={() => {
                  setWechatFocused(false)
                  setWechatPinned((visible) => !visible)
                }}
              ><WechatIcon /></button>
              <div id="footer-wechat-qr" className="wechat-qr-popover" data-testid="wechat-qr-popover" role="dialog" aria-label="Timecho 公众号二维码" hidden={!wechatVisible}>
                <img src="/timecho-wechat-qr.png" alt="Timecho 公众号二维码" />
              </div>
            </div>
            <a className="footer-social-control" href={SITE.footer.socialLinks[0].href} target="_blank" rel="noopener noreferrer" aria-label="Timecho Twitter/X"><XIcon /></a>
            <a className="footer-social-control" href={SITE.footer.socialLinks[1].href} target="_blank" rel="noopener noreferrer" aria-label="Apache IoTDB GitHub"><img className="footer-github-icon" src="/social/github.png" alt="" width="21" height="21" /></a>
          </div>
        </div>

        <div className="footer-contact-row">
          <div className="footer-contact" data-testid="official-contact" tabIndex={-1}>
            <p><span>地址：</span>北京市海淀区奥北科技园领智中心C座601</p>
            <p><span>电话：</span><a href="tel:010-62780978">010-62780978</a></p>
          </div>
          <div className="footer-legal-copy">
            <p>Copyright © 2026 Timecho Limited All rights reserved.</p>
            <p>Apache IoTDB及Apache IoTDB项目标志是Apache软件基金会（The Apache Software Foundation）的注册商标。</p>
          </div>
        </div>

        <div className="footer-compliance-row">
          <a href={SITE.links.privacy} target="_blank" rel="noopener noreferrer">隐私协议</a>
          <a href={SITE.footer.recordUrl} target="_blank" rel="noopener noreferrer">京ICP备2023002339号-1</a>
        </div>
      </div>
    </footer>
  </div>
}
