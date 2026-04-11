# RFC: Stepper (v0.2 Foundation)

## Durum
- Status: Draft (documentation RFC)
- Scope: v0.2 mevcut foundation surface
- Non-goal: form wizard state manager veya otomatik adım geçiş motoru eklemek

## Amaç
Bu RFC, stepper için canonical class surface, override davranışı, token tüketimi, erişilebilirlik beklentisi ve recipe ilişkisini normatif olarak tanımlar.

## Referanslar
- `docs/contracts/naming-convention-spec.md`
- `docs/contracts/token-dictionary-spec.md`
- `contracts/naming.contract.mjs`
- `packages/components/stepper.css`

## Canonical Class Surface
Stepper için canonical class adları:
- Root: `stepper`
- Item: `stepper-item`
- Marker: `stepper-marker`
- Label: `stepper-label`

`steps`, `step-item`, `step-active` gibi paralel canonical class yüzeyi tanımlanmamalıdır.

## State Representation
- Adım durumu item üzerinde `data-state="upcoming|active|complete"` ile temsil edilmelidir.
- Ayrı `stepper-active` canonical class yüzeyi tanımlanmaz.

## Recipe İlişkisi
v0.2'de stepper class surface recipe tarafından üretilmez.

## Override Davranışı
Katman sırası: `reset -> base -> layouts -> recipes -> components -> utilities`.

Kurallar:
1. Stepper surface `components` layer'dan gelir.
2. Utility class'ları root/item/marker düzeyinde override amaçlı kullanılabilir.
3. `force-*` utility yalnızca escape-hatch olarak kullanılabilir.

## Token Tüketimi
Stepper aşağıdaki tokenları tüketir:
- Space: `--space-2`, `--space-3`
- Radius: `--radius-md`
- Typography: `--font-size-xs`
- Color semantic: `--color-border-subtle`, `--color-bg-default`, `--color-bg-surface`, `--color-fg-default`, `--color-primary-500`

## Accessibility Beklentisi
1. Stepper, adım durumunu yalnızca renkle değil metinle de aktarmalıdır.
2. Adım etiketleri anlaşılır metin taşımalıdır.
3. Aktif adım bilgisi semantik olarak görünür olmalıdır (örn. label metni veya yardımcı text).

## Resolver Kullanım Sözleşmesi
v0.2'de stepper için resolver API tanımlı değildir.

## Open Questions
1. Gelecekte line/connector görselleştirmesi canonical class surface'e dahil edilmeli mi?
2. Stepper için vertical/horizontal varyantları ayrı RFC gerektiriyor mu?

## Önerilen Konum
`docs/rfcs/components/stepper-rfc.md`
