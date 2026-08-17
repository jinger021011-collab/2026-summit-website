# Hero Bottom Information Bar Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Display the existing full hero visual without duplicate visible titles, with conference facts in a translucent bottom bar on desktop and a separate content block on mobile.

**Architecture:** Keep `HeroSection` as a decorative visual layer, a screen-reader-only heading, and a semantic information bar. CSS places the 58%-transparent information bar over the desktop reflection area, then changes the same markup to a 16:9 image-first vertical flow at 767px and below.

**Tech Stack:** React, TypeScript, CSS, Vitest, Testing Library, Vite

## Global Constraints

- Use the existing hero image directly from `assets/hero` without stretching or editing it.
- Keep all official text in HTML and preserve the existing registration URL and analytics position.
- Do not expose fragments of the image-baked title behind the HTML title.
- Keep the desktop hero content within 1440px and avoid horizontal overflow.

---

### Task 1: Add semantic hero layers

**Files:**
- Modify: `src/App.test.tsx`
- Modify: `src/components/sections.tsx`

**Interfaces:**
- Consumes: `SITE.theme`, `SITE.name`, `SITE.date`, `SITE.venue`, `SITE.format`, and `RegistrationLink`.
- Produces: `.hero-visual`, `.hero-title-block`, and `.hero-info-bar` within `#top`.

- [ ] **Step 1: Write a failing hero structure test**

Assert that the hero contains one visual region, one HTML title block, and a bottom information bar containing the three facts and hero registration link; assert that the former `.hero-panel` is absent.

- [ ] **Step 2: Verify the focused test fails**

Run `pnpm test -- src/App.test.tsx`. Expect failure because the new hero layer classes do not exist.

- [ ] **Step 3: Implement the semantic markup**

Replace the overlay card with separate visual, title, and information-bar elements while retaining the existing copy and registration component.

- [ ] **Step 4: Verify the focused test passes**

Run `pnpm test -- src/App.test.tsx` and expect all tests to pass.

### Task 2: Implement responsive visual placement

**Files:**
- Modify: `src/styles.css`

**Interfaces:**
- Consumes: the Task 1 hero class names.
- Produces: desktop full visual with bottom information bar and mobile image-first vertical flow.

- [ ] **Step 1: Replace legacy hero overlay CSS**

Implement a maximum 1440px desktop frame, opaque title mask, centered HTML title, and high-opacity bottom information bar. Remove obsolete `.hero-panel`, `.hero-content`, `.hero-shade`, and old mobile overlay rules.

- [ ] **Step 2: Add the mobile stacked layout**

At 767px and below, place the cropped visual first and the HTML title/facts/button in a separate deep-blue block below it.

- [ ] **Step 3: Run complete automated verification**

Run the full test suite, lint, and production build; all must exit 0.

- [ ] **Step 4: Verify responsive behavior in the browser**

Measure 1280px, 1440px, and 1920px desktop widths for overflow and title/fact geometry. At 390px and 767px verify image-first vertical order, no overlap, and no horizontal scroll.
