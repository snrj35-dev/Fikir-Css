# Filter Bar Pattern Spec (v0.6)

## Durum
- Status: Draft (implemented pattern spec)
- Scope: v0.6 experimental pattern surface
- Non-goal: yeni `filter-bar` component class'ı, query parser, filter state manager, remote filtering protocol

## Amaç
Bu belge, liste/table/data-grid üstü filtreleme alanı için kullanılan `Filter Bar` pattern'inin mevcut surface ile nasıl kurulacağını ve `data-slot` tabanlı sözleşmesini tanımlar.

## Kapsam ve Sınırlar
Pattern aşağıdaki mevcut sınıflarla kurulmalıdır:
- Search/input bileşenleri: `search-box`, `search-box-input`, `search-box-action`, `input-group`, `input-group-addon`, `input`, `select`
- Aksiyonlar: `btn`, `btn-outline`, `btn-primary`, `btn-neutral`, `btn-sm`
- Durum göstergeleri: `tag-chip`, `badge`

`filter-bar` adında canonical class surface yoktur.
Pattern wrapper için canonical işaretleme `data-pattern="filter-bar"` olmalıdır.

## Pattern Yapısı
Normatif slot yapısı:
1. `data-slot="controls"`: birincil kontrol satırı
2. `data-slot="search"`: arama alanı
3. `data-slot="filters"`: filtre kontrolleri
4. `data-slot="reset"`: reset/clear aksiyon grubu
5. `data-slot="actions"`: apply/export gibi diğer aksiyonlar
6. `data-slot="summary"`: ikincil özet satırı
7. `data-slot="chips"`: aktif filtre chip grubu
8. `data-slot="meta"`: sonuç sayısı veya durum özeti

## Override ve Kompozisyon Kuralları
- Filtre bar üzerinde spacing/dizilim farkları utilities ile yapılabilir.
- Utility override istisnai olmalıdır; sürekli override ihtiyacı varsa pattern düzeni gözden geçirilmelidir.
- `btn` için aynı axis'te çakışan class kombinasyonları kullanılmamalıdır.
- Slot isimleri yeni paralel alias ile çoğaltılmamalıdır (`filter-summary`, `filter-actions` vb. yok).

## Accessibility Beklentileri
- Search input'u erişilebilir label'a sahip olmalıdır (görsel veya `sr-only` yaklaşımı proje tarafında).
- Filtre grupları semantik olarak gruplanmalıdır (`fieldset`/`legend` tercih edilir).
- Sonuç listesini etkileyen kontrol değişiklikleri için davranış net olmalıdır:
  - otomatik uygula, veya
  - "Apply filters" butonu ile açık onay.
- Aktif filtre temizleme aksiyonu klavye ile erişilebilir olmalıdır.

## Contract İlişkisi
- Kullanılan framework class'ları `dist/contracts/selectors.json` içinde yer almalıdır.
- Yapısal slot contract `docs/architecture/headless-contract-spec.md` içinde kayıtlıdır.
- CSS implementasyonu `packages/components/filter-bar.css` içindedir.
- Bu pattern spec, naming/recipe contract dosyalarında değişiklik gerektirmez.

## Minimal Kullanım Örneği
```html
<section data-pattern="filter-bar">
  <div data-slot="controls">
    <div data-slot="search">
      <form class="search-box" role="search" aria-label="Search records">
        <input class="search-box-input" type="search" aria-label="Search query" />
        <button class="search-box-action" type="submit">Search</button>
      </form>
    </div>

    <fieldset data-slot="filters">
      <legend>Filters</legend>
      <label class="label" for="status-filter">Status</label>
      <select id="status-filter" class="select">
        <option>All</option>
        <option>Active</option>
        <option>Archived</option>
      </select>
    </fieldset>

    <div data-slot="reset">
      <button type="button" class="btn btn-outline btn-neutral btn-sm">Reset</button>
    </div>

    <div data-slot="actions">
      <button type="button" class="btn btn-primary btn-sm">Apply</button>
    </div>
  </div>

  <div data-slot="summary">
    <div data-slot="chips">
      <span class="tag-chip">
        <span class="tag-chip-label">status: active</span>
      </span>
      <span class="tag-chip">
        <span class="tag-chip-label">owner: me</span>
        <button class="tag-chip-remove" type="button" aria-label="Remove owner filter">×</button>
      </span>
    </div>
    <span data-slot="meta" class="text-sm">12 results</span>
  </div>
</section>
```

## Open Questions
1. Küçük ekranlarda filter drawer handoff için ayrı pattern notu gerekli mi?
2. `tag-chip` üzerinde tone varyantları filter workflows için daha resmi hale getirilmeli mi?

## Implementation Note (v0.6)
- Playground implementation örneği: `playground/index.html` içinde `data-pattern="filter-bar"` section'ı.
- Data-grid integration örneği: `playground/data-display-example.html`.
- Composite kullanım örnekleri: `docs/architecture/search-filter-composite-examples.md`.
- RFC: `docs/rfcs/patterns/filter-bar-rfc.md`.
