# Data Table Toolbar Pattern Spec (v0.2)

## Durum
- Status: Draft (pattern spec)
- Scope: v0.2 foundation class surface
- Non-goal: yeni `data-table-toolbar` framework class'ı veya yeni table API

## Amaç
Bu belge, data table üstünde arama, filtre ve toplu aksiyonları bir araya getiren `Data Table Toolbar` pattern'ini mevcut v0.2 surface ile tanımlar.

## Kapsam ve Sınırlar
Pattern aşağıdaki mevcut sınıflarla kurulmalıdır:
- Layout: `stack`, `cluster`, `sidebar`
- Search/filter: `search-box`, `search-box-input`, `search-box-action`, `select`, `checkbox`
- Actions: `btn`, `btn-outline`, `btn-primary`, `btn-neutral`, `btn-sm`
- Status: `badge`
- Data yüzeyi: `table`, `table-row` + `data-row-selected="true"`

`data-table-toolbar` adında canonical framework class surface v0.2'de yoktur.
Pattern wrapper gerekiyorsa proje-yerel class veya `data-pattern="data-table-toolbar"` kullanılmalıdır.

## Pattern Yapısı
Önerilen alt bölgeler:
1. Sol: arama + filtre kontrolleri
2. Sağ: toplu aksiyonlar (export/delete/assign gibi)
3. Alt satır (opsiyonel): aktif filtre özeti ve seçili satır bilgisi
4. Bağlı tablo: toolbar aksiyonlarının etkilediği `table` alanı

## Override ve Kompozisyon Kuralları
- Dizilim ve spacing farkları utilities veya layout primitives ile yapılmalıdır.
- Utility override istisnai olmalıdır; sürekli override ihtiyacı varsa pattern kompozisyonu gözden geçirilmelidir.
- `btn` sınıflarında aynı axis çakışmaları aynı node üzerinde birlikte kullanılmamalıdır.
- Toolbar pattern'i yeni semantic component class'ı üretmeden mevcut canonical surface ile kurulmalıdır.

## Accessibility Beklentileri
- Arama alanı erişilebilir label taşımalıdır.
- Filtre ve toplu aksiyon kontrolleri semantik form elemanlarıyla sunulmalıdır.
- Toolbar'ın etkilediği tablo `aria-controls` ile bağlanmalıdır.
- Seçili satır sayısı gibi özet bilgi metinle açık verilmelidir.
- Toplu aksiyon butonları, seçili satır yokken devre dışı bırakılabiliyorsa bu davranış HTML `disabled` ile ifade edilmelidir.

## Contract İlişkisi
- Kullanılan framework class'ları `dist/contracts/selectors.json` içinde olmalıdır.
- Bu spec, naming/recipe contract dosyalarında değişiklik gerektirmez.

## Minimal Kullanım Örneği
```html
<section class="stack gap-2" data-pattern="data-table-toolbar">
  <div class="cluster gap-2">
    <form class="search-box" role="search" aria-label="Table search">
      <input class="search-box-input" type="search" aria-label="Search rows" />
      <button class="search-box-action" type="submit">Search</button>
    </form>

    <label class="label" for="table-status-filter">Status</label>
    <select id="table-status-filter" class="select">
      <option>All</option>
      <option>Active</option>
      <option>Archived</option>
    </select>

    <button class="btn btn-outline btn-sm" type="button">Export</button>
    <button class="btn btn-primary btn-sm" type="button" aria-controls="issues-table">Bulk action</button>
  </div>

  <div class="cluster gap-2">
    <span class="badge">status: active</span>
    <span class="text-sm">3 selected</span>
  </div>
</section>
```

## Open Questions
1. v0.3'te toolbar için canonical wrapper surface gerekli mi?
2. Bulk selection özetinde (`n selected`) ayrı semantic surface gerekli mi, yoksa text/badge yeterli mi?
3. Server-side table senaryolarında toolbar state aktarımı için ayrı pattern notu gerekli mi?

## Implementation Note (v0.2)
- Playground implementation örneği: `playground/index.html` içinde `data-pattern="data-table-toolbar"` section'ı.
- İlgili pattern dokümanları: `docs/architecture/filter-bar-pattern-spec.md` ve `docs/architecture/command-bar-pattern-spec.md`.
