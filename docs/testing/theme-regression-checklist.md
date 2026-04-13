# Theme Regression Checklist

> Created: 2026-04-12
> Scope: Manual checklist to run for every theme mode change and brand theme release

## Instructions

Run this checklist before publishing any change to:
- `packages/tokens/semantic.css`
- `packages/tokens/themes/*.css`
- Any brand theme file

## 1. Token Coverage

- [ ] All semantic tokens are defined for the new theme/mode
- [ ] No undefined `var()` references (build passes without warnings)
- [ ] Dark mode equivalent is defined if the theme has a light mode

## 2. Component Visual Check — Core Surfaces

| Component | Check |
|-----------|-------|
| `button` | Primary, neutral, danger variants render with correct accent/danger colors |
| `input` | Border, focus ring, error state visible |
| `card` | Surface background distinct from page background |
| `badge` | All tone variants readable |
| `alert` | All tone variants readable |
| `modal` | Backdrop visible, panel surfaces correct |
| `toast` | All tone variants (success/info/warn/error) distinguishable |

## 3. Component Visual Check — Extended Surfaces

| Component | Check |
|-----------|-------|
| `navbar` | Background vs page contrast correct |
| `sidebar-nav` | Active item highlight visible |
| `accordion` | Trigger hover/active states correct |
| `dropdown-menu` | Panel surface distinct from background |
| `tooltip` | Text readable on surface |
| `data-grid` | Row borders visible; selected row highlighted |
| `segmented-control` | Active segment raised/highlighted |
| `settings-panel` | Sidebar background distinct from content area |

## 4. Density Mode Check (if applicable)

- [ ] Compact: components fit in reduced space without clipping
- [ ] Comfortable: components have adequate visual breathing room
- [ ] Typography scale is proportional to spacing scale

## 5. Shape Mode Check (if applicable)

- [ ] Rounded mode: all radii consistently larger
- [ ] Sharp mode: no rounded corners visible on any surface

## 6. High Contrast Check

- [ ] Text-to-background contrast ≥ 4.5:1 for body text
- [ ] Text-to-background contrast ≥ 3:1 for large text
- [ ] Focus rings visible at 100% zoom
- [ ] `forced-colors: active` (Windows High Contrast) renders correctly

## 7. Reduced Motion Check

- [ ] All animations/transitions are disabled when `data-motion="reduced"` or `prefers-reduced-motion: reduce`
- [ ] Skeleton shimmer stops
- [ ] No toast slide-in animation
- [ ] Accordion opens without transition

## 8. Automated Checks

- [ ] `npm run test:source` passes
- [ ] `npm run test:build` passes
- [ ] `npm run validate:size` passes (no unexpected bundle growth)
- [ ] `npm run report:bundle-layers` shows no unexpected layer bloat

## 9. Sign-off

| Reviewer | Date | Notes |
|----------|------|-------|
| | | |
