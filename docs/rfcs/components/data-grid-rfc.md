# RFC: Data Grid (v0.2+ Minimal Surface)

## Durum
- Status: Draft (implementation-enabled)
- Scope: v0.2+ minimal data-grid surface
- Non-goal: virtualization, kolon resize/drag, hücre içi edit engine

## Amaç
Bu RFC, `data-grid` için minimal canonical class surface, token tüketimi, state temsili ve erişilebilirlik beklentilerini normatif olarak tanımlar.

## Referanslar
- `docs/architecture/data-grid-research-note.md`
- `docs/contracts/naming-convention-spec.md`
- `docs/contracts/token-dictionary-spec.md`
- `contracts/naming.contract.mjs`
- `packages/components/data-grid.css`

## Canonical Class Surface
Data grid için canonical class adları:
- Root: `data-grid`
- Head: `data-grid-head`
- Body: `data-grid-body`
- Row: `data-grid-row`
- Cell: `data-grid-cell`

`data-table`, `table-grid`, `grid-row`, `grid-cell` gibi paralel canonical class yüzeyi tanımlanmamalıdır.

## State Representation
- Seçili satır `data-row-selected="true"` ile temsil edilir.
- Ayrı canonical state class (`data-grid-selected`, `data-grid-active`) tanımlanmaz.

## Recipe İlişkisi
v0.2+ iterasyonunda data-grid class surface recipe tarafından üretilmez.

## Override Davranışı
Katman sırası: `reset -> base -> layouts -> recipes -> components -> utilities`.

Normatif kural:
- Data grid layout kararları öncelikle `components` layer içinde korunmalıdır; utility override yalnızca istisnai olmalıdır.

## Token Tüketimi
- Space: `--space-2`, `--space-3`
- Radius: `--radius-md`
- Typography: `--font-size-sm`
- Color semantic/core: `--color-bg-surface`, `--color-bg-default`, `--color-fg-default`, `--color-border-subtle`, `--color-gray-100`

## Accessibility Beklentisi
1. Grid yüzeyi `role="grid"` ile işaretlenmelidir.
2. Head/body/row/cell semantiği uygun `role` attribute'ları ile belirtilmelidir (`rowgroup`, `row`, `columnheader`, `gridcell`).
3. Seçili satır state'i erişilebilir metinle desteklenmelidir.

## İlk Iterasyon Sınırı
- Salt okunur grid görünümü
- Basit satır selection işareti
- Behavior-ağır keyboard modeli bu iterasyonda kapsam dışıdır

## Open Questions
1. İlk davranış genişletmesi sıralama mı, kolon görünürlüğü mü olmalı?
2. `table` ve `data-grid` geçiş örnekleri için ayrı migration notu gerekir mi?

## Önerilen Konum
`docs/rfcs/components/data-grid-rfc.md`
