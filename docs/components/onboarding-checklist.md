# Onboarding Checklist

Kullanıcı onboarding sürecini adım adım takip etmek için tasarlanmış CSS pattern'i. İlerleme çubuğu ve "done / current / upcoming" durum göstergeleri içerir.

## When to use

- SaaS ürün onboarding akışları
- Kurulum wizard'ları
- Getting started kontrol listeleri
- Profile tamamlama rehberleri

## Basic usage

```html
<div data-pattern="onboarding-checklist" class="card">
  <div data-slot="progress">
    <div data-slot="progress-bar">
      <div data-slot="progress-fill" style="inline-size: 33%"></div>
    </div>
    <span data-slot="progress-label">1 of 3 completed</span>
  </div>

  <div data-slot="item" data-status="done">
    <div data-slot="status-icon" aria-hidden="true">✓</div>
    <div data-slot="content">
      <p data-slot="item-title">Create your account</p>
      <p data-slot="item-description">Sign up and verify your email address.</p>
    </div>
  </div>

  <div data-slot="item" data-status="current">
    <div data-slot="status-icon" aria-hidden="true">2</div>
    <div data-slot="content">
      <p data-slot="item-title">Set up your workspace</p>
      <p data-slot="item-description">Add your team and configure settings.</p>
    </div>
    <span data-slot="chevron" aria-hidden="true">›</span>
  </div>

  <div data-slot="item" data-status="upcoming">
    <div data-slot="status-icon" aria-hidden="true">3</div>
    <div data-slot="content">
      <p data-slot="item-title">Invite your team</p>
      <p data-slot="item-description">Send invitations to your colleagues.</p>
    </div>
  </div>
</div>
```

## With expandable detail panels

```html
<div data-pattern="onboarding-checklist" class="card">
  <div data-slot="progress">
    <div data-slot="progress-bar">
      <div data-slot="progress-fill" style="inline-size: 50%"></div>
    </div>
    <span data-slot="progress-label">2 of 4 done</span>
  </div>

  <div data-slot="item" data-status="done">
    <div data-slot="status-icon" aria-hidden="true">✓</div>
    <div data-slot="content">
      <p data-slot="item-title">Install Fikir CSS</p>
    </div>
  </div>

  <div data-slot="item" data-status="done">
    <div data-slot="status-icon" aria-hidden="true">✓</div>
    <div data-slot="content">
      <p data-slot="item-title">Add your first component</p>
    </div>
  </div>

  <div data-slot="item" data-status="current" data-expanded="true">
    <div data-slot="status-icon" aria-hidden="true">3</div>
    <div data-slot="content">
      <p data-slot="item-title">Customize your theme</p>
      <p data-slot="item-description">Override design tokens for your brand.</p>
    </div>
    <span data-slot="chevron" aria-hidden="true">›</span>
  </div>
  <div data-slot="detail">
    <p style="font-size: var(--font-size-sm); color: var(--color-fg-muted); margin: 0 0 var(--space-3)">
      Set your primary brand color in your CSS:
    </p>
    <pre style="font-size: var(--font-size-xs)"><code>:root { --color-primary: #6366f1; }</code></pre>
    <button class="btn btn-sm btn-solid btn-primary" style="margin-block-start: var(--space-3)">
      Mark as done
    </button>
  </div>

  <div data-slot="item" data-status="upcoming">
    <div data-slot="status-icon" aria-hidden="true">4</div>
    <div data-slot="content">
      <p data-slot="item-title">Deploy to production</p>
    </div>
  </div>
</div>
```

## Item statuses

| `data-status` | Visual | Interaction |
|---|---|---|
| `done` | Green filled circle, strikethrough title | Click to expand detail |
| `current` | Primary ring indicator | Highlighted row, expandable |
| `upcoming` | Muted circle, dimmed | Non-interactive (cursor: not-allowed) |

## Progress fill

`[data-slot="progress-fill"]` üzerine `inline-size: N%` inline style ile ilerleme yüzdesi ayarlanır. JS ile dinamik olarak güncellenmelidir.

## Accessibility

- `data-status="upcoming"` olan item'lar `aria-disabled="true"` almalı.
- `data-status="done"` item'lar `aria-checked="true"` (role="checkbox" ile) veya `aria-label="Completed: ..."` alabilir.
- Expand/collapse button'una `aria-expanded="true/false"` eklenmeli.

## JavaScript scaffold

```js
document.querySelectorAll('[data-pattern="onboarding-checklist"] [data-slot="item"]').forEach((item) => {
  if (item.dataset.status === 'upcoming') return;

  item.addEventListener('click', () => {
    const isExpanded = item.dataset.expanded === 'true';
    item.dataset.expanded = isExpanded ? 'false' : 'true';
  });
});
```

## Related components

- **Stepper** — multi-step form wizard
- **Progress** — linear progress bar
- **Timeline** — chronological event display
