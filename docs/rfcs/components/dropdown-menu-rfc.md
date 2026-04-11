# RFC: Dropdown Menu (v0.2 Foundation)

## Durum
- Status: Draft (documentation RFC)
- Scope: v0.2 mevcut foundation surface
- Non-goal: nested submenu, roving tabindex veya typeahead navigation eklemek

## Amaç
Bu RFC, dropdown menu için canonical class surface, override davranışı, token tüketimi, erişilebilirlik beklentisi ve recipe ilişkisini normatif olarak tanımlar.

## Referanslar
- `docs/contracts/naming-convention-spec.md`
- `docs/contracts/token-dictionary-spec.md`
- `contracts/naming.contract.mjs`
- `packages/components/dropdown-menu.css`

## Canonical Class Surface
Dropdown menu için canonical class adları:
- Wrapper: `dropdown-menu`
- Content: `dropdown-menu-content`
- Item: `dropdown-menu-item`

`dropdown-open`, `dropdown-panel`, `menu-dropdown` gibi paralel canonical class yüzeyi tanımlanmamalıdır.

## State Representation
- Açık/kapalı state wrapper üzerinde `data-open="true|false"` ile temsil edilmelidir.
- Ayrı canonical class yüzeyi (`dropdown-open`, `dropdown-closed`) tanımlanmaz.
- Trigger üzerinde `aria-expanded` ve `aria-controls` birlikte kullanılmalıdır.

## Recipe İlişkisi
v0.2'de dropdown menu class surface recipe tarafından üretilmez.

## Override Davranışı
Katman sırası: `reset -> base -> layouts -> recipes -> components -> utilities`.

Kurallar:
1. `dropdown-menu`, `dropdown-menu-content`, `dropdown-menu-item` davranışı `components` layer'dan gelir.
2. Utility class'ları gerektiğinde wrapper/content/item üzerinde override amaçlı kullanılabilir.
3. `force-*` utility yalnızca escape-hatch olarak kullanılabilir.

## Token Tüketimi
Dropdown menu aşağıdaki tokenları tüketir:
- Space: `--space-1`, `--space-2`, `--space-3`
- Radius: `--radius-sm`, `--radius-md`
- Shadow: `--shadow-md`
- Color semantic: `--color-border-subtle`, `--color-bg-surface`, `--color-fg-default`, `--color-primary-500`

## Accessibility Beklentisi
1. Trigger klavye ile erişilebilir olmalıdır.
2. Trigger state'i `aria-expanded` ile güncellenmelidir.
3. Trigger-content ilişkisi `aria-controls` ve benzersiz id ile kurulmalıdır.
4. Escape ve dış tıklama ile kapanış desteği bulunmalıdır.
5. v0.2'de tam menü klavye modeli (ok tuşları/typeahead) non-goal kapsamındadır.

## Resolver Kullanım Sözleşmesi
v0.2'de dropdown menu için resolver API tanımlı değildir.

## Open Questions
1. v0.2.x içinde roving tabindex zorunlu hale getirilmeli mi?
2. Gelecek sürümlerde menu-item state surface (`active`, `selected`) canonical class ile mi, attribute ile mi temsil edilmeli?

## Önerilen Konum
`docs/rfcs/components/dropdown-menu-rfc.md`
