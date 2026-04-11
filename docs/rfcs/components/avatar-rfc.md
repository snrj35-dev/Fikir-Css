# RFC: Avatar (v0.2 Foundation)

## Durum
- Status: Draft (documentation RFC)
- Scope: v0.2 mevcut foundation surface
- Non-goal: avatar group, status badge veya presence indicator eklemek

## Amaç
Bu RFC, avatar için canonical class surface, override davranışı, token tüketimi, erişilebilirlik beklentisi ve recipe ilişkisini normatif olarak tanımlar.

## Referanslar
- `docs/contracts/naming-convention-spec.md`
- `docs/contracts/token-dictionary-spec.md`
- `contracts/naming.contract.mjs`
- `packages/components/avatar.css`

## Canonical Class Surface
Avatar için canonical class adları:
- Root: `avatar`
- Content: `avatar-image`, `avatar-fallback`
- Size: `avatar-sm`, `avatar-md`, `avatar-lg`

`profile-avatar`, `user-avatar`, `avatar-placeholder`, `avatar-xs` gibi paralel canonical class yüzeyi tanımlanmamalıdır.

## State Representation
- v0.2'de avatar için ayrı state class yüzeyi tanımlanmaz.
- Image yüklenemediğinde fallback içerik markup düzeyinde temsil edilmelidir.

## Recipe İlişkisi
v0.2'de avatar class surface recipe tarafından üretilmez.

## Override Davranışı
Katman sırası: `reset -> base -> layouts -> recipes -> components -> utilities`.

Kurallar:
1. Avatar surface `components` layer'dan gelir.
2. Utility class'ları avatar root seviyesinde override amaçlı kullanılabilir.
3. Aynı node üzerinde birden fazla size class birlikte kullanılmamalıdır.
4. `force-*` utility yalnızca escape-hatch olarak kullanılabilir.

### Allowed Combinations
- `avatar avatar-sm`
- `avatar avatar-md`
- `avatar avatar-lg`

### Disallowed Combinations
- `avatar avatar-sm avatar-lg`

## Token Tüketimi
Avatar surface aşağıdaki tokenları tüketir:
- Color semantic: `--color-bg-default`, `--color-fg-default`, `--color-border-subtle`
- Typography: `--font-size-xs`, `--font-size-sm`, `--font-size-md`

Normatif kural:
- Avatar görsel kararlarında semantic tokenlar tercih edilmelidir.

## Accessibility Beklentisi
1. Bilgilendirici avatar görsellerinde `alt` metni anlamlı olmalıdır.
2. Dekoratif avatar görsellerinde boş `alt` kullanılmalıdır.
3. Fallback metin tek başına anlam taşımıyorsa yardımcı metinle desteklenmelidir.
4. Avatar tek başına etkileşimli element gibi sunulmamalıdır; etkileşim gerekiyorsa uygun semantik element kullanılmalıdır.

## Resolver Kullanım Sözleşmesi
v0.2'de avatar için resolver API tanımlı değildir.

## Open Questions
1. v0.3'te `avatar-group` yüzeyi ayrı RFC ile ele alınmalı mı?
2. Presence/online indicator için ayrı surface gerekli mi?

## Önerilen Konum
`docs/rfcs/components/avatar-rfc.md`
