import type { NavigationItem, RegistrationPosition } from '../types'

export const SITE = {
  name: '2026 时序数据技术创新大会',
  theme: 'DB × AI',
  date: '2026 年 8 月 22 日（星期六）',
  dateShort: '2026年8月22日',
  venue: '北京丽都皇冠假日酒店',
  address: '北京市朝阳区将台路 6 号（丽都广场）',
  city: '北京',
  format: '线下会议＋线上直播',
  registrationUrl: 'https://www.timecho.com/activity/2026-Summit',
  registrationPositions: [
    'navigation',
    'hero_bottom',
    'final_cta',
    'mobile_sticky',
  ] as RegistrationPosition[],
  navigation: [
    { label: '大会简介', href: '#about' },
    { label: '大会议程', href: '#agenda' },
    { label: '嘉宾介绍', href: '#speakers' },
    { label: '合作伙伴', href: '#partners' },
    { label: '参会须知', href: '#guide' },
  ] as NavigationItem[],
  links: {
    timecho: 'https://www.timecho.com/',
    iotdb: 'https://iotdb.apache.org/',
    privacy: 'https://www.timecho.com/agreement',
  },
  footer: {
    recordUrl: 'https://beian.miit.gov.cn/#/Integrated/recordQuery',
    socialLinks: [
      { label: 'Twitter', href: 'https://twitter.com/TimechoTech' },
      { label: 'GitHub', href: 'https://github.com/apache/iotdb' },
    ],
    navigation: [
      {
        title: '产品',
        links: [
          { label: 'TimechoDB（基于Apache IoTDB的企业版数据库）', href: 'https://www.timecho.com/product/timechodb' },
          { label: 'TimechoAI时序大模型云服务', href: 'https://www.timecho.com/product/timechoai' },
          { label: 'Apache IoTDB专家服务', href: 'https://www.timecho.com/product/iotdb-expert-support' },
          { label: 'Timecho Workbench可视化工具', href: 'https://www.timecho.com/product/workbench' },
          { label: 'Timer时序大模型', href: 'https://www.timecho.com/product/timer' },
        ],
      },
      {
        title: '资源',
        links: [
          { label: '用户案例', href: 'https://www.timecho.com/tags/usercases' },
          { label: '知识科普', href: 'https://www.timecho.com/tags/knowledge' },
          { label: '天谋时序数据库专业科普', href: 'https://www.timecho.com/tags/shixushujuku' },
          { label: '技术解析', href: 'https://www.timecho.com/tags/introduction' },
          { label: '测试报告', href: 'https://www.timecho.com/tags/reports' },
          { label: '产品发布', href: 'https://www.timecho.com/tags/products' },
          { label: '奖项动态', href: 'https://www.timecho.com/tags/awards' },
          { label: '会议活动', href: 'https://www.timecho.com/tags/activities' },
        ],
      },
      {
        title: '关于我们',
        links: [
          { label: '公司简介', href: 'https://www.timecho.com/aboutus' },
          { label: '大事记', href: 'https://www.timecho.com/aboutus' },
          { label: '加入我们', href: 'https://www.timecho.com/aboutus#about-join-wrapper' },
        ],
      },
    ],
  },
} as const

export const HIGHLIGHTS = [
  { title: 'DB × AI 技术演进', description: '聚焦数据库与人工智能深度融合，探索时序数据技术的新方向。' },
  { title: '融合产品矩阵发布', description: '发布 TimechoDB 与 TimechoAI 全新融合产品矩阵及技术能力。' },
  { title: '工业标杆实践', description: '分享航空航天、能源电力、石油化工、工业制造等领域的应用成果。' },
  { title: '产学研深度交流', description: '汇聚专家学者、企业技术负责人和行业实践者，共话产业发展机会。' },
] as const
