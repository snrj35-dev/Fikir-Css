# Recipe Contract (v0.2)

İlgili dokümanlar:
- `docs/contracts/naming-contract.md`
- `docs/contracts/naming-convention-spec.md`
- `docs/contracts/token-dictionary-spec.md`

## Purpose
Recipe CSS ve TS resolver çıktısını tek sözleşmeden üretmek.

Kaynak dosya:
- `contracts/recipes.contract.mjs`

## Structure
`recipesContract` iki bölümden oluşur:
- `layer`: selector key + declaration listesi
- `resolvers`: recipe API için base/defaults/variant eşlemeleri

## Single Class Surface Rule
v0.2 kuralı:
- Resolver'da referanslanan her selector key, `layer` içinde de bulunmalıdır.
- Böylece resolver output ile CSS class surface ayrışmaz.

Bu kural build sırasında `validateSingleClassSurface` ile kontrol edilir.

## Generated Outputs
- `packages/recipes/index.css`
- `packages/recipes/generated/resolvers.ts`

## Scope Note
Button ve card recipe selector'ları artık component dosyalarında hardcode tutulmaz;
contract'tan recipe layer'a üretilir.
