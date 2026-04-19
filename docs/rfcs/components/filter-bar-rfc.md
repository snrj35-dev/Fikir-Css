# RFC: Filter Bar (v1.0 Product Pattern)

## Durum
- Status: Accepted (implementation-aligned RFC)
- Scope: v1.0 supported product pattern
- Non-goal: filter engine logic, date-range picker integration wiring, URL state management

## Amaç
Bu RFC, filter-bar için canonical slot surface, arama + filtre + chip akışı, reset davranışı, card entegrasyonu ve erişilebilirlik beklentilerini normatif olarak tanımlar.

## Referanslar
- `packages/components/filter-bar.css`
- `packages/components/search-box.css`
- `packages/components/tag-chip.css`
- `docs/components/filter-bar.md`

## Canonical Pattern Surface
Filter bar için canonical marker:
- Root: `[data-pattern="filter-bar"]`

Slot contract:
- `[data-slot="controls"]` — ana flex satırı (search + filters)
- `[data-slot="search"]` — büyüyen arama alanı
- `[data-slot="filters"]` — filtre select'leri veya fieldset grubu
- `[data-slot="chips"]` — aktif filtre chip'leri
- `[data-slot="actions"]` — opsiyonel aksiyon butonları
- `[data-slot="reset"]` — tümünü temizle butonu (inline-end'e yaslanır)
- `[data-slot="summary"]` — chips + meta footer satırı
- `[data-slot="meta"]` — muted sonuç sayısı metni

`filter-panel`, `filter-toolbar`, `filter-header` gibi paralel alias'lar tanımlanmaz.

## State Representation
Filter bar stateless bir layout pattern'dır; kendi state'i yoktur.
- Aktif filtreler: `[data-slot="chips"]` içinde `tag-chip` element'leri
- Filtre sayısı: `[data-slot="meta"]` metin içeriği (JS günceller)
- Reset görünürlüğü: JS tarafından yönetilir (filtre aktifken göster)

## Card Entegrasyonu
`.card[data-pattern="filter-bar"]` seçicisi ile kart içinde border/background kaldırılır. Bu sayede filter-bar bağımsız veya kart bileşeni olarak kullanılabilir.

## Erişilebilirlik Beklentileri
- `[data-slot="search"]` içi `<form role="search">` + `aria-label` zorunludur.
- Her `<select>` için `aria-label` zorunludur.
- Chip remove butonlarında `aria-label="Remove [filtre adı] filter"` zorunludur.
- `[data-slot="meta"]` dinamik güncelleniyorsa `aria-live="polite"` eklenmelidir.
- `fieldset` + `legend` ilişkili filtre kontrollerini gruplamak için kullanılabilir.

## Token Tüketimi
- `--filter-bar-gap` (default: `--space-3`)
- `--filter-bar-row-gap` (default: `--space-2`)
- `--filter-bar-panel-padding` (default: `--space-3`)
- `--filter-bar-search-min` (default: `16rem`) — arama alanı minimum genişliği
