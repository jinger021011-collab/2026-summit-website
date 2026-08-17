import { describe, expect, it } from 'vitest'
import styles from './styles.css?raw'

describe('Hero 桌面信息栏样式', () => {
  it('使用收窄的三段式信息栏和较小报名按钮', () => {
    const infoBar = styles.match(/\.hero-info-bar \{([^}]*)\}/)?.[1]
    const button = styles.match(/\.hero-info-bar \.button \{([^}]*)\}/)?.[1]

    expect(infoBar).toContain('width: calc(100% - 160px)')
    expect(infoBar).toContain('max-width: 1160px')
    expect(infoBar).toContain('min-height: 112px')
    expect(infoBar).toContain('grid-template-columns: repeat(2, minmax(0, 1fr)) auto')
    expect(button).toContain('min-width: 154px')
    expect(button).toContain('min-height: 54px')
  })
})
