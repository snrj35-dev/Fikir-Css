# Selector Manifest Usage Guide

> Reference: `dist/contracts/selectors.json`  
> Purpose: Machine-readable CSS selector catalog for AI, build tools, and property conflict detection

---

## What is the Selector Manifest?

The `selectors.json` manifest is a comprehensive map of all CSS class selectors in Fikir CSS, with their properties, values, and conflict detection metadata. It's generated at build time and serves as:

- **LLM prompt context:** Load into AI prompt for code generation
- **Property conflict detection:** Prevent conflicting class combinations
- **Class catalog API:** Query available classes by property, tone, size, etc.
- **Documentation validation:** Verify docs examples match actual CSS

---

## File Location

```bash
dist/contracts/selectors.json
```

Generated during `npm run build` using `scripts/css-manifest.mjs`.

---

## Schema Overview

```json
{
  "generatedAt": "2024-01-15T10:30:00.000Z",
  "version": "1.0.0",
  "count": 351,
  "selectors": {
    "btn": {
      "property": "display",
      "value": "inline-flex",
      "tone": null,
      "size": null,
      "style": null,
      "density": null,
      "shape": null,
      "state": null,
      "category": "component"
    },
    "btn-solid": {
      "property": "background-color",
      "value": "var(--color-primary)",
      "tone": null,
      "style": "solid",
      "category": "component"
    },
    "btn-danger": {
      "property": "background-color",
      "value": "var(--color-danger)",
      "tone": "danger",
      "category": "component"
    },
    "btn-sm": {
      "property": "padding",
      "value": "0.5rem 1rem",
      "size": "sm",
      "category": "component"
    }
  }
}
```

---

## Common Use Cases

### 1. Property Conflict Detection

Prevent incompatible class combinations:

```javascript
import manifest from './dist/contracts/selectors.json' assert { type: 'json' };

function detectConflicts(classes) {
  const propertyMap = {};
  const conflicts = [];

  for (const cls of classes) {
    if (!manifest.selectors[cls]) continue;
    const { property } = manifest.selectors[cls];
    
    if (propertyMap[property]) {
      conflicts.push({
        property,
        classes: [propertyMap[property], cls]
      });
    }
    propertyMap[property] = cls;
  }
  
  return conflicts;
}

// Example
const issues = detectConflicts(['btn-sm', 'btn-lg']); // ← conflicts on size
console.log(issues); // [{ property: 'padding', classes: ['btn-sm', 'btn-lg'] }]
```

### 2. AI Prompt Context

Load manifest into LLM context for better code generation:

```markdown
## Available Fikir CSS Components

You can use these selectors. Always pick ONE from each category (conflicting properties).

### Button Component
- **Base:** `.btn` (required)
- **Styles:** `.btn-solid`, `.btn-soft`, `.btn-ghost`, `.btn-outline`, `.btn-plain`
- **Tones:** `.btn-primary`, `.btn-danger`, `.btn-success`, `.btn-warning`, `.btn-neutral`, `.btn-info`
- **Sizes:** `.btn-sm`, `.btn-md` (default), `.btn-lg`

Example: `<button class="btn btn-solid btn-primary btn-lg">...</button>`

### Form Input
- **Base:** `.input` (required)
- **Sizes:** `.input-sm`, `.input-md`, `.input-lg`
- **States:** Add `disabled`, `aria-invalid="true"`

### Layout Helpers
- Spacing: `.flex`, `.grid`, `.stack`, `.cluster`
- Gap: `.gap-2`, `.gap-4`, `.gap-6`
```

### 3. Class Query API

Build a runtime class selector tool:

```javascript
function queryClasses(filters = {}) {
  const { property, tone, size, style, category } = filters;
  const results = [];

  for (const [cls, meta] of Object.entries(manifest.selectors)) {
    let match = true;
    
    if (property && meta.property !== property) match = false;
    if (tone && meta.tone !== tone) match = false;
    if (size && meta.size !== size) match = false;
    if (style && meta.style !== style) match = false;
    if (category && meta.category !== category) match = false;
    
    if (match) results.push(cls);
  }
  
  return results;
}

// Example queries
queryClasses({ tone: 'danger' });
// ['badge-danger', 'btn-danger', 'alert-danger', ...]

queryClasses({ size: 'lg' });
// ['btn-lg', 'input-lg', 'badge-lg', ...]

queryClasses({ category: 'layout' });
// ['flex', 'grid', 'stack', 'cluster', ...]
```

### 4. Documentation Validation

Verify that doc examples use real selectors:

```javascript
import manifest from './dist/contracts/selectors.json' assert { type: 'json' };

function validateDocExample(htmlCode) {
  const classRegex = /class="([^"]+)"/g;
  const issues = [];
  let match;

  while ((match = classRegex.exec(htmlCode)) !== null) {
    const classes = match[1].split(/\s+/).filter(Boolean);
    for (const cls of classes) {
      if (!manifest.selectors[cls]) {
        issues.push(`Unknown class: ${cls}`);
      }
    }
  }

  return issues;
}

// Usage in doc CI
const exampleHtml = `
  <button class="btn btn-solid btn-primary btn-lg">Save</button>
`;
const errors = validateDocExample(exampleHtml);
console.log(errors); // [] = valid
```

### 5. Design System Catalog

Generate a searchable component reference:

```javascript
function buildComponentCatalog() {
  const components = {};

  for (const [cls, meta] of Object.entries(manifest.selectors)) {
    if (meta.category !== 'component') continue;

    // Extract component name (e.g., 'btn-solid' → 'btn')
    const baseName = cls.split('-')[0];
    
    if (!components[baseName]) {
      components[baseName] = {
        base: baseName,
        modifiers: [],
        properties: {}
      };
    }

    if (cls !== baseName) {
      components[baseName].modifiers.push(cls);
    }
    
    components[baseName].properties[cls] = meta;
  }

  return components;
}
```

---

## Integration Patterns

### Vite Plugin

```javascript
// vite-plugin-fikir-manifest.js
export default function fikirManifestPlugin() {
  return {
    name: 'fikir-manifest',
    resolveId(id) {
      if (id === 'fikir:selectors') {
        return id;
      }
    },
    load(id) {
      if (id === 'fikir:selectors') {
        const manifest = require('./dist/contracts/selectors.json');
        return `export default ${JSON.stringify(manifest)}`;
      }
    }
  };
}
```

Usage:
```javascript
import manifest from 'fikir:selectors';

// Now use manifest for property detection, etc.
const conflicts = detectConflicts(['btn-sm', 'btn-lg']);
```

### PostCSS Plugin

Detect conflicting classes in CSS or HTML:

```javascript
// postcss-fikir-validator.js
import manifest from './dist/contracts/selectors.json' assert { type: 'json' };

export default {
  postcssPlugin: 'fikir-validator',
  Once(root) {
    root.walk((node) => {
      if (node.prop !== 'content') return;
      
      const classRegex = /class="([^"]+)"/g;
      let match;
      
      while ((match = classRegex.exec(node.value)) !== null) {
        const classes = match[1].split(/\s+/);
        const propertyMap = {};
        
        for (const cls of classes) {
          const meta = manifest.selectors[cls];
          if (!meta) {
            node.warn(node.result.processor.result, `Unknown class: ${cls}`);
            continue;
          }
          
          if (propertyMap[meta.property]) {
            node.warn(node.result.processor.result, 
              `Conflicting property: ${meta.property} in ${cls} and ${propertyMap[meta.property]}`
            );
          }
          propertyMap[meta.property] = cls;
        }
      }
    });
  }
};
```

---

## Manifest Structure Details

### Metadata Fields

| Field | Type | Example | Purpose |
|-------|------|---------|---------|
| `property` | string | `"background-color"` | CSS property modified |
| `value` | string | `"var(--color-primary)"` | Computed value |
| `tone` | string \| null | `"danger"` | Semantic tone (if applicable) |
| `size` | string \| null | `"lg"` | Size variant (sm/md/lg) |
| `style` | string \| null | `"solid"` | Visual style (solid/soft/outline) |
| `density` | string \| null | `"compact"` | Density mode (compact/default/comfortable) |
| `shape` | string \| null | `"rounded"` | Shape variant (sharp/default/rounded) |
| `state` | string \| null | `"disabled"` | Component state (loading/selected) |
| `category` | string | `"component"` | Class category (component/layout/utility) |

### Categories

- **component:** Standalone UI component (button, input, card)
- **layout:** Structural/positioning helper (flex, grid, stack)
- **utility:** Low-level style utility (gap, margin, text-color)
- **token:** Design token reference (color, spacing, typography)

---

## Best Practices

### DO:
- ✅ Query manifest instead of hardcoding class names
- ✅ Check for property conflicts before combining classes
- ✅ Use manifest in build-time validation
- ✅ Load manifest into AI prompts for context
- ✅ Version manifest with your release

### DON'T:
- ❌ Generate classes that don't exist in manifest
- ❌ Combine conflicting property classes
- ❌ Ignore validation warnings in CI
- ❌ Modify manifest manually (regenerate from CSS)

---

## Regenerating the Manifest

```bash
npm run build
# Generates: dist/contracts/selectors.json
```

The manifest is rebuilt whenever CSS source changes. Always commit updated manifest with CSS changes.

---

## Related Files

- **Source:** `packages/*/index.css` (CSS class definitions)
- **Generator:** `scripts/css-manifest.mjs`
- **Schema:** None (inferred from CSS at build time)
- **Examples:** `docs/components/*.md` (reference actual selector usage)

---

## FAQ

**Q: Can I manually edit the manifest?**  
A: No. Regenerate it via `npm run build` if CSS changes.

**Q: Should I commit manifest to git?**  
A: Yes. It's a build artifact needed for CI validation and documentation.

**Q: How do I know which classes conflict?**  
A: Use the property-conflict detection script above, or check the `property` field in manifest.

**Q: Can I use manifest in production?**  
A: Yes, if needed for dynamic class generation or form builders. Size is ~50KB minified.

**Q: What if a class exists in CSS but not manifest?**  
A: Likely a build error. Run `npm run build` again to regenerate.
