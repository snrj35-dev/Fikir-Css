# Data Table Toolbar + Pagination — Canonical Recipe

> Status: **Stable** · Added 2026-04-24 (M23)
> Source of truth: `data-table-toolbar`, `table`, `pagination`, `checkbox`, `tag-chip`, `search-box`, `select`, `button`.

This recipe shows the common admin-table flow in one copy-pasteable composition: search, filters, bulk selection, sticky header, summary row, and bottom pagination. It keeps every concern on the public surface so the toolbar, table, and pager can evolve independently.

## Markup

```html
<section data-pattern="data-table-toolbar" aria-labelledby="orders-title">
  <div data-slot="controls">
    <div data-slot="search">
      <form class="search-box" role="search" aria-label="Search orders">
        <input class="search-box-input" type="search" aria-label="Search orders" placeholder="Order id, customer, email" />
        <button class="search-box-action" type="submit">Search</button>
      </form>
    </div>

    <div data-slot="filters">
      <label class="label" for="order-status">Status</label>
      <select class="select select-sm" id="order-status" aria-controls="orders-table">
        <option value="">All statuses</option>
        <option selected>Paid</option>
        <option>Pending</option>
        <option>Refunded</option>
      </select>
    </div>

    <div data-slot="column-visibility">
      <button class="btn btn-outline btn-sm" type="button" aria-controls="orders-table">
        Columns
      </button>
    </div>

    <div data-slot="density">
      <label class="label" for="order-density">Density</label>
      <select class="select select-sm" id="order-density" aria-controls="orders-table">
        <option>Compact</option>
        <option selected>Default</option>
        <option>Comfortable</option>
      </select>
    </div>

    <div data-slot="actions">
      <div data-slot="export">
        <button class="btn btn-outline btn-sm" type="button" aria-controls="orders-table">
          Export CSV
        </button>
      </div>
      <button class="btn btn-primary btn-sm" type="button" aria-controls="orders-table">
        Archive selected
      </button>
    </div>
  </div>

  <div data-slot="summary">
    <div data-slot="active-filters">
      <span class="tag-chip">
        <span class="tag-chip-label">status: paid</span>
        <button class="tag-chip-remove" type="button" aria-label="Remove paid filter">×</button>
      </span>
    </div>

    <div data-slot="selection-summary" class="text-sm" aria-live="polite" aria-atomic="true">
      2 orders selected
    </div>
  </div>

  <div data-slot="surface">
    <div style="overflow-x: auto; max-block-size: 28rem;">
      <table class="table" id="orders-table" aria-label="Orders table">
        <thead class="table-head">
          <tr class="table-row">
            <th class="table-head-cell" scope="col">
              <input class="checkbox" type="checkbox" aria-label="Select all orders" />
            </th>
            <th class="table-head-cell" scope="col">Order</th>
            <th class="table-head-cell" scope="col">Customer</th>
            <th class="table-head-cell" scope="col">Amount</th>
            <th class="table-head-cell" scope="col">Status</th>
          </tr>
        </thead>
        <tbody class="table-body">
          <tr class="table-row" data-row-selected="true">
            <td class="table-cell">
              <input class="checkbox" type="checkbox" checked aria-label="Select order 1042" />
            </td>
            <td class="table-cell">#1042</td>
            <td class="table-cell">Ada Lovelace</td>
            <td class="table-cell">$320.00</td>
            <td class="table-cell">Paid</td>
          </tr>
          <tr class="table-row" data-row-selected="true">
            <td class="table-cell">
              <input class="checkbox" type="checkbox" checked aria-label="Select order 1043" />
            </td>
            <td class="table-cell">#1043</td>
            <td class="table-cell">Grace Hopper</td>
            <td class="table-cell">$120.00</td>
            <td class="table-cell">Paid</td>
          </tr>
          <tr class="table-row">
            <td class="table-cell">
              <input class="checkbox" type="checkbox" aria-label="Select order 1044" />
            </td>
            <td class="table-cell">#1044</td>
            <td class="table-cell">Linus Torvalds</td>
            <td class="table-cell">$88.00</td>
            <td class="table-cell">Pending</td>
          </tr>
        </tbody>
      </table>
    </div>

    <nav class="pagination pagination-md" aria-label="Orders pagination" style="margin-block-start: var(--space-4);">
      <button class="pagination-item" type="button" aria-label="Previous page" disabled>Prev</button>
      <a class="pagination-item" href="?page=1" aria-current="page">1</a>
      <a class="pagination-item" href="?page=2">2</a>
      <a class="pagination-item" href="?page=3">3</a>
      <span aria-hidden="true">…</span>
      <a class="pagination-item" href="?page=12">12</a>
      <button class="pagination-item" type="button" aria-label="Next page">Next</button>
    </nav>
  </div>
</section>
```

## Sticky header rule

Keep sticky behavior as app-level CSS on the controlled surface, not as a custom table variant:

```css
[data-pattern="data-table-toolbar"] [data-slot="surface"] {
  overflow: auto;
}

[data-pattern="data-table-toolbar"] .table-head-cell {
  position: sticky;
  inset-block-start: 0;
  z-index: 1;
  background: var(--color-bg-surface);
}
```

## Selection wiring

- Row checkboxes are native `checkbox` controls inside the first column.
- Bulk actions stay visible in `[data-slot="actions"]`, but you can disable them until at least one row is selected.
- `[data-slot="selection-summary"]` is the single source of truth for the selected count and should update with `aria-live="polite"`.
- Active filter chips live in `[data-slot="active-filters"]`; remove buttons clear the corresponding filter and then refresh the table query.

## Pagination wiring

Use `pagination-item` for both links and button-like controls. Keep the table query, active filters, and current page in the same state object so page changes do not reset toolbar selections unexpectedly.

```js
const state = {
  page: 1,
  status: "paid",
  selectedIds: new Set(["1042", "1043"])
};
```

If your rows are server-driven, submit `page`, `search`, `filters`, and `density` together. If your rows are client-filtered, update the visible slice first and then sync `aria-current="page"` on the pager.

## Accessibility checklist

- [ ] Search area is a real `<form role="search">` with an explicit label.
- [ ] Density and filter controls point at the table with `aria-controls="orders-table"`.
- [ ] Row-selection checkboxes have unique `aria-label` text.
- [ ] Selected-count text lives in `[data-slot="selection-summary"]` with `aria-live="polite"`.
- [ ] Current page uses `aria-current="page"` on the active `pagination-item`.
- [ ] Sticky header preserves readable contrast against scrolling rows.

## Related

- `docs/components/data-table-toolbar.md`
- `docs/components/table.md`
- `docs/components/pagination.md`
- `docs/patterns/form-layout.md`
