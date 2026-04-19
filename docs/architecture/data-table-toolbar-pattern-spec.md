# Data Table Toolbar Pattern Spec (v0.6)

## Durum
- Status: Draft (implemented pattern spec)
- Scope: v0.6 experimental pattern surface
- Non-goal: yeni `data-table-toolbar` framework class'ı, yeni table API, server-side state orchestration engine

## Amaç
Bu belge, table veya data-grid üstünde arama, filtre, görünüm ayarı ve toplu aksiyonları bir araya getiren `Data Table Toolbar` pattern'ini ve `data-slot` sözleşmesini tanımlar.

## Kapsam ve Sınırlar
Pattern aşağıdaki mevcut sınıflarla kurulmalıdır:
- Layout: `stack`, `cluster`, `sidebar`
- Search/filter: `search-box`, `search-box-input`, `search-box-action`, `select`, `checkbox`
- Actions: `btn`, `btn-outline`, `btn-primary`, `btn-neutral`, `btn-sm`
- Status: `tag-chip`, `badge`
- Data yüzeyi: `table`, `data-grid`, `table-row` + `data-row-selected="true"`

`data-table-toolbar` adında canonical framework class surface yoktur.
Pattern wrapper için canonical işaretleme `data-pattern="data-table-toolbar"` olmalıdır.

## Pattern Yapısı
Normatif slot yapısı:
1. `data-slot="controls"`: birincil kontrol satırı
2. `data-slot="search"`: arama alanı
3. `data-slot="filters"`: filtre kontrolleri
4. `data-slot="column-visibility"`: kolon görünürlüğü kontrolleri
5. `data-slot="density"`: density kontrol grubu
6. `data-slot="export"`: export aksiyon grubu
7. `data-slot="actions"`: toplu aksiyonlar
8. `data-slot="summary"`: aktif filtre ve seçim özeti
9. `data-slot="active-filters"`: aktif filtre tag/chip grubu
10. `data-slot="selection-summary"`: seçili satır/meta metni
11. `data-slot="surface"`: bağlı `table` veya `data-grid` alanı

## Override ve Kompozisyon Kuralları
- Dizilim ve spacing farkları utilities veya layout primitives ile yapılmalıdır.
- Utility override istisnai olmalıdır; sürekli override ihtiyacı varsa pattern kompozisyonu gözden geçirilmelidir.
- `btn` sınıflarında aynı axis çakışmaları aynı node üzerinde birlikte kullanılmamalıdır.
- Toolbar pattern'i yeni semantic component class'ı üretmeden mevcut canonical surface ile kurulmalıdır.
- Slot isimleri yeni alias surface ile çoğaltılmamalıdır (`toolbar-export`, `table-density` vb. yok).

## Accessibility Beklentileri
- Arama alanı erişilebilir label taşımalıdır.
- Filtre ve toplu aksiyon kontrolleri semantik form elemanlarıyla sunulmalıdır.
- Toolbar'ın etkilediği tablo `aria-controls` ile bağlanmalıdır.
- Seçili satır sayısı gibi özet bilgi metinle açık verilmelidir.
- Toplu aksiyon butonları, seçili satır yokken devre dışı bırakılabiliyorsa bu davranış HTML `disabled` ile ifade edilmelidir.
- `column-visibility` ve `density` kontrolleri de aynı kontrollü surface'e bağlanmalıdır.

## Contract İlişkisi
- Kullanılan framework class'ları `dist/contracts/selectors.json` içinde olmalıdır.
- Yapısal slot contract `docs/architecture/headless-contract-spec.md` içinde kayıtlıdır.
- CSS implementasyonu `packages/components/data-table-toolbar.css` içindedir.
- Bu spec, naming/recipe contract dosyalarında değişiklik gerektirmez.

## Minimal Kullanım Örneği
```html
<section data-pattern="data-table-toolbar">
  <div data-slot="controls">
    <div data-slot="search">
      <form class="search-box" role="search" aria-label="Table search">
        <input class="search-box-input" type="search" aria-label="Search rows" />
        <button class="search-box-action" type="submit">Search</button>
      </form>
    </div>

    <div data-slot="filters">
      <label class="label" for="table-status-filter">Status</label>
      <select id="table-status-filter" class="select" aria-controls="issues-table">
        <option>All</option>
        <option>Active</option>
        <option>Archived</option>
      </select>
    </div>

    <div data-slot="column-visibility">
      <button class="btn btn-outline btn-sm" type="button" aria-controls="issues-table">Columns</button>
    </div>

    <div data-slot="density">
      <label class="label" for="table-density">Density</label>
      <select id="table-density" class="select" aria-controls="issues-table">
        <option>Compact</option>
        <option selected>Default</option>
        <option>Comfortable</option>
      </select>
    </div>

    <div data-slot="actions">
      <div data-slot="export">
        <button class="btn btn-outline btn-sm" type="button" aria-controls="issues-table">Export</button>
      </div>

      <button class="btn btn-primary btn-sm" type="button" aria-controls="issues-table">Bulk action</button>
    </div>
  </div>

  <div data-slot="summary">
    <div data-slot="active-filters">
      <span class="tag-chip">
        <span class="tag-chip-label">status: active</span>
      </span>
    </div>
    <span data-slot="selection-summary" class="text-sm">3 selected</span>
  </div>

  <div data-slot="surface">
    <table id="issues-table" class="table" aria-label="Issues table">
      <!-- rows -->
    </table>
  </div>
```

## Open Questions
1. Data-grid için column pinning/sort summary ayrı slot gerektirir mi?
2. Server-side toolbar state eşzamanı için ayrı implementation note gerekli mi?

## Implementation Note (v0.6)
- Playground implementation örneği: `playground/index.html` içinde `data-pattern="data-table-toolbar"` section'ı.
- Table workflow örneği: `playground/data-table-workflow-example.html`.
- İlgili pattern dokümanları: `docs/architecture/filter-bar-pattern-spec.md` ve `docs/architecture/command-bar-pattern-spec.md`.
- RFC: `docs/rfcs/patterns/data-table-toolbar-rfc.md`.
