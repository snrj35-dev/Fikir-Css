# RFC: Code Block (v0.2 Foundation)

## Durum
- Status: Draft (documentation RFC)
- Scope: v0.2 mevcut foundation surface
- Non-goal: line-number veya copy-button behavior runtime

## Amaç
Bu RFC, çok satırlı kod gösterimi için `code-block` canonical surface'ini tanımlar.

## Referanslar
- `contracts/naming.contract.mjs`
- `packages/components/code-block.css`

## Canonical Class Surface
- Base: `code-block`

`pre-code`, `code-panel`, `snippet-block` gibi paralel canonical class yüzeyi tanımlanmamalıdır.

## Token Tüketimi
- Space: `--space-3`
- Radius: `--radius-md`
- Typography: `--font-size-sm`
- Color semantic: `--color-bg-default`, `--color-fg-default`, `--color-border-subtle`

## Accessibility Beklentisi
- Kod blokları `pre > code` semantiğiyle birlikte kullanılmalıdır.

## Önerilen Konum
`docs/rfcs/components/code-block-rfc.md`
