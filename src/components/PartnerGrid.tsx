import { PARTNER_GROUPS } from '../data/partners'
import { usePageContent } from '../i18n'
import { ImageWithFallback } from './ImageWithFallback'

export function PartnerGrid() {
  const { partners, common } = usePageContent()
  return <div className="partner-groups">{PARTNER_GROUPS.filter((group) => group.items.length).map((group) => (
    <section className="partner-group" key={group.id} aria-labelledby={`partner-${group.id}`}>
      <h3 id={`partner-${group.id}`}>{partners.titles[group.id]}</h3>
      <div className="logo-grid">
        {group.items.map((item) => {
          const alt = partners.logoAlt(partners.titles[group.id], item.order)
          const image = <ImageWithFallback src={item.image} alt={alt} loading="lazy" fallback={<span className="logo-fallback" aria-label={alt}>{common.logoUnavailable}</span>} />
          return item.href ? <a className="logo-card" href={item.href} target="_blank" rel="noopener noreferrer" key={item.order}>{image}</a> : <div className="logo-card" key={item.order}>{image}</div>
        })}
      </div>
    </section>
  ))}</div>
}
