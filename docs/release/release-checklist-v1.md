# Fikir CSS — v1.0 Release Checklist

> Created: 2026-04-16  
> Scope: `1.0.0-rc.*` and `1.0.0`

Use this checklist in addition to the generic [`release-checklist.md`](./release-checklist.md).

## Product-truth gates

- [ ] README, site, playground, and examples tell the same install story
- [ ] Support levels in README match `docs/roadmap/support-matrix.md`
- [ ] `npm run validate:version` passes
- [ ] No known `beta`/`latest`/`rc` drift remains in current-facing docs

## Surface and docs gates

- [ ] Supported surface docs coverage is complete
- [ ] Supported surface demo coverage is complete
- [ ] Experimental surfaces are clearly called out as non-stable
- [ ] Migration notes exist for any contract or behavior change

## Quality gates

- [ ] `npm run test:ci`
- [ ] `npm run package:smoke`
- [ ] Browser-level coverage for interactive supported surfaces
- [ ] Contrast, reduced-motion, and forced-colors checks completed

## Governance gates

- [ ] `docs/governance/semver-policy.md` is current
- [ ] `docs/governance/deprecation-policy.md` is current
- [ ] `docs/governance/support-policy.md` is current
- [ ] `docs/release/rc-burn-in-plan.md` is current
- [ ] `docs/release/v1.0-support-freeze-checklist.md` is complete

## Channel-specific gates

### For `-rc.N`

- [ ] Feature freeze declared
- [ ] Only bug-fix work remains in the RC branch
- [ ] RC notes pack updated

### For `1.0.0`

- [ ] RC burn-in completed successfully
- [ ] No open `P0` issues remain
- [ ] Release notes use the stable install command: `npm install fikir-css`

## Related

- [`release-checklist.md`](./release-checklist.md)
- [`release-promotion-flow.md`](./release-promotion-flow.md)
- [`rc-burn-in-plan.md`](./rc-burn-in-plan.md)
