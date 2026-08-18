import type { PartnerGroup, PartnerItem } from '../types'
import { logoAsset } from './assets'

const numericItems = (group: 'co-organizer' | 'partner' | 'media', count: number): PartnerItem[] =>
  Array.from({ length: count }, (_, index) => ({
    order: index + 1,
    image: logoAsset(group, index + 1),
    alt: '',
  }))

export const PARTNER_GROUPS: PartnerGroup[] = [
  { id: 'host', title: '', items: [{ order: 1, image: logoAsset('host', 1), alt: '' }] },
  {
    id: 'organizer',
    title: '',
    items: [{ order: 1, image: logoAsset('organizer', 1), alt: '' }],
  },
  { id: 'co-organizers', title: '', items: numericItems('co-organizer', 3) },
  { id: 'partners', title: '', items: numericItems('partner', 12) },
  { id: 'media', title: '', items: numericItems('media', 6) },
]
