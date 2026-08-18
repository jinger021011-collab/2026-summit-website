/**
 * All page images are routed through one root so CDN migration remains a
 * single-configuration change.
 */
export const ASSET_BASE_URL = 'https://alioss.timecho.com/docs/img/2026_summit'

export const assetPath = (relativePath: string) => `${ASSET_BASE_URL}/${relativePath}`

export const speakerAsset = (id: number, slug: string) =>
  assetPath(`speakers/speaker-${String(id).padStart(2, '0')}-${slug}.png`)

export const logoAsset = (group: 'host' | 'organizer' | 'co-organizer' | 'partner' | 'media', order: number) =>
  assetPath(`logos/logo-${group}-${String(order).padStart(2, '0')}.png`)

export const ASSETS = {
  hero: {
    zh: assetPath('hero/hero-zh.jpg'),
    en: assetPath('hero/hero-en.jpeg'),
  },
  venueMap: {
    zh: assetPath('venue/venue-map.png'),
    en: assetPath('venue/venue-map-en.jpg'),
  },
  social: {
    slack: assetPath('social/slack.png'),
    github: assetPath('social/github.png'),
    linkedin: assetPath('social/linkedin.png'),
    wechatQr: assetPath('social/wechat-official-account-qr.png'),
  },
  headerLogo: assetPath('logos/logo-organizer-header.png'),
} as const
