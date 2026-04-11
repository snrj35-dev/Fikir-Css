# RFC: Quote (v0.2 Foundation)

## Durum
- Status: Draft (documentation RFC)
- Scope: v0.2 mevcut foundation surface
- Non-goal: attribution metadata sistemi

## Amaç
Bu RFC, alıntı gösterimi için `quote` canonical surface'ini tanımlar.

## Referanslar
- `contracts/naming.contract.mjs`
- `packages/components/quote.css`

## Canonical Class Surface
- Base: `quote`

`blockquote-text`, `citation-block`, `quote-panel` gibi paralel canonical class yüzeyi tanımlanmamalıdır.

## Token Tüketimi
- Space: `--space-3`
- Typography: `--font-size-sm`
- Color semantic: `--color-fg-muted`, `--color-border-subtle`

## Accessibility Beklentisi
- Alıntı semantiği için `blockquote` elementi tercih edilmelidir.

## Önerilen Konum
`docs/rfcs/components/quote-rfc.md`
