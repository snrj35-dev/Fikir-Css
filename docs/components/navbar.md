# Navbar

> Support level: **Supported** | Surface key: `component.navbar` | Canonical: `.comp-navbar`

## When to use

Top navigation bar. Logo, menu, actions, user menu. Primary site/app navigation.

- ✓ Application header with logo and nav
- ✓ Site main navigation
- ✓ Top action bar with user menu
- ✓ Responsive mobile hamburger menu
- ✗ Sidebar navigation (use sidebar instead)
- ✗ Breadcrumb (use breadcrumb instead)

## Classes

| Class | Role | Modifiers |
|-------|------|-----------|
| `comp-navbar` | Navigation bar container | n/a |
| `comp-navbar-brand` | Logo/brand section | n/a |
| `comp-navbar-menu` | Navigation menu | n/a |
| `comp-navbar-menu-item` | Menu item link | n/a |
| `comp-navbar-actions` | Right-side actions | n/a |
| `comp-navbar-toggle` | Mobile hamburger button | n/a |

## States

| State | Activation | HTML pattern |
|-------|-----------|--------------|
| Default | Desktop, menu visible | Full nav shown |
| Mobile | Small screen | Hamburger toggle shown |
| Open | Toggle clicked | Mobile menu expanded |
| Closed | Default mobile | Mobile menu hidden |

## Basic usage

```html
<!-- Full navbar -->
<nav class="comp-navbar" style="display: flex; align-items: center; justify-content: space-between; padding: 1rem 2rem; background: var(--color-bg-surface); border-bottom: 1px solid var(--color-border-subtle);">
  
  <!-- Brand/Logo -->
  <div class="comp-navbar-brand">
    <a href="/" style="display: flex; align-items: center; gap: 0.5rem; text-decoration: none; color: var(--color-fg-base); font-weight: bold; font-size: 1.25rem;">
      <span>🎨</span>
      MyApp
    </a>
  </div>

  <!-- Menu (desktop) -->
  <menu class="comp-navbar-menu" style="display: flex; list-style: none; gap: 2rem; padding: 0; margin: 0;">
    <li><a class="comp-navbar-menu-item" href="/" style="text-decoration: none; color: var(--color-fg-base); padding: 0.5rem 0;">Home</a></li>
    <li><a class="comp-navbar-menu-item" href="/about" style="text-decoration: none; color: var(--color-fg-base); padding: 0.5rem 0;">About</a></li>
    <li><a class="comp-navbar-menu-item" href="/docs" style="text-decoration: none; color: var(--color-fg-base); padding: 0.5rem 0;">Docs</a></li>
    <li><a class="comp-navbar-menu-item" href="/contact" style="text-decoration: none; color: var(--color-fg-base); padding: 0.5rem 0;">Contact</a></li>
  </menu>

  <!-- Actions (right side) -->
  <div class="comp-navbar-actions" style="display: flex; gap: 1rem; align-items: center;">
    <button class="comp-button-text" style="font-size: 0.875rem;">Sign in</button>
    <button class="comp-button" style="font-size: 0.875rem;">Get started</button>
  </div>

  <!-- Mobile toggle (hidden on desktop) -->
  <button class="comp-navbar-toggle comp-icon-button" id="nav-toggle" aria-label="Toggle navigation" aria-expanded="false" aria-controls="nav-menu" style="display: none;">☰</button>
</nav>

<!-- Mobile menu (hidden by default) -->
<menu id="nav-menu" class="comp-navbar-menu" style="display: none; flex-direction: column; gap: 0.5rem; padding: 1rem; background: var(--color-bg-default); border-bottom: 1px solid var(--color-border-subtle);">
  <li><a href="/" style="display: block; padding: 0.75rem; text-decoration: none;">Home</a></li>
  <li><a href="/about" style="display: block; padding: 0.75rem; text-decoration: none;">About</a></li>
  <li><a href="/docs" style="display: block; padding: 0.75rem; text-decoration: none;">Docs</a></li>
  <li><a href="/contact" style="display: block; padding: 0.75rem; text-decoration: none;">Contact</a></li>
</menu>
```

## With dropdown menus

```html
<nav class="comp-navbar" style="display: flex; align-items: center; justify-content: space-between; padding: 1rem 2rem; background: var(--color-bg-surface); border-bottom: 1px solid var(--color-border-subtle);">
  <div class="comp-navbar-brand">Brand</div>

  <menu class="comp-navbar-menu" style="display: flex; list-style: none; gap: 2rem; padding: 0; margin: 0;">
    <li style="position: relative;">
      <button class="comp-navbar-menu-item" aria-haspopup="true" aria-expanded="false" style="background: none; border: none; padding: 0.5rem; cursor: pointer; color: var(--color-fg-base); text-decoration: none;">
        Resources ▼
      </button>
      <menu style="position: absolute; top: 100%; left: 0; background: white; border: 1px solid var(--color-border-subtle); border-radius: 0.5rem; list-style: none; padding: 0.5rem 0; margin-top: 0.5rem; display: none;">
        <li><a href="#" style="display: block; padding: 0.75rem 1rem; text-decoration: none;">Documentation</a></li>
        <li><a href="#" style="display: block; padding: 0.75rem 1rem; text-decoration: none;">API Reference</a></li>
        <li><a href="#" style="display: block; padding: 0.75rem 1rem; text-decoration: none;">Examples</a></li>
      </menu>
    </li>
  </menu>

  <div class="comp-navbar-actions">
    <button class="comp-button">Sign in</button>
  </div>
</nav>
```

## Accessibility checklist

- [x] **Semantic:** Uses `<nav>` and `<menu>` appropriately
- [x] **Logo link:** Brand is clickable link to home
- [x] **Active page:** Current page marked with aria-current="page"
- [x] **Mobile toggle:** Has aria-label and aria-controls
- [x] **Keyboard:** Tab navigates menu items; dropdown with arrow keys
- [x] **Focus:** Visible focus on all links/buttons
- [x] **Mobile:** Menu accessible and keyboard-navigable

## Keyboard behavior

| Key | Action |
|-----|--------|
| `Tab` | Navigate menu items |
| `Enter/Space` (dropdown toggle) | Open/close dropdown |
| `↑/↓` (dropdown open) | Navigate menu items |
| `Escape` (dropdown open) | Close dropdown |

## ARIA requirements

| Role/Attribute | Purpose | Notes |
|---|---|---|
| `<nav>` | Navigation landmark | Primary navigation |
| `aria-current="page"` | Current page link | Mark active item |
| `aria-haspopup="true"` (toggle) | Dropdown button | For submenu buttons |
| `aria-expanded` (toggle) | Dropdown state | true/false |
| `aria-controls` (toggle) | Controlled menu | Links to menu id |

## Tokens used

| Token | Role | Notes |
|-------|------|-------|
| `--color-bg-surface` | Navbar background | Surface color |
| `--color-border-subtle` | Bottom border | Divider color |
| `--space-*` | Padding/gap | Scales with density |

## Responsive breakpoints

- **Desktop:** Full menu visible, toggle hidden
- **Tablet:** May compress menu or show toggle
- **Mobile:** Toggle shown, menu hidden by default

## JavaScript toggle

```javascript
const toggle = document.querySelector('.comp-navbar-toggle');
const menu = document.querySelector('#nav-menu');

toggle.addEventListener('click', () => {
  const isOpen = toggle.getAttribute('aria-expanded') === 'true';
  toggle.setAttribute('aria-expanded', !isOpen);
  menu.style.display = isOpen ? 'none' : 'flex';
});
```

## Variants

- **With logo:** Brand/logo on left
- **With dropdown menus:** Submenu items
- **With actions:** Right-side buttons (Sign in, Get started)
- **With search:** Integrated search box
- **Sticky:** Navbar stays on scroll
- **Dark/light:** Theme variant

## AI / machine-readable notes

- **Selector pattern:** `comp-navbar` wrapper with `comp-navbar-brand`, `comp-navbar-menu`, `comp-navbar-actions`, `comp-navbar-toggle` children
- **Responsive:** Toggle hidden on desktop, menu adjusts for mobile
- **Keyboard:** Tab navigates items; arrow keys for dropdown menus
- **Active:** Mark current page with `aria-current="page"`
- **Mobile toggle:** Has `aria-expanded` and `aria-controls`
- **Copy-paste use:** Update brand, menu items, actions, and JavaScript toggle

## Related patterns

- **Breadcrumb:** Navigation trail
- **Sidebar:** Left navigation
- **Menu-bar:** Horizontal application menu
- **Dropdown-menu:** Menu list pattern
