# Timecho Official Footer Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the simplified event footer with the confirmed Timecho official footer structure, omitting the product-promotion block, while preserving the rest of the activity page.

**Architecture:** Keep the existing `Footer` export and store all verified external URLs in `SITE.footer`. Render the semantic footer from focused data arrays, use native details elements for mobile navigation, and extend the existing IntersectionObserver state to suppress the mobile registration bar while the footer is visible.

**Tech Stack:** React, TypeScript, CSS, Vitest, Testing Library, Browser responsive QA.

## Global Constraints

- Only modify the page bottom and mobile sticky-registration visibility near the footer.
- Never use guessed or empty links.
- External links open in a new tab with `rel="noopener noreferrer"`.
- Use only local image assets.
- Keep all content as HTML and preserve 44px mobile touch targets.

---

### Task 1: Footer data and contract tests

**Files:**
- Modify: `src/data/site.ts`
- Modify: `src/App.test.tsx`

- [ ] Add failing tests for the absence of the promotion block plus navigation labels, official URLs, safe external attributes, contact data, legal copy, QR placeholder, and absence of empty links and Powered by Halo.
- [ ] Run `pnpm test -- src/App.test.tsx` and verify failure because the new footer does not exist.
- [ ] Add the verified footer link and content data to `SITE.footer`.

### Task 2: Official footer structure and behavior

**Files:**
- Modify: `src/components/sections.tsx`
- Modify: `src/App.test.tsx`

- [ ] Implement the brand, navigation, social, contact and compliance sections in the existing `Footer` export.
- [ ] Implement the official contact action as an accessible button that focuses the local official contact block.
- [ ] Run the focused tests and verify they pass.

### Task 3: Footer visibility coordination

**Files:**
- Modify: `src/App.tsx`
- Modify: `src/components/FloatingActions.tsx`
- Modify: `src/App.test.tsx`

- [ ] Add a failing behavior assertion for hiding the sticky registration control while the footer is visible.
- [ ] Observe the footer and pass the combined visibility state into `FloatingActions`.
- [ ] Run the focused tests and verify they pass.

### Task 4: Official responsive styling and acceptance

**Files:**
- Modify: `src/styles.css`
- Create: `footer-desktop-1440.png`
- Create: `footer-mobile-390.png`

- [ ] Add desktop official colors, spacing, multicolumn layout and interaction states.
- [ ] Add 768px two-column and 390px collapsible layouts with no overflow.
- [ ] Run the full test suite, lint and production build.
- [ ] Browser-check 1440, 1920, 768 and 390 widths for overflow, link attributes, alignment and sticky-bar suppression.
- [ ] Save and visually inspect the requested desktop and mobile screenshots.
