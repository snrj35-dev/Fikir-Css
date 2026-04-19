# RFC: Split Button (v0.6 Product Component)

## Durum
- Status: Draft (implementation-aligned RFC)
- Scope: v0.6 beta product surface
- Non-goal: menu positioning engine, async action orchestration, nested submenu, full roving tabindex runtime

## Amaç
Bu RFC, split button için canonical class surface, button recipe ilişkisi, dropdown-menu entegrasyon senaryosu, override davranışı, token tüketimi ve erişilebilirlik beklentilerini normatif olarak tanımlar.

## Referanslar
- `docs/contracts/naming-convention-spec.md`
- `docs/architecture/headless-contract-spec.md`
- `contracts/naming.contract.mjs`
- `packages/components/split-button.css`
- `packages/components/button.css`
- `packages/components/dropdown-menu.css`

## Canonical Class Surface
Split button için canonical class adları:
- Root: `split-button`
- Primary action trigger: `split-button-action`
- Secondary menu toggle: `split-button-toggle`

Secondary menu panel ve item surface'i için mevcut dropdown-menu contract'i yeniden kullanılır:
- Menu panel: `dropdown-menu-content`
- Menu item: `dropdown-menu-item`

`split-action-button`, `split-button-menu`, `split-button-panel`, `btn-split` gibi paralel canonical alias'lar tanımlanmamalıdır.

## State Representation
- Açık/kapalı state root üzerinde `data-open="true|false"` ile temsil edilmelidir.
- Secondary toggle üzerinde `aria-expanded="true|false"` ve `aria-controls` birlikte kullanılmalıdır.
- Toggle için `aria-haspopup="menu"` beklenir.
- Ayrı canonical state class yüzeyi (`split-button-open`, `split-button-expanded`) tanımlanmaz.

## Recipe İlişkisi
`split-button` wrapper'ı recipe tarafından üretilmez; ancak action ve toggle düğmeleri mevcut button recipe class'larını tüketir.

Kurallar:
1. `split-button-action` ve `split-button-toggle`, `btn` base class'ı olmadan kullanılmamalıdır.
2. İki trigger da aynı button axis kombinasyonunu paylaşmalıdır.
   - Örn. `btn btn-solid btn-primary btn-sm` + `btn btn-solid btn-primary btn-sm`
3. Split-button için ayrı `split-button-primary`, `split-button-outline`, `split-button-sm` gibi yeni recipe axis'leri tanımlanmaz.

## Dropdown Menu Entegrasyon Senaryosu
Normatif kompozisyon:
- Root wrapper, `split-button` ile birlikte mevcut `dropdown-menu` davranış yüzeyini taşıyabilir.
- Secondary panel `dropdown-menu-content` ile kurulmalıdır.
- Secondary aksiyonlar `dropdown-menu-item` üzerinden sunulmalıdır.

Kabul edilir:
- `split-button dropdown-menu` + `data-open="true"` + `dropdown-menu-content`
- `split-button-action btn btn-solid btn-primary` + `split-button-toggle btn btn-solid btn-primary`

Kabul edilmez:
- Split-button menüsü için `split-button-menu` gibi yeni panel class'ı üretmek
- Primary action ile toggle üzerinde farklı tone/style class setleri kullanmak

## Override Davranışı
Katman sırası: `reset -> base -> layouts -> recipes -> components -> utilities`.

Kurallar:
1. Join/radius davranışı `components` layer'da `split-button` surface'i ile gelir.
2. Görsel tone/style/size kararı action ve toggle üstündeki mevcut `btn*` recipe class'ları ile taşınır.
3. Menu spacing ve yerleşimi gerektiğinde `dropdown-menu-content` üzerinde utility ile esnetilebilir.
4. Yeni semantic alias class eklemek yerine mevcut `btn` ve `dropdown-menu` surface'i kullanılmalıdır.

## Token Tüketimi
- Space: `--space-1`
- Colors: `--color-accent`

Normatif not:
- Split-button, renk/ton kontratını doğrudan tanımlamaz; button recipe'den tüketir.

## Accessibility Beklentisi
1. Primary action ve secondary toggle ayrı `<button type="button">` elemanları olmalıdır.
2. Toggle erişilebilir bir isim taşımalıdır; görünür caret yeterli değilse `aria-label` eklenmelidir.
3. Menu item'lar `button` veya `a` elementiyle `role="menuitem"` taşımalıdır.
4. Tab sırası primary action -> toggle -> açıkken menu item'lar şeklinde ilerlemelidir.
5. `Escape` ile menü kapanmalı ve focus toggle'a dönebilmelidir.
6. Arrow-down ile menü açılıp ilk item'a odak vermek önerilen davranıştır; richer keyboard modeli additive olarak genişletilebilir.

## Resolver Kullanım Sözleşmesi
v0.6'da split-button için ayrı resolver API tanımlı değildir.

## Open Questions
1. Async primary action + loading spinner senaryosu split-button'a mı, button loading contract'ına mı bağlanmalı?
2. Checkable menu item varyantları ileride `dropdown-menu` RFC genişlemesiyle mi ele alınmalı?

## Önerilen Konum
`docs/rfcs/components/split-button-rfc.md`
