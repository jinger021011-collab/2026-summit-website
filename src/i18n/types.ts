import type { AgendaTalk, BreakoutAgendaRow, MainAgendaRow, NavigationItem, PartnerGroup, Speaker } from '../types'

export type Language = 'zh' | 'en'

export interface PageContent {
  language: Language
  seo: { title: string; description: string }
  common: {
    register: string
    skipToContent: string
    backToTop: string
    imageUnavailable: string
    logoUnavailable: string
  }
  site: {
    name: string
    dateLabel: string
    dateShort: string
    venueLabel: string
    venue: string
    heroImage: string
    navigation: NavigationItem[]
  }
  header: {
    homeLabel: string
    logoAlt: string
    mainNavigation: string
    openMenu: string
    closeMenu: string
    mobileNavigation: string
    navigation: string
    languageNavigation: string
  }
  sections: {
    about: string
    agenda: string
    speakers: string
    partners: string
    guide: string
  }
  about: {
    paragraphs: string[]
    highlights: Array<{ title: string; description: string }>
  }
  agenda: {
    label: string
    breakLabel: string
    tabs: { main: string; technical: string; caseOne: string; caseTwo: string }
    main: MainAgendaRow[]
    breakouts: BreakoutAgendaRow[]
  }
  speakers: {
    items: Speaker[]
    photoAlt: (name: string) => string
    photoUnavailable: (name: string) => string
  }
  partners: {
    titles: Record<PartnerGroup['id'], string>
    logoAlt: (group: string, order: number) => string
  }
  guide: {
    label: string
    tabs: { attendance: string; transport: string; map: string }
    attendance: Array<{ title: string; paragraphs?: string[]; items?: string[] }>
    transport: Array<{ title: string; body: string }>
    transportNotice: string
    map: {
      imageAlt: string
      viewLarger: string
      openLabel: string
      dialogLabel: string
      closeLabel: string
      unavailable: string
    }
  }
  register: {
    heading: [string, string]
    supporting: string
    limited: string
    mobileSupporting: string
  }
  footer: {
    navigationLabel: string
    socialLabel: string
    navigation: Array<{ title: string; links: string[] }>
    contactUs: string
    addressLabel: string
    address: string
    phoneLabel: string
    copyright: string
    poweredByHalo: boolean
    trademark: string
    privacy: string
    record: string
    wechatButton: string
    wechatDialog: string
    wechatImageAlt: string
    twitterLabel: string
    githubLabel: string
    slackLabel: string
    linkedinLabel: string
  }
}

export type LocalizedAgendaTalk = AgendaTalk
