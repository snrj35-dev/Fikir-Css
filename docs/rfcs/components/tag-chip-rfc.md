# RFC: Tag / Chip (v0.2 Foundation)

## Durum
- Status: Draft (documentation RFC)
- Scope: v0.2 mevcut foundation surface
- Non-goal: autocomplete token field runtime, drag-sort behavior

## Amaç
Bu RFC, tag/chip yüzeyi için canonical class surface, state yaklaşımı, token tüketimi ve erişilebilirlik beklentilerini tanımlar.

## Referanslar
- `docs/contracts/naming-convention-spec.md`
- `docs/contracts/token-dictionary-spec.md`
- `contracts/naming.contract.mjs`
- `packages/components/tag-chip.css`

## Canonical Class Surface
Tag/chip için canonical class adları:
- Root: `tag-chip`
- Label: `tag-chip-label`
- Remove action: `tag-chip-remove`

`tag`, `chip`, `filter-chip`, `pill` gibi paralel canonical class yüzeyi tanımlanmamalıdır.

## State Representation
- Removable davranış markup içinde `tag-chip-remove` varlığı ile temsil edilir.
- Ayrı canonical state class (`tag-chip-active`, `tag-chip-selected`) tanımlanmaz.

## Recipe İlişkisi
v0.2'de tag-chip class surface recipe tarafından üretilmez.

## Override Davranışı
Katman sırası: `reset -> base -> layouts -> recipes -> components -> utilities`.

## Token Tüketimi
- Space: `--space-1`, `--space-2`
- Typography: `--font-size-xs`
- Color semantic: `--color-bg-default`, `--color-fg-default`, `--color-border-subtle`

## Accessibility Beklentisi
1. Remove aksiyonu varsa `button` olarak semantik temsil edilmelidir.
2. Remove butonları `aria-label` ile amaç belirtmelidir.
3. Chip metni tek başına anlamlı olmalıdır.

## Resolver Kullanım Sözleşmesi
v0.2'de tag-chip için resolver API tanımlı değildir.

## Open Questions
1. `tag-chip` için tone varyantları (success/warning) ayrı canonical class gerekir mi?

## Önerilen Konum
`docs/rfcs/components/tag-chip-rfc.md`
