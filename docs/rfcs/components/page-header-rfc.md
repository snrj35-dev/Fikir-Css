# RFC: Page Header (v0.2 Foundation)

## Durum
- Status: Draft (documentation RFC)
- Scope: v0.2 mevcut foundation surface
- Non-goal: otomatik breadcrumb/title entegrasyonu veya toolbar behavior manager eklemek

## Amaç
Bu RFC, page header için canonical class surface, override davranışı, token tüketimi, erişilebilirlik beklentisi ve recipe ilişkisini normatif olarak tanımlar.

## Referanslar
- `docs/contracts/naming-convention-spec.md`
- `docs/contracts/token-dictionary-spec.md`
- `contracts/naming.contract.mjs`
- `packages/components/page-header.css`

## Canonical Class Surface
Page header için canonical class adları:
- Root: `page-header`
- Content: `page-header-content`
- Actions: `page-header-actions`

`header-bar`, `page-title-bar`, `page-toolbar` gibi paralel canonical class yüzeyi tanımlanmamalıdır.

## State Representation
- v0.2'de page header için ayrı state class yüzeyi tanımlanmaz.

## Recipe İlişkisi
v0.2'de page header class surface recipe tarafından üretilmez.

## Override Davranışı
Katman sırası: `reset -> base -> layouts -> recipes -> components -> utilities`.

Kurallar:
1. Page header surface `components` layer'dan gelir.
2. Utility class'ları root/content/actions seviyesinde override amaçlı kullanılabilir.
3. `force-*` utility yalnızca escape-hatch olarak kullanılabilir.

## Token Tüketimi
Page header aşağıdaki tokenları tüketir:
- Space: `--space-2`, `--space-3`
- Radius: `--radius-md`
- Color semantic: `--color-border-subtle`, `--color-bg-surface`, `--color-fg-default`

## Accessibility Beklentisi
1. Sayfa başlığı semantik heading (`h1`/`h2`) ile verilmelidir.
2. Action kontrolleri klavye ile erişilebilir olmalıdır.
3. Header içinde sadece görsel ikonlarla anlam taşınmamalıdır.

## Resolver Kullanım Sözleşmesi
v0.2'de page header için resolver API tanımlı değildir.

## Open Questions
1. Gelecek sürümlerde dense/comfortable spacing varyantı gerekli mi?
2. Meta/breadcrumb alanı için ayrı canonical slot sınıfları tanımlanmalı mı?

## Önerilen Konum
`docs/rfcs/components/page-header-rfc.md`
