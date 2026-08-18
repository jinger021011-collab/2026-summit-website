import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { Header } from './Header'

describe('全局导航', () => {
  it('直接使用提供的 Timecho Logo 素材', () => {
    render(<Header activeSection="about" />)
    const logo = screen.getByRole('img', { name: 'Timecho 天谋科技' })
    expect(logo).toHaveAttribute(
      'src',
      '/logos/承办单位/20260813-161454.png',
    )
    const brand = logo.closest('a')
    expect(brand).toHaveAttribute('href', 'https://www.timecho.com/')
    expect(brand).toHaveAttribute('target', '_blank')
    expect(brand).toHaveAttribute('rel', 'noopener noreferrer')
  })

  it('移动菜单支持 Escape 关闭和焦点恢复', async () => {
    const user = userEvent.setup()
    render(<Header activeSection="" />)
    const trigger = screen.getByRole('button', { name: '打开导航菜单' })
    await user.click(trigger)
    expect(screen.getByRole('navigation', { name: '移动端导航' })).toBeInTheDocument()
    await user.keyboard('{Escape}')
    expect(screen.queryByRole('navigation', { name: '移动端导航' })).not.toBeInTheDocument()
    expect(trigger).toHaveFocus()
  })

  it('移动菜单层脱离带有毛玻璃效果的固定页头', async () => {
    const user = userEvent.setup()
    render(<Header activeSection="" />)
    await user.click(screen.getByRole('button', { name: '打开导航菜单' }))

    const menu = screen.getByRole('navigation', { name: '移动端导航' })
    const layer = menu.closest('.mobile-menu-layer')
    expect(layer).not.toBeNull()
    expect(screen.getByRole('banner')).not.toContainElement(layer as HTMLElement)
  })
})
