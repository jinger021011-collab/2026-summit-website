# Desktop Main Forum Density Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Compress only the desktop main-forum module so its title, header, and eight agenda rows fit within a 1440×900 viewport while remaining readable.

**Architecture:** Add a semantic `.main-forum` wrapper around the existing desktop main-forum title and table, then scope compact typography and spacing to that wrapper. Preserve the existing agenda data, table columns, breakout table, and mobile timeline.

**Tech Stack:** React, TypeScript, CSS, Vitest, Testing Library, Vite

## Global Constraints

- Preserve the 1280px agenda container and the 160px / 50% / remaining-width column structure.
- Do not use fixed heights, min-heights, transform scaling, zoom, clipping, or truncation.
- Do not change the mobile agenda timeline or the desktop breakout table.

---

### Task 1: Scope the compact desktop main-forum layout

**Files:**
- Modify: `src/App.test.tsx`
- Modify: `src/components/Agenda.tsx`
- Modify: `src/styles.css`

**Interfaces:**
- Consumes: `AGENDA.main` and the existing `.main-table` markup.
- Produces: `.main-forum` containing one heading and the existing `.main-table`.

- [ ] **Step 1: Write the failing structure test**

Add a test asserting that the main table and “主论坛” heading share `.main-forum`, while `.breakout-table` remains outside it and the mobile tablist remains present.

- [ ] **Step 2: Run the focused test and verify failure**

Run `pnpm test -- src/App.test.tsx` and expect failure because `.main-forum` does not exist.

- [ ] **Step 3: Add the scoped wrapper and compact CSS**

Wrap the heading and main table in `.main-forum`. Apply `28px 0 36px` container padding, 30px heading size, compact table header/body padding, 1.3–1.35 line heights, and the requested typography only beneath `.main-forum`.

- [ ] **Step 4: Run automated verification**

Run the focused test, full test suite, lint, and build. All commands must exit 0.

- [ ] **Step 5: Run responsive browser verification**

At 1440×900 and 1920×1080, align `.main-forum` to the viewport top and measure its bottom edge at or below the viewport height. Verify document scroll width equals client width and the last row is visible. At 390×844, verify `.desktop-agenda` is hidden and `.mobile-agenda` remains visible.

