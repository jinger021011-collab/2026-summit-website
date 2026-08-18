import { useEffect, useState } from 'react'
import { Agenda } from './components/Agenda'
import { FloatingActions } from './components/FloatingActions'
import { GuideTabs } from './components/GuideTabs'
import { Header } from './components/Header'
import { PartnerGrid } from './components/PartnerGrid'
import { SpeakerGrid } from './components/SpeakerGrid'
import { AboutSection, Footer, HeroSection, RegisterSection } from './components/sections'
import { Seo } from './components/Seo'
import { usePageContent } from './i18n'
import { shouldShowMobileRegistration } from './lib/visibility'

const sectionIds = ['about', 'agenda', 'speakers', 'partners', 'guide']

export default function App() {
  const content = usePageContent()
  const [activeSection, setActiveSection] = useState('')
  const [pastHero, setPastHero] = useState(false)
  const [registerVisible, setRegisterVisible] = useState(false)
  const [footerVisible, setFooterVisible] = useState(false)
  const [showBackToTop, setShowBackToTop] = useState(false)

  useEffect(() => {
    if (!('IntersectionObserver' in window)) return
    const sectionObserver = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
      if (visible) setActiveSection(visible.target.id)
    }, { rootMargin: '-25% 0px -60%', threshold: [0, 0.1, 0.5] })
    sectionIds.forEach((id) => { const element = document.getElementById(id); if (element) sectionObserver.observe(element) })
    const hero = document.getElementById('top')
    const register = document.getElementById('register')
    const footer = document.getElementById('footer-area')
    const heroObserver = new IntersectionObserver(([entry]) => setPastHero(!entry.isIntersecting), { threshold: 0.1 })
    const registerObserver = new IntersectionObserver(([entry]) => setRegisterVisible(entry.isIntersecting), { threshold: 0.2 })
    const footerObserver = new IntersectionObserver(([entry]) => setFooterVisible(entry.isIntersecting), { threshold: 0.02 })
    if (hero) heroObserver.observe(hero)
    if (register) registerObserver.observe(register)
    if (footer) footerObserver.observe(footer)
    return () => { sectionObserver.disconnect(); heroObserver.disconnect(); registerObserver.disconnect(); footerObserver.disconnect() }
  }, [])

  useEffect(() => {
    const onScroll = () => setShowBackToTop(window.scrollY > window.innerHeight)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return <>
    <Seo />
    <a className="skip-link" href="#main-content">{content.common.skipToContent}</a>
    <Header activeSection={activeSection} />
    <main id="main-content">
      <HeroSection />
      <AboutSection />
      <section id="agenda" className="section section-tint" aria-labelledby="agenda-title"><div className="agenda-container"><header className="section-heading"><p className="section-kicker">PROGRAM</p><h2 id="agenda-title">{content.sections.agenda}</h2></header><Agenda /></div></section>
      <section id="speakers" className="section section-light" aria-labelledby="speakers-title"><div className="speakers-container"><header className="section-heading"><p className="section-kicker">SPEAKERS</p><h2 id="speakers-title">{content.sections.speakers}</h2></header><SpeakerGrid /></div></section>
      <section id="partners" className="section section-tint" aria-labelledby="partners-title"><div className="container"><header className="section-heading"><p className="section-kicker">PARTNERS</p><h2 id="partners-title">{content.sections.partners}</h2></header><PartnerGrid /></div></section>
      <section id="guide" className="section section-light" aria-labelledby="guide-title"><div className="container"><header className="section-heading"><p className="section-kicker">ATTENDEE GUIDE</p><h2 id="guide-title">{content.sections.guide}</h2></header><GuideTabs /></div></section>
      <RegisterSection />
    </main>
    <Footer />
    <FloatingActions showRegistration={shouldShowMobileRegistration({ pastHero, registerVisible, footerVisible })} showBackToTop={showBackToTop} />
  </>
}
