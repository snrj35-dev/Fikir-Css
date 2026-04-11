# Overlay Layering and Z-Index Notes (v0.2)

## Amaç
Bu not, v0.2 overlay surface için mevcut katmanlama ve `z-index` sırasını dokümante eder.

Bu belge davranış değiştirmez; mevcut implementation'ı görünür hale getirir.

## CSS Layer Context
Global layer sırası:
- `reset -> base -> layouts -> recipes -> components -> utilities`

Overlay selector'ları `components` layer içinde tanımlıdır.

## Mevcut Z-Index Dağılımı
Kaynak dosyalara göre efektif sıra:

1. `modal`: `z-index: 40`
   - Kaynak: `packages/components/modal.css`
2. `drawer`: `z-index: 42`
   - Kaynak: `packages/components/drawer.css`
3. `toast-viewport`: `z-index: 45`
   - Kaynak: `packages/components/toast.css`
4. `popover-content`: `z-index: 48`
   - Kaynak: `packages/components/popover.css`
5. `dropdown-menu-content`: `z-index: 49`
   - Kaynak: `packages/components/dropdown-menu.css`
6. `tooltip-content`: `z-index: 50`
   - Kaynak: `packages/components/tooltip.css`

## Beklenen Üst Üste Binme Davranışı
- Tooltip içerikleri en üstte görünür.
- Dropdown, popover üzerinde görünür.
- Popover, toast viewport üstünde görünür.
- Toast viewport, drawer ve modal üstünde görünür.
- Drawer, modal üstünde görünür.

## Doğrulama
- `npm run build` sonrası `dist/fikir.css` içinde ilgili selector blokları kontrol edilmelidir.
- Overlay surface build testleri, selector varlığını ve state wiring'ini doğrular.

İlgili testler:
- `tests/build/modal-surface.test.mjs`
- `tests/build/drawer-surface.test.mjs`
- `tests/build/toast-surface.test.mjs`
- `tests/build/popover-surface.test.mjs`
- `tests/build/dropdown-menu-surface.test.mjs`
- `tests/build/tooltip-surface.test.mjs`

## Riskler
- `z-index` değerleri token'a taşınmış değildir; değerler component dosyalarında dağınık tutulur.
- Yeni overlay eklendiğinde merkezi bir sıra denetimi olmadığı için çakışma riski vardır.

## Future Improvement
- `z-index` değerlerini token family veya merkezi overlay scale'e taşımak.
- Build-time doğrulama ile overlay z-index sırasını otomatik kontrol etmek.
