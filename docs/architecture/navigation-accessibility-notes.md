# Navigation Accessibility Notes (M1)

## Amaç
M1 kapsamındaki navigation slice için mevcut keyboard/a11y beklentilerini netleştirmek.

Kapsam (M1):
- `tabs` (supported slice)
- `accordion` (implemented, navigation davranış notu)

## Tabs Notes

Beklentiler:
1. Container `role="tablist"` taşımalıdır.
2. Trigger öğeleri `role="tab"` ile temsil edilmelidir.
3. Trigger aktivasyonu bir paneli görünür (`data-active="true"`) hale getirirken diğerlerini pasif yapmalıdır.
4. Kullanıcı `Tab` ile trigger'lara ulaşabilmelidir.
5. Trigger öğeleri native `<button>` olduğu için `Enter/Space` ile çalışmalıdır.

M1 sınırı:
- Ok tuşları / Home / End klavye modeli zorunlu release kriteri değildir.
- Bu model M2+ iyileştirme alanı olarak izlenir.

## Accordion Notes

Beklentiler:
1. Trigger öğeleri native `<button>` olmalıdır.
2. Açık/kapalı state item düzeyinde `data-open="true|false"` ile yönetilmelidir.
3. Klavye ile (`Tab` + `Enter/Space`) panel aç/kapat akışı çalışmalıdır.

M1 sınırı:
- Çoklu item için gelişmiş roving tabindex veya ok tuşu modeli zorunlu değildir.

## Manual QA Hızlı Kontrol
1. `playground/index.html` içinde Tabs bölümüne klavye ile git.
2. Trigger'lar arasında `Tab` ile dolaş ve `Enter/Space` ile panel değişimini doğrula.
3. Accordion trigger'larına `Tab` ile git ve `Enter/Space` ile state değişimini doğrula.

## Test Referansları
- `tests/build/tabs-surface.test.mjs`
- `tests/build/accordion-surface.test.mjs`

## İlgili Belgeler
- `docs/rfcs/components/tabs-rfc.md`
- `docs/architecture/overlay-accessibility-expectations.md`
- `docs/testing/manual-accessibility-qa-checklist.md`
