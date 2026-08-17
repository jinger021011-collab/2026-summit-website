import type { BreakoutAgendaRow, MainAgendaRow } from '../types'

const main: MainAgendaRow[] = [
  { time: '09:20–09:30', topic: '大会开幕', kind: 'opening' },
  {
    time: '09:30–09:40',
    topic: '致辞',
    participants: [
      { name: '孙家广', role: '中国工程院院士' },
      { name: '涂华', role: '中国通信学会副秘书长' },
    ],
  },
  { time: '09:40–10:20', topic: '人工智能发展与应用', speaker: '何友', role: '中国工程院院士、中国人工智能学会副理事长' },
  { time: '10:20–10:40', topic: 'Perspectives from Silicon Valley on DB × AI: When Data Met Intelligence', speaker: 'C. Mohan', role: '美国国家工程院院士、香港浸会大学杰出教授' },
  { time: '10:40–11:00', topic: '工业时序数据价值魔方', speaker: '王建民', role: '清华大学软件学院院长' },
  { time: '11:00–11:20', topic: '多模态时序数智化软件栈', speaker: '乔嘉林', organization: '天谋科技', role: 'CTO、Apache IoTDB PMC Member' },
  { time: '11:20–11:30', topic: '「DB × AI 产业生态合作计划」启动仪式', kind: 'ceremony' },
  { time: '11:30–11:50', topic: '油气化工全产业链生产现场标准化数据采集应用实践', speaker: '黄文俊', organization: '中国石油昆仑数智科技有限责任公司', role: '数据智能事业部总经理' },
  { time: '11:50–12:10', topic: 'IoTDB 在民航客机预测性维修中的典型应用案例', speaker: '张欢', organization: '中国南方航空股份有限公司', role: '项目技术专家' },
]

const breakouts: BreakoutAgendaRow[] = [
  {
    time: '14:00–14:30',
    technical: { topic: '数据基座：多模态时代的时序数据库如何承载工业数据', speaker: '田原', organization: '天谋科技', role: '数据库内核研发工程师、Apache IoTDB PMC Member' },
    caseOne: { topic: 'IoTDB 在智能技术试验船“未来号”上的应用与实践', speaker: '孙泽', organization: '中国船舶科学研究中心', role: '副研究员' },
    caseTwo: { topic: '国家光伏储能实证实验基地大数据平台优化实践', speaker: '李江', organization: '青海光伏产业创新中心有限责任公司、青海黄河智慧能源科技有限公司', role: '副总' },
  },
  {
    time: '14:30–15:00',
    technical: { topic: '智能基座：面向时序大模型的训推基础设施', speaker: '陈荣钊', organization: '天谋科技', role: '研发工程师、Apache IoTDB PMC Member' },
    caseOne: { topic: '新能源电力交易场景下时序数据库的应用实践', speaker: '王诗诚', organization: '中能建能源研究院' },
    caseTwo: { topic: '时序大模型筑基油气管网智能监视新模式', speaker: '吴秋利', organization: '凯特数智科技有限公司', role: '副总经理' },
  },
  {
    time: '15:00–15:30',
    technical: { topic: '文件基座：Apache TsFile 如何融入 AI 数据生态', speaker: '李烁麟', organization: '天谋科技', role: '数据库内核研发工程师、Apache TsFile PMC Member' },
    caseOne: { topic: 'AI 基础设施专题报告', speaker: '陈宇', organization: '海光信息生态发展部', role: 'AI 技术总监' },
    caseTwo: { topic: '储能场景下 IoTDB 的“接、管、用、迁”实践', subtitle: '从储能站数据上云到 TB 级集群迁移——IoTDB 应用与运维实战', speaker: '华冬进', organization: '美克生能源', role: '数字化平台架构师' },
  },
  { time: '15:30–15:45', break: true },
  {
    time: '15:45–16:15',
    technical: { topic: '智能工具：打通 DB × AI 的最后一公里', speaker: '王旋', organization: '天谋科技', role: '全栈研发工程师、Apache IoTDB PMC Member' },
    caseOne: { topic: '通用时序大模型的应用探索', speaker: '林丽', organization: '东南大学计算机科学与工程学院', role: '助理教授（讲师）' },
    caseTwo: { topic: '时空预测场景中的深度学习智能应用', speaker: '张淏然', organization: '清华大学软件学院', role: '博士' },
  },
  {
    time: '16:15–16:45',
    technical: { topic: '安全增强：TimechoDB 安全增强与漏洞治理实践', speaker: '侯昊男', organization: '天谋科技', role: '数据库内核研发工程师、Apache IoTDB PMC Member' },
    caseOne: { topic: '城市轨道交通供电智能运维场景时序数据库应用', speaker: '陈学峰', organization: '上海玖道信息科技股份有限公司', role: '副总经理' },
    caseTwo: { topic: '天洑工业 AI 底座的时序数据库应用', speaker: '马腾飞', organization: '南京天洑', role: '产品总监' },
  },
  {
    time: '16:45–17:15',
    technical: { topic: '效能优化：IoTDB 性能调优的底层逻辑与实战路径', speaker: '曹志佳', organization: '天谋科技', role: '数据库内核研发工程师、IoTDB 项目交付负责人' },
    caseOne: { topic: 'IoTDB × CISDigital AIoT：流程工业智能化实践', speaker: '陶术江', organization: '中冶赛迪信息技术（重庆）有限公司', role: 'AIoT 平台总监' },
    caseTwo: { topic: 'CED-DB：云边端时序数据库', speaker: '崔双双', organization: '哈尔滨工业大学', role: '副研究员' },
  },
  {
    time: '17:15–17:45',
    caseOne: { topic: '把空间科学写进时序数据库的探索：从 GNSS 掩星数据治理到科学时序预测', speaker: '齐一凡', organization: '中国地质大学', role: '博士' },
    caseTwo: { topic: '从原始时序到可审计评价：工业设备实训操控行为智能评价应用实践', speaker: '黄居鑫', organization: '青岛理工大学工程训练中心', role: '实验师' },
  },
]

export const AGENDA = { main, breakouts }
