# RFC: Split Pane (v0.2 Foundation)

## Durum
- Status: Draft (documentation RFC)
- Scope: v0.2 mevcut foundation surface
- Non-goal: draggable resizer runtime, persistent pane size store

## Amaç
Bu RFC, split pane için canonical class surface, responsive davranış, token tüketimi ve erişilebilirlik beklentisini tanımlar.

## Referanslar
- `docs/contracts/naming-convention-spec.md`
- `docs/contracts/token-dictionary-spec.md`
- `contracts/naming.contract.mjs`
- `packages/components/split-pane.css`

## Canonical Class Surface
Split pane için canonical class adları:
- Root: `split-pane`
- Primary pane: `split-pane-primary`
- Secondary pane: `split-pane-secondary`

`split-layout`, `pane-left`, `pane-right`, `resizable-pane` gibi paralel canonical class yüzeyi tanımlanmamalıdır.

## State Representation
- Secondary pane konumu root üstünde `data-split-pane-side="end"` ile temsil edilebilir.
- Ayrı canonical state class (`split-pane-open`, `split-pane-collapsed`) tanımlanmaz.

## Recipe İlişkisi
v0.2'de split-pane class surface recipe tarafından üretilmez.

## Override Davranışı
Katman sırası: `reset -> base -> layouts -> recipes -> components -> utilities`.

## Token Tüketimi
- Space: `--space-3`, `--space-4`
- Radius: `--radius-md`
- Color semantic: `--color-bg-surface`, `--color-fg-default`, `--color-border-subtle`

## Accessibility Beklentisi
1. Pane bölgeleri anlamlı landmark/heading ile ayrıştırılmalıdır.
2. Eğer etkileşimli resize yoksa pure layout bileşeni olarak davranır; etkileşim eklenirse ayrı erişilebilirlik kontratı gerekir.

## Resolver Kullanım Sözleşmesi
v0.2'de split-pane için resolver API tanımlı değildir.

## Open Questions
1. v0.3'te draggable resizer ayrı surface + behavior olarak eklenecek mi?
2. Pane min/max width contract seviyesinde sabitlenmeli mi?

## Önerilen Konum
`docs/rfcs/components/split-pane-rfc.md`
