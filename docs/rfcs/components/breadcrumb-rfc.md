# RFC: Breadcrumb (v0.2 Foundation)

## Durum
- Status: Draft (documentation RFC)
- Scope: v0.2 mevcut foundation surface
- Non-goal: otomatik route çözümleyici veya dinamik truncation algoritması eklemek

## Amaç
Bu RFC, breadcrumb için canonical class surface, override davranışı, token tüketimi, erişilebilirlik beklentisi ve recipe ilişkisini normatif olarak tanımlar.

## Referanslar
- `docs/contracts/naming-convention-spec.md`
- `docs/contracts/token-dictionary-spec.md`
- `contracts/naming.contract.mjs`
- `packages/components/breadcrumb.css`

## Canonical Class Surface
Breadcrumb için canonical class adları:
- Wrapper: `breadcrumb`
- List: `breadcrumb-list`
- Item: `breadcrumb-item`
- Link: `breadcrumb-link`
- Current item: `breadcrumb-current`

`breadcrumbs`, `crumb`, `breadcrumb-active` gibi paralel canonical class yüzeyi tanımlanmamalıdır.

## State Representation
- Mevcut sayfa `breadcrumb-current` veya semantic `aria-current="page"` ile temsil edilmelidir.
- Ayrı `breadcrumb-disabled` canonical class yüzeyi tanımlanmaz.

## Recipe İlişkisi
v0.2'de breadcrumb class surface recipe tarafından üretilmez.

## Override Davranışı
Katman sırası: `reset -> base -> layouts -> recipes -> components -> utilities`.

Kurallar:
1. Breadcrumb kompozisyonu `components` layer'dan gelir.
2. Utility class'ları wrapper/list/item seviyesinde override amaçlı kullanılabilir.
3. `force-*` utility yalnızca escape-hatch olarak kullanılabilir.

## Token Tüketimi
Breadcrumb aşağıdaki tokenları tüketir:
- Space: `--space-2`
- Radius: `--radius-md`
- Color semantic: `--color-fg-default`, `--color-fg-muted`

## Accessibility Beklentisi
1. Breadcrumb `nav` içinde kullanılmalı ve erişilebilir label taşımalıdır (`aria-label="Breadcrumb"`).
2. Liste semantiği (`ol`/`ul`) korunmalıdır.
3. Mevcut sayfa `aria-current="page"` ile belirtilmelidir.

## Resolver Kullanım Sözleşmesi
v0.2'de breadcrumb için resolver API tanımlı değildir.

## Open Questions
1. Divider/separator gösterimi canonical class mı yoksa consumer markup ile mi yönetilmeli?
2. Çok uzun breadcrumb zinciri için truncation davranışı component sorumluluğuna alınmalı mı?

## Önerilen Konum
`docs/rfcs/components/breadcrumb-rfc.md`
