# RFC: Icon Button (v0.2 Foundation)

## Durum
- Status: Draft (documentation RFC)
- Scope: v0.2 mevcut foundation surface
- Non-goal: toggle/pressed state modeli, ikon kütüphanesi entegrasyonu, loading state

## Amaç
Bu RFC, icon button için canonical class surface, override davranışı, token tüketimi ve erişilebilirlik beklentisini normatif olarak tanımlar.

## Referanslar
- `docs/contracts/naming-convention-spec.md`
- `docs/contracts/token-dictionary-spec.md`
- `contracts/naming.contract.mjs`
- `packages/components/icon-button.css`

## Canonical Class Surface
Icon button için canonical class adları:
- Root: `icon-button`
- Size: `icon-button-sm`, `icon-button-md`, `icon-button-lg`

`icon-btn`, `icon-only-button`, `toolbar-icon`, `round-icon-button` gibi paralel canonical class yüzeyi tanımlanmamalıdır.

## State Representation
- Disabled state HTML `disabled` attribute'u ile temsil edilmelidir.
- Ayrı canonical state class (`icon-button-disabled`, `icon-button-loading`) tanımlanmaz.

## Recipe İlişkisi
v0.2'de icon button class surface recipe tarafından üretilmez.

## Override Davranışı
Katman sırası: `reset -> base -> layouts -> recipes -> components -> utilities`.

Kurallar:
1. Icon button surface `components` layer'dan gelir.
2. Utility class'ları yalnızca istisnai override amaçlı kullanılmalıdır.
3. Aynı node üzerinde birden fazla size class birlikte kullanılmamalıdır.

## Token Tüketimi
- Space: dolaylı olarak inline/block size kararları
- Radius: `--radius-md`
- Typography: `--font-size-sm`, `--font-size-md`, `--font-size-lg`
- Color semantic/core: `--color-bg-surface`, `--color-fg-default`, `--color-border-subtle`, `--color-accent`

## Accessibility Beklentisi
1. Icon-only button için erişilebilir isim zorunludur (`aria-label` veya görünür metin eşdeğeri).
2. Etkileşimli kullanımda native `<button type="button">` önerilir.
3. Focus-visible görünürlüğü korunmalıdır.

## Resolver Kullanım Sözleşmesi
v0.2'de icon-button için resolver API tanımlı değildir.

## Open Questions
1. v0.3'te icon button için `tone` axis gerekli mi?
2. Pressed/toggle davranışı ayrı RFC ile ele alınmalı mı?

## Önerilen Konum
`docs/rfcs/components/icon-button-rfc.md`
