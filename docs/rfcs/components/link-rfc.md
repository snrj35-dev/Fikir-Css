# RFC: Link (v0.2 Foundation)

## Durum
- Status: Draft (documentation RFC)
- Scope: v0.2 mevcut foundation surface
- Non-goal: navigation router entegrasyonu, active-route state sistemi

## Amaç
Bu RFC, link surface için canonical class adları, override davranışı, token tüketimi ve erişilebilirlik beklentisini tanımlar.

## Referanslar
- `docs/contracts/naming-convention-spec.md`
- `docs/contracts/token-dictionary-spec.md`
- `contracts/naming.contract.mjs`
- `packages/components/link.css`

## Canonical Class Surface
Link için canonical class adları:
- Base: `link`
- Tone: `link-muted`, `link-danger`

`text-link`, `anchor-link`, `primary-link`, `inline-link` gibi paralel canonical class yüzeyi tanımlanmamalıdır.

## State Representation
- Disabled benzeri davranış için `aria-disabled="true"` semantik attribute'u kullanılabilir.
- Ayrı canonical state class (`link-disabled`, `link-active`) tanımlanmaz.

## Recipe İlişkisi
v0.2'de link class surface recipe tarafından üretilmez.

## Override Davranışı
Katman sırası: `reset -> base -> layouts -> recipes -> components -> utilities`.

Kurallar:
1. Link surface `components` layer'dan gelir.
2. Utility override mümkün olsa da token-temelli surface tercih edilmelidir.
3. Bir node üzerinde birden fazla tone class aynı anda kullanılmamalıdır.

## Token Tüketimi
- Radius: `--radius-sm` (focus-visible sınırı)
- Color semantic/core: `--color-accent`, `--color-primary-600`, `--color-fg-muted`, `--color-danger`

## Accessibility Beklentisi
1. Gerçek navigasyon için native `<a href="...">` kullanılmalıdır.
2. `aria-disabled="true"` kullanılan link'lerde tıklanabilir davranış kapatılmalıdır.
3. Focus-visible görünürlüğü korunmalıdır.

## Resolver Kullanım Sözleşmesi
v0.2'de link için resolver API tanımlı değildir.

## Open Questions
1. `link-subtle` gibi ek tone class gerekli mi?
2. External link ikon yüzeyi ayrı canonical class gerektirir mi?

## Önerilen Konum
`docs/rfcs/components/link-rfc.md`
