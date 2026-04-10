# Repo Skeleton (v0.2)

```text
.
├─ contracts/
│  ├─ naming.contract.mjs
│  └─ recipes.contract.mjs
├─ docs/
│  ├─ architecture/
│  ├─ contracts/
│  ├─ migration/
│  ├─ release/
│  └─ testing/
├─ packages/
│  ├─ base/
│  ├─ components/
│  ├─ layouts/
│  ├─ recipes/
│  │  └─ generated/
│  ├─ reset/
│  ├─ tokens/
│  │  └─ themes/
│  └─ utilities/
├─ scripts/
├─ dist/
│  └─ contracts/
├─ fikir.config.mjs
└─ package.json
```

## Notes
- `packages/recipes/index.css` ve `packages/recipes/generated/resolvers.ts` build tarafından üretilir.
- `dist/contracts/*` migration/inspection için build artefaktlarıdır.
