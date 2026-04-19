# Visually Hidden

> Support level: **Supported** | Surface key: `component.visuallyHidden` | Canonical: `.visually-hidden`

## When to use

Hide content visually but keep accessible to screen readers. Text for screen reader only.

- ✓ Screen reader only labels
- ✓ Skip links
- ✓ Icon-only buttons with text label
- ✓ Hidden headings for structure
- ✗ Content hidden from all (use `display: none`)
- ✗ Decorative content (use `aria-hidden="true"`)

## Classes

| Class | Role | Modifiers |
|-------|------|-----------|
| `visually-hidden` | Screen reader only text | n/a |

## States

| State | Activation | HTML pattern |
|-------|-----------|--------------|
| Default | Always hidden visually | Text available to screen readers |

## Basic usage

```html
<!-- Icon button with visually hidden text -->
<button class="icon-button" aria-label="Search">
  🔍
  <span class="visually-hidden">Search</span>
</button>

<!-- Skip link (visible on focus) -->
<a href="#main-content" class="visually-hidden" style="position: absolute; left: -10000px; width: 1px; height: 1px; overflow: hidden;">
  Skip to main content
</a>

<!-- Hidden form label -->
<label for="search" class="visually-hidden">Search products</label>
<input id="search" type="search" placeholder="Search...">

<!-- Hidden heading for structure -->
<h2 class="visually-hidden">Search Results</h2>
<div >
  <!-- results here -->
</div>

<!-- Icon with text alternative -->
<span aria-label="In progress" style="display: flex; align-items: center; gap: 0.5rem;">
  <span style="display: inline-block; width: 0.75rem; height: 0.75rem; border-radius: 50%; background: #f59e0b;"></span>
  <span class="visually-hidden">In progress</span>
</span>
```

## Skip link with focus-visible

```html
<a href="#main" class="visually-hidden" 
   style="position: absolute; left: -10000px; z-index: 10000;"
   onfocus="this.style.left='0'; this.style.top='0'; this.style.width='auto'; this.style.height='auto'; this.style.padding='1rem';"
   onblur="this.style.left='-10000px';">
  Skip to main content
</a>
```

## CSS implementation

```css
.visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}
```

## Accessibility checklist

- [x] **Screen readers:** Content available and announced
- [x] **Position:** Positioned off-screen (not display: none)
- [x] **Clip:** Uses clip/overflow-hidden for older browser support
- [x] **Keyboard:** Skip links focusable with Tab
- [x] **Focus visible:** Optional onfocus style for skip links

## Usage patterns

| Pattern | Use Case | Example |
|---------|----------|---------|
| **Icon button label** | Alternative text for icons | Button with 🔍 icon |
| **Skip link** | Jump to main content | `<a href="#main">Skip…</a>` |
| **Form label** | Label for input without visual label | Search/filter without visible label |
| **Status indicator** | Alternative for colored dot/icon | "In progress" for orange dot |
| **Heading structure** | Heading for screen readers only | Section title hidden visually |
| **Table summary** | Table description | `<caption>` or hidden summary |

## Tokens used

| Token | Role | Notes |
|-------|------|-------|
| (None) | — | Utility class, no tokens |

## CSS variations

```css
/* Option 1: clip-rect (older browsers) */
.visually-hidden {
  position: absolute;
  clip: rect(0, 0, 0, 0);
}

/* Option 2: modern clip-path */
.visually-hidden {
  position: absolute;
  clip-path: inset(50%);
}

/* Option 3: sr-only pattern */
.visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
}
```

## Keyboard behavior

| Key | Action |
|-----|--------|
| `Tab` (skip link) | Focus appears, text visible |
| `Tab` away | Focus lost, text hidden |
| `Enter` (skip link) | Jump to target |

## ARIA requirements

| Attribute | Purpose | Notes |
|---|---|---|
| `aria-label` | Alternative to visually hidden text | Use when space-constrained |

## DO's and DON'Ts

✅ **DO:**
- Use for screen reader only labels
- Use for skip links and keyboard navigation
- Use for icon button text alternatives
- Combine with `aria-label` if needed

❌ **DON'T:**
- Use `display: none` (hides from both visual and screen reader)
- Use `visibility: hidden` (hides visually but reserves space)
- Use `aria-hidden="true"` with required content
- Use for large blocks of hidden content
- Use as a crutch for poor visual design

## AI / machine-readable notes

- **Selector pattern:** `visually-hidden` class with absolute positioning and clip/overflow
- **Screen reader:** Content announced by screen readers
- **Keyboard:** Focusable elements (skip links) remain reachable
- **CSS:** `position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0,0,0,0);`
- **Copy-paste use:** Apply class to `<span>`, `<label>`, `<h2>`, or `<a>` containing text

## Related patterns

- **aria-label:** Alternative approach for short text
- **aria-describedby:** Link element to description
- **role="img":** Semantic image alternative
