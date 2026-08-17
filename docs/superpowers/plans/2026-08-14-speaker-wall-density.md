# Speaker Wall Density Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 将 19 位嘉宾整理为紧凑、固定上限尺寸的 5 列照片墙，并保证最后 4 张居中。

**Architecture:** 保留 `SpeakerGrid` 的数据映射和居中 flex 换行结构，只为人物信息增加明确的语义类名，并在现有响应式 CSS 中收紧尺寸、间距和文本行数。使用浏览器真实布局测量验证列数、尺寸、居中和横向溢出。

**Tech Stack:** React、TypeScript、Vite、Vitest、Playwright 浏览器运行时、CSS Flexbox

## Global Constraints

- 只修改嘉宾介绍模块。
- 桌面端保持 5 列，不改成 6 列。
- 19 位嘉宾排列为 5、5、5、4，最后一行整体居中。
- 1280px、1440px 和 1920px 下卡片宽度为 200px，高度为 310px。
- 不拉伸人物照片，不允许页面出现横向滚动。

---

### Task 1: 增加嘉宾卡片布局回归验证

**Files:**
- Test: `src/App.test.tsx`
- Test: 浏览器运行时断言

**Interfaces:**
- Consumes: `.speaker-grid`、`.speaker-card`、`.speaker-photo`、19 位嘉宾数据
- Produces: 卡片语义结构和真实视口布局的可验证约束

- [ ] **Step 1: 写入失败的组件结构测试**

断言每张卡片包含 `.speaker-meta`，职位文本保留完整可访问内容。

- [ ] **Step 2: 运行定向测试并确认失败**

Run: `pnpm test -- src/App.test.tsx`
Expected: FAIL，因为旧组件没有 `.speaker-meta`。

- [ ] **Step 3: 写入最小组件结构实现**

将单位和职位组合到 `.speaker-meta` 段落中，并以分隔符连接。

- [ ] **Step 4: 运行定向测试并确认通过**

Run: `pnpm test -- src/App.test.tsx`
Expected: PASS。

### Task 2: 压缩桌面卡片并锁定五列

**Files:**
- Modify: `src/styles.css`

**Interfaces:**
- Consumes: Task 1 的 `.speaker-meta` 和现有 flex 换行网格
- Produces: 200px 宽、310px 高的桌面卡片与两行信息块

- [ ] **Step 1: 调整容器、间距、卡片、图片与文字样式**

使用 22px 横向和纵向间距；桌面卡片宽 200px、高 310px；姓名 21px；元信息 14px 并限制两行。

- [ ] **Step 2: 在 1280、1440、1920 视口执行浏览器断言**

验证首行 5 张、末行 4 张居中、卡片尺寸为 200 × 310px，且文档无横向溢出。

- [ ] **Step 3: 运行完整质量检查**

Run: `pnpm test && pnpm lint && pnpm build`
Expected: 所有命令退出码为 0。
