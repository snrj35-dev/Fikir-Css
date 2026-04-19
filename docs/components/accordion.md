# Accordion

> Support level: **Supported** | Surface key: `component.accordionItem` | Canonical: `.accordion`

## When to use

Vertically stacked collapsible sections for FAQ, settings groups, or progressive disclosure.

- ✓ FAQ / help pages where all items are independent
- ✓ Settings categories in a side panel
- ✓ Progressive disclosure of secondary information
- ✗ Sequential multi-step flows — use `stepper`
- ✗ Section switching within a view — use `tabs`
- ✗ Single collapsible block — use a standalone disclosure (no accordion wrapper needed)

## Classes

| Class | Role | Modifiers |
|-------|------|-----------|
| `accordion` | List wrapper — `<ul>` or `<div>` | n/a |
| `accordion-item` | Single collapsible entry — `<li>` | n/a |
| `accordion-trigger` | Toggle button — `<button>` inside a heading | `aria-expanded`, `aria-controls` |
| `accordion-panel` | Collapsible content area | `hidden` when collapsed |

> **Heading:** wrap `accordion-trigger` in a semantic heading (`<h2>`, `<h3>`) matching document hierarchy. No dedicated class needed on the heading element.

## States

| State | Activation | HTML pattern |
|-------|-----------|--------------|
| Expanded | `aria-expanded="true"` on `accordion-trigger` | Panel visible, `hidden` removed |
| Collapsed | `aria-expanded="false"` on `accordion-trigger` | Panel hidden, `hidden` present |

## Basic usage

```html
<ul class="accordion">
  <li class="accordion-item">
    <h3>
      <button type="button" class="accordion-trigger"
              aria-expanded="true" aria-controls="panel-1" id="trigger-1">
        What is Fikir CSS?
      </button>
    </h3>
    <div id="panel-1" class="accordion-panel" role="region" aria-labelledby="trigger-1">
      <p>A contract-driven CSS design system — zero runtime, token-first.</p>
    </div>
  </li>
  <li class="accordion-item">
    <h3>
      <button type="button" class="accordion-trigger"
              aria-expanded="false" aria-controls="panel-2" id="trigger-2">
        How do I install it?
      </button>
    </h3>
    <div id="panel-2" class="accordion-panel" role="region" aria-labelledby="trigger-2" hidden>
      <p>Run <code>npm install fikir-css</code> then import the CSS.</p>
    </div>
  </li>
</ul>
```

## JS toggle (minimal)

```js
document.querySelectorAll('.accordion-trigger').forEach(btn => {
  btn.addEventListener('click', () => {
    const expanded = btn.getAttribute('aria-expanded') === 'true'
    btn.setAttribute('aria-expanded', String(!expanded))
    const panel = document.getElementById(btn.getAttribute('aria-controls'))
    panel.hidden = expanded
  })
})
```

## Accessibility checklist

- [x] **Semantic HTML:** trigger is a native `<button>` element wrapped in a heading
- [x] **Heading level:** `<h2>` / `<h3>` level matches surrounding document hierarchy
- [x] **aria-expanded:** toggled on click — `"true"` when open, `"false"` when closed
- [x] **aria-controls:** links trigger to panel by `id`
- [x] **region role:** panel uses `role="region"` with `aria-labelledby` pointing to its trigger
- [x] **Hidden panels:** use `hidden` attribute (not CSS `display:none`)
- [x] **Focus visible:** trigger has `:focus-visible` outline

## Keyboard behavior

| Key | Action |
|-----|--------|
| Tab | Navigate to accordion trigger |
| Enter or Space | Toggle panel open/closed |
| (Arrow keys) | Not required by ARIA — Tab moves between triggers |

## ARIA requirements

| ARIA | When | Value |
|------|------|-------|
| `aria-expanded` | Every trigger | `"true"` (open) or `"false"` (closed) |
| `aria-controls` | Every trigger | ID of associated panel |
| `role="region"` | Each panel | On `accordion-panel` |
| `aria-labelledby` | Each panel | ID of the associated trigger button |

## Density modes

Accordion padding and font-size scale with `[data-density]`:

| Density | Effect |
|---------|--------|
| `compact` | Reduced trigger padding |
| `default` | Standard padding |
| `comfortable` | Increased padding |

No CSS changes needed — tokens handle it automatically.

## Shape and motion

- **Shape:** `[data-shape="sharp" | "default" | "rounded"]` — item border-radius scales automatically
- **Motion:** Panel expand/collapse animation respects `prefers-reduced-motion`

## Tokens used

| Token | Role | Notes |
|-------|------|-------|
| `--color-border` | Item divider color | Subtle separator |
| `--color-bg-surface` | Item background | Slightly elevated |
| `--space-3`, `--space-4` | Trigger padding | Scales with density |
| `--font-size-sm` | Trigger text size | Scales with density |
| `--radius-md` | Item border radius | Scales with shape |
| `--transition-duration-normal` | Panel open/close | 0ms if reduced-motion |

## Anti-patterns

```html
<!-- ✗ Don't use div/span as the trigger -->
<div class="accordion-trigger" onclick="toggle()">FAQ</div>

<!-- ✓ Use a button inside a heading -->
<h3><button type="button" class="accordion-trigger" aria-expanded="false">FAQ</button></h3>

<!-- ✗ Don't hide panel with CSS only -->
<div class="accordion-panel" style="display:none">...</div>

<!-- ✓ Use hidden attribute -->
<div class="accordion-panel" hidden>...</div>
```

## AI / machine-readable notes

- **Selector anatomy:** `accordion > accordion-item > (heading > accordion-trigger) + accordion-panel`
- **State indicator:** `aria-expanded="true/false"` on each trigger; `hidden` attribute on inactive panels
- **Heading:** no dedicated class — use semantic `<h2>` / `<h3>` element as trigger wrapper
- **Multiple open:** by default, multiple items can be open simultaneously; implement single-open behavior in JS if required
- **Copy-paste use:** duplicate `accordion-item` blocks; update `aria-controls`/`id` pairs
