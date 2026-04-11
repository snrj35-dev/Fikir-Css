# RFC: Markdown Surface (v0.2 Foundation)

## Durum
- Status: Draft (documentation RFC)
- Scope: v0.2 mevcut foundation surface
- Non-goal: markdown parser/runtime veya renderer entegrasyonu

## Amaç
Bu RFC, render edilmiş markdown içeriğinin kapsayıcısı için `markdown-surface` canonical class yüzeyini tanımlar.

## Referanslar
- `contracts/naming.contract.mjs`
- `packages/components/markdown-surface.css`

## Canonical Class Surface
- Root: `markdown-surface`

`markdown-body`, `md-content`, `article-markdown` gibi paralel canonical class yüzeyi tanımlanmamalıdır.

## Token Tüketimi
- Space: `--space-3`, `--space-4`
- Radius: `--radius-md`
- Color semantic: `--color-bg-surface`, `--color-fg-default`, `--color-border-subtle`

## Accessibility Beklentisi
- İçerik semantiği (heading/list/link/code) markdown renderer çıktısında korunmalıdır.

## Önerilen Konum
`docs/rfcs/components/markdown-surface-rfc.md`
