# Coachmark

> Support level: **Supported** | Surface key: `pattern.coachmark` | Canonical: `data-pattern="coachmark"`

## When to use

Kullanıcılara yeni özellik, workflow adımı veya UI elemanı hakkında hızlı rehberlik veya bağlam bilgisi sağlamak istediğinizde coachmark kullanın.

- ✓ Onboarding sırasında yeni kullanıcıyı adım adım yönlendirmek
- ✓ Yeni feature'ını tanıtmak
- ✓ Keyboard kısayolu veya pro tip göstermek
- ✓ Kritik adım veya uyarı mesajı vermek
- ✗ Tam tour builder / multi-step sequencing (v1.0+ scope)
- ✗ Inline hint'ler için (bunun yerine `helper-text` kullan)
- ✗ Form validation mesajları (bunun yerine `error-text` kullan)

## Classes & Attributes

| Attribute | Values | Purpose |
|-----------|--------|---------|
| `data-pattern` | `"coachmark"` | Pattern identifier |
| `data-variant` | `"info" \| "tip" \| "warning" \| "success" \| "danger" \| "neutral"` | Semantic tone |
| `data-active` | `"true" \| "false"` | Visibility state |
| `data-position` | `"top" \| "bottom" \| "start" \| "end"` | Popover anchor direction |
| `data-arrow` | `"true" \| "false"` | Arrow pointer visibility |
| `data-density` | `"compact" \| "default" \| "comfortable"` | Spacing density |

### Slots

| Slot | Purpose |
|------|---------|
| `data-slot="icon"` | Visual marker (emoji or icon; decorative) |
| `data-slot="title"` | Heading / quick label (1-3 words) |
| `data-slot="description"` | Main guidance text |
| `data-slot="action"` | Primary action button ("Got it", "Learn more", etc.) |
| `data-slot="secondary-action"` | Secondary action ("Remind me later", "Skip") |

## Basic usage

### Simple info coachmark

```html
<div
  data-pattern="coachmark"
  data-variant="info"
  data-active="true"
  data-position="top"
  aria-label="Getting started tip"
  role="tooltip"
>
  <div data-slot="icon" aria-hidden="true">💡</div>
  <div data-slot="title">Pro tip</div>
  <div data-slot="description">
    Use Cmd+K to open the command palette and navigate quickly.
  </div>
  <button data-slot="action" type="button" class="btn btn-solid btn-primary btn-sm">
    Got it
  </button>
</div>
```

### Warning coachmark with secondary action

```html
<div
  data-pattern="coachmark"
  data-variant="warning"
  data-active="true"
  data-position="bottom"
  aria-label="Important warning"
  role="dialog"
>
  <div data-slot="icon" aria-hidden="true">⚠️</div>
  <div data-slot="title">Careful</div>
  <div data-slot="description">
    This action will delete all records and cannot be undone.
  </div>
  <button data-slot="action" type="button" class="btn btn-solid btn-danger btn-sm">
    I understand
  </button>
  <button data-slot="secondary-action" type="button" class="btn btn-ghost btn-neutral btn-sm">
    Cancel
  </button>
</div>
```

### Success coachmark (celebration)

```html
<div
  data-pattern="coachmark"
  data-variant="success"
  data-active="true"
  data-position="top"
  aria-label="Achievement celebration"
  role="tooltip"
>
  <div data-slot="icon" aria-hidden="true">🎉</div>
  <div data-slot="title">Milestone</div>
  <div data-slot="description">
    You've completed your first workflow! Explore more features in the guide.
  </div>
  <button data-slot="action" type="button" class="btn btn-solid btn-primary btn-sm">
    Thanks!
  </button>
</div>
```

## Variants

Each variant uses a semantic tone and visual accent:

| Variant | Use | Visual | Icon |
|---------|-----|--------|------|
| `info` | General guidance, new features | Primary accent | 💡 |
| `tip` | Pro usage, keyboard shortcut | Primary color, softer | ✨ |
| `warning` | Caution, prerequisite | Warning tone | ⚠️ |
| `success` | Achievement, milestone | Success tone | ✓ or 🎉 |
| `danger` | Critical, destructive warning | Danger tone | ⚠️ or 🛑 |
| `neutral` | Secondary context | Muted color | None |

## Position alignment

Position the coachmark relative to its target element using `data-position`:

```html
<!-- Top anchor (default) -->
<div data-pattern="coachmark" data-position="top" data-arrow="true">
  <!-- popover appears above target -->
</div>

<!-- Bottom anchor -->
<div data-pattern="coachmark" data-position="bottom" data-arrow="true">
  <!-- popover appears below target -->
</div>

<!-- Start anchor (left in LTR) -->
<div data-pattern="coachmark" data-position="start" data-arrow="true">
  <!-- popover appears to the left -->
</div>

<!-- End anchor (right in LTR) -->
<div data-pattern="coachmark" data-position="end" data-arrow="true">
  <!-- popover appears to the right -->
</div>
```

**Note:** Position is a hint; JavaScript should implement collision detection and fallback positioning using libraries like Floating UI or Popper.js.

## State management

Toggle visibility and interaction state:

```html
<!-- Hidden state -->
<div data-pattern="coachmark" data-active="false">
  <!-- display: none -->
</div>

<!-- Visible state -->
<div data-pattern="coachmark" data-active="true">
  <!-- display: grid -->
</div>
```

The application is responsible for updating `data-active` based on user interaction (button click, Escape key, focus loss).

## Density alignment

Adapt coachmark spacing to global density settings:

```html
<!-- Compact density -->
<div
  data-pattern="coachmark"
  data-density="compact"
  data-active="true"
>
  <!-- reduced padding and font sizes -->
</div>

<!-- Comfortable density -->
<div
  data-pattern="coachmark"
  data-density="comfortable"
  data-active="true"
>
  <!-- generous padding and larger fonts -->
</div>
```

## Keyboard interaction

Coachmark supports tooltip-like and dialog-like keyboard behaviors:

### Tooltip-like (role="tooltip")
- **Dismiss:** Click outside, Escape, or Tab away
- **Focus:** First interactive element receives focus on show
- **Tab order:** Remains in normal flow; focus can escape

### Dialog-like (role="dialog")
- **Dismiss:** Button click or Escape
- **Focus trap:** Focus stays within coachmark
- **Tab order:** Cycles through interactive elements

## Accessibility

### ARIA
Provide semantic labels and descriptions:

```html
<div
  data-pattern="coachmark"
  data-variant="info"
  aria-label="Command palette shortcut guide"
  aria-describedby="coach-desc"
  role="tooltip"
>
  <div data-slot="title">Pro tip</div>
  <div id="coach-desc" data-slot="description">
    Use Cmd+K to open the command palette quickly.
  </div>
</div>
```

### Best practices
- ✓ Title must be concise and descriptive
- ✓ Description provides full context (icon is decorative)
- ✓ Button text must be explicit ("Got it", "Learn more", not generic "OK")
- ✓ Use `aria-hidden="true"` on icon elements
- ✓ Ensure sufficient color contrast in all themes
- ✓ Test Escape key dismissal and focus restoration

## Advanced: Arrow with popover

If including an arrow pointer pointing to target:

```html
<div
  data-pattern="coachmark"
  data-arrow="true"
  data-position="top"
  data-active="true"
>
  <div data-slot="icon">💡</div>
  <div data-slot="title">Tip</div>
  <div data-slot="description">Arrow points to target element.</div>
  <button data-slot="action" type="button" class="btn btn-sm btn-solid btn-primary">
    Got it
  </button>
  <span data-coachmark-arrow></span>
</div>
```

The `[data-coachmark-arrow]` element is a small triangle positioned relative to the popover. Styling handles position variants (top, bottom, start, end).

## Dark mode

Coachmark automatically adapts to dark/light themes:

```html
<!-- Light theme (default) -->
<div data-pattern="coachmark" data-active="true">
  <!-- light background, dark text -->
</div>

<!-- Dark theme (automatic via CSS media query or data attribute) -->
<!-- When container has data-theme="dark" or system dark-mode is active -->
<!-- CSS applies: dark background, light text -->
```

## Anti-patterns

### ✗ Don't

1. **Overuse coachmark for inline help**
   - Coachmark is for prominent, temporary guidance
   - Use `helper-text` or `aria-describedby` for persistent field hints

2. **Create nested or stacked coachmarks**
   - Show one coachmark at a time (multi-step is post-1.0)

3. **Use hardcoded positions**
   - Always let JavaScript compute positioning

4. **Skip button text clarity**
   ```html
   <!-- ✗ Bad -->
   <button data-slot="action">OK</button>
   
   <!-- ✓ Good -->
   <button data-slot="action">Got it</button>
   ```

5. **Assume color alone conveys tone**
   - Always pair color with icon and descriptive text

### ✓ Do

1. **Use semantic tone variants appropriately**
   - Warning for caution, success for milestone, danger for critical

2. **Provide clear, actionable button labels**
   - "Learn more", "Try now", "I understand"

3. **Test keyboard dismissal and focus**
   - Ensure Escape closes and focus returns properly

4. **Verify contrast in all themes**
   - Test light, dark, and high-contrast modes

## AI context

Coachmark pattern is a single-annotation popover for user guidance and onboarding. Use when:

- Introducing a new UI element or feature to first-time users
- Providing just-in-time tips or keyboard shortcuts
- Warning about destructive actions or prerequisites

HTML structure:
```html
<div
  data-pattern="coachmark"
  data-variant="[info|tip|warning|success|danger|neutral]"
  data-active="[true|false]"
  role="[tooltip|dialog]"
  aria-label="..."
>
  <div data-slot="icon">icon_emoji</div>
  <div data-slot="title">Short heading</div>
  <div data-slot="description">Main guidance text.</div>
  <button data-slot="action" class="btn btn-sm btn-outline">Action label</button>
</div>
```

**Key attributes:**
- `data-pattern="coachmark"` — Pattern identifier
- `data-variant` — Semantic tone (info, warning, success, etc.)
- `data-active` — Toggle visibility
- `data-position` — Popover anchor (top, bottom, start, end)
- `role` — Either "tooltip" (lightweight) or "dialog" (modal-like)

**Application responsibilities:**
- Update `data-active` on user action
- Implement Escape key and click-outside dismissal
- Manage focus (set focus on first button on show, restore on dismiss)
- Handle positioning and collision detection (JavaScript library recommended)
