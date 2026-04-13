# RFC: Class Conflict Resolution Utility

> Created: 2026-04-12
> Status: Draft (M2)
> Scope: Utility for merging Fikir CSS class names without conflicts

## Problem

When composing Fikir CSS utility classes with component classes or overriding recipes, the same CSS property may be declared by multiple classes in the same cascade layer. While `utilities > components` layer ordering handles most cases, consumers sometimes need to merge class lists programmatically (e.g., in React `cn()` / `clsx()` patterns) and want to ensure the **last declaration wins** predictably.

Example conflict:
```js
// Both set padding — which wins?
const classes = cn("card", "p-0");
```

Because `utilities` layer is above `components`, `.p-0` wins. But if both are in `utilities`, the **last class in the DOM order** wins (not the last in the string). This is unexpected.

## Proposed Solution

A lightweight `resolveClasses()` utility that:
1. Accepts a list of class name strings.
2. Detects property conflicts between classes using the selector manifest.
3. Strips earlier duplicates and returns a deduplicated, conflict-resolved string.

## API

```ts
import { resolveClasses } from "fikir-css/tooling";

resolveClasses("card p-4", "p-0");
// → "card p-0"  (p-4 removed, p-0 kept as last)

resolveClasses("btn btn-primary", "bg-red-500");
// → "btn btn-primary bg-red-500"  (no conflict detected, bg-red-500 is utilities layer override)
```

## Conflict Detection Strategy

Use the `dist/contracts/selectors.json` manifest to build a property→class index at build time. At runtime, check incoming class names against the index and strip earlier classes that declare conflicting properties.

This is a **heuristic** — deep nesting and pseudo-state combinations are not fully resolvable statically.

## Prototype Location

`packages/tooling/resolve-classes.mjs`

## Non-goals

- Full CSS property conflict resolution (combinatorial explosion).
- Runtime CSS parsing.
- Replacing tailwind-merge or clsx (complement, not replace).

## Open Questions

1. Should the manifest include property-level metadata? Currently `selectors.json` only has selector names.
2. Is this worth shipping as part of the core package or as an optional `fikir-css/tooling` sub-path?
