# Contributor Growth and Review-SLA Targets

> Created: 2026-04-12
> Scope: M4 governance — contributor funnel and review cadence expectations

---

## Contributor Growth Targets

### v1.0 launch window (0–3 months post-release)

| Metric | Target |
|--------|--------|
| GitHub stars | 200+ |
| npm weekly downloads | 500+ |
| External issues filed | 10+ |
| External PRs opened | 3+ |
| Adapter integrations (React/Vue/Svelte) confirmed | 1+ community example |

### v1.1 window (3–6 months post-release)

| Metric | Target |
|--------|--------|
| GitHub stars | 600+ |
| npm weekly downloads | 2 000+ |
| External PRs merged | 5+ |
| Community-authored migration guide | 1+ |
| Ecosystem integrations (Storybook, Vite plugin, etc.) | 1+ |

---

## Review SLA Targets

### Issue triage SLA

| Type | First response | Resolution target |
|------|---------------|-------------------|
| Bug (`[bug]` label) | ≤ 48 hours | ≤ 14 days (patch) |
| Feature request | ≤ 72 hours | Roadmap decision in ≤ 30 days |
| Documentation gap | ≤ 72 hours | ≤ 7 days (docs PR) |
| Security concern | ≤ 24 hours | Patch release within 72 hours |

### PR review SLA

| PR type | First review | Merge or close |
|---------|-------------|----------------|
| Bug fix | ≤ 3 days | ≤ 7 days |
| New surface RFC | ≤ 7 days | Committee decision in ≤ 21 days |
| Docs / tooling | ≤ 3 days | ≤ 7 days |
| Breaking change | ≤ 7 days | Major version cycle only |

---

## Review Committee

For v1.0, the maintainer(s) own all review SLAs. As contributor count grows:

- At **5+ regular contributors**: introduce RFC review committee (3 members minimum)
- At **10+ regular contributors**: introduce area owners (CSS core / docs / tooling / ecosystem)

---

## Funnel Tracking

Tracked quarterly in `docs/community/external-feedback-log.md`:
- New issue openers (first-time contributors)
- PR conversion rate (issue → PR)
- Average time-to-merge for external contributions

---

## Related

- `docs/community/external-feedback-log.md`
- `docs/contributor/how-to-add-component-rfc.md`
- `docs/release/release-checklist.md`
