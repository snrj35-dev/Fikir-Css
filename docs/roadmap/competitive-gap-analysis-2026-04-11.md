# Fikir CSS — Competitive Gap Analysis (2026-04-11)

> Last reviewed: 2026-04-11

## Purpose
Compare current Fikir CSS surface with widely used UI ecosystems and identify highest-value missing areas for the next roadmap phase.

## Current Fikir CSS Snapshot
- Implemented component files: `75` (`packages/components/*.css`)
- Strong coverage:
  - Core inputs and forms (`input`, `textarea`, `select`, `checkbox`, `radio`, `switch`, `input-group`)
  - Overlay/navigation basics (`modal`, `toast`, `popover`, `tooltip`, `dropdown-menu`, `tabs`, `accordion`, `pagination`, `breadcrumb`)
  - Product pattern foundations (`app-shell`, `page-header`, `section-block`, `data-grid`, `table`)

## External Baseline Sources
- MUI all components: `https://mui.com/material-ui/all-components/`
- Radix primitives overview/components list: `https://www.radix-ui.com/primitives/docs/overview/introduction`
- shadcn/ui components: `https://ui.shadcn.com/docs/components`
- Ant Design components overview: `https://ant.design/components/overview/`

## High-value Gaps (Not in current canonical surface)
1. Enterprise data/navigation
- `tree-view` / hierarchical explorer
- stronger data-grid feature set (sorting/filter state conventions, density presets, toolbar contract)

2. Form productivity and commerce UX
- `number-input` / formatted numeric input
- `rating`
- `tags-input` / tokenized multi-value entry
- `color-picker`

3. Advanced feedback and product ops
- `tour` / guided onboarding steps
- `result` / status page pattern (`success`, `error`, `empty`, `maintenance`)

4. Platform-level content surface
- chart integration pattern (at minimum wrapper/pattern guidance for chart libs)

## Priority Recommendation
- P1 (next milestone): `number-input`, `rating`, `tree-view`, `result`, `tags-input`
- P2: `color-picker`, `tour`, advanced data-grid conventions
- P3: chart pattern API/spec (framework-agnostic)

## Notes
- Several competitors expose similar capabilities under different names (`sheet` vs `drawer`, `input-otp` vs `otp-input`, etc.).
- Fikir CSS already has broad base coverage; the next leverage is "workflow completeness" rather than raw component count.
