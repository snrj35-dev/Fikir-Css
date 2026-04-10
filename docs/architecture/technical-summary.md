# Fikir CSS Technical Architecture Summary (v0.2)

## Goals
1. Mimari tutarlılık
2. Override davranışının öngörülebilirliği
3. Düşük runtime maliyeti
4. Tek-source naming ve recipe contract
5. Build-time doğrulama

## Core Model
v0.2, contract-driven bir foundation modeline geçer.

Tek kaynaklar:
- Naming/selector contract: `contracts/naming.contract.mjs`
- Recipe contract: `contracts/recipes.contract.mjs`

Build üretimleri:
- `dist/fikir.css`
- `packages/recipes/index.css` (generated)
- `packages/recipes/generated/resolvers.ts` (generated)
- `dist/contracts/selectors.json`
- `dist/contracts/alias-migration.json`
- `dist/contracts/size-report.json`

## Override Model
Temel katman sırası korunur:
```css
@layer reset, base, layouts, recipes, components, utilities;
```

- `utilities` üst katmanda olduğu için semantic stiller öngörülebilir biçimde override edilebilir.
- `!important` sadece escape hatch (`force-*`) sınıfları ile sınırlı kullanımda tutulur.

## Contract Consistency
v0.2'de recipe class surface tek sözleşmeden gelir:
- Recipe CSS selector'ları `recipes.contract.mjs > layer`
- TS resolver output class'ları `recipes.contract.mjs > resolvers`
- Build, resolver key'lerinin layer key'leriyle eşleşmesini validate eder.

## Runtime Strategy
- Runtime style injection yok.
- CSS bundle build-time üretilir.
- Resolver'lar class string döndürür; CSS üretmez.

## Assumption
Contract dosyaları runtime'da doğrudan import edildiği için `.mjs` ve JS-uyumlu syntax kullanılır.
