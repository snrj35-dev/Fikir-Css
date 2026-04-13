# Accordion

> Support level: **Supported** | Surface key: `component.accordionItem`

## Classes

| Class | Role |
|-------|------|
| `accordion` | List wrapper |
| `accordion-item` | Single collapsible entry |
| `accordion-header` | Heading element wrapping the trigger |
| `accordion-trigger` | Toggle button |
| `accordion-panel` | Collapsible content area |

## States

| State | How |
|-------|-----|
| Expanded | `aria-expanded="true"` on `accordion-trigger` |
| Collapsed | `aria-expanded="false"` on `accordion-trigger` |

## Basic usage

```html
<ul class="accordion">
  <li class="accordion-item">
    <h3 class="accordion-header">
      <button type="button" class="accordion-trigger"
              aria-expanded="true" aria-controls="panel-1">
        What is Fikir CSS?
      </button>
    </h3>
    <div id="panel-1" class="accordion-panel" role="region">
      <p>A contract-driven CSS design system — zero runtime, token-first.</p>
    </div>
  </li>
  <li class="accordion-item">
    <h3 class="accordion-header">
      <button type="button" class="accordion-trigger"
              aria-expanded="false" aria-controls="panel-2">
        How do I install it?
      </button>
    </h3>
    <div id="panel-2" class="accordion-panel" role="region" hidden>
      <p>Run <code>npm install fikir-css@beta</code> then import the CSS.</p>
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

## Accessibility

- `accordion-trigger` must be a `<button>` element
- `aria-expanded` state is toggled on click
- `aria-controls` links button to panel `id`
- Panel uses `role="region"` and `hidden` attribute (not CSS `display:none`)
- Heading level (`h2`/`h3`) should match document hierarchy
