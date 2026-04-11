# RFC: Code (v0.2 Foundation)

## Durum
- Status: Draft (documentation RFC)
- Scope: v0.2 mevcut foundation surface
- Non-goal: syntax highlight engine

## Amaç
Bu RFC, inline code gösterimi için `code` canonical surface'ini tanımlar.

## Referanslar
- `contracts/naming.contract.mjs`
- `packages/components/code.css`

## Canonical Class Surface
- Base: `code`

`inline-code`, `code-inline`, `snippet` gibi paralel canonical class yüzeyi tanımlanmamalıdır.

## Token Tüketimi
- Space: `--space-1`
- Radius: `--radius-sm`
- Typography: `--font-size-xs`
- Color semantic: `--color-bg-default`, `--color-fg-default`, `--color-border-subtle`

## Accessibility Beklentisi
- Inline kod örnekleri semantik `code` elementiyle birlikte kullanılmalıdır.

## Önerilen Konum
`docs/rfcs/components/code-rfc.md`
