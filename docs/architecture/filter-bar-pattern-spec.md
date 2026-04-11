# Filter Bar Pattern Spec (v0.2)

## Durum
- Status: Draft (pattern spec)
- Scope: v0.2 foundation class surface
- Non-goal: yeni `filter-bar` component class'ı veya yeni filter API

## Amaç
Bu belge, liste/table üstü filtreleme alanı için kullanılan `Filter Bar` pattern'inin mevcut v0.2 surface ile nasıl kurulacağını tanımlar.

## Kapsam ve Sınırlar
Pattern aşağıdaki mevcut sınıflarla kurulmalıdır:
- Layout: `cluster`, `stack`
- Input bileşenleri: `input-group`, `input-group-addon`, `input`, `select`
- Aksiyonlar: `btn`, `btn-outline`, `btn-primary`, `btn-neutral`, `btn-sm`
- Durum göstergeleri: `badge`

`filter-bar` adında canonical class surface v0.2'de yoktur.
Pattern wrapper gerekiyorsa proje-yerel class veya `data-*` attribute kullanılmalıdır.

## Pattern Yapısı
Önerilen alt bölgeler:
1. Search alanı (`input-group` + `input`)
2. Filtre kontrolleri (`select`, `checkbox`, `radio` gibi mevcut surface)
3. Aksiyonlar (apply/reset/export vb. `btn` kompozisyonu)
4. Aktif filtre özeti (`badge` veya metin)

## Override ve Kompozisyon Kuralları
- Filtre bar üzerinde spacing/dizilim farkları utilities ile yapılabilir.
- Utility override istisnai olmalıdır; sürekli override ihtiyacı varsa pattern düzeni gözden geçirilmelidir.
- `btn` için aynı axis'te çakışan class kombinasyonları kullanılmamalıdır.

## Accessibility Beklentileri
- Search input'u erişilebilir label'a sahip olmalıdır (görsel veya `sr-only` yaklaşımı proje tarafında).
- Filtre grupları semantik olarak gruplanmalıdır (`fieldset`/`legend` tercih edilir).
- Sonuç listesini etkileyen kontrol değişiklikleri için davranış net olmalıdır:
  - otomatik uygula, veya
  - "Apply filters" butonu ile açık onay.
- Aktif filtre temizleme aksiyonu klavye ile erişilebilir olmalıdır.

## Contract İlişkisi
- Kullanılan framework class'ları `dist/contracts/selectors.json` içinde yer almalıdır.
- Bu pattern spec, naming/recipe contract dosyalarında değişiklik gerektirmez.

## Minimal Kullanım Örneği
```html
<section class="stack gap-2" data-pattern="filter-bar">
  <div class="cluster gap-2">
    <label class="label" for="search-input">Search</label>
    <div class="input-group">
      <span class="input-group-addon">q</span>
      <input id="search-input" class="input" placeholder="Search records" />
    </div>

    <label class="label" for="status-filter">Status</label>
    <select id="status-filter" class="select">
      <option>All</option>
      <option>Active</option>
      <option>Archived</option>
    </select>

    <button type="button" class="btn btn-outline btn-neutral btn-sm">Reset</button>
    <button type="button" class="btn btn-solid btn-primary btn-sm">Apply</button>
  </div>

  <div class="cluster gap-2">
    <span class="badge">status: active</span>
    <span class="badge">owner: me</span>
  </div>
</section>
```

## Open Questions
1. v0.3'te canonical `filter-bar` wrapper surface tanımlanmalı mı?
2. `active-filter-chip` gibi ayrı semantic surface gerekli mi, yoksa `badge` yeterli mi?

## Implementation Note (v0.2)
- Playground implementation örneği: `playground/index.html` içinde `data-pattern="filter-bar"` section'ı.
- Composite kullanım örnekleri: `docs/architecture/search-filter-composite-examples.md`.
