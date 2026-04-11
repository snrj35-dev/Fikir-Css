# RFC: Callout (v0.2 Foundation)

## Durum
- Status: Draft (documentation RFC)
- Scope: v0.2 mevcut foundation surface
- Non-goal: severity/tone varyant sistemi

## Amaç
Bu RFC, bilgilendirici callout yüzeyi için canonical class surface'i tanımlar.

## Referanslar
- `contracts/naming.contract.mjs`
- `packages/components/callout.css`

## Canonical Class Surface
- Root: `callout`
- Title: `callout-title`
- Body: `callout-body`

`notice`, `info-box`, `alert-box`, `message-panel` gibi paralel canonical class yüzeyi tanımlanmamalıdır.

## Token Tüketimi
- Space: `--space-2`, `--space-3`
- Radius: `--radius-md`
- Typography: `--font-size-md`, `--font-size-sm`
- Color semantic: `--color-bg-surface`, `--color-fg-default`, `--color-fg-muted`, `--color-border-subtle`, `--color-accent`

## Accessibility Beklentisi
- Callout kritik durum bildiriyorsa uygun ARIA/role tüketici markup'ında verilmelidir.

## Önerilen Konum
`docs/rfcs/components/callout-rfc.md`
