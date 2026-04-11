# RFC: Section Block (v0.2 Foundation)

## Durum
- Status: Draft (documentation RFC)
- Scope: v0.2 mevcut foundation surface
- Non-goal: otomatik collapse behavior veya section orchestration manager eklemek

## Amaç
Bu RFC, section block için canonical class surface, override davranışı, token tüketimi, erişilebilirlik beklentisi ve recipe ilişkisini normatif olarak tanımlar.

## Referanslar
- `docs/contracts/naming-convention-spec.md`
- `docs/contracts/token-dictionary-spec.md`
- `contracts/naming.contract.mjs`
- `packages/components/section-block.css`

## Canonical Class Surface
Section block için canonical class adları:
- Root: `section-block`
- Header: `section-header`
- Body: `section-body`

Not: Demo/helper `.section` class'ı ile çakışmamak için canonical surface `section-block` namespace'i kullanır.

`section-container`, `section-panel`, `app-section` gibi paralel canonical class yüzeyi tanımlanmamalıdır.

## State Representation
- v0.2'de section block için ayrı state class yüzeyi tanımlanmaz.

## Recipe İlişkisi
v0.2'de section block class surface recipe tarafından üretilmez.

## Override Davranışı
Katman sırası: `reset -> base -> layouts -> recipes -> components -> utilities`.

Kurallar:
1. Section block surface `components` layer'dan gelir.
2. Utility class'ları root/header/body düzeyinde override amaçlı kullanılabilir.
3. `force-*` utility yalnızca escape-hatch olarak kullanılabilir.

## Token Tüketimi
Section block aşağıdaki tokenları tüketir:
- Space: `--space-2`, `--space-3`
- Radius: `--radius-md`
- Color semantic: `--color-border-subtle`, `--color-bg-surface`, `--color-fg-default`

## Accessibility Beklentisi
1. Section başlığı semantik heading ile verilmelidir.
2. Bölüm içerikleri bilgi hiyerarşisini koruyacak şekilde sıralanmalıdır.
3. İçerik grupları yalnızca görsel ayırıcıya bağlı olmamalıdır.

## Resolver Kullanım Sözleşmesi
v0.2'de section block için resolver API tanımlı değildir.

## Open Questions
1. Section divider/variant surface'i ayrı RFC gerektiriyor mu?
2. Gelecek sürümlerde collapsible section pattern'i bu surface'te mi yoksa ayrı component'te mi tanımlanmalı?

## Önerilen Konum
`docs/rfcs/components/section-rfc.md`
