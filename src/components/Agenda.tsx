import { usePageContent } from '../i18n'
import type { AgendaTalk } from '../types'
import { AccessibleTabs } from './AccessibleTabs'

function TalkMeta({ organization, role }: Pick<AgendaTalk, 'organization' | 'role'>) {
  if (!organization && !role) return null
  return (
    <span className="talk-meta">
      <span className="talk-separator" aria-hidden="true">｜</span>
      {organization && <span className="talk-organization">{organization}</span>}
      {organization && role && <span className="talk-role-separator" aria-hidden="true">｜</span>}
      {role && <span className="talk-role">{role}</span>}
    </span>
  )
}

function Talk({ talk }: { talk?: AgendaTalk }) {
  if (!talk) return <span aria-hidden="true">—</span>
  return (
    <div className="talk">
      <strong>{talk.topic}</strong>
      {talk.subtitle && <span className="talk-subtitle">{talk.subtitle}</span>}
      {talk.participants ? talk.participants.map((participant) => (
        <span className="talk-participant" key={`${participant.name}-${participant.role ?? ''}`}>
          <span className="talk-speaker">{participant.name}</span>
          <TalkMeta organization={participant.organization} role={participant.role} />
        </span>
      )) : (
        talk.speaker && (
          <span className="talk-speaker-line">
            <span className="talk-speaker">{talk.speaker}</span>
            <TalkMeta organization={talk.organization} role={talk.role} />
          </span>
        )
      )}
    </div>
  )
}

function MainTimeline() {
  const { agenda } = usePageContent()
  return (
    <div className="timeline">
      {agenda.main.map((row) => (
        <article className={`timeline-card${row.kind === 'ceremony' ? ' ceremony-card' : ''}`} key={row.time}>
          <time>{row.time}</time>
          <Talk talk={row} />
        </article>
      ))}
    </div>
  )
}

function BreakoutTimeline({ field }: { field: 'technical' | 'caseOne' | 'caseTwo' }) {
  const { agenda } = usePageContent()
  return (
    <div className="timeline">
      {agenda.breakouts.filter((row) => row.break || row[field]).map((row) => (
        <article className={`timeline-card${row.break ? ' break-card' : ''}`} key={row.time}>
          <time>{row.time}</time>
          {row.break ? <strong>{agenda.breakLabel}</strong> : <Talk talk={row[field]} />}
        </article>
      ))}
    </div>
  )
}

export function Agenda() {
  const { agenda } = usePageContent()
  const tabs = [
    { id: 'agenda-main', label: agenda.tabs.main, content: <MainTimeline /> },
    { id: 'agenda-technical', label: agenda.tabs.technical, content: <BreakoutTimeline field="technical" /> },
    { id: 'agenda-case-one', label: agenda.tabs.caseOne, content: <BreakoutTimeline field="caseOne" /> },
    { id: 'agenda-case-two', label: agenda.tabs.caseTwo, content: <BreakoutTimeline field="caseTwo" /> },
  ]

  return <AccessibleTabs className="agenda-tabs" label={agenda.label} tabs={tabs} />
}
