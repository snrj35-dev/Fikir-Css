# Link

> Support level: **Supported** | Surface key: `component.link` | Canonical: `.link`

## When to use

Semantic navigation links to other pages, sections, or resources. Not for actions (use buttons instead).

- ✓ Navigation between pages
- ✓ Cross-references within content
- ✓ External links to related resources
- ✓ In-page anchors (skip links, table of contents)
- ✗ Actions that trigger JavaScript events (use button instead)
- ✗ Opening modals or dropdowns (use button with toggle semantics)
- ✗ Form submissions (use button type="submit")

## Classes

| Class | Role | Modifiers |
|-------|------|-----------|
| `link` | Base link styling | n/a |
| `link-muted` | De-emphasized link (muted foreground) | Composable |

## States

| State | Activation | HTML pattern |
|-------|-----------|--------------|
| Default | — | `<a href="/path" class="link">Link text</a>` |
| Visited | `:visited` pseudo (browser-managed) | Color change (lighter text) |
| Hover | `:hover` pseudo (automatic) | Underline appears + text color shifts |
| Focus | `:focus-visible` (automatic) | Outline ring visible |
| Active | `:active` pseudo | Darkened text during click |

## Basic usage

```html
<!-- Simple navigation link -->
<a href="/dashboard" class="link">Go to dashboard</a>

<!-- Link in sentence (within prose) -->
<p>
  Learn more in our <a href="/docs/guides" class="link">documentation</a>.
</p>

<!-- External link with icon (common pattern) -->
<a href="https://example.com" class="link" target="_blank" rel="noopener">
  Visit external site
  <svg width="1em" height="1em" viewBox="0 0 16 16">
    <path d="M8.5 1.5H3a1.5 1.5 0 0 0-1.5 1.5v10A1.5 1.5 0 0 0 3 14.5h10a1.5 1.5 0 0 0 1.5-1.5V7.5"/>
  </svg>
</a>
```

## Muted variant

```html
<!-- De-emphasized link for secondary navigation -->
<a href="/about" class="link link-muted">About us</a>

<!-- Multiple muted links in footer -->
<footer>
  <a href="/privacy" class="link link-muted">Privacy</a>
  <a href="/terms" class="link link-muted">Terms</a>
  <a href="/contact" class="link link-muted">Contact</a>
</footer>
```

## Accessibility checklist

- [x] **Semantic HTML:** Uses native `<a>` element with `href` attribute
- [x] **Link text meaningful:** Text describes destination, not generic "click here"
- [x] **Keyboard:** Tab to navigate links, Enter to follow
- [x] **Focus visible:** `:focus-visible` outline visible; underline added on hover for clarity
- [x] **Color not only signal:** Underline and/or text color change, not just color
- [x] **Screen reader:** Descriptive link text read aloud; no "link" prefix needed
- [x] **External links:** Use `target="_blank" rel="noopener noreferrer"` if opening new tab

## Keyboard behavior

| Key | Action |
|-----|--------|
| Tab | Navigate to link |
| Enter | Follow link to destination |

## ARIA requirements

| ARIA | When | Value |
|------|------|-------|
| `aria-current="page"` | Link to current page | `"page"` |
| `aria-label` or `aria-labelledby` | If link text needs augmentation | Additional descriptive text |

**Best practice:** If link text is ambiguous (e.g., "Read more"), either change text to be more descriptive or add `aria-label`.

## Link text best practices

| ✗ Avoid | ✓ Use instead |
|---------|--------------|
| "Click here" | Describe destination: "Go to dashboard" |
| "Learn more" (alone) | Specify topic: "Learn more about accessibility" |
| "Page" | "Customer support page" |
| "123" (link to a page number) | "Go to page 3" or hidden text: `<span class="visually-hidden">page </span>3` |

## Density modes

Link text size scales with `[data-density]`:

| Density | Effect |
|---------|--------|
| `compact` | Smaller font size (0.75rem) |
| `default` | Standard font size (0.875rem) |
| `comfortable` | Larger font size (0.9375rem) |

No CSS changes needed — font-size scales via tokens.

## Shape and motion

- **Shape:** Not applicable to links
- **Motion:** Hover underline transition respects `[data-motion="reduced"]`

## Tokens used

| Token | Role | Notes |
|-------|------|-------|
| `--color-primary` | Link default color | Brand override via `--color-accent` |
| `--color-fg-muted` | Visited link color (lighter) | Reduced emphasis after click |
| `--font-size-sm` | Link text size | Scales with density |
| `--transition-duration-fast` | Color/underline transition | 120ms (0ms if reduced-motion) |

## AI / machine-readable notes

- **Selector pattern:** `link` base, `link-muted` for secondary links
- **State indicator:** Uses native `:visited`, `:hover`, `:focus-visible` pseudo-classes
- **External links:** Convention is `target="_blank" rel="noopener"` with optional icon
- **Current page:** Use `aria-current="page"` in navigation menus
- **Responsive:** Text size scales with density; underline thickness constant
- **Copy-paste use:** Replace `href` and text content; class structure unchanged

## Related

- **`button`** — semantic action with background/border
- **`breadcrumb`** — hierarchical navigation links
- **`nav-bar`** — navigation container
