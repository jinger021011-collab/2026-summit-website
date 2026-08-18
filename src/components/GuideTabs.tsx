import { Bus, Car, MapPin, Train, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { usePageContent } from '../i18n'
import { AccessibleTabs } from './AccessibleTabs'
import { ImageWithFallback } from './ImageWithFallback'
import { ASSETS } from '../data/assets'

function AttendanceGuide() {
  const { guide } = usePageContent()
  return <div className="guide-grid">{guide.attendance.map((section) => <article key={section.title}>
    <h3>{section.title}</h3>
    {section.paragraphs?.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
    {section.items && <ul>{section.items.map((item) => <li key={item}>{item}</li>)}</ul>}
  </article>)}</div>
}

function TransportGuide() {
  const { guide } = usePageContent()
  const icons = [MapPin, Train, Bus, Car]
  return <div className="transport-list">
    {guide.transport.map((item, index) => { const Icon = icons[index]; return <article key={item.title}><Icon aria-hidden="true" /><div><h3>{item.title}</h3><p>{item.body}</p></div></article> })}
    <p className="guide-notice">{guide.transportNotice}</p>
  </div>
}

function VenueMap() {
  const content = usePageContent()
  const { guide } = content
  const [open, setOpen] = useState(false)
  const trigger = useRef<HTMLButtonElement>(null)
  const close = useRef<HTMLButtonElement>(null)
  useEffect(() => {
    if (!open) return
    const triggerElement = trigger.current
    close.current?.focus()
    const handler = (event: KeyboardEvent) => { if (event.key === 'Escape') setOpen(false) }
    window.addEventListener('keydown', handler)
    return () => { window.removeEventListener('keydown', handler); triggerElement?.focus() }
  }, [open])
  const imageAlt = guide.map.imageAlt
  const imageSource = ASSETS.venueMap[content.language]
  return <div className="venue-map">
    <button ref={trigger} type="button" className="venue-trigger" onClick={() => setOpen(true)} aria-label={guide.map.openLabel}><ImageWithFallback src={imageSource} alt={imageAlt} loading="lazy" fallback={<p className="venue-fallback">{guide.map.unavailable}</p>} /><span>{guide.map.viewLarger}</span></button>
    {open && <div className="lightbox" role="dialog" aria-modal="true" aria-label={guide.map.dialogLabel}><button className="lightbox-scrim" type="button" aria-label={guide.map.closeLabel} onClick={() => setOpen(false)} /><div className="lightbox-content"><button ref={close} className="lightbox-close" type="button" aria-label={guide.map.closeLabel} onClick={() => setOpen(false)}><X aria-hidden="true" /></button><ImageWithFallback className="venue-map-full" src={imageSource} alt={imageAlt} loading="eager" fallback={<p className="venue-fallback">{guide.map.unavailable}</p>} /></div></div>}
  </div>
}

export function GuideTabs() {
  const { guide } = usePageContent()
  return <AccessibleTabs label={guide.label} tabs={[
    { id: 'guide-attendance', label: guide.tabs.attendance, content: <AttendanceGuide /> },
    { id: 'guide-transport', label: guide.tabs.transport, content: <TransportGuide /> },
    { id: 'guide-map', label: guide.tabs.map, content: <VenueMap /> },
  ]} />
}
