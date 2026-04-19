# Fikir CSS — Semantic Versioning Policy

> Created: 2026-04-16  
> Applies from: v1.0.0  
> Owner: maintainer (@snrj35-dev)

---

## 1. Version format

```
MAJOR.MINOR.PATCH[-PRERELEASE]
```

| Segment | Incremented when |
|---------|-----------------|
| `MAJOR` | A breaking change is introduced to a `supported` surface |
| `MINOR` | New surfaces, new tokens, or new non-breaking functionality are added |
| `PATCH` | Backwards-compatible bug fixes, doc corrections, or build tooling changes |
| `PRERELEASE` | `-rc.N` for release candidates; `-beta` dist-tag for experimental builds |

---

## 2. What counts as a breaking change

A **breaking change** is any modification that requires consumers to update their code or markup to maintain the same visual or behavioral result.

### Breaking (requires MAJOR bump)
- Renaming or removing a **supported** CSS class
- Changing the semantic meaning of an existing **supported** class in a way that alters layout or appearance
- Renaming or removing a frozen state hook on a supported surface (`data-open`, `aria-current`, etc.)
- Removing or renaming a design token that is part of the public contract (`--color-*`, `--space-*`, `--radius-*`, etc.)
- Removing a subpath export from `package.json` (`fikir-css/css`, `fikir-css/tooling`, etc.)
- Changing the signature or return type of a typed resolver in `fikir-css/tooling`

### Non-breaking (MINOR or PATCH)
- Adding new CSS classes or tokens
- Adding new subpath exports
- Changing styles on `beta` or `experimental` surfaces (these may change without a MAJOR bump)
- Internal build, script, or tooling changes with no consumer-facing effect
- Visual refinements within the existing intent (e.g. tightening spacing by 1px on a `beta` surface)
- Performance improvements (smaller bundle, faster parsing)
- Accessibility improvements that do not rename selectors

---

## 3. Surface stability levels

Every public surface carries one of four stability labels. The label determines what semver guarantees apply.

| Label | Definition | Semver protection |
|-------|-----------|-------------------|
| `supported` | Stable, production-ready, fully documented | Breaking changes require MAJOR bump |
| `beta` | Implemented and usable but additive changes may still occur | Breaking changes allowed in MINOR; documented in CHANGELOG |
| `experimental` | Proof of concept or work-in-progress; may be removed without notice | No semver guarantee; opt-in only |
| `deprecated` | Will be removed in the next MAJOR; migration path provided | Removal in MAJOR; deprecation notice at least one MINOR before |

Surface stability is declared in [`docs/roadmap/support-matrix.md`](../roadmap/support-matrix.md).
Selector freeze rules are defined in [`selector-contract-freeze.md`](./selector-contract-freeze.md).

---

## 4. Deprecation policy

1. A `supported` surface is never silently removed.
2. Before removal, a surface must first be marked `deprecated` in a MINOR release.
3. The deprecation MINOR release must include:
   - A CHANGELOG entry with `### Deprecated` section
   - A migration note pointing to the replacement surface or pattern
   - A code comment in the CSS source (`/* @deprecated: use .replacement-class */`)
4. The surface is removed in the next MAJOR release.
5. `beta` and `experimental` surfaces may be removed without the above process, but removal must be noted in the CHANGELOG.

**Minimum deprecation window:** one MINOR release before removal in MAJOR.

---

## 5. Pre-release channels

| Dist-tag | Format | Purpose |
|----------|--------|---------|
| `latest` | `X.Y.Z` | Stable, production-ready releases |
| `beta` | `X.Y.Z-beta.N` | Early access; breaking changes possible between beta iterations |
| `rc` | `X.Y.Z-rc.N` | Release candidate; only bug fixes accepted; no new features |
| `next` | `X.Y.Z-next.N` | (reserved) Nightly or feature-branch preview |

### RC process
- After feature freeze, publish `1.0.0-rc.1`
- Burn-in period: minimum 7 days of real-world testing
- Only `P0` bug fixes accepted during burn-in
- If no P0 issues surface: promote to `1.0.0`
- If P0 issues found: fix, publish `rc.2`, restart burn-in

---

## 6. Patch release policy

A patch (`PATCH` bump) may be published at any time for:
- Bug fixes that cause incorrect visual output on `supported` surfaces
- Security issues in the tooling or helper layer
- Documentation corrections that would cause a consumer to implement incorrectly

A patch release does **not** add new surfaces, new tokens, or change existing behaviour.

---

## 7. Support window

| Version | Status | Active support until | Security fixes until |
|---------|--------|----------------------|----------------------|
| `1.x` | Active | Until `2.0.0` release | 12 months after `2.0.0` |
| `0.6.x` | Maintenance | End of active `1.x` support | None (pre-v1 channel) |

**"Active support"** means bug fixes and minor improvements are accepted.  
**"Maintenance"** means only critical bug fixes; no new features.

---

## 8. npm dist-tag workflow

```
feature branch  →  beta builds   (npm publish --tag beta)
rc branch       →  rc builds     (npm publish --tag rc)
main            →  stable builds (npm publish)   ← latest
```

The `latest` dist-tag is **never** manually set to a pre-release version.  
`beta` and `rc` builds require explicit opt-in:

```bash
npm install fikir-css@beta
npm install fikir-css@rc
npm install fikir-css        # always installs latest stable
```

---

## 9. CHANGELOG discipline

Every release must update `CHANGELOG.md` with entries under:

```markdown
## [X.Y.Z] — YYYY-MM-DD

### Added
### Changed
### Fixed
### Deprecated
### Removed
### Security
```

- `Added`, `Changed`, `Fixed` are required if the section is non-empty.
- `Deprecated` and `Removed` require a migration note link.
- Each entry must reference the affected surface or area (e.g. `button`, `modal`, `--color-accent`).

---

## 10. Related documents

- [`support-matrix.md`](../roadmap/support-matrix.md) — surface stability classification
- [`selector-contract-freeze.md`](./selector-contract-freeze.md) — frozen selector rules and additive vs breaking examples
- [`deprecation-policy.md`](./deprecation-policy.md) — detailed deprecation process (M19.4)
- [`support-policy.md`](./support-policy.md) — support window details (M19.4)
- [`release-checklist-v1.md`](../release/release-checklist-v1.md) — v1.0 publish gate (M19.4)
