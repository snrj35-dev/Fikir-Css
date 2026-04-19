# RFC: Coachmark Pattern (v1.0)

## Durum
- Status: v1.0 Product Pattern RFC (Minimum viable scope)
- Scope: Single-annotation coachmark UI pattern
- Priority: M16.10 (P2)
- Non-goal: Multi-step tour sequencing, analytics, persistent state storage, animation presets

## Amaç
Bu RFC, coachmark pattern'i için canonical attribute surface, variant sözleşmesi, composition rules, token tüketimi ve erişilebilirlik beklentilerini tanımlar. Coachmark, sayfa içinde bir UI elemanını veya workflow adımını kullanıcıya rehberlik etmek için minimal annotasyon sağlar.

## Referanslar
- `docs/contracts/naming-convention-spec.md`
- `docs/architecture/headless-contract-spec.md`
- `packages/components/popover.css` (positioning reuse)
- `packages/components/tooltip.css` (interaction model)
- `docs/rfcs/patterns/empty-search-state-rfc.md` (pattern RFC format)

---

## Motivasyon

### Problem
- Onboarding, feature introduction ve guided workflow'lar için standalone CSS pattern eksik
- Kullanıcılar custom popover + positioning + keyboard dismiss kombinasyonu tekrar yazmak zorunda
- Coachmark "sadece tooltip mu yoksa özel semantic mi?" sorusu belirsiz

### Çözüm Kapsamı
v1.0'da coachmark pattern'i şunları garanti eder:
- Single UI element üzerine popover-style annotation
- Tooltip benzeri dismiss (Esc, click-outside, focus-out)
- Semantic tone variants (info, warning, success, danger, neutral)
- Basic keyboard interaction
- Dark/light theme support
- Density awareness

v1.0'da coachmark pattern'i **şunları garanti etmez:**
- Multi-step tour builder (post-1.0 scope)
- Step sequencing / history
- Tour state persistence
- Animation / spring effects
- Analytics tracking
- Beacon dots / pulsing UI

---

## Canonical Pattern Surface

### Root Structure
```html
<div data-pattern="coachmark" data-variant="info" data-active="true|false">
  <!-- annotation content here -->
</div>
```

### Attributes

| Attribute | Values | Required | Purpose |
|-----------|--------|----------|---------|
| `data-pattern` | `"coachmark"` | Yes | Pattern identifier |
| `data-variant` | `"info" \| "tip" \| "warning" \| "success" \| "danger"` | No (default: "info") | Semantic tone |
| `data-active` | `"true" \| "false"` | No (default: "false") | Visibility state |
| `data-position` | `"top" \| "bottom" \| "start" \| "end"` | No (default: "top") | Popover anchor |
| `data-arrow` | `"true" \| "false"` | No (default: "true") | Arrow pointer visibility |
| `aria-label` | string | Recommended | Accessible label for screen readers |
| `role` | `"tooltip" \| "dialog"` | No (default: "tooltip") | ARIA role (determined by interaction model) |

### Slots

Coachmark annotation'ını yapılandırmak için aşağıdaki `data-slot` adları kullanılır:

| Slot | Purpose | Notes |
|------|---------|-------|
| `data-slot="icon"` | Icon or visual marker | Optional; semantic icon (info, tip, warning, etc.) |
| `data-slot="title"` | Coachmark heading | Recommended; should be concise (1-3 words) |
| `data-slot="description"` | Main guidance text | Recommended; explains when/why/how |
| `data-slot="action"` | Primary action button | Optional; dismiss, "Got it", "Learn more", etc. |
| `data-slot="secondary-action"` | Secondary action | Optional; "Remind later", "Skip" (advanced scenarios) |

### Basic Pattern Example

```html
<div
  data-pattern="coachmark"
  data-variant="info"
  data-active="false"
  data-position="top"
  aria-label="Getting started coachmark"
  role="tooltip"
>
  <div data-slot="icon" aria-hidden="true">💡</div>
  <div data-slot="title">Pro tip</div>
  <div data-slot="description">
    You can use Cmd+K to open the command palette and quickly navigate to any feature.
  </div>
  <button data-slot="action" type="button">Got it</button>
</div>
```

---

## Variant Contract

Coachmark'ın semantic ton'u popover stilini ve ikonunu belirler:

### 1. `info` (Default)
- **Semantic:** General guidance, new feature introduction
- **Visual:** Primary color accent
- **Icon:** Lightbulb or info circle
- **Tone:** Informative, helpful
- **Example:** "This panel shows your dashboard overview."

### 2. `tip`
- **Semantic:** Pro usage, keyboard shortcut, time-saving technique
- **Visual:** Primary color, slightly softer than `info`
- **Icon:** Sparkle or star
- **Tone:** Positive, encouraging
- **Example:** "Use Tab to move between fields faster."

### 3. `warning`
- **Semantic:** Caution, prerequisite, potential issue
- **Visual:** Warning tone color (`--color-tone-warning`)
- **Icon:** Warning triangle
- **Tone:** Cautionary but not alarming
- **Example:** "This action cannot be undone."

### 4. `success`
- **Semantic:** Achievement, completed milestone, confirmation
- **Visual:** Success tone color (`--color-tone-success`)
- **Icon:** Checkmark or celebration
- **Tone:** Positive, celebratory
- **Example:** "You've completed your first workflow!"

### 5. `danger`
- **Semantic:** Critical information, destructive action warning
- **Visual:** Danger tone color (`--color-tone-danger`)
- **Icon:** Exclamation or alert
- **Tone:** Urgent but measured
- **Example:** "Deleting this record is permanent."

### 6. `neutral`
- **Semantic:** Secondary guidance, additional context
- **Visual:** Neutral/muted color
- **Icon:** None or minimal
- **Tone:** Supporting, understated
- **Example:** "Scroll down for more options."

---

## Composition Rules

### Pattern vs Component
- Coachmark is a **pattern**, not a new component.
- It reuses popover positioning/styling concepts from `popover.css` and tooltip interaction model from `tooltip.css`.
- It does **not** create new CSS base classes; instead, it uses `data-*` driven styling.

### Approved Structure
✓ Reuse existing `popover-content` or `tooltip-content` base styling
✓ Layer variant styles under `data-variant` selector
✓ Use existing helper classes (e.g., spacing, typography)
✓ Compose from existing surfaces (icon, title, description, button)

### Not Approved
✗ New base class like `coachmark`, `coachmark-popover`, `coachmark-tooltip`
✗ Separate semantic class per variant (`coachmark-info`, `coachmark-warning`)
✗ Proprietary icon or button styles

---

## State Representation

### Visibility
```html
<!-- Visible (active) -->
<div data-pattern="coachmark" data-active="true" style="display: block;">

<!-- Hidden (inactive) -->
<div data-pattern="coachmark" data-active="false" style="display: none;">
```

- `data-active="true"` → element is rendered and visible
- `data-active="false"` → element is hidden (display: none or visibility: hidden)
- Visibility management is delegated to the application

### Interaction States
The coachmark popover content can receive focus-visible and hover states via existing patterns:

```css
[data-pattern="coachmark"] {
  /* base popover styling */
}

[data-pattern="coachmark"] [data-slot="action"]:focus-visible {
  /* button focus styling */
}

[data-pattern="coachmark"]:hover {
  /* optional: subtle highlight or shadow elevation */
}
```

---

## Position & Arrow

### Position Attribute
The `data-position` attribute suggests popover placement relative to annotated element:

| Value | Placement |
|-------|-----------|
| `top` | Above target element |
| `bottom` | Below target element |
| `start` | To the left (LTR) / right (RTL) |
| `end` | To the right (LTR) / left (RTL) |

Position is **hint-based** (not enforced by CSS); JavaScript is responsible for collision detection and fallback.

### Arrow Pointer
```html
<div data-pattern="coachmark" data-arrow="true">
  <!-- arrow element included in popover -->
  <svg class="coachmark-arrow" aria-hidden="true"><!-- ... --></svg>
</div>
```

- `data-arrow="true"` → small pointer indicator toward target element
- `data-arrow="false"` → no arrow

---

## Accessibility Requirements

### ARIA
1. Root should have appropriate `role`:
   - `role="tooltip"` for lightweight, non-modal coachmarks
   - `role="dialog"` if coachmark requires explicit dismissal and blocks interaction
   
2. Provide `aria-label` or `aria-labelledby`:
   ```html
   <div data-pattern="coachmark" aria-label="Getting started guide">
   <!-- or -->
   <div data-pattern="coachmark" aria-labelledby="coach-title">
     <div id="coach-title" data-slot="title">Learn the basics</div>
   </div>
   ```

3. Description should use `aria-describedby` if title alone is insufficient:
   ```html
   <div
     data-pattern="coachmark"
     aria-label="Navigation tip"
     aria-describedby="coach-desc"
   >
     <div id="coach-desc" data-slot="description">
       Use the sidebar to navigate between sections.
     </div>
   </div>
   ```

### Keyboard Interaction
1. **Dismiss triggers:**
   - `Escape` → close coachmark (if modal-like)
   - `Tab` out of popover → close (if tooltip-like)
   - Click on `data-slot="action"` button → implicit close (app responsibility)

2. **Focus management:**
   - First interactive element (button) receives focus when coachmark appears
   - Tab order stays within coachmark (modal) or allows escape to parent (tooltip)

3. **Focus restoration:**
   - After dismiss, focus returns to annotated element or previous focused element

### Screen Reader Expectations
1. Title should be concise and informative
2. Description should provide full context (icon is decorative, use `aria-hidden`)
3. Button text should be explicit ("Got it", "Learn more", not "OK" or generic)
4. Coachmark presence should be announced (e.g., "Coachmark: Pro tip appeared" via `aria-live="polite"`)

### Visual Considerations
- Color should not be sole differentiator (use icon + text)
- Sufficient contrast with dark/light themes
- Font size should match or exceed body text (readability)
- Pointer arrow should be visible on all theme backgrounds

---

## Token Consumption

Coachmark pattern uses standard Fikir CSS tokens:

### Space
- `--space-2` for padding within title/description areas
- `--space-3` for padding around popover content
- `--space-4` for gap between icon/title and description
- `--space-1` for tight button spacing

### Colors
- `--color-bg-popover` or `--color-bg-surface` for popover background
- `--color-fg-default` for text
- `--color-tone-{variant}` for accent (info, warning, success, etc.)
- `--color-border-default` for popover border

### Typography
- `--font-size-sm` or `--font-size-base` for description text
- `--font-weight-semibold` for title
- `--line-height-tight` for title, `--line-height-relaxed` for description

### Shadow / Elevation
- `--shadow-sm` or `--shadow-md` for popover elevation

---

## Variant Implementation Pattern

Variants are applied via `data-variant` attribute without creating separate semantic classes:

```css
@layer components {
  [data-pattern="coachmark"] {
    position: absolute;
    background: var(--color-bg-popover);
    border: 1px solid var(--color-border-default);
    border-radius: var(--radius);
    padding: var(--space-3);
    /* ... base styles */
  }

  /* Variant-specific accent colors */
  [data-pattern="coachmark"][data-variant="info"] {
    border-color: var(--color-tone-info);
  }

  [data-pattern="coachmark"][data-variant="warning"] {
    border-color: var(--color-tone-warning);
  }

  [data-pattern="coachmark"][data-variant="success"] {
    border-color: var(--color-tone-success);
  }

  /* Icon color override */
  [data-pattern="coachmark"][data-variant="warning"] [data-slot="icon"] {
    color: var(--color-tone-warning);
  }

  /* Description visibility */
  [data-pattern="coachmark"] [data-slot="description"] {
    color: var(--color-fg-muted);
    font-size: var(--font-size-sm);
  }

  /* Action button reuses existing button styles */
  [data-pattern="coachmark"] [data-slot="action"] {
    /* delegated to .btn recipe */
  }
}
```

---

## Override Behavior

Layer hierarchy: `reset → base → layouts → recipes → components → utilities`

1. Coachmark base styles are in `components` layer
2. Variant colors can be overridden via `data-variant` selector
3. Individual slot content can be styled via utilities (e.g., `.text-sm`, `.font-semibold`)
4. Position/arrow adjustments are JavaScript responsibility; CSS provides defaults

---

## Density & Theme Awareness

Coachmark respects global density and theme settings:

| Setting | Effect |
|---------|--------|
| `data-density="compact"` | Reduced padding, smaller font, tighter spacing |
| `data-density="comfortable"` | Increased padding, relaxed spacing |
| `:dark` or `[data-theme="dark"]` | Dark popover background, light text |
| `:light` or `[data-theme="light"]` | Light popover background, dark text |

Example:
```css
[data-pattern="coachmark"][data-density="compact"] {
  padding: var(--space-2);
  gap: var(--space-2);
}

[data-pattern="coachmark"][data-density="comfortable"] {
  padding: var(--space-4);
  gap: var(--space-3);
}
```

---

## Resolver Usage Contract

v1.0 does **not** provide a dedicated coachmark resolver helper. Coachmark state management and positioning are delegated to the application:

### Application Responsibilities
1. **Positioning:** Use Floating UI, Popper.js, or similar for position + collision detection
2. **State:** Manage `data-active` attribute updates
3. **Lifecycle:** Toggle visibility based on user interaction or onboarding progress
4. **Keyboard:** Implement Escape key and Tab handling

### Future Post-1.0 Opportunity
A `resolveCoachmark()` helper could simplify state and positioning (out of scope for v1.0).

---

## Anti-Patterns

### ✗ Don't
1. **Create separate semantic classes:** `coachmark-info`, `coachmark-warning` — use `data-variant` instead
2. **Hardcode positioning in CSS:** rely on JavaScript collision detection
3. **Use coachmark for in-line hints:** use `helper-text` or `aria-describedby` instead
4. **Create nested coachmarks:** only one per page (multi-step is post-1.0)
5. **Style popover text as generic:** title must be visually distinct from description

### ✓ Do
1. Provide both title and description for clarity
2. Use semantic tone variants appropriately
3. Ensure button text is explicit
4. Test keyboard dismiss and focus restoration
5. Verify dark/light theme contrast

---

## Open Questions & Future Scope

### Resolved in v1.0
- ✓ Single annotation popover pattern is sufficient for MVP onboarding
- ✓ data-variant semantics cover common tone use cases
- ✓ Tooltip-like interaction model reduces cognitive load

### Deferred to Post-1.0
1. **Multi-step tour builder** — requires tour state machine and step sequencing
2. **Tour completion tracking** — requires storage/analytics integration
3. **Animated beacon indicators** — out of scope for v1.0 (pure CSS limitation)
4. **Tour player resolver** — `playTour()` helper could automate step progression
5. **Overlay highlight / spotlight** — complex Z-stacking and mask-image patterns

---

## Success Criteria

✓ Coachmark pattern renders correctly in light/dark/high-contrast themes
✓ Keyboard dismiss (Escape) works
✓ Focus management follows tooltip or dialog model consistently
✓ Tone variants visually correspond to semantic intent
✓ Documentation includes real-world onboarding example
✓ Browser-level test verifies keyboard interaction
