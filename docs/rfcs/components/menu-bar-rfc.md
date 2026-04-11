# RFC: Menu Bar (v0.2 Foundation)

## Durum
- Status: Draft (documentation RFC)
- Scope: v0.2 mevcut foundation surface
- Non-goal: tam keyboard roving focus engine, nested submenu runtime

## Amaç
Bu RFC, menu bar için canonical class surface, state temsili, token tüketimi ve erişilebilirlik beklentisini normatif olarak tanımlar.

## Referanslar
- `docs/contracts/naming-convention-spec.md`
- `docs/contracts/token-dictionary-spec.md`
- `contracts/naming.contract.mjs`
- `packages/components/menu-bar.css`

## Canonical Class Surface
Menu bar için canonical class adları:
- Root: `menu-bar`
- List: `menu-bar-list`
- Item: `menu-bar-item`
- Trigger: `menu-bar-trigger`
- Content: `menu-bar-content`
- Link: `menu-bar-link`

`menubar`, `top-menu`, `menu-item`, `menu-panel` gibi paralel canonical class yüzeyi tanımlanmamalıdır.

## State Representation
- Açık item state'i `menu-bar-item` üstünde `data-open="true|false"` ile temsil edilir.
- Ayrı canonical state class (`menu-bar-open`, `menu-bar-active`) tanımlanmaz.

## Recipe İlişkisi
v0.2'de menu-bar class surface recipe tarafından üretilmez.

## Override Davranışı
Katman sırası: `reset -> base -> layouts -> recipes -> components -> utilities`.

## Token Tüketimi
- Space: `--space-1`, `--space-2`, `--space-3`
- Radius: `--radius-sm`, `--radius-md`
- Typography: `--font-size-sm`
- Shadow: `--shadow-sm`
- Color semantic: `--color-bg-surface`, `--color-bg-default`, `--color-fg-default`, `--color-border-subtle`

## Accessibility Beklentisi
1. Menu bar root semantik olarak `nav` veya uygun `role="menubar"` konteynerinde kullanılmalıdır.
2. Trigger öğeleri button/link olarak klavye erişimine açık olmalıdır.
3. Menü ilişkileri `aria-haspopup`, `aria-expanded`, `aria-controls` ile açık ifade edilmelidir.

## Resolver Kullanım Sözleşmesi
v0.2'de menu-bar için resolver API tanımlı değildir.

## Open Questions
1. Alt menü (submenu) yüzeyi ayrı RFC ile mi ele alınmalı?
2. Roving tabindex davranışı behavior katmanına taşınmalı mı?

## Önerilen Konum
`docs/rfcs/components/menu-bar-rfc.md`
