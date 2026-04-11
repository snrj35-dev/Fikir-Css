# RFC: Accordion (v0.2 Foundation)

## Durum
- Status: Draft (documentation RFC)
- Scope: v0.2 mevcut foundation surface
- Non-goal: tek-açık/çok-açık mod yöneticisi veya nested accordion manager eklemek

## Amaç
Bu RFC, accordion için canonical class surface, override davranışı, token tüketimi, erişilebilirlik beklentisi ve recipe ilişkisini normatif olarak tanımlar.

## Referanslar
- `docs/contracts/naming-convention-spec.md`
- `docs/contracts/token-dictionary-spec.md`
- `contracts/naming.contract.mjs`
- `packages/components/accordion.css`

## Canonical Class Surface
Accordion için canonical class adları:
- Root: `accordion`
- Item: `accordion-item`
- Trigger: `accordion-trigger`
- Panel: `accordion-panel`

`accordion-open`, `accordion-header`, `accordion-body`, `faq-accordion` gibi paralel canonical class yüzeyi tanımlanmamalıdır.

## State Representation
- Item açık/kapalı durumu `data-open="true|false"` ile temsil edilmelidir.
- Ayrı `accordion-active` canonical class yüzeyi tanımlanmaz.

## Recipe İlişkisi
v0.2'de accordion class surface recipe tarafından üretilmez.

## Override Davranışı
Katman sırası: `reset -> base -> layouts -> recipes -> components -> utilities`.

Kurallar:
1. Accordion surface `components` layer'dan gelir.
2. Utility class'ları root/item/panel seviyesinde override amaçlı kullanılabilir.
3. `force-*` utility yalnızca escape-hatch olarak kullanılabilir.

## Token Tüketimi
Accordion aşağıdaki tokenları tüketir:
- Space: `--space-2`, `--space-3`
- Radius: `--radius-md`
- Color semantic: `--color-border-subtle`, `--color-bg-surface`, `--color-fg-default`

## Accessibility Beklentisi
1. Trigger öğesi klavye ile erişilebilir olmalıdır.
2. Trigger ile panel ilişkisi semantic attribute'larla güçlendirilmelidir (`aria-expanded`, `aria-controls` önerilir).
3. Accordion içeriği sadece görsel durumla ifade edilmemelidir.

## Resolver Kullanım Sözleşmesi
v0.2'de accordion için resolver API tanımlı değildir.

## Open Questions
1. Tek açık item zorunluluğu framework seviyesi davranış mı olmalı?
2. Gelecek sürümlerde transition davranışı canonical surface içinde tanımlanmalı mı?

## Önerilen Konum
`docs/rfcs/components/accordion-rfc.md`
