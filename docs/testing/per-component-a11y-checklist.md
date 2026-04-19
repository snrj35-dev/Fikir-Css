# Per-Component Accessibility Checklist

Her bileşen için minimum erişilebilirlik gereksinimleri. Browser testleri `npm run test:browser` ile çalıştırılır.

## Overlay bileşenleri

### Modal
- [x] `role="dialog"` ve `aria-modal="true"` mevcut
- [x] `aria-labelledby` başlık elementine bağlı
- [x] Açıldığında ilk odaklanabilir elemente focus gider
- [x] Focus trap: Tab/Shift+Tab modal dışına çıkmaz
- [x] Escape ile kapatılır
- [x] Kapatıldığında focus trigger'a döner
- [x] Backdrop/overlay tıklaması kapatır
- **Test:** `tests/browser/modal-focus-trap.spec.mjs`

### Drawer
- [x] `role="dialog"` ve `aria-modal="true"` mevcut
- [x] `aria-labelledby` başlık elementine bağlı
- [x] Açıldığında focus drawer içine gider
- [x] Escape ile kapatılır
- [x] Kapatıldığında focus trigger'a döner
- **Test:** `tests/browser/drawer-keyboard.spec.mjs`

### Popover
- [x] Trigger `aria-haspopup="true"` ve `aria-expanded` içerir
- [x] `aria-controls` panel ID'sine bağlı
- [x] Escape ile kapatılır; focus trigger'a döner
- [x] Dış tıklama kapatır
- **Test:** `tests/browser/popover-keyboard.spec.mjs`

### Command Palette
- [x] `role="dialog"` ve `aria-modal="true"` mevcut
- [x] Input `role="combobox"` ve `aria-activedescendant` içerir
- [x] Sonuçlar `role="listbox"` içinde `role="option"` ögeleri
- [x] ArrowDown/Up seçimi kaydırır
- [x] Escape ile kapatılır; focus trigger'a döner
- **Test:** `tests/browser/command-palette-keyboard.spec.mjs`

---

## Navigasyon bileşenleri

### Tabs
- [x] `role="tablist"` ve `aria-label` mevcut
- [x] Her tab `role="tab"` ve `aria-selected` içerir
- [x] Her tab `aria-controls` ile paneline bağlı
- [x] Aktif tab `tabindex="0"`, diğerleri `tabindex="-1"` (roving)
- [x] ArrowLeft/Right tab değiştirir ve focus taşır
- [x] Home/End ilk/son taba gider
- [x] İlişkili panel `role="tabpanel"` ve `aria-labelledby` içerir
- **Test:** `tests/browser/tabs-keyboard.spec.mjs`

### Tree View
- [x] `role="tree"` ve `aria-label` mevcut
- [x] Her öge `role="treeitem"` ve `aria-level` içerir
- [x] Genişletilebilir ögeler `aria-expanded` içerir
- [x] Alt ögeler `role="group"` içinde
- [x] ArrowRight: genişlet veya ilk çocuğa git
- [x] ArrowLeft: daralt veya üst ögeye git
- [x] ArrowDown/Up görünür ögeler arasında gezinir
- [x] Enter/Space toggle eder
- **Test:** `tests/browser/tree-view-keyboard.spec.mjs`

### Accordion
- [x] Triggerlar `<button>` tipi
- [x] `aria-expanded` ve `aria-controls` mevcut
- [x] Panel `role="region"` ve `aria-labelledby` içerir
- [x] Kapalı panel içeriği `hidden` ile gizlenir
- [x] Açık panel içeriği Tab ile ulaşılabilir
- **Test:** `tests/browser/accordion-semantics.spec.mjs`

### Menu Bar
- [x] `role="menubar"` mevcut
- [x] Triggerlar `role="menuitem"` ve `aria-haspopup`/`aria-expanded` içerir
- [x] Alt menüler `role="menu"` ve ögeleri `role="menuitem"` içerir
- [x] ArrowLeft/Right triggerlar arasında gezinir
- [x] ArrowDown alt menüyü açar
- [x] Escape kapatır; focus trigger'a döner
- **Test:** `tests/browser/menu-bar-keyboard.spec.mjs`

### Dropdown Menu
- [x] Trigger `aria-haspopup="true"` ve `aria-expanded` içerir
- [x] Öğeler `role="menuitem"` içerir
- [x] ArrowDown/Up gezinir, wraps-around
- [x] Home/End ilk/son ögeye gider
- [x] Escape kapatır; focus trigger'a döner
- **Test:** `tests/browser/dropdown-keyboard.spec.mjs`

---

## Form / Input bileşenleri

### Switch
- [x] `role="switch"` ve `aria-checked` mevcut
- [x] Click `aria-checked` değerini toggle eder
- [x] Space tuşu toggle eder
- [x] Disabled durumda `aria-disabled="true"` ve `disabled` mevcut
- **Test:** `tests/browser/switch-semantics.spec.mjs`

### Range Slider
- [x] `aria-valuemin`, `aria-valuemax`, `aria-valuenow` mevcut
- [x] `aria-label` veya `aria-labelledby` mevcut
- [x] ArrowRight/Up artırır, ArrowLeft/Down azaltır
- [x] Home minimum'a, End maksimum'a gider
- [x] Disabled durumda `aria-disabled="true"` mevcut
- **Test:** `tests/browser/range-slider-keyboard.spec.mjs`

### Number Input
- [x] `min`, `max`, `step` kısıtları mevcut
- [x] Increment/decrement butonları `aria-label` içerir
- [x] Değer max'ı aşmaz, min'in altına düşmez
- [x] Disabled durumda butonlar da disabled
- [x] ArrowUp/Down klavye ile artırır/azaltır
- **Test:** `tests/browser/number-input-constraints.spec.mjs`

### Combobox / Autocomplete
- [x] Input `role="combobox"`, `aria-expanded`, `aria-haspopup="listbox"` içerir
- [x] Listbox `role="listbox"`, ögeler `role="option"` içerir
- [x] `aria-activedescendant` aktif ögeyi işaret eder
- [x] ArrowDown/Up gezinir
- [x] Enter seçer ve kapatır
- [x] Escape kapatır
- **Test:** `tests/browser/combobox-keyboard.spec.mjs`

### Date Picker
- [x] Trigger `aria-expanded` ve `aria-controls` içerir
- [x] Panel `role="dialog"` ve `aria-modal="true"` içerir
- [x] Grid `role="grid"` içerir
- [x] Sütun başlıkları `role="columnheader"` içerir
- [x] Gün hücreleri `role="gridcell"` ve `aria-label` içerir
- [x] ArrowRight/Left/Up/Down grid'de gezinir
- [x] Enter seçer ve kapatır; Escape yalnızca kapatır
- **Test:** `tests/browser/date-picker-keyboard.spec.mjs`

---

## Geri bildirim bileşenleri

### Toast
- [x] Viewport `aria-live="polite"` ve `role="region"` içerir
- [x] Normal toastlar `role="status"`, danger toastlar `role="alert"` içerir
- [x] Kapat butonu `aria-label="Dismiss"` içerir
- **Test:** `tests/browser/toast-aria-live.spec.mjs`

### Loading Overlay
- [x] Container `aria-busy` durumunu yansıtır
- [x] İçerik `role="status"` ve `aria-live="polite"` içerir
- [x] Backdrop `aria-hidden="true"`
- **Test:** `tests/browser/loading-overlay-semantics.spec.mjs`

### Progress
- [x] Track `role="progressbar"` içerir
- [x] Belirsiz: `aria-valuetext`; belirli: `aria-valuenow/min/max` içerir
- [x] `aria-labelledby` veya `aria-label` mevcut
- **Test:** `tests/browser/progress-semantics.spec.mjs`

### Result
- [x] `data-result-tone` ile semantik ton belirtilir (`success/danger/info/warning`)
- [x] Başlık h2 hiyerarşisinde
- [x] Dekoratif media elementi `aria-hidden="true"`
- **Test:** `tests/browser/result-semantics.spec.mjs`
