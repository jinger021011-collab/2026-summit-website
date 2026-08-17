import type { PartnerGroup, PartnerItem } from '../types'

const numericItems = (folder: string, count: number, groupLabel: string): PartnerItem[] =>
  Array.from({ length: count }, (_, index) => ({
    order: index + 1,
    image: `/logos/normalized/${folder}/${index + 1}.png`,
    alt: `${groupLabel} Logo ${index + 1}`,
  }))

export const PARTNER_GROUPS: PartnerGroup[] = [
  { id: 'host', title: '主办单位', items: numericItems('主办单位', 1, '主办单位') },
  {
    id: 'organizer',
    title: '承办单位',
    items: [{ order: 1, image: '/logos/normalized/承办单位/20260813-161454.png', alt: '承办单位 Logo' }],
  },
  { id: 'co-organizers', title: '协办单位', items: numericItems('协办单位', 3, '协办单位') },
  { id: 'partners', title: '赞助商／合作伙伴', items: numericItems('合作伙伴', 12, '合作伙伴') },
  { id: 'media', title: '合作媒体', items: numericItems('合作媒体', 6, '合作媒体') },
]
