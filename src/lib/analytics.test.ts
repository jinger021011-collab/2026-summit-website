import { beforeEach, describe, expect, it, vi } from 'vitest'
import { trackRegistrationClick } from './analytics'

describe('报名点击统计接口', () => {
  beforeEach(() => {
    window.dispatchEvent = vi.fn()
  })

  it('派发统一 registration_click 事件和位置参数', () => {
    trackRegistrationClick('hero_bottom')
    const event = vi.mocked(window.dispatchEvent).mock.calls[0][0] as CustomEvent
    expect(event.type).toBe('registration_click')
    expect(event.detail).toEqual({ position: 'hero_bottom' })
  })
})
