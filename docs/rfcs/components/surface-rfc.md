# RFC: Surface (v0.2 Foundation)

## Durum
- Status: Draft (documentation RFC)
- Scope: v0.2 mevcut foundation surface
- Non-goal: tam layout sistemi veya stateful container API

## Amaç
Bu RFC, yüzey konteyneri için canonical class surface, varyantlar, override davranışı ve token tüketimini normatif olarak tanımlar.

## Referanslar
- `docs/contracts/naming-convention-spec.md`
- `docs/contracts/token-dictionary-spec.md`
- `contracts/naming.contract.mjs`
- `packages/components/surface.css`

## Canonical Class Surface
Surface için canonical class adları:
- Base: `surface`
- Variant: `surface-raised`, `surface-sunken`

`panel`, `container-surface`, `surface-card`, `surface-elevated` gibi paralel canonical class yüzeyi tanımlanmamalıdır.

## State Representation
Surface için ayrı canonical state class yüzeyi tanımlanmaz.

## Recipe İlişkisi
v0.2'de surface class surface recipe tarafından üretilmez.

## Override Davranışı
Katman sırası: `reset -> base -> layouts -> recipes -> components -> utilities`.

Kurallar:
1. `surface` base class tek başına kullanılabilir.
2. Varyant class'ları base class ile birlikte kullanılmalıdır.
3. Bir node üzerinde aynı axis'ten birden fazla varyant birlikte kullanılmamalıdır.

## Token Tüketimi
- Space: `--space-4`
- Radius: `--radius-md`
- Shadow: `--shadow-sm`
- Color semantic: `--color-bg-surface`, `--color-bg-default`, `--color-fg-default`, `--color-border-subtle`

## Accessibility Beklentisi
1. Surface görsel bir container'dır; semantik rol markup katmanında verilmelidir.
2. Surface kullanımı tek başına etkileşimli davranış üretmez.

## Resolver Kullanım Sözleşmesi
v0.2'de surface için resolver API tanımlı değildir.

## Open Questions
1. v0.3'te density axis (`surface-compact`) gerekli mi?

## Önerilen Konum
`docs/rfcs/components/surface-rfc.md`
