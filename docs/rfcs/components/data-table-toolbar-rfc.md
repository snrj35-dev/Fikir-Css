# RFC: Data Table Toolbar (v1.0 Product Pattern)

## Durum
- Status: Accepted (implementation-aligned RFC)
- Scope: v1.0 supported product pattern
- Non-goal: column visibility dropdown logic, density application engine, CSV export implementation

## Amaç
Bu RFC, data-table-toolbar için canonical slot surface, tablo entegrasyon sözleşmesi, column-visibility/density/export slot'ları, selection summary ve erişilebilirlik beklentilerini normatif olarak tanımlar.

## Referanslar
- `packages/components/data-table-toolbar.css`
- `packages/components/table.css`
- `packages/components/data-grid.css`
- `packages/components/search-box.css`
- `docs/components/data-table-toolbar.md`

## Canonical Pattern Surface
Data table toolbar için canonical marker:
- Root: `[data-pattern="data-table-toolbar"]`

Slot contract:
- `[data-slot="controls"]` — ana flex satırı (search + filters + column-visibility + density + export + actions)
- `[data-slot="search"]` — büyüyen arama alanı
- `[data-slot="filters"]` — filtre select'leri
- `[data-slot="column-visibility"]` — sütun görünürlük toggle butonu
- `[data-slot="density"]` — yoğunluk select'i (compact / default / comfortable)
- `[data-slot="export"]` — export butonu
- `[data-slot="actions"]` — bağlamsal aksiyon butonları (inline-end'e yaslanır)
- `[data-slot="active-filters"]` — aktif filtre chip'leri
- `[data-slot="selection-summary"]` — seçili satır sayısı
- `[data-slot="summary"]` — active-filters + selection-summary footer satırı
- `[data-slot="surface"]` — tablo veya data-grid wrapper'ı

`table-toolbar`, `grid-toolbar`, `data-toolbar` gibi paralel alias'lar tanımlanmaz.

## Tablo Entegrasyon Sözleşmesi
- `[data-slot="surface"]` içinde `.table` veya `.data-grid` barındırılır
- Toolbar kontrolleri ile tablo `aria-controls="[table-id]"` ile ilişkilendirilir
- Tablo `id` attribute'u olmalıdır ve bu id toolbar butonlarının `aria-controls` değeriyle eşleşmelidir

## State Representation
- Aktif filtreler: `[data-slot="active-filters"]` içinde `tag-chip` element'leri
- Seçili satır sayısı: `[data-slot="selection-summary"]` metin içeriği (JS günceller)
- Yoğunluk: tablo wrapper'ına `data-density="compact|comfortable"` JS tarafından eklenir

## Card Entegrasyonu
`.card[data-pattern="data-table-toolbar"]` seçicisi border/background'ı kaldırır.

## Erişilebilirlik Beklentileri
- `[data-slot="search"]` içi `<form role="search">` + `aria-label` zorunludur
- Her `<select>` için `aria-label` zorunludur
- `[data-slot="selection-summary"]` dinamik güncelleniyorsa `aria-live="polite"` eklenmelidir
- Chip remove butonlarında `aria-label="Remove [filtre adı] filter"` zorunludur
- Column-visibility butonu için `aria-haspopup="true"` beklenir

## Token Tüketimi
- `--data-table-toolbar-gap` (default: `--space-3`)
- `--data-table-toolbar-row-gap` (default: `--space-2`)
- `--data-table-toolbar-panel-padding` (default: `--space-3`)
- `--data-table-toolbar-search-min` (default: `16rem`)
