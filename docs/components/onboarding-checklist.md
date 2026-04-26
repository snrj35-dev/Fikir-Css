# Onboarding Checklist

> Support level: **Supported** | Pattern key: `pattern.onboardingChecklist` | Canonical: `data-pattern="onboarding-checklist"`

## When to use

Guided checklist for user onboarding, setup wizards, or profile completion flows. Includes a progress bar and status indicators for each step.

- ✓ SaaS product onboarding flows
- ✓ Setup wizards for complex configurations
- ✓ "Getting started" checklists
- ✓ Profile completion guides
- ✗ Simple vertical navigation (use `sidebar-nav`)
- ✗ Chronological logs (use `timeline`)
- ✗ Linear form wizards (use `stepper`)

## Canonical anatomy

| Slot / Attribute | Role | Element |
|------------------|------|---------|
| `data-pattern` | Root container | `div` (often inside `.card`) |
| `data-slot="progress"` | Progress indicator area | `div` |
| `data-slot="progress-bar"` | Background track | `div` |
| `data-slot="progress-fill"` | Completion indicator | `div` (uses `inline-size`) |
| `data-slot="item"` | Individual task row | `div` or `button` |
| `data-status` | `"done" \| "current" \| "upcoming"` | Step state |
| `data-slot="status-icon"`| Visual marker (check/number) | `div` |
| `data-slot="content"` | Title and description wrapper | `div` |
| `data-slot="detail"` | Expandable guidance panel | `div` |

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

  <div data-slot="item" data-status="current" data-expanded="true">
    <div data-slot="status-icon" aria-hidden="true">2</div>
    <div data-slot="content">
      <p data-slot="item-title">Set up your workspace</p>
      <p data-slot="item-description">Add your team and configure settings.</p>
    </div>
    <span data-slot="chevron" aria-hidden="true">›</span>
  </div>
  <div data-slot="detail">
    <p style="font-size: var(--font-size-sm); color: var(--color-fg-muted); margin: 0 0 var(--space-3)">
      Invite your colleagues to start collaborating.
    </p>
    <button class="btn btn-sm btn-solid btn-primary">Invite team</button>
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

## Accessibility checklist

- [x] **State mapping:** `data-status="upcoming"` items should have `aria-disabled="true"`
- [x] **Completion:** `data-status="done"` items should be marked with `aria-checked="true"` (if using checkbox role)
- [x] **Expansion:** Expandable items must use `aria-expanded="true/false"` on the trigger
- [x] **Live regions:** `data-slot="progress-label"` should have `aria-live="polite"` for dynamic updates
- [x] **Semantic markers:** status icons (checkmarks, numbers) marked with `aria-hidden="true"`

## Tokens used

| Token | Role | Notes |
|-------|------|-------|
| `--color-bg-surface` | Item background | Card surface color |
| `--color-tone-success` | "Done" status color | For completed checks |
| `--color-tone-info` | "Current" status color | Highlight for active step |
| `--space-3`, `--space-4` | Padding and gaps | Scales with density |
| `--radius-sm` | Status icon shape | Small circular radius |

## AI / machine-readable notes

- **Pattern identifier:** `data-pattern="onboarding-checklist"`
- **State indicators:** `data-status="done | current | upcoming"` determines styling
- **Expansion:** `data-expanded="true"` on `[data-slot="item"]` reveals the next sibling `[data-slot="detail"]`
- **Progress tracking:** update `[data-slot="progress-fill"]` using `inline-size: N%`
- **Slots:** `progress`, `item`, `status-icon`, `content`, `detail`, `chevron`
- **Responsibility:** Application manages `data-status`, `data-expanded`, and progress percentage

## Related

- **`stepper`** — linear multi-step form wizard
- **`progress`** — standard linear progress bar
- **`timeline`** — chronological event display
- **`accordion`** — for general expandable list patterns
