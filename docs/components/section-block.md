# Section Block

> Support level: **Supported** | Surface key: `component.sectionBlock` | Canonical: `.comp-section-block`

## When to use

Contained section with padding, border, and optional title. Groups related content.

- ✓ Content sections with visual separation
- ✓ Card-like sections within page
- ✓ Settings page sections
- ✓ Form field groups
- ✗ Standalone cards (use card component)
- ✗ Modal content (use dialog/modal)

## Classes

| Class | Role | Modifiers |
|-------|------|-----------|
| `comp-section-block` | Section container | n/a |
| `comp-section-block-title` | Section heading | n/a |
| `comp-section-block-content` | Section body | n/a |
| `comp-section-block-divider` | Visual separator | Modifier |

## States

| State | Activation | HTML pattern |
|-------|-----------|--------------|
| Default | — | Section shown |
| Expandable | Has toggle | Can collapse/expand |

## Basic usage

```html
<!-- Simple section block -->
<section class="comp-section-block" style="padding: 2rem; background: var(--color-bg-surface); border: 1px solid var(--color-border-subtle); border-radius: 0.5rem; margin-bottom: 1.5rem;">
  <h2 class="comp-section-block-title" style="margin: 0 0 1rem 0; font-size: 1.25rem; font-weight: 600;">Personal Information</h2>
  <div class="comp-section-block-content" style="display: flex; flex-direction: column; gap: 1.5rem;">
    <div class="comp-field">
      <label for="name">Full Name</label>
      <input id="name" type="text" placeholder="Enter name">
    </div>
    <div class="comp-field">
      <label for="email">Email</label>
      <input id="email" type="email" placeholder="Enter email">
    </div>
  </div>
</section>

<!-- Section without border -->
<section class="comp-section-block" style="padding: 2rem; background: var(--color-bg-subtle); border-radius: 0.5rem; margin-bottom: 1rem;">
  <h2 class="comp-section-block-title">Account Settings</h2>
  <div class="comp-section-block-content">
    <!-- content here -->
  </div>
</section>

<!-- Expandable section -->
<section class="comp-section-block" style="padding: 0;">
  <button class="comp-section-block-title" aria-expanded="true" aria-controls="section-1" style="width: 100%; padding: 1.5rem; background: var(--color-bg-surface); border: 1px solid var(--color-border-subtle); border-radius: 0.5rem; border-bottom-left-radius: 0; border-bottom-right-radius: 0; text-align: left; cursor: pointer; font-size: 1.1rem; font-weight: 600; display: flex; justify-content: space-between; align-items: center;">
    Advanced Options
    <span style="font-size: 0.75rem; transition: transform 0.2s;">▼</span>
  </button>
  <div id="section-1" class="comp-section-block-content" style="padding: 1.5rem; background: var(--color-bg-surface); border: 1px solid var(--color-border-subtle); border-top: none; border-radius: 0 0 0.5rem 0.5rem;">
    <!-- expandable content -->
  </div>
</section>

<!-- Multiple sections with divider -->
<div style="display: flex; flex-direction: column; gap: 1rem;">
  <section class="comp-section-block">
    <h2 class="comp-section-block-title">Profile</h2>
    <div class="comp-section-block-content"><!-- content --></div>
  </section>
  <section class="comp-section-block">
    <h2 class="comp-section-block-title">Preferences</h2>
    <div class="comp-section-block-content"><!-- content --></div>
  </section>
</div>
```

## Accessibility checklist

- [x] **Semantic:** Uses `<section>` and `<h2>` appropriately
- [x] **Heading:** Clear section title
- [x] **Expandable:** Toggle has aria-expanded and aria-controls
- [x] **Keyboard:** Tab navigates, Enter toggles expandable
- [x] **Focus:** Visible focus on toggle button

## Keyboard behavior

| Key | Action |
|-----|--------|
| `Tab` | Navigate to section |
| `Enter` (expandable) | Toggle expand/collapse |

## ARIA requirements

| Role/Attribute | Purpose | Notes |
|---|---|---|
| `<section>` | Content section | Semantic section |
| `<h2>` or `role="heading"` | Section title | Identifies section |
| `aria-expanded` (toggle) | Expand state | On toggle button |
| `aria-controls` (toggle) | Controlled content | Links to content div |

## Tokens used

| Token | Role | Notes |
|-------|------|-------|
| `--color-bg-surface` | Section background | Surface color |
| `--color-border-subtle` | Border | Divider color |
| `--space-*` | Padding | Scales with density |

## Variants

- **With border:** 1px border (default)
- **Without border:** Background only
- **Expandable:** Toggle header to collapse/expand
- **Nested:** Sections within sections
- **Dividers:** Separator between sections

## Sizes

- **Compact:** 1rem padding (sm)
- **Default:** 1.5rem padding (md)
- **Comfortable:** 2rem padding (lg)

## AI / machine-readable notes

- **Selector pattern:** `comp-section-block` container with `comp-section-block-title` heading and `comp-section-block-content` body
- **Semantic:** Use `<section>` and `<h2>` appropriately
- **Expandable:** Toggle header with `aria-expanded` and `aria-controls`
- **Padding:** Scales with density token
- **Copy-paste use:** Update title and content

## Related patterns

- **Card:** Standalone card component
- **Stack:** Vertical layout
- **Cluster:** Horizontal layout
