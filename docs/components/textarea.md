# Textarea

> Support level: **Supported** | Surface key: `component.textarea` | Canonical: `.comp-textarea`

## When to use

Multi-line text input for longer text content (descriptions, comments, messages, feedback).

- ✓ Comments, feedback, descriptions
- ✓ Long text entry (>100 characters expected)
- ✓ Message composition
- ✓ Editable content areas
- ✗ Short single-line input (use `input` instead)
- ✗ Formatted text with styling (use rich text editor)
- ✗ Code editing (use code editor with syntax highlighting)

## Classes

| Class | Role | Modifiers |
|-------|------|-----------|
| `comp-textarea` | Multi-line text input | n/a |
| `comp-textarea-sm` | Small size (2.25rem min-height) | Composable |
| `comp-textarea-md` | Medium size (4rem min-height, default) | Composable |
| `comp-textarea-lg` | Large size (6rem min-height) | Composable |

## States

| State | Activation | HTML pattern |
|-------|-----------|--------------|
| Default | — | `<textarea class="comp-textarea">` |
| Focus | `:focus-visible` (automatic) | Border color + outline visible |
| Filled | User typed | Visual change (subtle) |
| Disabled | `disabled` attribute | Opacity reduced, cursor not-allowed |
| Invalid | `aria-invalid="true"` | Red border |
| Readonly | `readonly` attribute | Grayed background, not editable |

## Basic usage

```html
<!-- Simple textarea in field -->
<div class="comp-field">
  <label class="comp-label" for="comment">Comment</label>
  <textarea 
    id="comment" 
    class="comp-textarea comp-field-input"
    placeholder="Enter your comment here..."
    rows="4"
  ></textarea>
</div>

<!-- With helper text -->
<div class="comp-field">
  <label class="comp-label" for="bio">Bio</label>
  <textarea 
    id="bio" 
    class="comp-textarea comp-field-input"
    aria-describedby="bio-hint"
    placeholder="Tell us about yourself"
    rows="3"
  ></textarea>
  <div class="comp-helper-text" id="bio-hint">
    Maximum 500 characters
  </div>
</div>

<!-- With character count feedback -->
<div class="comp-field">
  <label class="comp-label" for="feedback">Feedback</label>
  <textarea 
    id="feedback" 
    class="comp-textarea comp-field-input"
    maxlength="500"
    placeholder="Your feedback helps us improve"
    rows="5"
  ></textarea>
  <div style="font-size: 0.75rem; color: var(--color-fg-muted);">
    <span id="char-count">0</span> / 500 characters
  </div>
</div>

<!-- Disabled state -->
<div class="comp-field">
  <label class="comp-label" for="readonly-text">
    Original text (read-only)
  </label>
  <textarea 
    id="readonly-text" 
    class="comp-textarea comp-field-input"
    readonly
  >This is the original text that cannot be edited.</textarea>
</div>
```

## Sizes

```html
<!-- Small (2.25rem min-height) -->
<textarea class="comp-textarea comp-textarea-sm" rows="2" placeholder="Small textarea"></textarea>

<!-- Medium (4rem min-height, default) -->
<textarea class="comp-textarea comp-textarea-md" rows="4" placeholder="Medium textarea"></textarea>

<!-- Large (6rem min-height) -->
<textarea class="comp-textarea comp-textarea-lg" rows="6" placeholder="Large textarea"></textarea>
```

## Validation states

```html
<!-- Valid textarea -->
<textarea 
  id="message" 
  class="comp-textarea comp-field-input"
  aria-invalid="false"
>Your message</textarea>

<!-- Invalid textarea with error -->
<div class="comp-field">
  <label class="comp-label" for="review">Review</label>
  <textarea 
    id="review" 
    class="comp-textarea comp-field-input"
    aria-invalid="true"
    aria-describedby="review-error"
  >Too short</textarea>
  <div class="comp-error-text" id="review-error" role="alert">
    Review must be at least 10 characters.
  </div>
</div>
```

## Accessibility checklist

- [x] **Semantic HTML:** Uses native `<textarea>` element
- [x] **Label association:** `<label for="id">` with matching textarea `id`
- [x] **Resize:** Allow user to resize (unless exceptional constraint)
- [x] **Keyboard:** Tab to navigate, type to enter text
- [x] **Focus visible:** `:focus-visible` outline visible
- [x] **Color not only signal:** Border color + outline indicate focus/invalid, not color alone
- [x] **Screen reader:** Label read when textarea focused

## Keyboard behavior

| Key | Action |
|-----|--------|
| Tab | Navigate to textarea |
| Shift+Tab | Navigate to previous element |
| Enter | Create new line in text (not form submit) |
| Ctrl+A | Select all text (browser default) |

## ARIA requirements

| ARIA | When | Value |
|------|------|-------|
| `aria-invalid` | Validation fails | `"true"` |
| `aria-describedby` | Helper or error text present | ID of helper/error element |

## Density modes

Textarea minimum height and font size scale with `[data-density]`:

| Density | Min-height | Font-size |
|---------|-----------|-----------|
| `compact` | 2rem | 0.875rem |
| `default` | 2.5rem | 0.875rem |
| `comfortable` | 3rem | 0.9375rem |

## Shape and theme

- **Shape:** `[data-shape="sharp" | "default" | "rounded"]` — border-radius scales automatically
- **Theme:** Adapts to `[data-theme="light" | "dark" | "high-contrast"]` automatically

## Tokens used

| Token | Role | Notes |
|-------|------|-------|
| `--color-bg-input` | Background | Light gray (light theme), darker gray (dark theme) |
| `--color-border-default` | Border default | Subtle border |
| `--color-border-accent` | Border focus | Brand color on focus |
| `--color-border-danger` | Border invalid | Red on invalid |
| `--font-family-mono` | Optional monospace override | For code/technical input |
| `--space-*` | Padding | Scales with density |
| `--radius-*` | Border radius | Scales with shape |

## AI / machine-readable notes

- **Selector pattern:** `comp-textarea` base + size modifier (sm, md, lg)
- **State:** Uses `aria-invalid` and `aria-describedby` for validation
- **Resizable:** Default behavior; set `resize: none` in CSS if fixed size required
- **Character count:** Use `maxlength` + JavaScript to show feedback
- **Responsive:** Height scales with density; no breakpoint changes needed
- **Copy-paste use:** Replace `id`, `placeholder`, `rows` attribute; structure unchanged

## Related patterns

- **Field:** Complete form field with label, textarea, helper, error
- **Input:** Single-line text input
- **Label:** Standalone label component
