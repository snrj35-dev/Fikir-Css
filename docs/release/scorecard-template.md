# Fikir CSS — Release Scorecard Template

> Template version: v1.0
> Fill one copy per release candidate round.
> Store completed copies as `docs/release/scorecard-vX.Y.Z.md`.

---

## Release Information

- **Version:** vX.Y.Z
- **Date:**
- **Release type:** `release-candidate` | `stable`
- **Scorecard author:**
- **Previous scorecard:** (link or "none")

---

## Pillar Scores

Score each pillar 0–10. Use `docs/roadmap/scoring-rubric.md` for criteria and `docs/roadmap/scoring-evidence-sources.md` for evidence pointers.

| # | Pillar | Weight | Score (0–10) | Weighted |
|---|--------|--------|-------------|---------|
| 1 | Surface depth and completeness | 20% | | |
| 2 | Accessibility and quality trust | 20% | | |
| 3 | Runtime and bundle performance | 15% | | |
| 4 | DX and tooling excellence | 20% | | |
| 5 | Documentation and adoption readiness | 15% | | |
| 6 | Governance and release discipline | 10% | | |
| | **Weighted Total** | **100%** | | **X.XX** |

---

## Per-Pillar Evidence Notes

### Pillar 1 — Surface Depth and Completeness

- Supported surface count:
- Experimental surface count:
- RFC-only surface count:
- Notable gaps:
- Score rationale:

### Pillar 2 — Accessibility and Quality Trust

- A11y docs coverage:
- Keyboard traversal tests active: yes / no / partial
- Contrast regression CI: yes / no
- Score rationale:

### Pillar 3 — Runtime and Bundle Performance

- Current raw CSS size (bytes):
- Current gzip size (bytes):
- Budget band status: within / over / under
- Component-level map: yes / no
- Score rationale:

### Pillar 4 — DX and Tooling Excellence

- Recipe API: functional / partial / none
- Type-safe resolvers: yes / no
- Contract drift report: yes / no
- Alias migration map: yes / no
- Score rationale:

### Pillar 5 — Documentation and Adoption Readiness

- README quality: short-first / verbose / minimal
- Migration guides: count and which frameworks covered
- Playground coverage: all supported / partial / none
- Score rationale:

### Pillar 6 — Governance and Release Discipline

- Release checklist: enforced / manual / none
- GitHub milestone: active / missing
- Feedback log: active / stale / none
- Score rationale:

---

## CI Gate Status

- `npm run test:ci`: pass / fail
- `npm run validate:size`: pass / fail
- `npm run validate:prefixed`: pass / fail
- `npm run validate:playground-baseline`: pass / fail
- `npm run validate:publish`: pass / fail

---

## Score Trend

| Pillar | Previous | Current | Delta |
|--------|----------|---------|-------|
| 1 — Surface depth | | | |
| 2 — Accessibility | | | |
| 3 — Performance | | | |
| 4 — DX/tooling | | | |
| 5 — Docs/adoption | | | |
| 6 — Governance | | | |
| **Total** | | | |

---

## Decision

- [ ] Score `>= 9.9` achieved
- [ ] Score is second consecutive round at `>= 9.9` → **v1.0 exit condition met**
- [ ] Promote to next release candidate
- [ ] Block: issues to resolve before next round

**Blocking issues (if any):**

---

## Reference

- Scoring rubric: `docs/roadmap/scoring-rubric.md`
- Evidence sources: `docs/roadmap/scoring-evidence-sources.md`
- Release checklist: `docs/release/release-checklist.md`
