# From MUI (Material UI) to Fikir CSS

> Created: 2026-04-12
> Scope: M3 migration quickstart

## Key Differences

| Concept | MUI | Fikir CSS |
|---------|-----|-----------|
| Styling | CSS-in-JS / Emotion | Static CSS bundle |
| Components | React-bound | Framework-agnostic CSS |
| Theming | `createTheme()` | CSS custom properties |
| TypeScript | Component prop types | Recipe resolver types |
| SSR | Emotion SSR setup required | Zero-config (plain CSS) |
| Bundle impact | Large JS bundle | CSS only |

## Component Mapping

| MUI | Fikir CSS |
|-----|-----------|
| `<Button variant="contained">` | `<button class="btn btn-primary">` |
| `<Button variant="outlined">` | `<button class="btn">` |
| `<TextField>` | `<div class="field">` + `<input class="input">` |
| `<Card>` | `<div class="card">` |
| `<Alert severity="error">` | `<div class="alert alert-danger">` |
| `<Chip>` | `<span class="badge">` |
| `<Tooltip title="...">` | `<div class="tooltip">` + `role="tooltip"` |
| `<Modal>` | `<div class="modal" data-open="...">` |
| `<Drawer>` | `<div class="drawer" data-open="...">` |
| `<Accordion>` | `<div class="accordion">` |
| `<Tabs>` | `<div class="tabs" role="tablist">` |
| `<Table>` | `<table class="table">` |
| `<Skeleton>` | `<div class="skeleton skeleton-block">` |
| `<CircularProgress>` | `<div class="spinner">` |
| `<Breadcrumbs>` | `<nav class="breadcrumb">` |
| `<Pagination>` | `<nav class="pagination">` |
| `<Stepper>` | `<ol class="stepper">` |

## Theme Migration

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
/* Fikir CSS brand theme */
@layer base {
  :root {
    --color-accent: oklch(55% 0.2 250);    /* primary.main */
    --color-danger: oklch(48% 0.25 25);     /* error.main */
    --radius-md: 0.5rem;                     /* borderRadius: 8 */
    --font-size-sm: 0.875rem;               /* fontSize: 14 */
  }
}
```

## SSR Migration

MUI requires `ServerStyleSheet` or Emotion SSR setup. Fikir CSS is plain CSS — no SSR configuration needed:

```html
<!-- Just link the stylesheet -->
<link rel="stylesheet" href="/fikir.css">
```

## TypeScript Migration

MUI provides prop types on each component. Fikir CSS provides recipe resolver types:

```ts
import { resolveBtn } from "fikir-css/resolvers";

const classes = resolveBtn({ variant: "primary", size: "sm" });
// → "btn btn-primary btn-sm"
```

## Recipe vs Prop API

Fikir CSS's recipe system is the counterpart to MUI's `sx` prop and variant system:

```ts
// MUI sx prop
<Box sx={{ p: 2, bgcolor: "primary.main", borderRadius: 1 }}>

// Fikir CSS — use utility classes directly
<div class="p-2 bg-primary-500 rounded-sm">
```
