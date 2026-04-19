# Avatar Group

> Support level: **Supported** | Surface key: `component.avatarGroup` | Canonical: `.comp-avatar-group`

## When to use

Multiple avatars in row. Shows grouped users or contributors.

- ✓ Team members in row
- ✓ Collaborators display
- ✓ "+N more" overflow
- ✓ User activity indicators
- ✗ Single avatar (use avatar instead)
- ✗ Large profile displays (use avatar + info card)

## Classes

| Class | Role | Modifiers |
|-------|------|-----------|
| `comp-avatar-group` | Group container | n/a |
| `comp-avatar-group-item` | Individual avatar in group | n/a |
| `comp-avatar-group-more` | "+N more" indicator | n/a |

## States

| State | Activation | HTML pattern |
|-------|-----------|--------------|
| Default | — | Avatars shown |
| Overflow | >max avatars | "+N more" shown |
| Hover | Mouse over item | Tooltip or expanded view |

## Basic usage

```html
<!-- Avatar group -->
<div class="comp-avatar-group" style="display: flex; align-items: center; gap: -0.5rem;">
  <img src="user1.jpg" alt="Jane Doe" class="comp-avatar-group-item" style="width: 2.5rem; height: 2.5rem; border-radius: 50%; border: 2px solid white; background: var(--color-accent);">
  <img src="user2.jpg" alt="John Smith" class="comp-avatar-group-item" style="width: 2.5rem; height: 2.5rem; border-radius: 50%; border: 2px solid white; background: var(--color-accent); margin-left: -0.75rem;">
  <img src="user3.jpg" alt="Alice Brown" class="comp-avatar-group-item" style="width: 2.5rem; height: 2.5rem; border-radius: 50%; border: 2px solid white; background: var(--color-accent); margin-left: -0.75rem;">
  <div class="comp-avatar-group-more" style="width: 2.5rem; height: 2.5rem; border-radius: 50%; background: var(--color-bg-subtle); border: 2px solid white; display: flex; align-items: center; justify-content: center; font-size: 0.875rem; font-weight: 500; color: var(--color-fg-muted); margin-left: -0.75rem; cursor: pointer;">
    +2
  </div>
</div>
```

## With initials

```html
<div class="comp-avatar-group" style="display: flex; gap: -0.5rem;">
  <div class="comp-avatar-group-item" style="width: 2.5rem; height: 2.5rem; border-radius: 50%; background: var(--color-accent); color: white; display: flex; align-items: center; justify-content: center; font-weight: bold; border: 2px solid white;">JD</div>
  <div class="comp-avatar-group-item" style="width: 2.5rem; height: 2.5rem; border-radius: 50%; background: #8b5cf6; color: white; display: flex; align-items: center; justify-content: center; font-weight: bold; border: 2px solid white; margin-left: -0.75rem;">JS</div>
  <div class="comp-avatar-group-item" style="width: 2.5rem; height: 2.5rem; border-radius: 50%; background: #ec4899; color: white; display: flex; align-items: center; justify-content: center; font-weight: bold; border: 2px solid white; margin-left: -0.75rem;">AB</div>
</div>
```

## Small size

```html
<div class="comp-avatar-group" style="display: flex; gap: -0.3rem;">
  <img src="user1.jpg" alt="Jane" class="comp-avatar-group-item" style="width: 1.5rem; height: 1.5rem; border-radius: 50%; border: 1px solid white; margin-left: -0.5rem;">
  <img src="user2.jpg" alt="John" class="comp-avatar-group-item" style="width: 1.5rem; height: 1.5rem; border-radius: 50%; border: 1px solid white; margin-left: -0.5rem;">
  <div class="comp-avatar-group-more" style="width: 1.5rem; height: 1.5rem; border-radius: 50%; background: var(--color-bg-subtle); border: 1px solid white; display: flex; align-items: center; justify-content: center; font-size: 0.625rem; font-weight: 500; margin-left: -0.5rem;">+5</div>
</div>
```

## Accessibility checklist

- [x] **Alt text:** Each avatar image has alt text
- [x] **Semantic:** Uses `<img>` with alt or semantic div structure
- [x] **Overflow label:** "+N more" indicates count
- [x] **Tooltip:** Hover shows names (optional)

## Tokens used

| Token | Role | Notes |
|-------|------|-------|
| `--color-accent` | Avatar background | Default color |
| `--color-bg-subtle` | "+more" background | Subtle color |
| `--space-*` | Avatar size | Scales with density |

## Variants

- **With "+N more":** Show overflow count
- **Expandable:** Hover/click to show all
- **Interactive:** Click avatar for profile
- **Sizes:** sm, md, lg

## AI / machine-readable notes

- **Selector pattern:** `comp-avatar-group` wrapper with `comp-avatar-group-item` children and optional `comp-avatar-group-more`
- **Layout:** Horizontal flex with negative margin for overlap
- **Overflow:** Show "+N more" when count exceeds max (typically 3-5)
- **Borders:** 2px white border on each avatar for separation
- **Copy-paste use:** Update avatar sources and alt text

## Related patterns

- **Avatar:** Single avatar
- **User card:** Avatar + user info
- **List:** Multiple items with avatars
