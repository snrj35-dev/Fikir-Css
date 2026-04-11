# Dense Data Display Examples (v0.2)

## Amaç
Bu doküman, P4 paket-1 kapsamında table ve empty-state surface'lerinin birlikte nasıl kullanılacağını örnekler.

## Örnek 1: Table (normal yoğunluk)
```html
<table class="table" aria-label="Invoices">
  <thead class="table-head">
    <tr class="table-row">
      <th class="table-head-cell" scope="col">Invoice</th>
      <th class="table-head-cell" scope="col">Owner</th>
      <th class="table-head-cell" scope="col">Status</th>
    </tr>
  </thead>
  <tbody class="table-body">
    <tr class="table-row">
      <td class="table-cell">INV-1042</td>
      <td class="table-cell">Ada</td>
      <td class="table-cell">Paid</td>
    </tr>
  </tbody>
</table>
```

## Örnek 2: Seçili satır
```html
<tr class="table-row" data-row-selected="true">
  <td class="table-cell">INV-1043</td>
  <td class="table-cell">Grace</td>
  <td class="table-cell">Review</td>
</tr>
```

## Örnek 3: Sonuç yoksa empty-state fallback
```html
<section class="empty-state" aria-label="No records">
  <span class="empty-state-media" aria-hidden="true">0</span>
  <h3 class="empty-state-title">No records found</h3>
  <p class="empty-state-description">Try clearing active filters or creating a new record.</p>
  <div class="empty-state-actions">
    <button class="btn btn-outline btn-sm" type="button">Reset filters</button>
    <button class="btn btn-primary btn-sm" type="button">Create record</button>
  </div>
</section>
```

## Örnek 4: Minimal Data Grid
```html
<section class="data-grid" role="grid" aria-label="Revenue grid">
  <div class="data-grid-head" role="rowgroup">
    <div class="data-grid-row" role="row" style="--data-grid-columns: 3">
      <div class="data-grid-cell" role="columnheader">Account</div>
      <div class="data-grid-cell" role="columnheader">Owner</div>
      <div class="data-grid-cell" role="columnheader">MRR</div>
    </div>
  </div>
  <div class="data-grid-body" role="rowgroup">
    <div class="data-grid-row" role="row" data-row-selected="true" style="--data-grid-columns: 3">
      <div class="data-grid-cell" role="gridcell">Pulse Ops</div>
      <div class="data-grid-cell" role="gridcell">Grace</div>
      <div class="data-grid-cell" role="gridcell">$22,900</div>
    </div>
  </div>
</section>
```

## Notlar
- v0.2'de dense/compact table için ayrı canonical class tanımlı değildir.
- Yoğunluk farkı gerekiyorsa utility tabanlı yaklaşım tercih edilmelidir.
- Data Grid ilk iterasyonunda behavior-ağır özellikler kapsam dışıdır; gösterim odaklı minimal surface hedeflenir.
