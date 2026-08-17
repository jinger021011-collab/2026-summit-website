# PC 端议程嘉宾信息排版 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 让 PC 端所有议程卡片的单位和职务统一显示在蓝色嘉宾姓名右侧，同时保持移动端当前上下排版。

**Architecture:** 在 `Talk` 组件中为普通嘉宾和多参与者嘉宾建立一致的“姓名＋分隔符＋单位职务”语义结构。CSS 在桌面端横向排列这些片段，在 720px 及以下恢复纵向排列并隐藏横向分隔符。

**Tech Stack:** React、TypeScript、CSS、Vitest、Testing Library、Vite

## Global Constraints

- 仅修改大会议程，不修改嘉宾介绍照片卡片。
- PC 端姓名保持现有蓝色样式，单位与职务复用现有灰色 `.talk-meta` 样式。
- 多位嘉宾各占一行。
- 移动端继续使用姓名、单位职务上下排版。
- 不修改议程数据、卡片尺寸、标签页或其他页面模块。
- PC 端显示为 `姓名｜单位 职务`，移动端继续显示 `单位｜职务`。

---

### Task 1: 统一议程嘉宾信息结构与响应式排版

**Files:**
- Modify: `src/App.test.tsx`
- Modify: `src/components/Agenda.tsx`
- Modify: `src/styles.css`

**Interfaces:**
- Consumes: `AgendaTalk.speaker`、`AgendaTalk.organization`、`AgendaTalk.role` 和 `AgendaTalk.participants`。
- Produces: `.talk-speaker-line` 普通嘉宾行、`.talk-participant` 多参与者行、行内 `.talk-speaker`、`.talk-separator` 和 `.talk-meta`。

- [ ] **Step 1: 写入失败测试**

扩展“致辞嘉宾与职务按两条独立信息展示”测试，确认每条 `.talk-participant` 都包含独立的 `.talk-speaker` 和 `.talk-meta`；扩展普通主论坛议程测试，确认 `.talk-speaker-line` 中姓名与职务同样拆分：

```tsx
const participantRows = Array.from(card.querySelectorAll<HTMLElement>('.talk-participant'))
expect(participantRows).toHaveLength(2)
expect(participantRows[0].querySelector('.talk-speaker')).toHaveTextContent('孙家广')
expect(participantRows[0].querySelector('.talk-meta')).toHaveTextContent('中国工程院院士')
expect(participantRows[1].querySelector('.talk-speaker')).toHaveTextContent('涂华')
expect(participantRows[1].querySelector('.talk-meta')).toHaveTextContent('中国通信学会副秘书长')

const regularRow = cards.find((item) => item.textContent?.includes('11:40–12:00'))
const speakerLine = regularRow?.querySelector('.talk-speaker-line')
expect(speakerLine?.querySelector('.talk-speaker')).toHaveTextContent('张欢')
expect(speakerLine?.querySelector('.talk-meta')).toHaveTextContent('中国南方航空股份有限公司｜项目技术专家')
```

- [ ] **Step 2: 运行定向测试并确认失败**

Run: `npm test -- src/App.test.tsx -t "致辞嘉宾与职务|主论坛时间轴展示更新后的嘉宾职务"`

Expected: FAIL，因为当前多参与者行没有独立 `.talk-speaker`/`.talk-meta`，普通议程也没有 `.talk-speaker-line`。

- [ ] **Step 3: 实现统一标记结构**

在 `Agenda.tsx` 中让普通嘉宾和多参与者嘉宾都生成一致的内部元素：

```tsx
<span className="talk-participant">
  <span className="talk-speaker">{participant.name}</span>
  {(participant.organization || participant.role) && (
    <span className="talk-meta">
      <span className="talk-separator" aria-hidden="true">｜</span>
      {[participant.organization, participant.role].filter(Boolean).join('｜')}
    </span>
  )}
</span>
```

普通议程使用 `.talk-speaker-line` 包裹同样的 `.talk-speaker`、`.talk-separator` 和 `.talk-meta`。没有单位或职务时不输出空 `.talk-meta`。

- [ ] **Step 4: 实现桌面横排与移动端纵排样式**

在 `styles.css` 中：

```css
.talk-speaker-line,
.talk-participant {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  line-height: 1.45;
}

@media (max-width: 720px) {
  .talk-speaker-line,
  .talk-participant {
    flex-direction: column;
    gap: 4px;
  }

  .talk-separator { display: none; }
}
```

删除 `.talk-participant` 自身的颜色、字号和字重，确保姓名直接复用 `.talk-speaker`，单位职务直接复用 `.talk-meta`。

- [ ] **Step 5: 运行定向测试并确认通过**

Run: `npm test -- src/App.test.tsx -t "致辞嘉宾与职务|主论坛时间轴展示更新后的嘉宾职务"`

Expected: PASS。

- [ ] **Step 6: 运行完整验证**

Run: `npm test`

Expected: 所有测试通过。

Run: `npm run lint`

Expected: 无 ESLint 错误。

Run: `npx tsc -b`

Expected: 无 TypeScript 错误。

Run: `npm run build`

Expected: Vite 生产构建成功。

- [ ] **Step 7: 浏览器检查**

在 `http://127.0.0.1:5173/` 检查 PC 端主论坛及一个分论坛：姓名为蓝色，单位和职务在姓名右侧且为灰色，多嘉宾各占一行。再以 390px 宽度检查移动端：姓名与单位职务保持上下排列，页面无横向滚动。

项目当前没有 Git 元数据，因此不执行提交步骤。

### Task 2: 响应式控制单位与职务分隔符

**Files:**
- Modify: `src/App.test.tsx`
- Modify: `src/components/Agenda.tsx`
- Modify: `src/styles.css`

**Interfaces:**
- Consumes: `AgendaTalk.organization`、`AgendaTalk.role` 和 `AgendaParticipant` 中的同名字段。
- Produces: `.talk-organization`、`.talk-role-separator`、`.talk-role`；仅在单位与职务同时存在时输出 `.talk-role-separator`。

- [ ] **Step 1: 写入失败测试**

在主论坛张欢议程的现有断言中增加结构检查：

```tsx
const meta = speakerLine?.querySelector('.talk-meta')
expect(meta?.querySelector('.talk-organization')).toHaveTextContent('中国南方航空股份有限公司')
expect(meta?.querySelector('.talk-role-separator')).toHaveTextContent('｜')
expect(meta?.querySelector('.talk-role')).toHaveTextContent('项目技术专家')
```

并确认只有职务、没有单位的何友议程不输出 `.talk-role-separator`。

- [ ] **Step 2: 运行定向测试并确认失败**

Run: `npm test -- src/App.test.tsx -t "主论坛时间轴展示更新后的嘉宾职务"`

Expected: FAIL，因为当前单位与职务仍是一个拼接字符串，没有独立结构。

- [ ] **Step 3: 实现单位与职务的独立标记**

在 `Agenda.tsx` 中增加内部 `TalkMeta` 组件，并在普通嘉宾和多参与者嘉宾中复用：

```tsx
function TalkMeta({ organization, role }: Pick<AgendaTalk, 'organization' | 'role'>) {
  if (!organization && !role) return null
  return (
    <span className="talk-meta">
      {organization && <span className="talk-organization">{organization}</span>}
      {organization && role && <span className="talk-role-separator" aria-hidden="true">｜</span>}
      {role && <span className="talk-role">{role}</span>}
    </span>
  )
}
```

姓名与整个 `.talk-meta` 之间的 `.talk-separator` 保持不变。

- [ ] **Step 4: 实现 PC 空白分隔、移动端竖线分隔**

```css
.talk-role-separator {
  display: inline-block;
  width: .45rem;
  overflow: hidden;
  font-size: 0;
}

@media (max-width: 720px) {
  .talk-role-separator {
    width: auto;
    overflow: visible;
    font-size: inherit;
  }
}
```

- [ ] **Step 5: 运行定向测试并确认通过**

Run: `npm test -- src/App.test.tsx -t "主论坛时间轴展示更新后的嘉宾职务"`

Expected: PASS。

- [ ] **Step 6: 完整验证与浏览器检查**

运行 `npm test`、`npm run lint`、`npx tsc -b` 和 `npm run build`。浏览器检查 PC 端显示 `姓名｜单位 职务`，390px 移动端继续显示 `单位｜职务`，两端均无横向滚动。
