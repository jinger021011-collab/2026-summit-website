export type RegistrationPosition = 'navigation' | 'hero_bottom' | 'final_cta' | 'mobile_sticky'

export interface NavigationItem {
  label: string
  href: `#${string}`
}

export interface AgendaTalk {
  topic: string
  subtitle?: string
  speaker?: string
  organization?: string
  role?: string
  participants?: AgendaParticipant[]
  kind?: 'talk' | 'break' | 'opening' | 'ceremony'
}

export interface AgendaParticipant {
  name: string
  organization?: string
  role?: string
}

export interface MainAgendaRow extends AgendaTalk {
  time: string
}

export interface BreakoutAgendaRow {
  time: string
  technical?: AgendaTalk
  caseOne?: AgendaTalk
  caseTwo?: AgendaTalk
  break?: boolean
}

export interface Speaker {
  id: number
  name: string
  organization?: string
  role?: string
  image: string
  imagePosition?: string
}

export interface PartnerItem {
  order: number
  image: string
  alt: string
  href?: string
}

export interface PartnerGroup {
  id: 'host' | 'organizer' | 'co-organizers' | 'partners' | 'media'
  title: string
  items: PartnerItem[]
}
