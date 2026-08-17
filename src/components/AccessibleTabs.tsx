import { useRef, useState, type KeyboardEvent, type ReactNode } from 'react'

interface TabDefinition {
  id: string
  label: string
  content: ReactNode
}

interface AccessibleTabsProps {
  label: string
  tabs: TabDefinition[]
  className?: string
}

export function AccessibleTabs({ label, tabs, className = '' }: AccessibleTabsProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([])

  const selectAndFocus = (index: number) => {
    const normalized = (index + tabs.length) % tabs.length
    setActiveIndex(normalized)
    tabRefs.current[normalized]?.focus()
  }

  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    if (event.key === 'ArrowRight') {
      event.preventDefault()
      selectAndFocus(index + 1)
    } else if (event.key === 'ArrowLeft') {
      event.preventDefault()
      selectAndFocus(index - 1)
    } else if (event.key === 'Home') {
      event.preventDefault()
      selectAndFocus(0)
    } else if (event.key === 'End') {
      event.preventDefault()
      selectAndFocus(tabs.length - 1)
    }
  }

  const active = tabs[activeIndex]

  return (
    <div className={className}>
      <div className="tab-list" role="tablist" aria-label={label}>
        {tabs.map((tab, index) => (
          <button
            key={tab.id}
            ref={(element) => { tabRefs.current[index] = element }}
            id={`${tab.id}-tab`}
            role="tab"
            type="button"
            aria-selected={activeIndex === index}
            aria-controls={`${tab.id}-panel`}
            tabIndex={activeIndex === index ? 0 : -1}
            className="tab-button"
            onClick={() => setActiveIndex(index)}
            onKeyDown={(event) => onKeyDown(event, index)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div
        id={`${active.id}-panel`}
        role="tabpanel"
        aria-labelledby={`${active.id}-tab`}
        className="tab-panel"
      >
        {active.content}
      </div>
    </div>
  )
}
