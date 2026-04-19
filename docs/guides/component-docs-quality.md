# Component Documentation Quality Standards

> Applies to: All docs under `docs/components/*.md` (except `_template.md`)  
> Enforcement: CI lint job + manual review gate

---

## Required sections (hard lint gates)

Every supported surface component doc must include **all** of these sections in order:

1. **Header with metadata**
   ```markdown
   # Component Name
   > Support level: **[Supported | Beta]** | Surface key: `component.[key]` | Canonical: `.[base]`
   ```

2. **"When to use" section**
   - Use cases with ✓ and ✗ bullets
   - Minimum 2 use cases and 2 non-use cases

3. **Classes section**
   - Markdown table with columns: `Class | Role | Modifiers (if applicable)`
   - Must list all canonical and modifier classes
   - Base class must be marked "required"

4. **States section**
   - Markdown table with columns: `State | Activation | HTML pattern`
   - Minimum: disabled, invalid, selected/checked/open (whichever apply)
   - Must show ARIA/data-* activation pattern

5. **Basic usage section**
   - Code block with `html` fence
   - Minimal working example using canonical classes
   - Example must have at least one instance that runs in playground
   - Copy-paste ready

6. **Variants section** (if applicable)
   - Code block showing tone/style/size variants
   - At least one example per variant type present in CSS

7. **Accessibility checklist**
   - Checklist with `[ ]` items
   - Minimum checklist items:
     - Semantic HTML
     - ARIA attributes
     - Keyboard navigation
     - Focus visible
     - Color not only signal
     - Screen reader behavior
     - Touch targets

8. **Keyboard behavior** (if interactive)
   - Table with columns: `Key | Action`
   - Tab, Enter/Space, Escape, Arrow keys as applicable

9. **ARIA requirements** (if interactive)
   - Table with columns: `ARIA | When | Value`
   - List all required aria-* and role attributes

10. **Tokens used**
    - Markdown table with columns: `Token | Role | Notes`
    - List all CSS custom properties consumed by component

---

## Soft lint gates (warnings, not blockers)

- Docs are in grammatically correct English
- Code examples use consistent naming (no mixing `button` vs `btn`)
- Examples show dark mode compatibility (mention theme in notes if special)
- Section headers follow H2 or H3 consistently (no H1 except title)

---

## Class drift detection

### Rule: HTML examples must match actual CSS selectors

Every `html` code block in a component doc must use **canonical class names that exist in the built selector contract** (`dist/contracts/selectors.json`) and are defined by `contracts/naming.contract.mjs`.

**Example of drift (WRONG):**
```markdown
# Button

...

## Basic usage
\`\`\`html
<button class="btn btn-primary">Save</button>  <!-- ✓ OK -->
<button class="btn btn-main">Main</button>     <!-- ✗ DRIFT: btn-main doesn't exist -->
\`\`\`
```

**Detection:**
- CI job scans HTML code blocks in `.md` files
- Extracts all `class="..."` values
- Verifies against `naming.contract.mjs` selectors
- Fails build if drift found

**Fixing drift:**
1. Option A: Update docs to use correct existing selector
2. Option B: Add missing selector to CSS + naming contract
3. Option C: Mark example as conceptual (if truly illustrative only) with comment

---

## Copy-paste readiness

Every code example must be:

1. **Syntactically valid HTML** — can be pasted into a .html file and render
2. **Uses only Fikir CSS classes** — no app-specific or arbitrary classes
3. **Self-contained** — doesn't rely on external JS to be readable (inline event handlers OK, complex JS patterns should link to /examples/)
4. **Accessible** — includes proper semantic HTML and ARIA where needed

**Anti-pattern (don't do this):**
```html
<button class="btn" onclick="app.submitForm()">Save</button>
```
Better:
```html
<button type="submit" class="btn btn-primary">Save</button>
```

---

## Density & theme note

If component behavior differs under `data-density` or `data-theme`, note it:

**Example:**
```markdown
## Density modes

- In `compact` mode, button height reduces from 2.5rem to 2.25rem
- In `comfortable` mode, button height increases to 2.75rem
- Padding scales proportionally with spacing tokens
```

---

## AI / LLM context section (optional but recommended for P0)

For high-priority surfaces, add:

```markdown
## AI / machine-readable notes

- **Selector pattern:** `[component]` base, modifiers additive (no double-class like `btn-primary-solid`, use `btn btn-primary btn-solid`)
- **State indicators:** Use ARIA/data-* attributes, not CSS classes like `.is-active`
- **Theme-aware:** All colors use CSS custom properties; dark mode works automatically
- **Responsive:** Uses density tokens — compact/default/comfortable all supported
- **Copy-paste use:** Examples in this doc are production-ready; substitute text and you're done
```

---

## Metadata field definitions

| Field | Example | Purpose |
|-------|---------|---------|
| Support level | `Supported` or `Beta` | Indicates v1.0 stability |
| Surface key | `component.btn` | Reference from naming contract |
| Canonical class | `.btn` | Primary public component class in plain mode |

---

## Checklist for doc author

Before marking a component doc as done:

- [ ] Header includes support level, surface key, canonical class
- [ ] "When to use" section has ≥2 use + ≥2 non-use bullets
- [ ] Classes table lists all canonical + modifier classes
- [ ] States table covers disabled, invalid, and any component-specific state
- [ ] Basic usage section has one copy-paste-ready example
- [ ] All examples in doc match actual selectors in contracts/naming.contract.mjs
- [ ] Variants section shows all tone/style/size options present in CSS
- [ ] Accessibility section is a checklist with at least 6 items
- [ ] Interactive components have Keyboard behavior table
- [ ] Tokens table lists all CSS custom properties used
- [ ] No H1 headers except document title
- [ ] No references to undefined classes or behaviors
- [ ] Dark mode compatibility mentioned or confirmed
- [ ] Examples render correctly in isolation

---

## Review process

1. **Author** writes doc using `_template.md` as guide
2. **Lint job** checks required sections and class drift
3. **Manual review** ensures examples work in playground, writing is clear
4. **Merge** — doc goes live with component in supported/beta

---

## Per-component responsibility

| Who | What |
|-----|------|
| Component owner | Ensure doc examples match actual CSS behavior |
| Docs reviewer | Verify accessibility checklist is accurate |
| QA | Playground example testing and demo coverage |
| Accessibility reviewer | ARIA table and keyboard behavior accuracy |
