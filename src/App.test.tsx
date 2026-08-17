import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import App from './App'
import { shouldShowMobileRegistration } from './lib/visibility'

describe('大会官网', () => {
  it('以 HTML 呈现核心活动信息和完整页面结构', () => {
    render(<App />)
    expect(screen.getByRole('heading', { level: 1, name: '2026 时序数据技术创新大会' })).toBeInTheDocument()
    expect(screen.getByText('2026年8月22日')).toBeInTheDocument()
    expect(screen.getByText('北京丽都皇冠假日酒店')).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: '关于大会' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: '大会议程' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: '嘉宾介绍' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: '合作伙伴' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: '参会信息' })).toBeInTheDocument()
  })

  it('四个报名入口使用统一地址和对应位置', () => {
    render(<App />)
    const links = Array.from(document.querySelectorAll<HTMLAnchorElement>('[data-registration-position]'))
    expect(links).toHaveLength(4)
    expect(links.map((link) => link.getAttribute('data-registration-position'))).toEqual([
      'navigation', 'hero_bottom', 'final_cta', 'mobile_sticky',
    ])
    links.forEach((link) => {
      expect(link).toHaveAttribute('href', 'https://www.timecho.com/activity/2026-Summit')
      expect(link).toHaveAttribute('target', '_blank')
      expect(link).toHaveAttribute('rel', 'noopener noreferrer')
    })
  })

  it('底部报名标题分为两行且不包含逗号和句号', () => {
    render(<App />)
    const heading = document.querySelector<HTMLHeadingElement>('#register-title')

    expect(heading).not.toBeNull()
    expect(heading?.querySelector('br')).toBeInTheDocument()
    expect(heading).toHaveTextContent('DB × AI探索时序数据与人工智能融合的新未来')
    expect(heading).not.toHaveTextContent(/[，。]/)
  })

  it('首屏保留语义标题并仅在底部信息栏展示会议信息', () => {
    render(<App />)
    const hero = screen.getByRole('region', { name: '2026 时序数据技术创新大会' })
    const visual = hero.querySelector('.hero-visual')
    const infoBar = hero.querySelector('.hero-info-bar')
    const semanticTitle = screen.getByRole('heading', { level: 1, name: '2026 时序数据技术创新大会' })

    expect(visual).toBeInTheDocument()
    expect(semanticTitle).toHaveClass('sr-only')
    expect(hero.querySelector('.hero-title-block')).not.toBeInTheDocument()
    expect(infoBar).toHaveTextContent('2026年8月22日')
    expect(infoBar).toHaveTextContent('北京丽都皇冠假日酒店')
    expect(infoBar).toHaveTextContent('线下会议＋线上直播')
    expect(within(infoBar as HTMLElement).getByRole('link', { name: '立即报名' })).toHaveAttribute('data-registration-position', 'hero_bottom')
    expect(hero.querySelector('.hero-panel')).not.toBeInTheDocument()
  })

  it('展示 21 位嘉宾并将陶术江放在陈学峰之后', () => {
    render(<App />)
    const grid = screen.getByTestId('speaker-grid')
    const cards = within(grid).getAllByRole('article')
    expect(cards).toHaveLength(21)
    const card = within(grid).getByRole('article', { name: '陈学峰' })
    expect(card).toHaveTextContent('上海玖道信息科技股份有限公司')
    expect(card).toHaveTextContent('副总经理')
    expect(within(card).getByRole('img')).toHaveAttribute('src', '/speakers/12.jpeg')

    const chenIndex = cards.indexOf(card)
    const taoCard = cards[chenIndex + 1]
    expect(taoCard).toHaveAccessibleName('陶术江')
    expect(taoCard).toHaveTextContent('中冶赛迪信息技术（重庆）有限公司')
    expect(taoCard).toHaveTextContent('AIoT 平台总监')
    expect(within(taoCard).getByRole('img')).toHaveAttribute('src', '/speakers/21.jpg')

    expect(cards.at(-2)).toHaveAccessibleName('崔双双')
    expect(cards.at(-1)).toHaveAccessibleName('黄居鑫')
    expect(cards.at(-1)).toHaveTextContent('青岛理工大学工程训练中心')
    expect(cards.at(-1)).toHaveTextContent('实验师')
    expect(within(cards.at(-1) as HTMLElement).getByRole('img')).toHaveAttribute('src', '/speakers/20.jpg')
  })

  it('嘉宾单位和职务分行并完整展示', () => {
    render(<App />)
    const grid = screen.getByTestId('speaker-grid')
    const card = within(grid).getByRole('article', { name: '李江' })
    const organization = within(card).getByText('青海光伏产业创新中心有限责任公司、青海黄河智慧能源科技有限公司')
    const role = within(card).getByText('副总')

    expect(organization).toHaveClass('speaker-organization')
    expect(role).toHaveClass('speaker-role')
    expect(organization).not.toBe(role)
    expect(within(card).queryByText('副总、副总')).not.toBeInTheDocument()
    expect(card.querySelector('.speaker-meta')).not.toBeInTheDocument()
  })

  it('嘉宾介绍同步已确认的主论坛职务更新', () => {
    render(<App />)
    const grid = screen.getByTestId('speaker-grid')

    const heYou = within(grid).getByRole('article', { name: '何友' })
    expect(heYou).toHaveTextContent('中国工程院院士、中国人工智能学会副理事长')

    const mohan = within(grid).getByRole('article', { name: 'C. Mohan' })
    expect(mohan).toHaveTextContent('美国国家工程院院士、香港浸会大学杰出教授')

    const zhangHuan = within(grid).getByRole('article', { name: '张欢' })
    expect(zhangHuan).toHaveTextContent('项目技术专家')
    expect(zhangHuan).not.toHaveTextContent('天瞳项目负责人')
  })

  it('嘉宾职务和单位使用一致的文字样式', () => {
    render(<App />)
    const card = within(screen.getByTestId('speaker-grid')).getByRole('article', { name: '吴秋利' })
    const organization = card.querySelector('.speaker-organization')
    const role = card.querySelector('.speaker-role')

    expect(organization).toHaveClass('speaker-detail')
    expect(role).toHaveClass('speaker-detail')
  })

  it('王诗诚嘉宾卡片不展示待确认职务占位', () => {
    render(<App />)
    const card = within(screen.getByTestId('speaker-grid')).getByRole('article', { name: '王诗诚' })

    expect(card).toHaveTextContent('中能建能源研究院')
    expect(within(card).queryByText('职务待确认')).not.toBeInTheDocument()
    expect(card.querySelector('.speaker-role')).not.toBeInTheDocument()
  })

  it('主论坛时间轴展示工业时序数据价值魔方', () => {
    render(<App />)

    expect(screen.getByRole('tabpanel', { name: '主论坛' })).toHaveTextContent('工业时序数据价值魔方')
    expect(screen.queryByText('数据和智能的融合：开源、体系结构与未来展望')).not.toBeInTheDocument()
  })

  it('主论坛新增启动仪式并更新午间议程时间', () => {
    render(<App />)
    const panel = screen.getByRole('tabpanel', { name: '主论坛' })
    const ceremony = within(panel).getByText('11:20–11:30').closest('.timeline-card') as HTMLElement
    const huangWenjun = within(panel).getByText('11:30–11:50').closest('.timeline-card') as HTMLElement
    const zhangHuan = within(panel).getByText('11:50–12:10').closest('.timeline-card') as HTMLElement

    expect(ceremony).toHaveClass('ceremony-card')
    expect(ceremony).toHaveTextContent('「DB × AI 产业生态合作计划」启动仪式')
    expect(ceremony.querySelector('.talk-speaker')).not.toBeInTheDocument()
    expect(huangWenjun).toHaveTextContent('黄文俊')
    expect(huangWenjun).toHaveTextContent('油气化工全产业链生产现场标准化数据采集应用实践')
    expect(zhangHuan).toHaveTextContent('张欢')
    expect(zhangHuan).toHaveTextContent('IoTDB 在民航客机预测性维修中的典型应用案例')
    expect(within(panel).queryByText('11:20–11:40')).not.toBeInTheDocument()
    expect(within(panel).queryByText('11:40–12:00')).not.toBeInTheDocument()
  })

  it('致辞嘉宾与职务按两条独立信息展示', () => {
    render(<App />)
    const panel = screen.getByRole('tabpanel', { name: '主论坛' })
    const card = within(panel).getByText('09:30–09:40').closest('.timeline-card') as HTMLElement
    const participantRows = Array.from(card.querySelectorAll<HTMLElement>('.talk-participant'))

    expect(card).toHaveTextContent('致辞')
    expect(participantRows.map((item) => item.textContent)).toEqual([
      '孙家广｜中国工程院院士',
      '涂华｜中国通信学会副秘书长',
    ])
    expect(participantRows[0].querySelector('.talk-speaker')).toHaveTextContent('孙家广')
    expect(participantRows[0].querySelector('.talk-meta')).toHaveTextContent('中国工程院院士')
    expect(participantRows[1].querySelector('.talk-speaker')).toHaveTextContent('涂华')
    expect(participantRows[1].querySelector('.talk-meta')).toHaveTextContent('中国通信学会副秘书长')
    expect(card).not.toHaveTextContent('特邀嘉宾致辞')
  })

  it('主论坛时间轴展示更新后的嘉宾职务', () => {
    render(<App />)
    const cards = Array.from(screen.getByRole('tabpanel', { name: '主论坛' }).querySelectorAll<HTMLElement>('.timeline-card'))

    const expectAgendaText = (time: string, expected: string, removed?: string) => {
      const item = cards.find((card) => card.textContent?.includes(time))

      expect(item).toBeDefined()
      expect(item).toHaveTextContent(expected)
      if (removed) expect(item).not.toHaveTextContent(removed)
    }

    expectAgendaText('09:40–10:20', '中国工程院院士、中国人工智能学会副理事长')
    expectAgendaText('10:20–10:40', '美国国家工程院院士、香港浸会大学杰出教授')
    expectAgendaText('11:50–12:10', '中国南方航空股份有限公司｜项目技术专家', '天瞳项目负责人')

    const regularRow = cards.find((item) => item.textContent?.includes('11:50–12:10'))
    const speakerLine = regularRow?.querySelector('.talk-speaker-line')
    const meta = speakerLine?.querySelector('.talk-meta')
    expect(speakerLine?.querySelector('.talk-speaker')).toHaveTextContent('张欢')
    expect(meta).toHaveTextContent('中国南方航空股份有限公司｜项目技术专家')
    expect(meta?.querySelector('.talk-organization')).toHaveTextContent('中国南方航空股份有限公司')
    expect(meta?.querySelector('.talk-role-separator')).toHaveTextContent('｜')
    expect(meta?.querySelector('.talk-role')).toHaveTextContent('项目技术专家')

    const roleOnlyRow = cards.find((item) => item.textContent?.includes('09:40–10:20'))
    expect(roleOnlyRow?.querySelector('.talk-role-separator')).not.toBeInTheDocument()
  })

  it('议程可切换到案例分论坛并展示陈学峰议题', async () => {
    const user = userEvent.setup()
    render(<App />)
    const tabs = screen.getByRole('tablist', { name: '大会议程' })
    await user.click(within(tabs).getByRole('tab', { name: '案例分论坛（1）' }))
    expect(screen.getByRole('tabpanel', { name: '案例分论坛（1）' })).toHaveTextContent('城市轨道交通供电智能运维场景时序数据库应用')
    expect(screen.getByRole('tabpanel', { name: '案例分论坛（1）' })).toHaveTextContent('陈学峰')
  })

  it('技术分论坛不渲染空议程卡片并保留两个案例分论坛的末场议程', async () => {
    const user = userEvent.setup()
    render(<App />)
    const tabs = screen.getByRole('tablist', { name: '大会议程' })

    await user.click(within(tabs).getByRole('tab', { name: '技术分论坛' }))
    expect(screen.getByRole('tabpanel', { name: '技术分论坛' })).not.toHaveTextContent('17:15–17:45')

    await user.click(within(tabs).getByRole('tab', { name: '案例分论坛（1）' }))
    const caseOnePanel = screen.getByRole('tabpanel', { name: '案例分论坛（1）' })
    expect(caseOnePanel).toHaveTextContent('17:15–17:45')
    expect(caseOnePanel).toHaveTextContent('齐一凡')

    await user.click(within(tabs).getByRole('tab', { name: '案例分论坛（2）' }))
    const panel = screen.getByRole('tabpanel', { name: '案例分论坛（2）' })
    const cards = Array.from(panel.querySelectorAll<HTMLElement>('.timeline-card'))
    const cedIndex = cards.findIndex((card) => card.textContent?.includes('CED-DB：云边端时序数据库'))
    const finalIndex = cards.findIndex((card) => card.textContent?.includes('从原始时序到可审计评价：工业设备实训操控行为智能评价应用实践'))

    expect(finalIndex).toBe(cedIndex + 1)
    expect(panel).toHaveTextContent('17:15–17:45')
    expect(panel).toHaveTextContent('黄居鑫')
    expect(panel).toHaveTextContent('青岛理工大学工程训练中心｜实验师')
  })

  it('案例分论坛二的李江职务只保留一个副总', async () => {
    const user = userEvent.setup()
    render(<App />)
    const tabs = screen.getByRole('tablist', { name: '大会议程' })

    await user.click(within(tabs).getByRole('tab', { name: '案例分论坛（2）' }))
    const panel = screen.getByRole('tabpanel', { name: '案例分论坛（2）' })
    const card = within(panel).getByText('李江').closest('.timeline-card') as HTMLElement

    expect(card).toHaveTextContent('副总')
    expect(card).not.toHaveTextContent('副总、副总')
  })

  it('参会信息标签可切换并展示场地平面图', async () => {
    const user = userEvent.setup()
    render(<App />)
    await user.click(screen.getByRole('tab', { name: '场地平面图' }))
    expect(screen.getByRole('img', { name: '2026 时序数据技术创新大会场地平面图' })).toBeInTheDocument()
  })

  it('参会须知将线上参会放在参会提醒后并展示新增联系人', () => {
    render(<App />)
    const panel = document.querySelector<HTMLElement>('#guide-attendance-panel') as HTMLElement
    const headings = Array.from(panel.querySelectorAll('article h3')).map((heading) => heading.textContent)
    const contact = within(panel).getByRole('heading', { name: '联系方式' }).closest('article') as HTMLElement

    expect(headings).toEqual(['现场签到', '参会提醒', '线上参会', '联系方式'])
    expect(contact).toHaveTextContent('微信：apache_iotdb')
    expect(contact).toHaveTextContent('联系人：张天一，18521030950')
  })

  it('交通指南说明线下参会可免费停车并需领取停车券', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.click(screen.getByRole('tab', { name: '交通指南' }))
    expect(screen.getByText(/本次大会支持线下参会免费停车，请到现场签到处领取停车券/)).toBeInTheDocument()
    expect(screen.queryByText(/5 元／小时/)).not.toBeInTheDocument()
  })

  it('大会议程在所有视口只渲染一套标签页时间轴', () => {
    render(<App />)
    const agenda = screen.getByRole('heading', { name: '大会议程' }).closest('.agenda-container') as HTMLElement

    expect(within(agenda).queryByRole('table')).not.toBeInTheDocument()
    expect(within(agenda).getAllByRole('tablist', { name: '大会议程' })).toHaveLength(1)
    expect(agenda.querySelector('.agenda-tabs')).toBeInTheDocument()
    expect(within(agenda).getByRole('tabpanel', { name: '主论坛' })).toHaveTextContent('工业时序数据价值魔方')
  })

  it('主论坛和分论坛嘉宾姓名共享蓝色姓名样式', async () => {
    const user = userEvent.setup()
    render(<App />)
    const tabs = screen.getByRole('tablist', { name: '大会议程' })

    expect(within(screen.getByRole('tabpanel', { name: '主论坛' })).getByText('王建民')).toHaveClass('talk-speaker')
    await user.click(within(tabs).getByRole('tab', { name: '案例分论坛（2）' }))
    expect(within(screen.getByRole('tabpanel', { name: '案例分论坛（2）' })).getByText('崔双双')).toHaveClass('talk-speaker')
  })

  it('嘉宾卡片使用居中受限容器和统一正方形裁切', () => {
    render(<App />)
    const heading = screen.getByRole('heading', { name: '嘉宾介绍' })
    const speakersContainer = heading.closest('.speakers-container')
    expect(speakersContainer).not.toBeNull()

    const grid = within(speakersContainer as HTMLElement).getByTestId('speaker-grid')
    const cards = within(grid).getAllByRole('article')
    expect(cards).toHaveLength(21)
    cards.forEach((card) => {
      const photo = card.querySelector('.speaker-photo')
      const image = within(card).getByRole('img')
      expect(photo).toBeInTheDocument()
      expect(image).not.toHaveAttribute('style')
    })
  })

  it('页脚移除产品推广板块并保留 Timecho 官方导航、联系和合规结构', () => {
    render(<App />)
    const footer = screen.getByRole('contentinfo')

    expect(screen.queryByRole('region', { name: 'TimechoDB 产品体验' })).not.toBeInTheDocument()
    expect(screen.queryByText('立即体验国产工业时序数据库')).not.toBeInTheDocument()

    ;['产品', '资源', '关于我们'].forEach((heading) => {
      expect(within(footer).getByText(heading, { selector: 'span' })).toBeInTheDocument()
    })
    ;[
      'TimechoDB（基于Apache IoTDB的企业版数据库）', 'TimechoAI时序大模型云服务', 'Apache IoTDB专家服务',
      'Timecho Workbench可视化工具', 'Timer时序大模型', '用户案例', '知识科普', '天谋时序数据库专业科普',
      '技术解析', '测试报告', '产品发布', '奖项动态', '会议活动', '公司简介', '大事记', '加入我们',
    ].forEach((label) => expect(within(footer).getByRole('link', { name: label })).toBeInTheDocument())
    expect(within(footer).getByRole('button', { name: '联系我们' })).toBeInTheDocument()
    expect(footer).toHaveTextContent('北京市海淀区奥北科技园领智中心C座601')
    expect(footer).toHaveTextContent('010-62780978')
    expect(footer).toHaveTextContent('Copyright © 2026 Timecho Limited All rights reserved.')
    expect(footer).toHaveTextContent('Apache IoTDB及Apache IoTDB项目标志是Apache软件基金会（The Apache Software Foundation）的注册商标。')
    expect(within(footer).getByRole('link', { name: '隐私协议' })).toHaveAttribute('href', 'https://www.timecho.com/agreement')
    expect(within(footer).getByRole('link', { name: '京ICP备2023002339号-1' })).toHaveAttribute('href', 'https://beian.miit.gov.cn/#/Integrated/recordQuery')
    expect(within(footer).queryByRole('img', { name: 'Timecho 天谋科技' })).not.toBeInTheDocument()
    expect(within(footer).queryByRole('link', { name: '访问 Timecho 官网' })).not.toBeInTheDocument()
    expect(footer).not.toHaveTextContent('Powered by Halo')
  })

  it('页脚使用本地 GitHub 图片并通过微信按钮展开二维码', async () => {
    const user = userEvent.setup()
    render(<App />)
    const footer = screen.getByRole('contentinfo')
    const social = within(footer).getByLabelText('Timecho 社交媒体')
    const wechat = within(social).getByRole('button', { name: '显示 Timecho 公众号二维码' })
    const twitter = within(social).getByRole('link', { name: 'Timecho Twitter/X' })
    const github = within(social).getByRole('link', { name: 'Apache IoTDB GitHub' })
    const popover = within(social).getByTestId('wechat-qr-popover')

    expect(social.querySelectorAll('.footer-social-control > svg')).toHaveLength(2)
    expect(github.querySelector('svg')).not.toBeInTheDocument()
    expect(github.querySelector('img')).toHaveAttribute('src', '/social/github.png')
    expect(github.querySelector('img')).toHaveClass('footer-github-icon')
    expect(twitter).not.toHaveTextContent('X')
    expect(github).not.toHaveTextContent('GH')
    expect(wechat).toHaveAttribute('aria-expanded', 'false')
    expect(popover).toHaveAttribute('hidden')

    await user.click(wechat)
    expect(wechat).toHaveAttribute('aria-expanded', 'true')
    expect(popover).not.toHaveAttribute('hidden')
    expect(within(popover).getByRole('img', { name: 'Timecho 公众号二维码' })).toHaveAttribute('src', '/timecho-wechat-qr.png')
  })

  it('页脚所有外链安全打开且没有空链接', () => {
    render(<App />)
    const footer = screen.getByRole('contentinfo')
    const links = within(footer).getAllByRole('link')

    expect(links.length).toBeGreaterThan(10)
    links.filter((link) => link.getAttribute('href')?.startsWith('https://')).forEach((link) => {
      expect(link.getAttribute('href')).toMatch(/^https:\/\//)
      expect(link).toHaveAttribute('target', '_blank')
      expect(link).toHaveAttribute('rel', 'noopener noreferrer')
    })
    expect(links.every((link) => Boolean(link.getAttribute('href')))).toBe(true)
  })

  it('页脚联系按钮聚焦官方联系方式', async () => {
    const user = userEvent.setup()
    render(<App />)
    const contact = screen.getByTestId('official-contact')

    await user.click(screen.getByRole('button', { name: '联系我们' }))
    expect(contact).toHaveFocus()
  })

  it('页脚进入视口时隐藏移动端固定报名栏', () => {
    expect(shouldShowMobileRegistration({ pastHero: true, registerVisible: false, footerVisible: false })).toBe(true)
    expect(shouldShowMobileRegistration({ pastHero: true, registerVisible: false, footerVisible: true })).toBe(false)
    expect(shouldShowMobileRegistration({ pastHero: true, registerVisible: true, footerVisible: false })).toBe(false)
  })
})
