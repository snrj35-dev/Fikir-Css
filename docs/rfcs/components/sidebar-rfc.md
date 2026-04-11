# RFC: Sidebar Navigation (v0.2 Foundation)

## Durum
- Status: Draft (documentation RFC)
- Scope: v0.2 mevcut foundation surface
- Non-goal: collapse/expand tree navigation veya responsive drawer dönüşümü eklemek

## Amaç
Bu RFC, sidebar navigation için canonical class surface, override davranışı, token tüketimi, erişilebilirlik beklentisi ve recipe ilişkisini normatif olarak tanımlar.

## Referanslar
- `docs/contracts/naming-convention-spec.md`
- `docs/contracts/token-dictionary-spec.md`
- `contracts/naming.contract.mjs`
- `packages/components/sidebar-nav.css`

## Canonical Class Surface
Sidebar navigation için canonical class adları:
- Root: `sidebar-nav`
- Section: `sidebar-nav-section`
- Item: `sidebar-nav-item`

Not: Layout primitive olarak mevcut olan `.sidebar` ile çakışmamak için component surface `sidebar-nav` namespace'i kullanır.

`sidebar-menu`, `side-nav`, `sidebar-item-active` gibi paralel canonical class yüzeyi tanımlanmamalıdır.

## State Representation
- Aktif öğe `aria-current="page"` ile temsil edilmelidir.
- Ayrı `sidebar-nav-active` canonical class yüzeyi tanımlanmaz.

## Recipe İlişkisi
v0.2'de sidebar navigation class surface recipe tarafından üretilmez.

## Override Davranışı
Katman sırası: `reset -> base -> layouts -> recipes -> components -> utilities`.

Kurallar:
1. `sidebar-nav` surface'i `components` layer'dan gelir.
2. Utility class'ları root/section/item düzeyinde override amaçlı kullanılabilir.
3. `force-*` utility yalnızca escape-hatch olarak kullanılabilir.

## Token Tüketimi
Sidebar navigation aşağıdaki tokenları tüketir:
- Space: `--space-2`, `--space-3`
- Radius: `--radius-md`
- Color semantic: `--color-border-subtle`, `--color-bg-surface`, `--color-fg-default`, `--color-primary-500`

## Accessibility Beklentisi
1. Sidebar navigation semantik `nav` içinde kullanılmalıdır.
2. Navigation item'lar link/button olarak klavye ile erişilebilir olmalıdır.
3. Aktif sayfa öğesi `aria-current="page"` taşımalıdır.

## Resolver Kullanım Sözleşmesi
v0.2'de sidebar navigation için resolver API tanımlı değildir.

## Open Questions
1. Çok seviyeli navigation ağacı ayrı bir RFC ile mi ele alınmalı?
2. Sidebar navigation ile app-shell drawer geçişi hangi contract sınırında yönetilmeli?

## Önerilen Konum
`docs/rfcs/components/sidebar-rfc.md`
