# Fikir CSS — Selector Deprecation Window Policy

> Created: 2026-04-12
> Version: v1.0 Track

## Purpose

This policy defines the minimum deprecation window and removal process for CSS selectors (class names) and contract keys in the naming contract. It mirrors the token lifecycle policy for the selector surface.

---

## Scope

This policy applies to:
- Component class selectors (e.g., `.btn`, `.card-header`, `.input-group`)
- Utility class selectors (e.g., `.bg-primary-500`, `.p-4`)
- Contract keys in `contracts/naming.contract.mjs`
- Recipe-level selector references in `contracts/recipes.contract.mjs`

This policy does **not** apply to:
- Experimental surfaces (no deprecation window; may be removed without notice)
- Internal build-time placeholders (`{{component.btn}}`)

---

## Deprecation Window Table

| Surface state at time of change | Minimum deprecation window | Release type required |
|---------------------------------|---------------------------|----------------------|
| Supported → renamed | 2 minor releases | minor |
| Supported → removed | 2 minor releases | minor (with minor bump) |
| Supported class removed (breaking) | 1 major release | major |
| Experimental → removed | 1 minor release | minor (or patch with note) |
| RFC-only → removed | None (never implemented) | patch |

---

## Process: Deprecating a Selector

### Step 1 — Announce deprecation

1. Add a CSS comment above the selector in the source file:
   ```css
   /* deprecated: use .new-selector instead; will be removed in vX.Y.0 */
   .old-selector { ... }
   ```

2. Add the old selector as a CSS alias (if structurally possible):
   ```css
   .new-selector, .old-selector { ... }
   ```

3. Update `contracts/naming.contract.mjs`: add a `deprecated: true` flag and `replacedBy` field:
   ```js
   "component.oldName": {
     domain: "component",
     base: "old-selector",
     deprecated: true,
     replacedBy: "component.newName",
     removedIn: "vX.Y.0"
   }
   ```

4. Add an entry to `docs/contracts/alias-removal-checklist.md`.

5. Add a `dist/contracts/alias-migration.json` entry mapping old → new.

6. Include a "Deprecations" section in the release notes.

### Step 2 — Deprecation period

During the deprecation window:
- Both old and new selectors produce the same styling.
- Consumer migration can happen at their own pace.
- CI must still pass with both selectors present.
- Do not remove the old selector during this period.

### Step 3 — Removal

After the minimum deprecation window has elapsed:
1. Remove the old selector from the source CSS file.
2. Remove the contract key from `contracts/naming.contract.mjs`.
3. Remove the alias CSS declaration.
4. Update `docs/contracts/alias-removal-checklist.md` (mark as removed).
5. Keep the alias migration entry in `dist/contracts/alias-migration.json` for one additional release as a reference.
6. Add a "Breaking Changes" entry in the release notes if the selector was `supported`.
7. Verify CI passes (no references to removed key).

---

## Selector Rename vs. Removal

| Operation | Window required | Migration artifact required |
|-----------|----------------|----------------------------|
| Rename (old → new, same purpose) | 2 minor releases | Yes — alias-migration.json entry |
| Partial removal (reduce variants) | 2 minor releases | Yes — per removed variant |
| Full surface removal | 2 minor releases | Yes — alias-migration.json entry |
| Critical security/bug fix rename | 1 release (emergency) | Yes — emergency migration note |

---

## Prefixed Mode Compatibility

When a selector is renamed or removed in `plain` mode, the same change applies proportionally to `prefixed` mode selectors. The `alias-migration.json` must include both:
- plain mode entry: `"old-class": "new-class"`
- prefixed mode entry: `"comp-old-class": "comp-new-class"` (if component domain)

The `scripts/validate-prefixed-smoke.mjs` script validates this parity.

---

## Emergency Deprecation (Security / Critical Bug)

In cases where a selector must be removed immediately (security issue, critical rendering bug):
1. Emergency removal is allowed in a **patch** release.
2. A `SECURITY.md` or issue reference must be included.
3. Migration note is written within 48 hours of release.
4. The 2-release window may be waived with explicit maintainer sign-off.

---

## Enforcement

- `tests/source/contract-key-integrity.test.mjs`: detects naming contract mismatches.
- `scripts/report-contract-drift.mjs`: reports any selector additions/removals between builds.
- `scripts/validate-prefixed-smoke.mjs`: validates prefixed mode selector output.
- `npm run test:ci`: full CI gate must pass before removal.

---

## Related Documents

- `docs/contracts/alias-removal-checklist.md` — active deprecation tracker
- `docs/contracts/contract-compatibility-matrix.md` — breaking change definitions
- `docs/contracts/token-lifecycle-policy.md` — equivalent policy for tokens
- `docs/release/versioning-semver-policy.md` — version bump governance
