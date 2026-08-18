import { UserRound } from 'lucide-react'
import { usePageContent } from '../i18n'
import { ImageWithFallback } from './ImageWithFallback'

export function SpeakerGrid() {
  const { speakers } = usePageContent()
  return (
    <div className="speaker-grid" data-testid="speaker-grid">
      {speakers.items.map((speaker) => (
        <article className="speaker-card" aria-label={speaker.name} key={speaker.id}>
          <div className="speaker-photo">
            <ImageWithFallback
              src={speaker.image}
              alt={speakers.photoAlt(speaker.name)}
              loading="lazy"
              width="480"
              height="480"
              fallback={<span className="speaker-fallback" aria-label={speakers.photoUnavailable(speaker.name)}><UserRound aria-hidden="true" /></span>}
            />
          </div>
          <div className="speaker-info">
            <h3>{speaker.name}</h3>
            {speaker.organization && (
              <p className="speaker-detail speaker-organization">{speaker.organization}</p>
            )}
            {speaker.role && (
              <p className="speaker-detail speaker-role">{speaker.role}</p>
            )}
          </div>
        </article>
      ))}
    </div>
  )
}
