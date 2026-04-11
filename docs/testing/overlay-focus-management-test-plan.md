# Overlay Focus Management Test Plan (v0.2)

## Amaç
Bu plan, v0.2 overlay surface için odak (focus) davranışının nasıl doğrulanacağını tanımlar.

Kapsam:
- `modal`
- `drawer`
- `popover`
- `dropdown-menu`
- `tooltip`
- `toast` (odak yönetimi yerine erişilebilir kapanış aksiyonu kontrolü)

## Kapsam Notu
Bu plan bir test planıdır; yeni davranış tanımlamaz.

v0.2 non-goal:
- Tam focus-trap zorunluluğu (modal/drawer) bu sürümde zorunlu değildir.

## Referanslar
- `docs/rfcs/components/modal-rfc.md`
- `docs/rfcs/components/drawer-rfc.md`
- `docs/rfcs/components/popover-rfc.md`
- `docs/rfcs/components/dropdown-menu-rfc.md`
- `docs/rfcs/components/tooltip-rfc.md`

## Test Seviyeleri
1. Manual smoke checks (zorunlu)
2. Build doğrulama testleri (mevcut)
3. E2E otomasyon (future improvement)

## Manual Test Matrisi

### FM-01 Modal open/close focus continuity
- Adım: modal trigger ile aç, `Escape` ile kapat.
- Beklenen: modal `data-open` state'i kapanır; klavye ile tekrar trigger'a ulaşım engellenmez.

### FM-02 Drawer open/close focus continuity
- Adım: drawer trigger ile aç, backdrop veya `Escape` ile kapat.
- Beklenen: drawer `data-open` ve `aria-hidden` state'i tutarlı güncellenir.

### FM-03 Popover trigger state sync
- Adım: popover trigger'a tıkla, sonra dış alana tıkla.
- Beklenen: trigger `aria-expanded` açık/kapalı state ile senkron kalır.

### FM-04 Dropdown trigger state sync
- Adım: dropdown trigger'a tıkla, item seç veya dışarı tıkla.
- Beklenen: wrapper `data-open` ve trigger `aria-expanded` senkron kapanır.

### FM-05 Tooltip keyboard discoverability
- Adım: tooltip trigger'a `Tab` ile odaklan.
- Beklenen: tooltip görünür olur (`data-open="true"`), blur ile kapanır.

### FM-06 Toast dismiss accessibility
- Adım: toast göster, close butonuna klavye ile ulaş ve kapat.
- Beklenen: close aksiyonu klavye ile çalışır; toast `data-open="false"` olur.

## Build/Test Entegrasyonu (Mevcut)
Mevcut build testleri aşağıdaki sinyalleri doğrular:
- `tests/build/modal-surface.test.mjs`
- `tests/build/drawer-surface.test.mjs`
- `tests/build/popover-surface.test.mjs`
- `tests/build/dropdown-menu-surface.test.mjs`
- `tests/build/tooltip-surface.test.mjs`
- `tests/build/toast-surface.test.mjs`

Bu testler selector yüzeyi ve demo wiring varlığını doğrular; gerçek klavye sekansı E2E kapsamındadır.

Ek olarak modal build testi, demo wiring içinde:
- açılışta modal içi fokus hedefi seçimi
- kapanışta tetikleyiciye fokus dönüşü
izlerinin bulunduğunu doğrular.

## Future Improvement
- Playwright tabanlı klavye akışı testleri:
  - `Tab` sırası
  - `Escape` ile kapanış
  - `aria-expanded` state transition doğrulaması
  - Açılır/kapanır overlay sonrası focus dönüş stratejisi
