# Package Distribution Strategy (M1 Baseline)

## Goal
Define how Fikir CSS is consumed as a package while the repo remains prototype-oriented.

## Package Entrypoints
Defined in `package.json`:
- `.` -> `./dist/fikir.css`
- `./css` -> `./dist/fikir.css`
- `./contracts/selectors` -> `./dist/contracts/selectors.json`
- `./contracts/alias-migration` -> `./dist/contracts/alias-migration.json`
- `./contracts/size-report` -> `./dist/contracts/size-report.json`

## Shipped vs Source-only

### Shipped in package
- `dist/fikir.css`
- `dist/contracts/selectors.json`
- `dist/contracts/alias-migration.json`
- `dist/contracts/size-report.json`
- `README.md`
- `LICENSE`
- release/migration templates:
  - `docs/release/release-note-template.md`
  - `docs/migration/migration-note-template.md`

### Source-only (repo development assets)
- `packages/**`
- `scripts/**`
- `tests/**`
- `playground/**`
- `.github/**`
- most `docs/**` (except explicit templates listed above)

## Published File List Policy
`package.json#files` is the source of truth for publishable content.

## Installation and Consumption
Current model:
- repo-first build for development (`npm install`, `npm run build`)
- package smoke/install flow validated using local tarball (`npm pack`)

Minimal consumer flow:
1. Build artifacts at repo root (`npm run build`)
2. Create local package tarball (`npm pack`)
3. Install tarball in consumer project (`npm install ../fikir-css-mvp-<version>.tgz`)
4. Consume CSS:
   - plain HTML: `<link rel="stylesheet" href="./node_modules/fikir-css-mvp/dist/fikir.css" />`
   - bundler entrypoint: `import "fikir-css-mvp/css";`

Reference starter example:
- `examples/starter-consumer/`

Future public publish can reuse the same entrypoints and file policy.

## Dist Contract for Artifacts
The following artifacts are part of the package contract and must exist for release:
- `dist/fikir.css`
- `dist/contracts/selectors.json`
- `dist/contracts/alias-migration.json`
- `dist/contracts/size-report.json`

These are validated by:
- `scripts/validate-publishable-outputs.mjs`
- `scripts/package-smoke.mjs`
- build tests under `tests/build/`
