# Minimal Test Plan (v0.2)

## Goal
Foundation seviyesinde contract, build ve override davranışının kırılmadan çalıştığını doğrulamak.

## Manual Smoke Checks
1. Build smoke
- `npm run build` başarılı mı?
- `dist/fikir.css` üretildi mi?

2. Contract artifacts
- `dist/contracts/selectors.json` üretildi mi?
- `dist/contracts/alias-migration.json` üretildi mi?
- `dist/contracts/size-report.json` üretildi mi?

3. Placeholder temizliği
- Dist içinde `{{` kalmış selector var mı?

4. Layer kontrolü
- Dist başında beklenen `@layer` prelude var mı?

5. Recipe surface kontrolü
- Resolver çıktısındaki class'lar recipe layer içinde var mı?

## Regression Checklist
- `.u-*` ve `.comp-*` selector'ları dist'te olmamalı (plain mode)
- `:root` ve `[data-theme="light"]` semantic tokenları tek blokta olmalı
- `data-theme="dark"` override'ları korunmalı
