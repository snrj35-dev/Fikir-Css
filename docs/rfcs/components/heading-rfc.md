# RFC: Heading (v0.2 Foundation)

## Durum
- Status: Draft (documentation RFC)
- Scope: v0.2 mevcut foundation surface
- Non-goal: çok seviyeli heading scale API

## Amaç
Bu RFC, `heading` surface için canonical class ve token tüketimini tanımlar.

## Referanslar
- `contracts/naming.contract.mjs`
- `packages/components/heading.css`

## Canonical Class Surface
- Base: `heading`

`title`, `section-title`, `heading-lg` gibi paralel canonical class yüzeyi tanımlanmamalıdır.

## Token Tüketimi
- Typography: `--font-size-lg`
- Color semantic: `--color-fg-default`

## Accessibility Beklentisi
- Başlık hiyerarşisi doğru heading tag'ları (`h1-h6`) ile korunmalıdır.

## Önerilen Konum
`docs/rfcs/components/heading-rfc.md`
