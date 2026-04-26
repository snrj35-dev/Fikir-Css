# Hover Card

> Support level: **Supported** | Surface key: `component.hoverCard` | Canonical: `.hover-card`

## When to use

Use hover card for lightweight, non-modal previews that appear on hover or focus without stealing focus from the trigger.

- ✓ Quick profile, metadata, or preview content
- ✓ Supplemental context for links, avatars, or tags
- ✓ Pointer + keyboard focus parity with the same markup
- ✗ Critical actions that require confirmation
- ✗ Long forms or multi-step interaction
- ✗ Content that must remain open without explicit state management

## Classes

| Class | Role | Modifiers |
|-------|------|-----------|
| `hover-card` | Trigger wrapper — required | n/a |
| `hover-card-content` | Floating content panel | n/a |

## States

| State | Activation | HTML pattern |
|------|------------|--------------|
| Closed | default | `.hover-card` without `data-open="true"` |
| Open | `data-open="true"` on wrapper | `.hover-card[data-open="true"] .hover-card-content` |
| Disabled trigger | `aria-disabled="true"` or `disabled` on child control | Trigger should not open panel |

## Basic usage

```html
<div class="hover-card" data-open="false">
  <button type="button" class="icon-button" aria-describedby="profile-preview">
    👤
  </button>

  <div class="hover-card-content" id="profile-preview" role="tooltip">
    <strong>Osman Demir</strong>
    <p>Frontend architect · İzmir</p>
  </div>
</div>
```

## Open state

```html
<div class="hover-card" data-open="true">
  <a class="link" href="/team/osman" aria-describedby="team-preview">View profile</a>

  <div class="hover-card-content" id="team-preview" role="tooltip">
    <strong>Team profile</strong>
    <p>Shows lightweight metadata and next action.</p>
  </div>
</div>
```

## Accessibility checklist

- [x] Trigger remains semantic (`button`, `a`, or other interactive native element)
- [x] Hover and keyboard focus reveal the same content
- [x] Floating content has an accessible relationship via `aria-describedby` when used as descriptive text
- [x] Content is supplemental; essential info is still available without hover
- [x] Escape/blur handling is implemented by host app when the pattern becomes interactive
- [x] Focus-visible styling stays visible on the trigger

### Keyboard behavior

| Key | Action |
|-----|--------|
| Tab | Move focus to trigger |
| Shift+Tab | Leave trigger and close panel |
| Escape | Close panel if the host app keeps explicit open state |

### ARIA requirements

| ARIA | When | Value |
|------|------|-------|
| `aria-describedby` | Trigger references supplemental preview text | `id` of `.hover-card-content` |
| `role` | Panel behaves like supplemental descriptive content | `tooltip` |
| `aria-disabled` | Non-native trigger wrapper needs disabled semantics | `true` |

## Tokens used

| Token | Role | Notes |
|------|------|-------|
| `--space-2` | Offset from trigger | Applied to top gap |
| `--space-3` | Internal padding | Content panel spacing |
| `--radius-md` | Panel radius | Matches default overlay radius |
| `--color-border-subtle` | Panel border | Theme-aware |
| `--color-bg-surface` | Panel background | Theme-aware |
| `--color-fg-default` | Text color | Theme-aware |
| `--shadow-md` | Panel elevation | Overlay depth |

## AI / machine-readable notes

- **Selector surface:** `hover-card` + `hover-card-content`
- **State model:** open state is attribute-driven on the wrapper via `data-open="true"`
- **Interaction boundary:** Fikir CSS styles the pattern; host app decides hover/focus/blur timing
- **Accessibility:** do not hide essential information exclusively inside the panel

## Related

- **`popover`** — click-triggered interactive floating panel
- **`tooltip`** — hover-only non-interactive text hint
- **`card`** — the base visual container
