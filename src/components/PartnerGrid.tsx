import { PARTNER_GROUPS } from '../data/partners'
import { ImageWithFallback } from './ImageWithFallback'

export function PartnerGrid() {
  return <div className="partner-groups">{PARTNER_GROUPS.filter((group) => group.items.length).map((group) => (
    <section className="partner-group" key={group.id} aria-labelledby={`partner-${group.id}`}>
      <h3 id={`partner-${group.id}`}>{group.title}</h3>
      <div className="logo-grid">
        {group.items.map((item) => {
          const image = <ImageWithFallback src={item.image} alt={item.alt} loading="lazy" fallback={<span className="logo-fallback" aria-label={item.alt}>Logo 暂不可用</span>} />
          return item.href ? <a className="logo-card" href={item.href} target="_blank" rel="noopener noreferrer" key={item.order}>{image}</a> : <div className="logo-card" key={item.order}>{image}</div>
        })}
      </div>
    </section>
  ))}</div>
}
