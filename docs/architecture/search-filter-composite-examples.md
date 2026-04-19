# Search + Filter Composite Examples (v0.2)

## Amaç
Bu belge, arama ve filtre yüzeylerinin birlikte nasıl kullanılacağını kısa örneklerle gösterir.

## Composite 1: Command Bar + Filter Bar
```html
<section class="stack gap-2">
  <div data-pattern="command-bar" class="cluster gap-2">
    <form class="search-box" role="search" aria-label="Search records">
      <input class="search-box-input" type="search" aria-label="Search query" />
      <button class="search-box-action" type="submit">Search</button>
    </form>
    <button class="btn btn-outline btn-sm" type="button">Quick open</button>
  </div>

  <div data-pattern="filter-bar">
    <div data-slot="controls">
      <div data-slot="search">
        <form class="search-box" role="search" aria-label="Search records">
          <input class="search-box-input" type="search" aria-label="Search query" />
          <button class="search-box-action" type="submit">Search</button>
        </form>
      </div>

      <div data-slot="filters">
        <label class="label" for="status-filter">Status</label>
        <select id="status-filter" class="select">
          <option>All</option>
          <option>Active</option>
          <option>Archived</option>
        </select>
      </div>

      <div data-slot="reset">
        <button class="btn btn-outline btn-sm" type="button">Reset</button>
      </div>

      <div data-slot="actions">
        <button class="btn btn-primary btn-sm" type="button">Apply</button>
      </div>
    </div>
  </div>
</section>
```

## Composite 2: Search + Filters + Result Summary
```html
<section class="stack gap-2">
  <form class="search-box" role="search">
    <input class="search-box-input" type="search" aria-label="Search query" />
    <button class="search-box-action" type="submit">Search</button>
  </form>

  <div class="cluster gap-2">
    <span class="badge">status: active</span>
    <span class="badge">owner: platform</span>
    <span class="text-sm">12 results</span>
  </div>
</section>
```

## Notlar
- Bu örnekler pattern compositional düzeydedir, yeni canonical class tanımlamaz.
- `filter-bar` ve `data-table-toolbar` slot contract'i `docs/architecture/headless-contract-spec.md` içinde kayıtlıdır.
- Filtre state yönetimi consumer sorumluluğundadır.
