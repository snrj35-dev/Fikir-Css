# RFC: Divider (v0.2 Foundation)

## Durum
- Status: Draft (documentation RFC)
- Scope: v0.2 mevcut foundation surface
- Non-goal: labelled divider veya decorative pattern varyantları

## Amaç
Bu RFC, divider surface için canonical class, orientation davranışı, token tüketimi ve erişilebilirlik beklentisini tanımlar.

## Referanslar
- `docs/contracts/naming-convention-spec.md`
- `docs/contracts/token-dictionary-spec.md`
- `contracts/naming.contract.mjs`
- `packages/components/divider.css`

## Canonical Class Surface
Divider için canonical class adı:
- Root: `divider`

Orientation HTML/data attribute ile temsil edilir:
- `divider` (yatay)
- `divider` + `data-orientation="vertical"` (dikey)

`hr-line`, `separator`, `vertical-divider` gibi paralel canonical class yüzeyi tanımlanmamalıdır.

## State Representation
Divider için ayrı state class yüzeyi tanımlanmaz.

## Recipe İlişkisi
v0.2'de divider class surface recipe tarafından üretilmez.

## Override Davranışı
Katman sırası: `reset -> base -> layouts -> recipes -> components -> utilities`.

## Token Tüketimi
- Color semantic: `--color-border-subtle`

## Accessibility Beklentisi
1. Semantik ayraç için `<hr class="divider" />` önerilir.
2. Dikey ayraçlarda uygun semantik (`role="separator"` ve orientation) tüketici markup'ında değerlendirilmelidir.

## Resolver Kullanım Sözleşmesi
v0.2'de divider için resolver API tanımlı değildir.

## Open Questions
1. Label taşıyan divider için ayrı composite surface gerekli mi?

## Önerilen Konum
`docs/rfcs/components/divider-rfc.md`
