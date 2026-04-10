# Validation Pipeline (v0.2)

Build script:
- `scripts/build-css.mjs`

## Validation Steps
1. Contract reference validation
- `recipes.contract.mjs` içindeki selector key'leri, `naming.contract.mjs` içinde var mı?

2. Single class surface validation
- Resolver referansları `layer` içinde eksiksiz tanımlı mı?

3. Placeholder resolution validation
- CSS kaynaklarında `{{...}}` placeholder'ları tamamen çözülmüş mü?

4. Layer/presence validation
- Dist içinde layer prelude ve her `@layer` bloğu mevcut mu?

5. Contract-to-dist parity
- Recipe contract'ta referanslanan selector'lar dist çıktısında mevcut mu?

## Build Artifacts for Validation Visibility
- `dist/contracts/selectors.json`
- `dist/contracts/alias-migration.json`
- `dist/contracts/size-report.json`

## Failure Behavior
Herhangi bir validation adımı başarısız olursa build non-zero exit code ile durur.
