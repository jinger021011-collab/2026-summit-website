# Unified Agenda Timeline Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the desktop agenda tables with the same accessible tabbed vertical timeline used on mobile, using a centered 960px desktop column and omitting empty breakout slots.

**Architecture:** `Agenda` will render one `AccessibleTabs` instance at every viewport. `AgendaTalk` will gain an optional structured participant list for multi-speaker sessions, while existing single-speaker fields remain supported. The breakout timeline will filter rows that have neither a break nor a talk for the selected forum.

**Tech Stack:** React, TypeScript, CSS, Vitest, Testing Library, Vite

## Global Constraints

- Only modify the agenda component, agenda data/types, agenda styles, tests, and requirements documentation.
- Use one `AccessibleTabs` instance with four tabs: 主论坛、技术分论坛、案例分论坛（1）、案例分论坛（2）.
- The desktop agenda column has `max-width: 960px` and is horizontally centered.
- Do not render empty 17:15–17:45 cards for 技术分论坛 or 案例分论坛（1）.
- Keep the 17:15–17:45 黄居鑫 card in 案例分论坛（2）.
- Render `孙家广｜中国工程院院士` and `涂华｜中国通信学会副秘书长` as two separate lines.
- Preserve keyboard tab interaction and `tablist`, `tab`, and `tabpanel` semantics.
- Long content wraps naturally; no truncation, scaling, zoom, or fixed card height.
- The workspace is not a Git repository, so commit steps are intentionally omitted.

---

### Task 1: Define Unified Agenda Behavior with Failing Tests

**Files:**
- Modify: `src/App.test.tsx`

**Interfaces:**
- Consumes: rendered `App`, `AccessibleTabs`, agenda data.
- Produces: regression expectations for `.agenda-tabs`, `.timeline-card`, and `.talk-participant`.

- [ ] **Step 1: Replace table-specific tests with a unified agenda structure test**

```tsx
it('大会议程在所有视口只渲染一套标签页时间轴', () => {
  render(<App />)
  const agenda = screen.getByRole('heading', { name: '大会议程' }).closest('.agenda-container') as HTMLElement

  expect(within(agenda).queryByRole('table')).not.toBeInTheDocument()
  expect(within(agenda).getAllByRole('tablist', { name: '大会议程' })).toHaveLength(1)
  expect(agenda.querySelector('.agenda-tabs')).toBeInTheDocument()
  expect(within(agenda).getByRole('tabpanel', { name: '主论坛' })).toHaveTextContent('工业时序数据价值魔方')
})
```

- [ ] **Step 2: Add a failing two-line participant test**

```tsx
it('致辞嘉宾与职务按两条独立信息展示', () => {
  render(<App />)
  const panel = screen.getByRole('tabpanel', { name: '主论坛' })
  const card = within(panel).getByText('09:30–09:40').closest('.timeline-card') as HTMLElement
  const participants = Array.from(card.querySelectorAll('.talk-participant')).map((item) => item.textContent)

  expect(participants).toEqual([
    '孙家广｜中国工程院院士',
    '涂华｜中国通信学会副秘书长',
  ])
})
```

- [ ] **Step 3: Replace the table-based 17:15 test with tab-panel filtering assertions**

```tsx
it('分论坛不渲染空议程卡片并保留案例分论坛二的末场议程', async () => {
  const user = userEvent.setup()
  render(<App />)
  const tabs = screen.getByRole('tablist', { name: '大会议程' })

  await user.click(within(tabs).getByRole('tab', { name: '技术分论坛' }))
  expect(screen.getByRole('tabpanel', { name: '技术分论坛' })).not.toHaveTextContent('17:15–17:45')

  await user.click(within(tabs).getByRole('tab', { name: '案例分论坛（1）' }))
  expect(screen.getByRole('tabpanel', { name: '案例分论坛（1）' })).not.toHaveTextContent('17:15–17:45')

  await user.click(within(tabs).getByRole('tab', { name: '案例分论坛（2）' }))
  const panel = screen.getByRole('tabpanel', { name: '案例分论坛（2）' })
  expect(panel).toHaveTextContent('17:15–17:45')
  expect(panel).toHaveTextContent('黄居鑫')
})
```

- [ ] **Step 4: Update existing agenda queries**

Change the tablist label from `移动端大会议程` to `大会议程`, remove `.main-table`, `.breakout-table`, and `.mobile-agenda` queries, and scope content checks to the active tab panel.

- [ ] **Step 5: Run the focused tests and verify RED**

Run:

```bash
/Users/jinger/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node node_modules/vitest/vitest.mjs run src/App.test.tsx
```

Expected: failures because two tables still render, `.agenda-tabs` and `.talk-participant` do not exist, the tablist label is still mobile-specific, and empty breakout rows still produce cards.

### Task 2: Implement Structured Participants and One Shared Timeline

**Files:**
- Modify: `src/types.ts`
- Modify: `src/data/agenda.ts`
- Modify: `src/components/Agenda.tsx`

**Interfaces:**
- Produces: `AgendaParticipant` and `AgendaTalk.participants?: AgendaParticipant[]`.
- Produces: one `<AccessibleTabs className="agenda-tabs" label="大会议程" />`.
- Produces: `.talk-participant` for each structured participant.

- [ ] **Step 1: Add the structured participant type**

```ts
export interface AgendaParticipant {
  name: string
  organization?: string
  role?: string
}

export interface AgendaTalk {
  topic: string
  subtitle?: string
  speaker?: string
  organization?: string
  role?: string
  participants?: AgendaParticipant[]
  kind?: 'talk' | 'break' | 'opening'
}
```

- [ ] **Step 2: Represent the two-person greeting with structured data**

```ts
{
  time: '09:30–09:40',
  topic: '致辞',
  participants: [
    { name: '孙家广', role: '中国工程院院士' },
    { name: '涂华', role: '中国通信学会副秘书长' },
  ],
},
```

- [ ] **Step 3: Render participants and preserve the single-speaker fallback**

Add a participant renderer that joins `[name, organization, role].filter(Boolean)` with `｜`, and use it when `talk.participants` exists. Otherwise keep the current `.talk-speaker` and `.talk-meta` markup for single speakers.

```tsx
{talk.participants?.map((participant) => (
  <span className="talk-participant" key={participant.name}>
    {[participant.name, participant.organization, participant.role].filter(Boolean).join('｜')}
  </span>
))}
```

- [ ] **Step 4: Filter empty breakout rows**

```tsx
{AGENDA.breakouts
  .filter((row) => row.break || row[field])
  .map((row) => (
    <article className={`timeline-card${row.break ? ' break-card' : ''}`} key={row.time}>
      <time>{row.time}</time>
      {row.break ? <strong>茶歇</strong> : <Talk talk={row[field]} />}
    </article>
  ))}
```

- [ ] **Step 5: Remove both table trees and render one tab tree**

```tsx
return <AccessibleTabs className="agenda-tabs" label="大会议程" tabs={tabs} />
```

- [ ] **Step 6: Run focused tests and verify GREEN**

Run the `src/App.test.tsx` command from Task 1. Expected: all agenda tests pass.

### Task 3: Replace Table CSS with Responsive Timeline CSS

**Files:**
- Modify: `src/styles.css`

**Interfaces:**
- Consumes: `.agenda-tabs`, `.tab-list`, `.tab-panel`, `.timeline`, `.timeline-card`, `.talk-participant`.
- Produces: centered 960px desktop timeline and compact mobile timeline.

- [ ] **Step 1: Delete obsolete table rules**

Remove `.desktop-agenda`, `.agenda-table`, `.main-table`, `.breakout-table`, `.main-forum`, `.break-row`, and the media-query rules that toggle `.desktop-agenda` and `.mobile-agenda`.

- [ ] **Step 2: Add the unified desktop column and participant styling**

```css
.agenda-tabs { width: min(960px, 100%); margin: 0 auto; }
.agenda-tabs .tab-list { position: sticky; top: calc(var(--header-height) + 12px); z-index: 20; }
.agenda-tabs .timeline { gap: 18px; }
.agenda-tabs .timeline-card { padding: 24px 28px; box-shadow: 0 10px 30px rgba(54,76,132,.06); }
.agenda-tabs .talk strong { font-size: 1.04rem; line-height: 1.4; }
.talk-participant { color: #2458dc; font-size: .9rem; font-weight: 650; line-height: 1.45; }
```

- [ ] **Step 3: Keep mobile spacing compact**

```css
@media (max-width: 720px) {
  .agenda-tabs { width: 100%; }
  .agenda-tabs .tab-list { top: calc(var(--header-height) + 8px); }
  .agenda-tabs .timeline { gap: 14px; }
  .agenda-tabs .timeline-card { padding: 20px; }
  .agenda-tabs .talk strong { font-size: .94rem; }
}
```

- [ ] **Step 4: Run tests, ESLint, and TypeScript checks**

```bash
/Users/jinger/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node node_modules/vitest/vitest.mjs run
/Users/jinger/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node node_modules/eslint/bin/eslint.js .
/Users/jinger/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node node_modules/typescript/bin/tsc -b
```

Expected: all commands exit 0.

### Task 4: Update Requirements and Verify Responsive Behavior

**Files:**
- Modify: `docs/requirements.md`

**Interfaces:**
- Documents the implemented agenda behavior and final 09:30 participant presentation.

- [ ] **Step 1: Update the agenda presentation requirements**

Replace desktop table language with one shared accessible tabbed timeline, document the `960px` desktop maximum width, empty-slot filtering, and separate lines for the two greeting participants.

- [ ] **Step 2: Build production output**

```bash
/Users/jinger/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node node_modules/vite/bin/vite.js build
```

Expected: Vite exits 0 and writes `dist/`.

- [ ] **Step 3: Inspect desktop layouts**

At `1280px`, `1440px`, and `1920px`, verify the tab/timeline column remains centered at no more than `960px`, cards wrap naturally, and the page has no horizontal overflow.

- [ ] **Step 4: Inspect mobile layout**

At `390×844`, verify tabs remain usable, timeline cards fit the viewport, the two greeting participants appear on separate lines, and the fixed registration bar does not obscure the active card while scrolling.

- [ ] **Step 5: Verify all four tabs**

Click each tab and confirm its content, including no 17:15 card in 技术分论坛 or 案例分论坛（1）, and a 17:15 黄居鑫 card in 案例分论坛（2）.

- [ ] **Step 6: Run the complete verification suite once more**

```bash
/Users/jinger/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node node_modules/vitest/vitest.mjs run
/Users/jinger/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node node_modules/eslint/bin/eslint.js .
/Users/jinger/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node node_modules/typescript/bin/tsc -b
/Users/jinger/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node node_modules/vite/bin/vite.js build
```

Expected: all commands exit 0 with no failed tests, lint errors, type errors, or build errors.
