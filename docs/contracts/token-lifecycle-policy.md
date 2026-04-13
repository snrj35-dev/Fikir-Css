# Fikir CSS — Token Lifecycle Policy

> Created: 2026-04-12
> Version: v1.0 Track

## Purpose

This policy defines the rules for adding, changing, and deprecating design tokens in Fikir CSS. All token mutations must follow this policy to maintain the stability guarantees of the v1.0 track.

---

## Token States

| State | Meaning |
|-------|---------|
| `active` | Token is in the frozen taxonomy; supported for all consumers. |
| `experimental` | Token exists but is not yet in the frozen taxonomy; subject to rename or removal. |
| `deprecated` | Token is still present but scheduled for removal; alias to replacement provided. |
| `removed` | Token has been deleted; documented in migration notes. |

---

## 1. Adding a Token

### Eligibility

A new token may be added when:
1. It fills a gap not covered by any existing token in the taxonomy.
2. It follows the naming grammar defined in `docs/contracts/token-taxonomy-v1.md`.
3. A use-case RFC or issue justifies the addition.

### Process

1. Open a PR with the token addition in the appropriate source file.
2. Add the token to the relevant section of `docs/contracts/token-taxonomy-v1.md`.
3. Add a usage example in the relevant component or utility file.
4. If the token is semantic, verify it references a core token (no raw value).
5. Label the token as `experimental` until two release cycles pass without API issues.
6. Promote to `active` via a lifecycle PR that updates this document.

### Core token additions

- New core token families require a full taxonomy section update.
- Scale extensions to existing families (e.g., `--space-8`, `--space-10`) are low-risk and can be added in a single PR without a waiting period.

### Semantic token additions

- New semantic token families require a mode-override counterpart in all supported theme files (light, dark, high-contrast if active).
- Must not duplicate an existing semantic token's intent.

---

## 2. Changing a Token Value

### What counts as a value change

- Changing the raw value of a core token (e.g., `--radius-md: 0.5rem` → `0.625rem`).
- Changing the semantic alias of a semantic token (e.g., `--color-bg-default: var(--color-gray-50)` → `var(--color-gray-100)`).

### Rules

- **Minor value tuning** (< 10% visual change, same intent): allowed in a patch release.
- **Significant value change** (visible layout or color shift): requires a minor release and a migration note.
- **Semantic intent change** (token means something different): treated as a deprecation + new token.

### Process

1. Document the change in the PR description with before/after values.
2. Run visual regression baseline capture if applicable.
3. Update the migration note if the change is significant.
4. Update the `Score History` entry in `docs/roadmap/baseline-score-record.md` if the change affects bundle size.

---

## 3. Deprecating a Token

### Triggers

A token is deprecated when:
- It is being renamed for consistency (old name deprecated, new name added).
- Its semantic intent has been superseded by a better-named token.
- A structural simplification removes a family (e.g., consolidating `--space-5` into `--space-4` / `--space-6`).

### Process

1. Keep the old token name in the source file as an alias: `--old-token: var(--new-token);`
2. Add a CSS comment: `/* deprecated: use --new-token instead; will be removed in vX.Y.0 */`
3. Update `docs/contracts/token-taxonomy-v1.md` to mark the token as `deprecated`.
4. Add an entry to `docs/contracts/alias-removal-checklist.md`.
5. Announce in the next release notes under a "Deprecations" section.
6. Enforce removal no sooner than **two minor releases** after the deprecation announcement.

---

## 4. Removing a Token

### Pre-conditions

All of the following must be true:
- Token has been in `deprecated` state for at least two minor releases.
- All known internal consumers have been migrated.
- Alias entry exists in `dist/contracts/alias-migration.json`.
- Migration note is updated with removal instructions.

### Process

1. Remove the token from the source file.
2. Remove the alias declaration.
3. Update `docs/contracts/token-taxonomy-v1.md` (move to "Removed" section with version).
4. Update `docs/contracts/alias-removal-checklist.md` (mark as removed).
5. Add a "Breaking Change" note in the release notes if the token was `active`.
6. Verify CI passes without the token.

---

## 5. Mode Token Additions

Adding a new theme mode (e.g., `high-contrast`, `compact`) follows the same add process but also requires:

1. Override values defined for **all** active semantic tokens.
2. A theme regression checklist run against all supported surfaces.
3. Documentation of the mode selector in `docs/contracts/token-taxonomy-v1.md`.

---

## Deprecation Window Policy

| Token state | Minimum deprecation window |
|------------|---------------------------|
| `experimental` → removed | 1 minor release |
| `active` → deprecated → removed | 2 minor releases |
| Core token (active) → removed | 1 major release |

---

## Related Documents

- `docs/contracts/token-taxonomy-v1.md` — frozen token taxonomy
- `docs/contracts/alias-removal-checklist.md` — active deprecation tracking
- `docs/contracts/contract-compatibility-matrix.md` — cross-version compatibility
- `docs/contracts/selector-deprecation-window-policy.md` — selector equivalent
