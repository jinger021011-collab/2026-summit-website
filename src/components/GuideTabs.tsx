import { Bus, Car, MapPin, Train, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { AccessibleTabs } from './AccessibleTabs'
import { ImageWithFallback } from './ImageWithFallback'

function AttendanceGuide() {
  return <div className="guide-grid">
    <article><h3>现场签到</h3><p>选择线下参会的嘉宾，请提前完成线上报名，并于大会当天提前到达会场。</p><p>现场请根据工作人员指引，使用报名信息完成签到。建议提前 30 分钟到场。</p><p>具体签到地点及签到方式以会前通知和现场指引为准。</p></article>
    <article><h3>参会提醒</h3><ul><li>报名成功后将通过短信发送相关通知，请确保手机号准确并保持畅通。</li><li>大会议程、演讲嘉宾和演讲主题可能调整，请以大会当天公布的信息为准。</li><li>会议期间请将手机调至静音或振动状态。</li><li>请妥善保管电脑、手机及其他贵重物品。</li></ul></article>
    <article><h3>线上参会</h3><p>线上直播平台：Apache IoTDB 视频号、天谋科技视频号。</p><p>具体直播时间和入口以会前官方通知为准。</p></article>
    <article><h3>联系方式</h3><p>微信：<code>apache_iotdb</code></p><p>联系人：张天一，18521030950</p></article>
  </div>
}

function TransportGuide() {
  return <div className="transport-list">
    <article><MapPin aria-hidden="true" /><div><h3>会场地址</h3><p>北京市朝阳区将台路 6 号（丽都广场）北京丽都皇冠假日酒店。</p></div></article>
    <article><Train aria-hidden="true" /><div><h3>地铁出行</h3><p>地铁 12 号线将台西站 B 口，步行约 900 米；地铁 14 号线望京南站 C 东南口，步行约 861 米。</p></div></article>
    <article><Bus aria-hidden="true" /><div><h3>公交出行</h3><p>周边站点：芳园里西站、将台路口东站。参考线路：421 路、657 路、701 路、847 路等，下车后步行约 5～10 分钟。</p></div></article>
    <article><Car aria-hidden="true" /><div><h3>自驾与停车</h3><p>导航关键词：北京丽都皇冠假日酒店（丽都广场）。酒店设有地面及地下停车位；本次大会支持线下参会免费停车，请到现场签到处领取停车券。</p></div></article>
    <p className="guide-notice">公共交通线路、出入口开放状态及步行距离可能变化，请以出行当日地图导航为准。</p>
  </div>
}

function VenueMap() {
  const [open, setOpen] = useState(false)
  const trigger = useRef<HTMLButtonElement>(null)
  const close = useRef<HTMLButtonElement>(null)
  useEffect(() => {
    if (!open) return
    const triggerElement = trigger.current
    close.current?.focus()
    const handler = (event: KeyboardEvent) => { if (event.key === 'Escape') setOpen(false) }
    window.addEventListener('keydown', handler)
    return () => { window.removeEventListener('keydown', handler); triggerElement?.focus() }
  }, [open])
  const imageAlt = '2026 时序数据技术创新大会场地平面图'
  return <div className="venue-map">
    <button ref={trigger} type="button" className="venue-trigger" onClick={() => setOpen(true)} aria-label="查看大会场地平面图大图"><ImageWithFallback src="/venue/场地平面图.png" alt={imageAlt} loading="lazy" fallback={<p className="venue-fallback">场地平面图将在会前更新</p>} /><span>点击查看大图</span></button>
    {open && <div className="lightbox" role="dialog" aria-modal="true" aria-label="场地平面图大图"><button className="lightbox-scrim" type="button" aria-label="关闭场地平面图" onClick={() => setOpen(false)} /><div className="lightbox-content"><button ref={close} className="lightbox-close" type="button" aria-label="关闭场地平面图" onClick={() => setOpen(false)}><X aria-hidden="true" /></button><ImageWithFallback className="venue-map-full" src="/venue/场地平面图.png" alt={imageAlt} loading="eager" fallback={<p className="venue-fallback">场地平面图将在会前更新</p>} /></div></div>}
  </div>
}

export function GuideTabs() {
  return <AccessibleTabs label="参会信息" tabs={[
    { id: 'guide-attendance', label: '参会须知', content: <AttendanceGuide /> },
    { id: 'guide-transport', label: '交通指南', content: <TransportGuide /> },
    { id: 'guide-map', label: '场地平面图', content: <VenueMap /> },
  ]} />
}
