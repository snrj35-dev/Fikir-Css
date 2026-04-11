# RFC: Text (v0.2 Foundation)

## Durum
- Status: Draft (documentation RFC)
- Scope: v0.2 mevcut foundation surface
- Non-goal: prose typography scale sistemi

## Amaç
Bu RFC, `text` için canonical class surface, token tüketimi ve erişilebilirlik beklentisini tanımlar.

## Referanslar
- `contracts/naming.contract.mjs`
- `packages/components/text.css`

## Canonical Class Surface
- Base: `text`

`body-text`, `paragraph-text`, `content-text` gibi paralel canonical class yüzeyi tanımlanmamalıdır.

## Token Tüketimi
- Typography: `--font-size-sm`
- Color semantic: `--color-fg-default`

## Accessibility Beklentisi
- Metin semantiği markup düzeyinde (`p`, `span`, vb.) doğru seçilmelidir.

## Önerilen Konum
`docs/rfcs/components/text-rfc.md`
