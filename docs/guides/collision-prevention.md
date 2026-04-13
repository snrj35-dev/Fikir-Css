# Class Name Collision Prevention

> Status: planned (M8)

Fikir CSS uses plain semantic class names (`btn`, `input`, `modal`, `table`) which may conflict with existing CSS in established projects.

## Risk levels

| Class | Collision risk | Mitigation |
|-------|---------------|------------|
| `btn` | Medium | Bootstrap `.btn` also exists; load Fikir CSS after or use prefixed mode |
| `input` | Medium | Generic name; override via `@layer` |
| `modal` | Medium | Common pattern name |
| `table` | High | Native HTML element name reused |
| `card` | Low | Less commonly used as a global class |

## Solutions

### Option 1 — `@layer` isolation (recommended)

Because Fikir CSS uses `@layer`, you can override any rule simply by writing your styles outside a layer or in a higher-priority layer.

### Option 2 — Prefixed mode

Enable `--naming-mode=prefixed` in your build to prefix all class names with `fk-` (e.g., `fk-btn`, `fk-input`).

### Option 3 — CSS Modules / scoped styles

In component frameworks (React, Vue, Svelte), use CSS Modules alongside Fikir CSS semantic classes to avoid global scope conflicts.
