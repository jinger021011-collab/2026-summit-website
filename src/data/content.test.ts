import { describe, expect, it } from 'vitest'
import { SITE } from './site'
import { AGENDA } from './agenda'
import { SPEAKERS } from './speakers'
import { PARTNER_GROUPS } from './partners'

describe('大会内容数据', () => {
  it('所有报名入口共享官方地址并覆盖四个统计位置', () => {
    expect(SITE.registrationUrl).toBe('https://www.timecho.com/activity/2026-Summit')
    expect(SITE.registrationPositions).toEqual([
      'navigation',
      'hero_bottom',
      'final_cta',
      'mobile_sticky',
    ])
  })

  it('案例分论坛一包含已确认的陈学峰场次', () => {
    const session = AGENDA.breakouts.find((row) => row.time === '16:15–16:45')
    expect(session?.caseOne).toMatchObject({
      topic: '城市轨道交通供电智能运维场景时序数据库应用',
      speaker: '陈学峰',
      organization: '上海玖道信息科技股份有限公司',
      role: '副总经理',
    })
  })

  it('案例分论坛一新增陶术江场次并将齐一凡顺延至下一时段', () => {
    const taoSession = AGENDA.breakouts.find((row) => row.time === '16:45–17:15')
    const qiSession = AGENDA.breakouts.find((row) => row.time === '17:15–17:45')

    expect(taoSession?.caseOne).toEqual({
      topic: 'IoTDB × CISDigital AIoT：流程工业智能化实践',
      speaker: '陶术江',
      organization: '中冶赛迪信息技术（重庆）有限公司',
      role: 'AIoT 平台总监',
    })
    expect(qiSession?.caseOne).toMatchObject({
      speaker: '齐一凡',
      organization: '中国地质大学',
      role: '博士',
    })
    expect(taoSession?.caseOne?.speaker).not.toBe('齐一凡')
  })

  it('展示全部 21 位已确认嘉宾并将陶术江排在陈学峰之后', () => {
    expect(SPEAKERS).toHaveLength(21)
    expect(SPEAKERS[11]).toMatchObject({
      name: '陈学峰',
      image: '/speakers/12.jpeg',
    })
    expect(SPEAKERS[12]).toMatchObject({
      name: '陶术江',
      organization: '中冶赛迪信息技术（重庆）有限公司',
      role: 'AIoT 平台总监',
      image: '/speakers/21.jpg',
    })
    expect(SPEAKERS[20]).toMatchObject({
      name: '黄居鑫',
      image: '/speakers/20.jpg',
    })
  })

  it('每组 Logo 按数字顺序排列', () => {
    const partners = PARTNER_GROUPS.find((group) => group.id === 'partners')
    const media = PARTNER_GROUPS.find((group) => group.id === 'media')
    expect(partners?.items.map((item) => item.order)).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12])
    expect(media?.items.map((item) => item.order)).toEqual([1, 2, 3, 4, 5, 6])
  })

  it('全部 Logo 使用标准化素材副本', () => {
    const logos = PARTNER_GROUPS.flatMap((group) => group.items)

    expect(logos).toHaveLength(23)
    expect(logos.every((logo) => logo.image.startsWith('/logos/normalized/'))).toBe(true)
  })
})
