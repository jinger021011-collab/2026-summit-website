# Bilingual Summit Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a complete English version at `/en` while preserving the existing Chinese page at `/`, its layout, interactions, and current-page position during language switching.

**Architecture:** Initialize `i18next` synchronously from the URL and expose typed Chinese and English page-content resources through `react-i18next`. Existing components keep their structure and styling but read all visible and accessibility copy from the active locale. A small URL/SEO layer updates the path, document language, metadata, and alternate-language links without introducing a second application.

**Tech Stack:** React, TypeScript, Vite, i18next, react-i18next, Vitest, Testing Library, Playwright/browser QA

**Spec:** `docs/english-copy-draft.md` and the user-approved single-site bilingual requirements

## Global Constraints

- Chinese is the default language at `/`; English is served at `/en`.
- Language switching preserves the current hash and scroll position.
- The visual structure, animations, controls, and registration analytics remain unchanged.
- All visible and accessibility copy lives in locale resources, not components.
- English agenda wording matches `docs/english-copy-draft.md` Sections 6-10.
- The English hero uses `assets/hero/20260817-142738.jpeg`; Chinese keeps `assets/hero/hero-optimized.jpg`.
- Both language URLs expose `hreflang` links for `zh-CN`, `en`, and `x-default`.

---

### Task 1: Language URL and SEO foundation

**Files:**
- Create: `src/i18n/routing.ts`
- Create: `src/i18n/routing.test.ts`
- Create: `src/components/Seo.tsx`
- Test: `src/App.test.tsx`

**Interfaces:**
- Produces: `getLanguageFromPath(pathname)`, `getLocalizedUrl(language, location)`, and `<Seo />`.

- [ ] Write failing tests for `/` -> `zh`, `/en` -> `en`, hash-preserving localized URLs, document language, title, description, and alternate links.
- [ ] Run the focused tests and confirm failures are caused by the missing implementation.
- [ ] Implement the routing helpers and SEO component.
- [ ] Run the focused tests and confirm they pass.

### Task 2: Locale resources and i18next initialization

**Files:**
- Create: `src/i18n/locales/zh.ts`
- Create: `src/i18n/locales/en.ts`
- Create: `src/i18n/index.ts`
- Modify: `src/main.tsx`
- Modify: `src/data/site.ts`
- Modify: `src/data/agenda.ts`
- Modify: `src/data/speakers.ts`
- Modify: `src/data/partners.ts`
- Test: `src/data/content.test.ts`

**Interfaces:**
- Produces: `Language`, `usePageContent()`, locale resources, and language-neutral URLs/media metadata.

- [ ] Write failing data tests for English event information, all four agenda tracks, 21 speakers, partner labels, and English hero media.
- [ ] Run the focused tests and confirm the English resource is missing.
- [ ] Add Chinese and English locale resources, using the confirmed final agenda wording.
- [ ] Initialize i18next from `window.location.pathname` before rendering React.
- [ ] Run the data tests and confirm they pass.

### Task 3: Localize components and language switcher

**Files:**
- Modify: `src/App.tsx`
- Modify: `src/components/Header.tsx`
- Modify: `src/components/Agenda.tsx`
- Modify: `src/components/SpeakerGrid.tsx`
- Modify: `src/components/PartnerGrid.tsx`
- Modify: `src/components/GuideTabs.tsx`
- Modify: `src/components/sections.tsx`
- Modify: `src/components/FloatingActions.tsx`
- Modify: `src/components/ImageWithFallback.tsx`
- Modify: `src/styles.css`
- Test: `src/App.test.tsx`
- Test: `src/components/Header.test.tsx`

**Interfaces:**
- Consumes: `usePageContent()`, `getLocalizedUrl()`, and `i18n.changeLanguage()`.

- [ ] Write failing tests for the English page, language controls, English agenda/speakers, and anchor-preserving switching.
- [ ] Run the focused tests and confirm the UI still renders Chinese-only copy.
- [ ] Replace component literals with locale content and add the desktop/mobile language control.
- [ ] Keep registration links and analytics positions unchanged.
- [ ] Run component and application tests and confirm both languages pass.

### Task 4: Static SEO and full verification

**Files:**
- Modify: `index.html`
- Modify: `package.json`
- Modify: `pnpm-lock.yaml`

**Interfaces:**
- Consumes: the runtime SEO component and both language routes.

- [ ] Add static fallback alternate-language links and install `i18next`/`react-i18next`.
- [ ] Run the full test suite.
- [ ] Run ESLint and the production build.
- [ ] Start the Vite server and inspect `/` and `/en` at desktop and mobile widths.
- [ ] Verify navigation, agenda tabs, guide tabs, all registration buttons, the language switcher, no horizontal overflow, document language, and hreflang values.
