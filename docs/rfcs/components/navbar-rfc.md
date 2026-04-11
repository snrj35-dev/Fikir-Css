# RFC: Navbar (v0.2 Foundation)

## Durum
- Status: Draft (documentation RFC)
- Scope: v0.2 mevcut foundation surface
- Non-goal: responsive collapse/menu-toggle engine veya mega-menu davranışı eklemek

## Amaç
Bu RFC, navbar için canonical class surface, override davranışı, token tüketimi, erişilebilirlik beklentisi ve recipe ilişkisini normatif olarak tanımlar.

## Referanslar
- `docs/contracts/naming-convention-spec.md`
- `docs/contracts/token-dictionary-spec.md`
- `contracts/naming.contract.mjs`
- `packages/components/navbar.css`

## Canonical Class Surface
Navbar için canonical class adları:
- Root: `navbar`
- Brand: `navbar-brand`
- Nav container: `navbar-nav`
- Item: `navbar-item`

`top-nav`, `nav-item-active`, `main-navbar` gibi paralel canonical class yüzeyi tanımlanmamalıdır.

## State Representation
- Aktif navigasyon öğesi `aria-current="page"` ile temsil edilmelidir.
- Ayrı `navbar-active` canonical class yüzeyi tanımlanmaz.

## Recipe İlişkisi
v0.2'de navbar class surface recipe tarafından üretilmez.

## Override Davranışı
Katman sırası: `reset -> base -> layouts -> recipes -> components -> utilities`.

Kurallar:
1. Navbar kompozisyonu `components` layer'dan gelir.
2. Utility class'ları root/nav/item seviyesinde override amaçlı kullanılabilir.
3. `force-*` utility yalnızca escape-hatch olarak kullanılabilir.

## Token Tüketimi
Navbar aşağıdaki tokenları tüketir:
- Space: `--space-2`, `--space-3`
- Radius: `--radius-md`
- Color semantic: `--color-border-subtle`, `--color-bg-surface`, `--color-fg-default`, `--color-primary-500`

## Accessibility Beklentisi
1. Navbar semantik `nav` öğesi içinde kullanılmalıdır.
2. Brand ve nav item linkleri klavye ile erişilebilir olmalıdır.
3. Aktif sayfa öğesi `aria-current="page"` taşımalıdır.
4. v0.2'de responsive collapse menüsü non-goal kapsamındadır.

## Resolver Kullanım Sözleşmesi
v0.2'de navbar için resolver API tanımlı değildir.

## Open Questions
1. Responsive navbar collapse davranışı ayrı bir RFC ile mi ele alınmalı?
2. Future app-shell entegrasyonunda navbar ile sidebar etkileşimi nasıl standardize edilmeli?

## Önerilen Konum
`docs/rfcs/components/navbar-rfc.md`
