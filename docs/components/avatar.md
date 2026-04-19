# Avatar

> Support level: **Supported** | Surface key: `component.avatar` | Canonical: `.comp-avatar`

## When to use

User profile image or initials circle/icon. Displays user identity in compact form.

- ✓ User profile picture in header/sidebar
- ✓ Commenter/author identity in lists
- ✓ Avatar fallback with initials (user has no image)
- ✓ Status indicator (online/offline dot)
- ✗ Large profile pictures (use full image)
- ✗ Logo/branding (use logo component)

## Classes

| Class | Role | Modifiers |
|-------|------|-----------|
| `comp-avatar` | Avatar container (square or circular) | n/a |
| `comp-avatar-sm` | Small size (1.5rem) | Composable |
| `comp-avatar-md` | Medium size (2.5rem, default) | Composable |
| `comp-avatar-lg` | Large size (3rem) | Composable |

## States

| State | Activation | HTML pattern |
|-------|-----------|--------------|
| With image | Image loads | Photo shown |
| Fallback | No image | Initials or default icon |
| Status | Online/offline | Indicator dot overlay |

## Basic usage

```html
<!-- Avatar with image -->
<img src="user.jpg" alt="Jane Doe" class="comp-avatar comp-avatar-md" style="border-radius: 50%;">

<!-- Avatar with initials fallback -->
<div class="comp-avatar comp-avatar-md" style="border-radius: 50%; background: var(--color-accent); color: white; display: flex; align-items: center; justify-content: center; font-weight: bold;">
  JD
</div>

<!-- Avatar with status indicator -->
<div style="position: relative; width: fit-content;">
  <img src="user.jpg" alt="John Smith" class="comp-avatar comp-avatar-md" style="border-radius: 50%; display: block;">
  <div style="position: absolute; bottom: 0; right: 0; width: 0.5rem; height: 0.5rem; background: #10b981; border-radius: 50%; border: 2px solid white;"></div>
</div>

<!-- Avatar in user list -->
<div style="display: flex; align-items: center; gap: 0.5rem;">
  <img src="user.jpg" alt="Jane" class="comp-avatar comp-avatar-sm" style="border-radius: 50%;">
  <div>
    <p style="margin: 0; font-weight: 500;">Jane Doe</p>
    <p style="margin: 0; font-size: 0.875rem; color: var(--color-fg-muted);">@jane</p>
  </div>
</div>
```

## Sizes

```html
<!-- Small (1.5rem) -->
<div class="comp-avatar comp-avatar-sm" style="width: 1.5rem; height: 1.5rem; border-radius: 50%; background: var(--color-accent); display: flex; align-items: center; justify-content: center; color: white; font-size: 0.75rem; font-weight: bold;">JD</div>

<!-- Medium (2.5rem, default) -->
<div class="comp-avatar comp-avatar-md" style="width: 2.5rem; height: 2.5rem; border-radius: 50%; background: var(--color-accent); display: flex; align-items: center; justify-content: center; color: white; font-weight: bold;">JD</div>

<!-- Large (3rem) -->
<div class="comp-avatar comp-avatar-lg" style="width: 3rem; height: 3rem; border-radius: 50%; background: var(--color-accent); display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; font-size: 1rem;">JD</div>
```

## Accessibility checklist

- [x] **Alt text:** Image avatar has `alt` describing user
- [x] **Semantic:** Uses `<img>` for images
- [x] **Fallback:** Initials or default icon if image missing
- [x] **Status indicator:** If present, described via aria-label or visible label

## Tokens used

| Token | Role | Notes |
|-------|------|-------|
| `--color-accent` | Initials background | Brand color |
| `--space-*` | Avatar size | Scales with density |

## AI / machine-readable notes

- **Selector pattern:** `comp-avatar` + size modifier (sm, md, lg)
- **Image:** Use `<img>` with `alt` text
- **Fallback:** Display initials or default icon if image unavailable
- **Status:** Optional indicator dot for online/offline
- **Copy-paste use:** Update image src and alt text

## Related patterns

- **Avatar-group:** Multiple avatars in row
- **User card:** Avatar + user info
