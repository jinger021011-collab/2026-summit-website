import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { AccessibleTabs } from './AccessibleTabs'

const tabs = [
  { id: 'a', label: '主论坛', content: <p>主论坛内容</p> },
  { id: 'b', label: '案例分论坛', content: <p>案例内容</p> },
]

describe('AccessibleTabs', () => {
  it('点击标签后更新选中状态和面板', async () => {
    const user = userEvent.setup()
    render(<AccessibleTabs label="大会议程" tabs={tabs} />)

    await user.click(screen.getByRole('tab', { name: '案例分论坛' }))

    expect(screen.getByRole('tab', { name: '案例分论坛' })).toHaveAttribute('aria-selected', 'true')
    expect(screen.getByRole('tabpanel')).toHaveTextContent('案例内容')
  })

  it('支持方向键、Home 和 End 移动选择', async () => {
    const user = userEvent.setup()
    render(<AccessibleTabs label="大会议程" tabs={tabs} />)
    const first = screen.getByRole('tab', { name: '主论坛' })
    first.focus()

    await user.keyboard('{ArrowRight}')
    expect(screen.getByRole('tab', { name: '案例分论坛' })).toHaveFocus()
    expect(screen.getByRole('tabpanel')).toHaveTextContent('案例内容')

    await user.keyboard('{Home}')
    expect(first).toHaveFocus()

    await user.keyboard('{End}')
    expect(screen.getByRole('tab', { name: '案例分论坛' })).toHaveFocus()
  })
})
