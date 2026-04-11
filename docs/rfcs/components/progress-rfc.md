# RFC: Progress (v0.2 Foundation)

## Durum
- Status: Draft (documentation RFC)
- Scope: v0.2 mevcut foundation surface
- Non-goal: determinate/indeterminate behavior motoru

## Amaç
Bu RFC, progress gösterimi için canonical class surface, token tüketimi ve erişilebilirlik beklentisini tanımlar.

## Referanslar
- `docs/contracts/naming-convention-spec.md`
- `docs/contracts/token-dictionary-spec.md`
- `contracts/naming.contract.mjs`
- `packages/components/progress.css`

## Canonical Class Surface
Progress için canonical class adları:
- Root: `progress`
- Label: `progress-label`
- Track: `progress-track`
- Indicator: `progress-indicator`

`progress-bar`, `loading-bar`, `bar-track`, `progress-fill` gibi paralel canonical class yüzeyi tanımlanmamalıdır.

## State Representation
- İlerleme değeri markup üzerinden (`aria-valuenow` veya inline style `--progress-value`) temsil edilir.
- Ayrı canonical state class (`progress-active`, `progress-complete`) tanımlanmaz.

## Recipe İlişkisi
v0.2'de progress class surface recipe tarafından üretilmez.

## Override Davranışı
Katman sırası: `reset -> base -> layouts -> recipes -> components -> utilities`.

## Token Tüketimi
- Space: `--space-2`
- Typography: `--font-size-sm`
- Color semantic: `--color-fg-muted`, `--color-border-subtle`, `--color-accent`

## Accessibility Beklentisi
1. Root öğe `role="progressbar"` ve `aria-valuemin/max/now` bilgilerini taşımalıdır.
2. Yardımcı metin gerekiyorsa `progress-label` ile verilmelidir.
3. Reduced motion ortamında animasyon zorunlu olmamalıdır.

## Resolver Kullanım Sözleşmesi
v0.2'de progress için resolver API tanımlı değildir.

## Open Questions
1. v0.3 için indeterminate progress varyantı ayrı class surface gerektirir mi?

## Önerilen Konum
`docs/rfcs/components/progress-rfc.md`
