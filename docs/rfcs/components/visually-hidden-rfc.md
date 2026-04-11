# RFC: Visually Hidden (v0.2 Foundation)

## Durum
- Status: Draft (documentation RFC)
- Scope: v0.2 mevcut foundation surface
- Non-goal: focusable-only helper varyantları

## Amaç
Bu RFC, yalnızca görsel olarak gizlenen içerikler için canonical class surface ve erişilebilirlik sözleşmesini tanımlar.

## Referanslar
- `docs/contracts/naming-convention-spec.md`
- `docs/contracts/token-dictionary-spec.md`
- `contracts/naming.contract.mjs`
- `packages/components/visually-hidden.css`

## Canonical Class Surface
Visually hidden için canonical class adı:
- `visually-hidden`

`sr-only`, `screen-reader-only`, `a11y-hidden` gibi paralel canonical class yüzeyi tanımlanmamalıdır.

## State Representation
Visually hidden surface için state class tanımlanmaz.

## Recipe İlişkisi
v0.2'de visually-hidden class surface recipe tarafından üretilmez.

## Override Davranışı
Katman sırası: `reset -> base -> layouts -> recipes -> components -> utilities`.

Normatif kural:
- `visually-hidden` class'ı içerik akışını bozmadan erişilebilir metin taşımak için kullanılır.

## Token Tüketimi
- Token tüketimi yoktur; teknik erişilebilirlik pattern'idir.

## Accessibility Beklentisi
1. Bu class yalnızca içerik görsel olarak gizlenirken erişilebilir kalması gerektiğinde kullanılmalıdır.
2. İnteraktif öğe metni tamamen gizleniyorsa erişilebilir isim (`aria-label`, hidden text) doğrulanmalıdır.
3. `display:none` ile eşdeğer değildir; screen reader görünürlüğü korunur.

## Resolver Kullanım Sözleşmesi
v0.2'de visually-hidden için resolver API tanımlı değildir.

## Open Questions
1. Focuslandığında görünür olan ayrı helper surface gerekli mi?

## Önerilen Konum
`docs/rfcs/components/visually-hidden-rfc.md`
