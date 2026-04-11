# Overlay Accessibility Expectations (v0.2)

## Amaç
Bu belge, v0.2 overlay surface için erişilebilirlik beklentilerini tek yerde toplar.

Kapsam:
- `modal`
- `drawer`
- `popover`
- `dropdown-menu`
- `tooltip`
- `toast`

## Genel Kurallar
1. Overlay trigger öğesi klavye ile erişilebilir olmalıdır.
2. Açık/kapalı state görsel sınıf yerine semantic attribute (`data-open`, `aria-expanded`, `aria-hidden`) ile temsil edilmelidir.
3. Kapanış aksiyonu klavye üzerinden tetiklenebilir olmalıdır (`Escape` veya close button).
4. Overlay içeriği sadece renk ile anlam taşımamalıdır.
5. Demo wiring, production-grade interaction manager yerine foundation gösterimi olarak değerlendirilmelidir.

## Bileşen Bazlı Beklentiler

### Modal
- Panel `role="dialog"` + `aria-modal="true"` taşımalıdır.
- Başlık `aria-labelledby` ile bağlanmalıdır.
- `Escape` ile kapanış desteklenmelidir.

### Drawer
- Panel `role="dialog"` + `aria-modal="true"` taşımalıdır.
- Wrapper `aria-hidden` state'i `data-open` ile tutarlı olmalıdır.
- Backdrop/close action erişilebilir olmalıdır.

### Popover
- Trigger `aria-expanded` + `aria-controls` taşımalıdır.
- Dış tıklama ve `Escape` ile kapanış desteklenmelidir.
- Interaktif içerik taşıyabilir.

### Dropdown Menu
- Trigger `aria-expanded` + `aria-controls` taşımalıdır.
- Item'lar erişilebilir button olarak kalmalıdır.
- `Escape` ve dış tıklama kapanışı desteklenmelidir.
- v0.2'de roving tabindex/typeahead non-goal kapsamındadır.

### Tooltip
- Trigger erişilebilir isim taşımalıdır.
- Tooltip `aria-describedby` ile ilişkilendirilmelidir.
- Hover yanında focus ile de görünür olmalıdır.
- Interaktif panel davranışı beklenmemelidir.

### Toast
- Viewport `aria-live` + `aria-atomic` taşımalıdır.
- Dismiss aksiyonu klavye ile erişilebilir olmalıdır.

## Mevcut Doğrulama Noktaları
- Demo markup: `playground/index.html`
- Demo interaction: `playground/demo.js`
- Build tests:
  - `tests/build/modal-surface.test.mjs`
  - `tests/build/drawer-surface.test.mjs`
  - `tests/build/popover-surface.test.mjs`
  - `tests/build/dropdown-menu-surface.test.mjs`
  - `tests/build/tooltip-surface.test.mjs`
  - `tests/build/toast-surface.test.mjs`

## Kısıtlar (v0.2)
- Tam focus-trap zorunlu değildir.
- Otomatik focus-return politikası standartlaştırılmamıştır.
- Overlay keyboard navigation (özellikle menü modelleri) sınırlı kapsamda ele alınmıştır.

## Future Improvement
- Overlay E2E accessibility matrix (Playwright + axe) eklemek.
- Focus-return ve trap davranışını RFC bazında zorunlu hale getirmek.
