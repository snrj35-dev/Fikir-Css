# Package Distribution Checklist

Use before `npm pack` / publish candidate creation.

- [ ] `npm run build`
- [ ] `npm run validate:publish`
- [ ] `npm run package:smoke`
- [ ] `dist/fikir.css` exists and non-empty
- [ ] `dist/contracts/selectors.json` exists
- [ ] `dist/contracts/alias-migration.json` exists
- [ ] `dist/contracts/size-report.json` exists
- [ ] `package.json` `exports` and `files` reviewed
- [ ] local tarball install smoke passes (`tests/build/package-smoke-install.test.mjs`)
