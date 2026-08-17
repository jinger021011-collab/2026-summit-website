import { UserRound } from 'lucide-react'
import { SPEAKERS } from '../data/speakers'
import { ImageWithFallback } from './ImageWithFallback'

export function SpeakerGrid() {
  return (
    <div className="speaker-grid" data-testid="speaker-grid">
      {SPEAKERS.map((speaker) => (
        <article className="speaker-card" aria-label={speaker.name} key={speaker.id}>
          <div className="speaker-photo">
            <ImageWithFallback
              src={speaker.image}
              alt={`${speaker.name}照片`}
              loading="lazy"
              width="480"
              height="480"
              fallback={<span className="speaker-fallback" aria-label={`${speaker.name}照片暂缺`}><UserRound aria-hidden="true" /></span>}
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
