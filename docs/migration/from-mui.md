# Migrating from MUI to Fikir CSS

> Canonical v1.0 migration path

## Key differences

| Concept | MUI | Fikir CSS |
|---------|-----|-----------|
| Styling | CSS-in-JS / Emotion | Static CSS bundle |
| Components | React-bound | Framework-agnostic CSS |
| Theming | `createTheme()` | CSS custom properties |
| TypeScript | Component prop types | Recipe resolver types |
| SSR | Emotion SSR setup required | Plain CSS, no SSR runtime setup |
| Bundle impact | Large JS bundle | CSS-only core bundle |

## Component mapping

| MUI | Fikir CSS |
|-----|-----------|
| `<Button variant="contained">` | `<button class="btn btn-primary">` |
| `<Button variant="outlined">` | `<button class="btn btn-outline btn-neutral">` |
| `<TextField>` | `<div class="field">` + `<input class="input">` |
| `<Card>` | `<div class="card">` |
| `<Alert severity="error">` | `<div class="alert alert-danger">` |
| `<Chip>` | `<span class="badge">` |
| `<Tooltip title="...">` | `role="tooltip"` + `tooltip` contract |
| `<Modal>` | `data-open` driven `modal` contract |
| `<Drawer>` | `data-open` driven `drawer` contract |
| `<Accordion>` | `accordion` |
| `<Tabs>` | `tabs` |
| `<Table>` | `table` |
| `<Skeleton>` | `skeleton` |
| `<CircularProgress>` | `spinner` |
| `<Breadcrumbs>` | `breadcrumb` |
| `<Pagination>` | `pagination` |
| `<Stepper>` | `stepper` |

## Theme migration

```ts
// MUI
const theme = createTheme({
  palette: {
    primary: { main: "#1976d2" },
    error: { main: "#d32f2f" },
  },
  shape: { borderRadius: 8 },
  typography: { fontSize: 14 },
});
```

```css
/* Fikir CSS */
@layer base {
  :root {
    --color-accent: oklch(55% 0.2 250);
    --color-danger: oklch(48% 0.25 25);
    --radius-md: 0.5rem;
    --font-size-sm: 0.875rem;
  }
}
```

## SSR migration

MUI needs Emotion or style registry setup. Fikir CSS is plain CSS:

```html
<link rel="stylesheet" href="/fikir.css" />
```

## TypeScript migration

MUI provides prop types on React components. Fikir CSS exposes typed resolver helpers:

```ts
import { resolveBtn } from "fikir-css/tooling";

const classes = resolveBtn({ variant: "solid", tone: "primary", size: "sm" });
```

## Step-by-step migration

1. Keep MUI layout pieces only where needed during transition.
2. Replace component-by-component markup with Fikir CSS semantic selectors.
3. Move theme values from `createTheme()` into CSS custom properties.
4. Replace JS-driven open state with `data-open` and optional `fikir-css/helpers`.
5. Re-test supported surfaces under dark mode and focus-visible behavior.
