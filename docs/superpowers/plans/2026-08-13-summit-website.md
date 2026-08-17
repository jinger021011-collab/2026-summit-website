# 2026 时序数据技术创新大会官网 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 构建符合 `docs/requirements.md` 的 React + Vite + TypeScript 单页大会官网，并完成构建、响应式、导航、议程切换和报名按钮验证。

**Architecture:** 站点使用集中式 TypeScript 数据配置，由桌面表格与移动时间轴共享议程数据，由响应式展示组件消费嘉宾和合作单位数据。全局交互保持轻量，使用 React 状态、IntersectionObserver、原生锚点和无障碍标签组件，不引入路由或大型 UI 框架。

**Tech Stack:** React 19、Vite、TypeScript、CSS、Vitest、Testing Library、Playwright。

## Global Constraints

- 直接使用 `assets/` 中现有主视觉、嘉宾、Logo 和场地平面图素材。
- 不虚构嘉宾、议题、Logo、单位、职务、链接或活动信息。
- 方案 A：蓝色空间和彩色折射主视觉配合玻璃信息层。
- 第 12 位嘉宾为陈学峰，上海玖道信息科技股份有限公司副总经理，照片为 `assets/speakers/12.jpeg`。
- 案例分论坛（1）16:15–16:45 议题为“城市轨道交通供电智能运维场景时序数据库应用”。
- Logo 卡片不显示单位名称，各分组按数字文件名升序排列；单位名称仅用于无障碍文本。
- 所有活动核心内容以 HTML 文本输出。
- 桌面和移动端无页面级横向滚动，尊重 `prefers-reduced-motion`。
- 所有外链新标签页打开并使用 `rel="noopener noreferrer"`。
- 报名 URL 集中配置，四个入口分别上报正确的 `position`。

---

## File Map

- `package.json`, `vite.config.ts`, `tsconfig*.json`, `eslint.config.js`, `index.html`: 工程和质量配置。
- `src/data/*`: 站点、议程、嘉宾、合作单位的唯一内容来源。
- `src/components/Header.tsx`: 桌面导航、移动菜单和当前章节状态。
- `src/components/Agenda.tsx`: 桌面表格和移动时间轴标签。
- `src/components/AccessibleTabs.tsx`: 可复用的 ARIA 标签键盘行为。
- `src/components/SpeakerGrid.tsx`, `PartnerGrid.tsx`: 素材网格与异常回退。
- `src/components/GuideTabs.tsx`: 参会须知、交通、平面图及大图查看。
- `src/components/FloatingActions.tsx`: 移动报名栏和返回顶部。
- `src/components/sections.tsx`: 首屏、简介、报名和页脚等静态章节。
- `src/lib/analytics.ts`: 统一报名事件接口。
- `src/styles.css`: 设计系统、布局、响应式和减少动态效果。
- `src/App.tsx`: 页面组装与视口观察。
- `src/**/*.test.tsx`: 关键内容和交互单元测试。
- `tests/responsive.spec.ts`: 浏览器响应式与主要路径检查。

### Task 1: Scaffold and content model

**Files:**
- Create: `package.json`, `vite.config.ts`, `tsconfig.json`, `tsconfig.app.json`, `tsconfig.node.json`, `eslint.config.js`, `index.html`
- Create: `src/types.ts`, `src/data/site.ts`, `src/data/agenda.ts`, `src/data/speakers.ts`, `src/data/partners.ts`
- Test: `src/data/content.test.ts`

**Interfaces:**
- Produces: `SITE`, `AGENDA`, `SPEAKERS`, `PARTNER_GROUPS` typed exports.

- [ ] Write content tests asserting the official registration URL, four registration positions, all required agenda rows, Chen Xuefeng at 16:15, 19 speakers, and numeric Logo ordering.
- [ ] Run the content test and verify it fails because modules do not exist.
- [ ] Add the Vite/TypeScript scaffold and typed centralized data copied exactly from requirements.
- [ ] Run the content test and TypeScript check until they pass.

### Task 2: Shared interaction primitives

**Files:**
- Create: `src/lib/analytics.ts`
- Create: `src/components/AccessibleTabs.tsx`, `src/components/ImageWithFallback.tsx`
- Test: `src/components/AccessibleTabs.test.tsx`, `src/lib/analytics.test.ts`

**Interfaces:**
- Produces: `trackRegistrationClick(position)`, `AccessibleTabs<T>`, `ImageWithFallback`.

- [ ] Write failing tests for registration event payload, tab ARIA state, click selection, ArrowLeft/ArrowRight/Home/End, and fallback rendering.
- [ ] Implement minimal shared primitives with roving tab focus and a dependency-free analytics event.
- [ ] Run focused tests and verify all pass.

### Task 3: Page sections and visual system

**Files:**
- Create: `src/components/sections.tsx`, `src/styles.css`, `src/main.tsx`
- Create: `src/App.tsx`
- Test: `src/App.test.tsx`

**Interfaces:**
- Consumes: centralized data and analytics adapter.
- Produces: semantic page skeleton with `#top`, `#about`, `#agenda`, `#speakers`, `#partners`, `#guide`, `#register`.

- [ ] Write a failing page test for all landmark headings, HTML event facts, safe external registration links and final CTA tracking.
- [ ] Implement Hero, About, Register and Footer with the confirmed方案 A visual treatment.
- [ ] Add tokens, glass surfaces, responsive containers, focus styles and reduced-motion overrides.
- [ ] Run page tests and TypeScript checks.

### Task 4: Navigation and mobile menu

**Files:**
- Create: `src/components/Header.tsx`
- Modify: `src/App.tsx`, `src/styles.css`
- Test: `src/components/Header.test.tsx`

**Interfaces:**
- Consumes: `SITE.navigation`, active section id, `trackRegistrationClick`.
- Produces: sticky desktop navigation and accessible modal-style mobile menu.

- [ ] Write failing tests for navigation order, registration position, menu expanded state, Escape close and link-triggered close.
- [ ] Implement the header, body scroll lock and focus restoration.
- [ ] Add desktop/mobile breakpoint styles and sticky offset handling.
- [ ] Run focused navigation tests.

### Task 5: Responsive agenda

**Files:**
- Create: `src/components/Agenda.tsx`
- Modify: `src/App.tsx`, `src/styles.css`
- Test: `src/components/Agenda.test.tsx`

**Interfaces:**
- Consumes: `AGENDA`.
- Produces: semantic desktop tables and four accessible mobile timelines.

- [ ] Write failing tests for main-session order, afternoon topic content, Chen Xuefeng, tab names and tab switching.
- [ ] Implement desktop main and breakout tables, including spanning tea break.
- [ ] Implement mobile timelines through `AccessibleTabs` without duplicating agenda content.
- [ ] Add wrapping and breakpoint styles, then run tests.

### Task 6: Speakers, partners and guide

**Files:**
- Create: `src/components/SpeakerGrid.tsx`, `src/components/PartnerGrid.tsx`, `src/components/GuideTabs.tsx`
- Modify: `src/App.tsx`, `src/styles.css`
- Test: `src/components/ContentSections.test.tsx`

**Interfaces:**
- Consumes: `SPEAKERS`, `PARTNER_GROUPS`, venue data.
- Produces: 19-speaker grid, grouped Logo-only grids, accessible guide tabs and venue lightbox.

- [ ] Write failing tests for 19 named speakers, Chen Xuefeng image mapping, no visible Logo names, group and file ordering, guide tabs, venue alt and lightbox close.
- [ ] Implement responsive speaker cards with per-image crop positions and fallbacks.
- [ ] Implement grouped numeric Logo order with non-visible accessible names and no guessed URLs.
- [ ] Implement guide tabs and accessible venue image viewer.
- [ ] Run focused tests.

### Task 7: Floating behavior and browser verification

**Files:**
- Create: `src/components/FloatingActions.tsx`, `playwright.config.ts`, `tests/responsive.spec.ts`
- Modify: `src/App.tsx`, `src/styles.css`, `package.json`

**Interfaces:**
- Produces: mobile sticky registration, back-to-top behavior and end-to-end acceptance checks.

- [ ] Write browser checks for 375, 430, 768, 1280 and 1440px without horizontal overflow.
- [ ] Add checks for desktop/mobile navigation, four agenda tabs, all four registration positions and safe targets.
- [ ] Implement viewport observation for hero, final CTA, active section and floating actions.
- [ ] Run all unit tests, production build and browser checks.
- [ ] Manually inspect captured desktop and mobile screenshots for clipping, overlap, visual hierarchy and readable agenda text.

### Task 8: Final audit and handoff

**Files:**
- Modify as required by findings only.

- [ ] Compare rendered content against every acceptance criterion in `docs/requirements.md`.
- [ ] Verify keyboard traversal, Escape behavior, focus visibility and reduced-motion CSS.
- [ ] Verify no fictional or inferred content was introduced.
- [ ] Run final `npm test`, `npm run build` and Playwright checks from a clean process.
- [ ] Report startup commands, changed files, verification evidence and remaining unconfirmed inputs.

### Task 9: Constrain the desktop agenda layout

**Files:**
- Modify: `src/App.tsx`, `src/components/Agenda.tsx`, `src/styles.css`
- Test: `src/App.test.tsx`

**Interfaces:**
- Consumes: existing `Agenda` component and `AGENDA` data without content changes.
- Produces: a centered `.agenda-container` capped at 1280px, full-width tables inside the container, and explicit main-forum column sizing.

- [ ] Add a failing test that expects the agenda heading and tables to share an `.agenda-container`, the main table to expose `160px`, `50%`, and remaining-width columns, and the mobile tab interface to remain present.
- [ ] Run `pnpm test -- src/App.test.tsx` and confirm failure because the container and colgroup contract are absent.
- [ ] Replace the agenda section's `wide-container` with `.agenda-container`; add a `<colgroup>` to the main table; set 24px horizontal and 30px vertical cell padding with natural wrapping.
- [ ] Run the focused test, full test suite, lint, and production build.
- [ ] Verify 1280×900, 1440×900, and 1920×1080 in a browser: container width never exceeds 1280px, tables match the container, and page/table widths do not cause horizontal scrolling.

### Task 10: Compact and center the speaker cards

**Files:**
- Modify: `src/App.tsx`, `src/components/SpeakerGrid.tsx`, `src/styles.css`
- Test: `src/App.test.tsx`

**Interfaces:**
- Consumes: existing 19-item `SPEAKERS` content without identity changes.
- Produces: a centered `.speakers-container`, wrapping speaker cards capped at 220px, square top-aligned portraits, and 5/4/3/2 responsive columns.

- [ ] Add a failing test that expects the speaker heading and grid inside `.speakers-container`, 19 square portrait wrappers, and no per-person inline image positioning.
- [ ] Run `pnpm test -- src/App.test.tsx` and confirm failure because the dedicated container is absent and images carry inline crop positions.
- [ ] Add the 1280px container and flex-wrap grid; use 220px maximum card width, 24px desktop gaps, 12px mobile gaps, `aspect-ratio: 1 / 1`, and `object-position: top center`.
- [ ] Remove fixed information-area heights, set 16–18px padding, 20–22px names, 14–16px metadata, and line-height 1.5.
- [ ] Run the focused test, full test suite, lint, and production build.
- [ ] Verify 1440×900 and 1920×1080 in a browser: five centered cards per full row, last row centered, portraits no wider than 220px, and no horizontal scrolling.
