# Post-1.0 Backlog

> Last updated: 2026-04-20  
> This page tracks work that is **out of scope for v1.0.0** but planned for future minor/patch releases.

See also: [tasklist.md](./tasklist.md) · [support-matrix.md](./support-matrix.md) · [what-is-stable-in-v1.md](../release/what-is-stable-in-v1.md)

---

## Priority tiers

| Label | Meaning |
|-------|---------|
| `P1` | High — likely next minor release |
| `P2` | Medium — planned but not scheduled |
| `P3` | Low — nice to have |

---

## Experimental → Beta promotions (P1)

Surfaces that are close to beta-ready and are candidates for `v1.1.0` promotion:

| Surface | Blocker |
|---------|---------|
| `inline-notice` | Semantic distinction from `alert`/`callout` needs RFC alignment |
| `split-button` | Keyboard/menu interaction contract spec pending |
| `tree-table` | Row expand/collapse keyboard navigation contract |
| `copy-button` | Clipboard API integration pattern spec |
| `command-bar` | Slot contract and action grouping spec |

---

## Beta → Supported promotions (P1)

Surfaces that have been in beta long enough and are candidates for promotion:

| Surface | Blocker |
|---------|---------|
| `autocomplete` | Keyboard interaction spec freeze |
| `combobox` | Keyboard interaction spec freeze |
| `context-menu` | Positioning contract (Floating UI) |
| `tags-input` | Tag add/remove interaction API |
| `rating` | Half-star + keyboard contract |

---

## Anatomy documentation backlog (P1)

27 CSS components are tracked in `contracts/anatomy-drift-baseline.mjs` and still need full anatomy entries. High-value candidates:

- `autocomplete`, `combobox`, `context-menu`
- `date-picker`, `date-range-picker`, `date-time-picker`, `time-picker`
- `inline-notice`, `split-button`, `settings-panel`
- `range-slider`, `rating`, `tags-input`
- `code`, `code-block`, `kbd`, `markdown-surface`

---

## Feature additions (P2)

| Feature | Notes |
|---------|-------|
| Token metadata: which components use which token | Add to `tokens.json` manifest |
| CDN URL accessibility test | Validate unpkg / jsDelivr URLs in CI |
| `manifest diff → CHANGELOG` automation | Auto-append manifest changes to CHANGELOG |
| Stale manifest detection CI step | Warn when anatomy entry unchanged for 3+ releases |
| Deprecation warning mechanism | Mark old class aliases in manifest |

---

## Tooling / DX (P2)

| Item | Notes |
|------|-------|
| VS Code extension example | Guide not yet written — see M20.8 in tasklist |
| Web agent integration example | Guide not yet written — see M20.8 in tasklist |
| Fluid token pilot | `clamp()` spacing tokens, constrained to layout primitives |

---

## Post-launch guardrails (ongoing)

- Monitor `npm` download counts for adoption signal
- Triage bug reports using [bug report template](../../.github/ISSUE_TEMPLATE/bug_report.md)
- Apply [hotfix checklist](../release/hotfix-checklist.md) for any `1.0.x` patches
- Review promotion candidates before each `1.x` minor release
