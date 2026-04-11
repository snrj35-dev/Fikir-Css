# RFC: Pagination (v0.2 Foundation)

## Durum
- Status: Draft (documentation RFC)
- Scope: v0.2 mevcut foundation surface
- Non-goal: veri kaynağına bağlı otomatik sayfalama state manager eklemek

## Amaç
Bu RFC, pagination için canonical class surface, override davranışı, token tüketimi, erişilebilirlik beklentisi ve recipe ilişkisini normatif olarak tanımlar.

## Referanslar
- `docs/contracts/naming-convention-spec.md`
- `docs/contracts/token-dictionary-spec.md`
- `contracts/naming.contract.mjs`
- `packages/components/pagination.css`

## Canonical Class Surface
Pagination için canonical class adları:
- Root: `pagination`
- Item: `pagination-item`

`pager`, `pagination-link`, `pagination-active`, `page-item` gibi paralel canonical class yüzeyi tanımlanmamalıdır.

## State Representation
- Aktif sayfa öğesi `aria-current="page"` ile temsil edilmelidir.
- Ayrı `pagination-current` canonical class yüzeyi tanımlanmaz.

## Recipe İlişkisi
v0.2'de pagination class surface recipe tarafından üretilmez.

## Override Davranışı
Katman sırası: `reset -> base -> layouts -> recipes -> components -> utilities`.

Kurallar:
1. Pagination surface `components` layer'dan gelir.
2. Utility class'ları root/item seviyesinde override amaçlı kullanılabilir.
3. `force-*` utility yalnızca escape-hatch olarak kullanılabilir.

## Token Tüketimi
Pagination aşağıdaki tokenları tüketir:
- Space: `--space-2`
- Radius: `--radius-md`
- Color semantic: `--color-border-subtle`, `--color-bg-surface`, `--color-fg-default`, `--color-primary-500`

## Accessibility Beklentisi
1. Pagination `nav` içinde kullanılmalı ve erişilebilir label taşımalıdır.
2. Aktif sayfa öğesi `aria-current="page"` ile belirtilmelidir.
3. Önceki/sonraki aksiyonları metin veya erişilebilir isim taşımalıdır (`aria-label`).

## Resolver Kullanım Sözleşmesi
v0.2'de pagination için resolver API tanımlı değildir.

## Open Questions
1. Gelecek sürümlerde kısa/uzun pagination pattern'leri ayrı canonical surface gerektiriyor mu?
2. Ellipsis öğesi (`...`) için canonical sınıf tanımı gerekli mi?

## Önerilen Konum
`docs/rfcs/components/pagination-rfc.md`
