import type { RegistrationPosition } from '../types'

export const SITE = {
  registrationUrl: 'https://www.timecho.com/activity/2026-Summit',
  registrationPositions: [
    'navigation',
    'hero_bottom',
    'final_cta',
    'mobile_sticky',
  ] as RegistrationPosition[],
  links: {
    timecho: 'https://www.timecho.com/',
    iotdb: 'https://iotdb.apache.org/',
    privacy: 'https://www.timecho.com/agreement',
    globalPrivacy: 'https://www.timecho-global.com/agreement',
    halo: 'https://halo.run',
  },
  footer: {
    recordUrl: 'https://beian.miit.gov.cn/#/Integrated/recordQuery',
    socialLinks: [
      { label: 'Slack', href: 'https://apacheiotdb.slack.com/' },
      { label: 'Twitter', href: 'https://twitter.com/TimechoTech' },
      { label: 'LinkedIn', href: 'https://www.linkedin.com/company/timecho' },
      { label: 'GitHub', href: 'https://github.com/apache/iotdb' },
    ],
    navigationUrls: {
      zh: [
        ['https://www.timecho.com/product/timechodb', 'https://www.timecho.com/product/timechoai', 'https://www.timecho.com/product/iotdb-expert-support', 'https://www.timecho.com/product/workbench', 'https://www.timecho.com/product/timer'],
        ['https://www.timecho.com/tags/usercases', 'https://www.timecho.com/tags/knowledge', 'https://www.timecho.com/tags/shixushujuku', 'https://www.timecho.com/tags/introduction', 'https://www.timecho.com/tags/reports', 'https://www.timecho.com/tags/products', 'https://www.timecho.com/tags/awards', 'https://www.timecho.com/tags/activities'],
        ['https://www.timecho.com/aboutus', 'https://www.timecho.com/aboutus', 'https://www.timecho.com/aboutus#about-join-wrapper'],
      ],
      en: [
        ['https://www.timecho-global.com/product', 'https://www.timecho-global.com/product', 'https://www.timecho-global.com/product'],
        ['https://www.timecho-global.com/tags/awards-news', 'https://www.timecho-global.com/tags/activities'],
        ['https://www.timecho-global.com/tags/usercases', 'https://www.timecho-global.com/tags/reviews', 'https://www.timecho-global.com/tags/blogs-guides'],
        ['https://www.timecho-global.com/aboutus', 'https://www.timecho-global.com/aboutus#about-join-wrapper'],
      ],
    },
  },
} as const
