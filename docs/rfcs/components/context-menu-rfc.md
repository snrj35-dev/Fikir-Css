# RFC: Context Menu (v0.2 Foundation)

## Durum
- Status: Draft (documentation RFC)
- Scope: v0.2 mevcut foundation surface
- Non-goal: tam keyboard navigation engine, pointer koordinat hesaplama runtime'ı

## Amaç
Bu RFC, context menu için canonical class surface, state davranışı, token tüketimi ve erişilebilirlik beklentilerini tanımlar.

## Referanslar
- `docs/contracts/naming-convention-spec.md`
- `docs/contracts/token-dictionary-spec.md`
- `contracts/naming.contract.mjs`
- `packages/components/context-menu.css`

## Canonical Class Surface
Context menu için canonical class adları:
- Root: `context-menu`
- Content: `context-menu-content`
- Item: `context-menu-item`

`menu-context`, `right-click-menu`, `context-panel`, `context-item` gibi paralel canonical class yüzeyi tanımlanmamalıdır.

## State Representation
- Açık/kapalı durumu root üstünde `data-open="true|false"` ile temsil edilir.
- Ayrı canonical state class (`context-menu-open`, `context-menu-closed`) tanımlanmaz.

## Recipe İlişkisi
v0.2'de context-menu class surface recipe tarafından üretilmez.

## Override Davranışı
Katman sırası: `reset -> base -> layouts -> recipes -> components -> utilities`.

## Token Tüketimi
- Space: `--space-1`, `--space-2`, `--space-3`
- Radius: `--radius-sm`, `--radius-md`
- Shadow: `--shadow-sm`
- Color semantic: `--color-bg-surface`, `--color-bg-default`, `--color-fg-default`, `--color-border-subtle`

## Accessibility Beklentisi
1. Menü konteyneri uygun durumda `role="menu"` almalıdır.
2. Öğeler `role="menuitem"` ile semantik olarak işaretlenmelidir.
3. Tetikleyici öğe menü ilişkisini `aria-controls` / `aria-expanded` ile belirtmelidir.

## Resolver Kullanım Sözleşmesi
v0.2'de context-menu için resolver API tanımlı değildir.

## Open Questions
1. Keyboard navigation behavior surface ayrı bir pattern spec içinde mi ele alınmalı?

## Önerilen Konum
`docs/rfcs/components/context-menu-rfc.md`
