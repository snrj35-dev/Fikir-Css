# Skeleton to Content Transition — Canonical Recipe

> Status: **Stable** · Added 2026-04-24 (M23)
> Source of truth: `skeleton`, `skeleton-table`, `skeleton-table-row`, `skeleton-text`, `skeleton-circle`, `table`, `card`.

This recipe covers the most common loading handoff: render a believable table skeleton immediately, keep the region `aria-busy`, then swap to real rows only when the payload is ready. The goal is continuity, not a timer-based fake delay.

## Markup

```html
<section class="card card-p-md" aria-labelledby="invoices-title">
  <header>
    <h2 id="invoices-title">Recent invoices</h2>
  </header>

  <div id="invoices-region" aria-busy="true" aria-live="polite">
    <div id="invoices-skeleton" class="skeleton-table" aria-hidden="true">
      <div class="skeleton-table-row">
        <span class="skeleton skeleton-circle"></span>
        <span class="skeleton skeleton-text"></span>
        <span class="skeleton skeleton-text"></span>
        <span class="skeleton skeleton-text"></span>
      </div>
      <div class="skeleton-table-row">
        <span class="skeleton skeleton-circle"></span>
        <span class="skeleton skeleton-text"></span>
        <span class="skeleton skeleton-text"></span>
        <span class="skeleton skeleton-text"></span>
      </div>
      <div class="skeleton-table-row">
        <span class="skeleton skeleton-circle"></span>
        <span class="skeleton skeleton-text"></span>
        <span class="skeleton skeleton-text"></span>
        <span class="skeleton skeleton-text"></span>
      </div>
    </div>

    <table id="invoices-table" class="table" aria-label="Recent invoices" hidden>
      <thead class="table-head">
        <tr class="table-row">
          <th class="table-head-cell" scope="col">Invoice</th>
          <th class="table-head-cell" scope="col">Customer</th>
          <th class="table-head-cell" scope="col">Amount</th>
          <th class="table-head-cell" scope="col">Status</th>
        </tr>
      </thead>
      <tbody class="table-body"></tbody>
    </table>
  </div>
</section>
```

## Minimal handoff script

```js
const region = document.getElementById("invoices-region");
const skeleton = document.getElementById("invoices-skeleton");
const table = document.getElementById("invoices-table");
const tbody = table.querySelector(".table-body");

async function loadInvoices() {
  const response = await fetch("/api/invoices");
  const rows = await response.json();

  tbody.innerHTML = rows.map((row) => `
    <tr class="table-row">
      <td class="table-cell">${row.id}</td>
      <td class="table-cell">${row.customer}</td>
      <td class="table-cell">${row.amount}</td>
      <td class="table-cell">${row.status}</td>
    </tr>
  `).join("");

  skeleton.animate(
    [{ opacity: 1 }, { opacity: 0 }],
    { duration: 180, easing: "ease-out", fill: "forwards" }
  ).finished.finally(() => {
    skeleton.hidden = true;
    table.hidden = false;
    region.setAttribute("aria-busy", "false");
  });
}

loadInvoices();
```

## Timing rules

- Show the skeleton immediately when the region mounts.
- Replace it only when data is actually available.
- Keep the fade short, around 120-200ms, so the handoff feels intentional without making the UI feel slower.
- If data resolves almost instantly, you can skip the animation and render the final content directly.

## Reduced-motion safe variant

If your app respects `prefers-reduced-motion`, keep the same markup and simply skip the fade:

```js
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (reduceMotion) {
  skeleton.hidden = true;
  table.hidden = false;
  region.setAttribute("aria-busy", "false");
}
```

## Why this pattern works

- `skeleton-table` mirrors the rhythm of the real table instead of showing generic bars.
- The loaded table already exists in the DOM, so the swap is simple and predictable.
- `aria-busy="true"` keeps assistive tech informed while the region is incomplete.
- The recipe stays additive: no custom skeleton variant class is needed.

## Accessibility checklist

- [ ] Loading region uses `aria-busy="true"` until real rows are rendered.
- [ ] Skeleton block is `aria-hidden="true"` because it is decorative.
- [ ] Final table has a stable accessible name.
- [ ] Transition is skipped or simplified for reduced-motion users.
- [ ] Error handling replaces the skeleton with an error or empty state, not a stuck shimmer.

## Related

- `docs/components/skeleton.md`
- `docs/components/table.md`
- `docs/components/card.md`
