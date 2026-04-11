# Playground (v0.3 Foundation Showcase)

## Recommended folder structure

```text
playground/
├─ index.html
├─ getting-started.html
├─ form-validation-example.html
├─ app-shell-example.html
├─ data-display-example.html
├─ data-table-workflow-example.html
├─ dashboard-example.html
├─ settings-example.html
├─ accessibility-notes.html
├─ demo.css
├─ demo.js
├─ screenshots/
└─ README.md
```

## Sections in this demo
0. Standalone example pages hub (`getting-started`, `form-validation`, `app-shell`, `data-display`, `dashboard`, `settings`, `accessibility notes`)
1. Component surface (button, card, input, badge, alert, icon-button, link, divider, surface, visually-hidden, skeleton, spinner)
2. Layout primitives (`container`, `stack`, `cluster`, `sidebar`, `switcher`, `center`, `grid`)
3. Utility vs semantic override (3 examples)
4. Light/dark preview (`data-theme`)
5. Recipe resolver usage snapshot
6. Input validation surface
7. Card composition surface
8. Choice controls + range + OTP (`checkbox`, `radio`, `switch`, `range-slider`, `otp-input`)
9. Input group surface
10. Modal surface
11. Toast surface
12. Tooltip surface
13. Popover surface
14. Dropdown menu surface
14.1 Context menu + progress + loading overlay surface
15. Drawer surface
16. Tabs surface
17. Accordion surface
18. Pagination surface
19. Breadcrumb surface
20. Navbar surface
20.1 Menu bar surface
21. Sidebar navigation surface
22. Stepper surface
23. Page header surface
24. Section block surface
25. App shell surface
25.1 Split pane surface
26. Table + empty state surface
26.1 Data grid surface
27. Avatar + stat surface
27.1 Avatar group + tag chip surface
28. Timeline + KPI card surface
29. List + description list surface
30. Combobox + search box surface
31. Autocomplete + command palette surface
32. Command bar + filter bar composite
33. Data table toolbar pattern
34. Date picker surface
35. Date range picker surface
36. Calendar surface
37. File upload surface
38. Dropzone surface
39. Editable field surface
40. Hover card surface
41. Content / rich UI surface (`text`, `heading`, `code`, `code-block`, `callout`, `quote`, `kbd`, `markdown-surface`)

## Support Labeling
- Section headers are labeled as `supported`, `experimental`, or `showcase`.
- Labels are a presentation layer in playground (`demo.js` + `demo.css`) and map to the baseline in `docs/roadmap/support-matrix.md`.

## Standalone Example Pages
- Minimal core onboarding: `playground/getting-started.html`
- Form validation flow: `playground/form-validation-example.html`
- App-shell refinement sample: `playground/app-shell-example.html`
- Data display sample: `playground/data-display-example.html`
- Data table workflow sample: `playground/data-table-workflow-example.html`
- Dashboard page sample: `playground/dashboard-example.html`
- Settings page sample: `playground/settings-example.html`
- Accessibility-focused notes sample: `playground/accessibility-notes.html`

## Screenshots
Light mode:

![Playground light mode screenshot](./screenshots/playground-light.png)

Dark mode:

![Playground dark mode screenshot](./screenshots/playground-dark.png)
These captures are generated from `playground/index.html` with the current `dist/fikir.css` build output.

## Visual Regression Baseline
- Plan and strategy: `docs/testing/playground-visual-regression-plan.md`
- Baseline check command: `npm run validate:playground-baseline`
- Baseline files:
  - `playground/screenshots/playground-light.png`
  - `playground/screenshots/playground-dark.png`

## How it binds to current foundation
- Framework styles: `../dist/fikir.css`
- Demo-only styling: `./demo.css`
- Demo interactions: `./demo.js`
- Demo CSS rule: `demo.css` only targets `demo-*` classes and does not override canonical framework selectors.

## Run
1. Build CSS bundle:
   - `npm run build`
2. Open demo:
   - `playground/index.html`
3. Open minimal getting-started page (optional):
   - `playground/getting-started.html`
4. Open form validation sample (optional):
   - `playground/form-validation-example.html`
5. Open standalone app shell sample (optional):
   - `playground/app-shell-example.html`
6. Open data display sample (optional):
   - `playground/data-display-example.html`
7. Open data table workflow sample (optional):
   - `playground/data-table-workflow-example.html`
8. Open dashboard/settings samples (optional):
   - `playground/dashboard-example.html`
   - `playground/settings-example.html`
9. Open accessibility notes sample (optional):
   - `playground/accessibility-notes.html`

If bundle is missing, the page shows:
- `Build output missing: dist/fikir.css is not loaded. Run npm run build.`

## Dark Mode Note
- Demo-specific text and panel colors are token-based and keep readable contrast in dark mode.

This is a showcase/playground, not a production app.
