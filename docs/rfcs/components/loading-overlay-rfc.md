# RFC: Loading Overlay (v0.2 Foundation)

## Durum
- Status: Draft (documentation RFC)
- Scope: v0.2 mevcut foundation surface
- Non-goal: request orchestration ve async state manager

## Amaç
Bu RFC, loading overlay için canonical class surface, state modeli, token tüketimi ve erişilebilirlik beklentilerini tanımlar.

## Referanslar
- `docs/contracts/naming-convention-spec.md`
- `docs/contracts/token-dictionary-spec.md`
- `contracts/naming.contract.mjs`
- `packages/components/loading-overlay.css`

## Canonical Class Surface
Loading overlay için canonical class adları:
- Root: `loading-overlay`
- Backdrop: `loading-overlay-backdrop`
- Content: `loading-overlay-content`

`loading-mask`, `overlay-loader`, `busy-overlay`, `loading-panel` gibi paralel canonical class yüzeyi tanımlanmamalıdır.

## State Representation
- Yüklenme durumu root üstünde `data-loading="true|false"` ile temsil edilir.
- Ayrı canonical state class (`loading-overlay-open`, `loading-overlay-active`) tanımlanmaz.

## Recipe İlişkisi
v0.2'de loading-overlay class surface recipe tarafından üretilmez.

## Override Davranışı
Katman sırası: `reset -> base -> layouts -> recipes -> components -> utilities`.

## Token Tüketimi
- Space: `--space-2`
- Radius: kalıtım (`inherit`)
- Typography: `--font-size-sm`
- Color semantic: `--color-fg-default`

## Accessibility Beklentisi
1. Root üzerinde yüklenme halinde `aria-busy="true"` kullanımı önerilir.
2. Loading metni yalnızca spinner ile bırakılmamalı, anlamlı metin içermelidir.
3. Overlay aktifken ana içeriğin etkileşim davranışı tüketici seviyesinde yönetilmelidir.

## Resolver Kullanım Sözleşmesi
v0.2'de loading-overlay için resolver API tanımlı değildir.

## Open Questions
1. v0.3 için full-screen loading overlay ayrı canonical surface gerektirir mi?

## Önerilen Konum
`docs/rfcs/components/loading-overlay-rfc.md`
