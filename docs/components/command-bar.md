# Command Bar

> Support level: **Beta** | Pattern key: `data-pattern="command-bar"` | Canonical: `[data-pattern="command-bar"]`

## When to use

Üst toolbar bölgesinde kullanıcının arama yapabileceği ve hızlı aksiyonlara (new, export, vb) erişebileceği bir bileşik alan gerektiğinde kullanın.

- ✓ Uygulamanın başında arama + hızlı aksiyonlar
- ✓ Workspace veya context-spesifik komut çubuğu
- ✓ Filtre/arama + quick actions kombinasyonu
- ✗ Sadece arama yapmak istiyorsanız doğrudan `search-box`
- ✗ Global fuzzy command discovery için `command-palette`

## Classes

| Class | Role | Modifiers |
|-------|------|-----------|
| `[data-pattern="command-bar"]` | Pattern wrapper — required | n/a |
| `[data-slot="actions"]` | Quick action buttons container | Optional, for grouping |
| `search-box` | Search input area (reused) | `search-box-input`, `search-box-action` |
| `btn` | Quick action buttons | `btn-primary`, `btn-outline`, `btn-sm` |
| `badge` | Optional status badge | Tone variants: `badge-primary`, `badge-danger` |

## States

Command bar genellikle component değil pattern olduğu için kendi state'i sınırlıdır. Alt bileşenler (search-box, buttons) kendi state'lerini yönetir.

| State | Activation | HTML pattern |
|-------|-----------|--------------|
| Focus in search | User interaction | `search-box-input:focus` |
| Button hover | Mouse over action | Standard button states |
| Button active | Click or keyboard | Standard button states |

## Basic usage

```html
<section class="app-shell-topbar">
  <strong>My App</strong>

  <!-- Command bar pattern -->
  <div data-pattern="command-bar">
    <form class="search-box" role="search" aria-label="Command bar search">
      <input class="search-box-input" type="search" aria-label="Search" placeholder="Search..." />
      <button class="search-box-action" type="submit">Search</button>
    </form>

    <div data-slot="actions">
      <button class="btn btn-outline btn-sm" type="button">New item</button>
      <button class="btn btn-primary btn-sm" type="button">Quick open</button>
    </div>

    <span class="badge">Project: Core</span>
  </div>

  <!-- User menu, etc -->
  <button class="btn btn-ghost btn-sm" type="button">Profile</button>
</section>
```

## Composition variants

### Search with single action
```html
<div data-pattern="command-bar">
  <form class="search-box" role="search" aria-label="Search">
    <input class="search-box-input" type="search" />
    <button class="search-box-action" type="submit">Search</button>
  </form>

  <button class="btn btn-primary btn-sm" type="button">New</button>
</div>
```

### Search with multiple actions
```html
<div data-pattern="command-bar">
  <form class="search-box" role="search" aria-label="Search">
    <input class="search-box-input" type="search" />
    <button class="search-box-action" type="submit">Search</button>
  </form>

  <div data-slot="actions">
    <button class="btn btn-outline btn-sm" type="button">Export</button>
    <button class="btn btn-outline btn-sm" type="button">Filter</button>
    <button class="btn btn-primary btn-sm" type="button">Create</button>
  </div>
</div>
```

### Search with status badge
```html
<div data-pattern="command-bar">
  <form class="search-box" role="search" aria-label="Search">
    <input class="search-box-input" type="search" />
    <button class="search-box-action" type="submit">Search</button>
  </form>

  <div data-slot="actions">
    <button class="btn btn-outline btn-sm" type="button">Filter</button>
  </div>

  <span class="badge badge-primary">12 selected</span>
</div>
```

## Accessibility checklist

- [x] **Semantic HTML:** search input uses `<form role="search">`, buttons are native `<button>`
- [x] **ARIA attributes:** search form has `aria-label`, buttons have descriptive text
- [x] **Keyboard:** Tab order natural (search → actions), Enter submits, Escape may clear search
- [x] **Focus visible:** `:focus-visible` on search input and buttons visible in high-contrast
- [x] **Color not only signal:** button states use border, background, not color alone
- [x] **Screen reader:** search purpose clear ("Command bar search"), button labels announced
- [x] **Touch targets:** buttons at least 40px × 40px in default density

### Keyboard behavior

- `Tab`: navigate from search input → action buttons → outside
- `Enter` in search: submit search form
- `Enter` / `Space` on button: activate action
- `Escape` in search: optional — clear search or close any overlay

### ARIA requirements

| ARIA | When | Value |
|------|------|-------|
| `role="search"` | Form wrapper | On `<form>` containing search input |
| `aria-label` | Search form | Describes purpose: "Command bar search" |
| `aria-label` or text | Action buttons | Describes action: "Create new", "Export" |
| `type="search"` | Input field | Native HTML attribute |

## Responsive behavior

On narrow viewports (< 48rem):
- Command bar stacks vertically
- Search input becomes full width
- Actions wrap below search on smaller screens
- Density and shape tokens still apply

```css
/* Automatically applied */
@media (max-width: 48rem) {
  [data-pattern="command-bar"] {
    flex-direction: column;
  }
}
```

## Density modes

Spacing and button sizing scale with `[data-density]`:

| Density | Effect | Recommended |
|---------|--------|------------|
| `compact` | Reduced padding, smaller buttons | Dashboards, data-heavy apps |
| `default` | Standard spacing and size | Most apps |
| `comfortable` | Increased padding, larger buttons | Accessibility-focused, touch |

Pattern respects parent `data-density` — no additional CSS needed.

## Shape and motion

- **Shape:** Pattern buttons inherit `[data-shape]` from app context
- **Motion:** Search input respects `@media (prefers-reduced-motion: reduce)` via button/input base styles

## Command Palette integration

Command bar and command palette serve different purposes:

**Command Bar (this pattern):**
- Persistent, always visible in top toolbar
- Local search/filter for current context
- Quick actions specific to current page
- Always interactive, no keyboard shortcut setup

**Command Palette:**
- Global keyboard shortcut (`Ctrl+K` or `⌘K`)
- Fuzzy search, full command discovery
- Separate overlay surface
- Requires JavaScript hotkey manager

**Can both exist?** Yes. Example:
```html
<div data-pattern="command-bar">
  <form class="search-box" role="search">
    <input class="search-box-input" />
    <button class="search-box-action" type="submit">Search</button>
  </form>
  <button class="btn btn-ghost btn-sm" type="button" title="Open command palette (Ctrl+K)">
    Commands
  </button>
</div>
```

## Tokens used

| Token | Role | Notes |
|-------|------|-------|
| `--space-1`, `--space-2`, `--space-3` | Gap, padding | Scales with density |
| `--color-border-*` | Button borders | Inherited from `btn` classes |
| `--color-bg-*` | Button backgrounds | Inherited from tone classes |
| `--radius-*` | Border radius | Scales with shape setting |

## AI / machine-readable notes

- **Pattern surface:** `[data-pattern="command-bar"]` is the canonical marker; no CSS class required
- **Composition rule:** owns only layout and spacing; reuses `search-box`, `btn`, and `badge` components
- **Responsive rule:** switches from `flex` row (default) to column below 48rem breakpoint
- **Slot rule:** optional `[data-slot="actions"]` groups related buttons; badges sit outside for status signaling
- **State rule:** individual children handle their own states (button active, input focus); pattern itself is stateless
- **Integration:** positioned inside `app-shell-topbar` or custom header; flex-grows to fill available space

## Related patterns

- **Search Box:** [search-box.md](./search-box.md) — the input component
- **Button:** [button.md](./button.md) — quick action triggers
- **Badge:** [badge.md](./badge.md) — optional status indicator
- **Command Palette:** [command-palette.md](./command-palette.md) — global fuzzy search overlay
- **Filter Bar:** [filter-bar.md](./filter-bar.md) — list-level filtration pattern
- **App Shell:** [app-shell.md](./app-shell.md) — top bar integration context
