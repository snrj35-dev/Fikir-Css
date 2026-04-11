# RFC: Kbd (v0.2 Foundation)

## Durum
- Status: Draft (documentation RFC)
- Scope: v0.2 mevcut foundation surface
- Non-goal: çoklu shortcut composer davranışı

## Amaç
Bu RFC, klavye kısayol etiketi için `kbd` canonical surface'ini tanımlar.

## Referanslar
- `contracts/naming.contract.mjs`
- `packages/components/kbd.css`

## Canonical Class Surface
- Base: `kbd`

`keycap`, `shortcut-key`, `hotkey` gibi paralel canonical class yüzeyi tanımlanmamalıdır.

## Token Tüketimi
- Space: `--space-1`
- Radius: `--radius-sm`
- Typography: `--font-size-xs`
- Color semantic: `--color-bg-default`, `--color-fg-default`, `--color-border-subtle`

## Accessibility Beklentisi
- Kısayollar semantik `kbd` elementi ile işaretlenmelidir.

## Önerilen Konum
`docs/rfcs/components/kbd-rfc.md`
