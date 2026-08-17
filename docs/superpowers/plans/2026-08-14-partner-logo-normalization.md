# Partner Logo Normalization Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 无损清理并标准化合作伙伴 Logo，使全部品牌在统一卡片中居中、协调且无浅蓝辅助线。

**Architecture:** 原图保留不动，通过确定性像素处理生成 `380 × 144px` 白底副本；数据层统一切换到 normalized 路径，CSS 对所有图片施加相同的 `190 × 72px` 显示上限。浏览器验收和像素检查分别覆盖页面布局与素材完整性。

**Tech Stack:** React、TypeScript、Vite、Vitest、CSS Flexbox、Python Pillow、浏览器响应式检查

## Global Constraints

- 不使用生成式重绘。
- 不覆盖或删除任何原始 Logo。
- 不修改分类、排列顺序和其他页面模块。
- 不拉伸、不改变比例、不裁切 Logo 主体。
- 标准化画布为 380 × 144px，桌面卡片为 220 × 120px，网页显示上限为 160 × 56px。

---

### Task 1: 锁定标准化素材引用

**Files:**
- Modify: `src/data/content.test.ts`
- Modify: `src/data/partners.ts`

**Interfaces:**
- Consumes: `PARTNER_GROUPS` 中全部 24 个 `PartnerItem`
- Produces: 每个 `image` 均指向 `/logos/normalized/<分组>/<文件名>`

- [ ] **Step 1: 写入失败测试**

断言所有合作伙伴图片路径均以 `/logos/normalized/` 开头，同时保持总数 24 和既有 order 顺序。

- [ ] **Step 2: 运行测试并确认因旧路径失败**

Run: `pnpm test -- src/data/content.test.ts`
Expected: FAIL，旧路径仍以 `/logos/` 开头。

- [ ] **Step 3: 生成标准化素材并更新数据路径**

将内容等比例缩放到最大 340 × 112px 后置于 380 × 144px 白底画布，输出到 normalized 目录；数据路径增加 `normalized/`。

- [ ] **Step 4: 运行定向测试**

Run: `pnpm test -- src/data/content.test.ts`
Expected: PASS。

### Task 2: 统一卡片与图片显示区域

**Files:**
- Modify: `src/styles.css`

**Interfaces:**
- Consumes: 380 × 144px 标准化 Logo
- Produces: 220 × 120px 桌面卡片及 160 × 56px 最大图片显示区

- [ ] **Step 1: 更新共享样式**

卡片使用 flex 居中、220 × 120px、28px 32px 内边距和 hidden 溢出；图片使用 auto 宽高、160px/56px 上限，并清除自身边框、轮廓和阴影。

- [ ] **Step 2: 运行像素级素材检查**

验证全部 24 个副本尺寸为 380 × 144px、原图哈希未变化、辅助线文件的外围不再含浅蓝长线。

- [ ] **Step 3: 验证桌面和移动端**

在 1440px 与 390px 视口检查 Logo 居中、无溢出、无变形和页面无横向滚动，并保存前后对比截图。

- [ ] **Step 4: 运行完整质量检查**

Run: `pnpm test && pnpm lint && pnpm build`
Expected: 所有命令退出码为 0。
