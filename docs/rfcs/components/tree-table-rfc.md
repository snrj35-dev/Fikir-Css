# RFC: Tree Table Pattern (v1.0 Product Pattern)

## Durum
- Status: Accepted (implementation-aligned RFC)
- Scope: v1.0 supported product pattern
- Non-goal: virtualized tree rendering, drag-and-drop reordering, lazy-load subtree fetching, roving tabindex runtime

## Amaç
Bu RFC, tree-table için canonical data-* pattern surface, indent/expand/collapse row state sözleşmesi, ARIA hiyerarşi modeli ve tablo entegrasyon kurallarını normatif olarak tanımlar.

## Referanslar
- `packages/components/tree-table.css`
- `packages/components/tree-view.css`
- `packages/components/table.css`
- `docs/components/tree-table.md`

## Canonical Pattern Surface
Tree table için canonical marker:
- Root: `[data-pattern="tree-table"]` — `<table>` element üzerinde uygulanır

Row-level attributes:
- `role="treeitem"` — her satırda (branch veya leaf)
- `aria-expanded="true|false"` — yalnızca child'ı olan (branch) satırlarda
- `data-tree-level="N"` — girinti derinliği (0 = root, 1 = child, 2 = grandchild…)
- `data-hidden="true|false"` — CSS display:none ile gizleme için

Cell-level classes:
- `.tree-table-cell-toggle` — genişlet/daralt butonu hücresi
- `.tree-view-toggle` — toggle button elementi
- `.tree-table-cell-toggle-placeholder` — leaf node'larda boşluk için
- `.tree-table-cell` — standart veri hücreleri

`tree-grid`, `hierarchical-table`, `nested-table`, `outline-table` gibi paralel alias'lar tanımlanmaz.

## ARIA Modeli
WAI-ARIA treegrid pattern referans alınmıştır:
- Tablo kapsayıcısında `aria-label` zorunludur
- Branch satırlarında `role="treeitem"` + `aria-expanded` zorunludur
- Leaf satırlarında `role="treeitem"` (aria-expanded olmadan) kullanılır
- Toggle butonunda `aria-expanded` satırla senkronize tutulur

## State Representation
- `aria-expanded="true"` — branch açık; child satırlar görünür
- `aria-expanded="false"` — branch kapalı; child satırlar `data-hidden="true"` ile gizli
- `aria-selected="true"` — satır seçili (isteğe bağlı multi-select için)
- CSS: `[data-hidden="true"] { display: none; }` ile gizleme

## Indent Sistemi
- `data-tree-level="N"` + CSS `padding-inline-start: calc(N * --tree-table-indent-size)` ile girinti sağlanır
- `--tree-table-indent-size` (default: `--space-4`) override edilebilir

## Expand/Collapse Sözleşmesi
JS sorumlulukları:
1. Toggle butonuna click handler ekle
2. `aria-expanded` değerini satır ve toggle buton üzerinde güncelle
3. Child satırları `data-hidden="true|false"` ile göster/gizle
4. Daraltma sırasında tüm alt torunları da gizle (yalnızca direct child'ı değil)

## Erişilebilirlik Beklentileri
- Tablo üzerinde `aria-label` zorunludur
- Toggle butonlarında `aria-label` veya görünür metin olmalıdır
- Klavye: Enter/Space ile expand/collapse, ↑↓ ile satır navigasyonu (JS gerektirir)
- `role="tree"` kullanılmaz; ARIA treegrid pattern yerine table + treeitem combination tercih edilir

## Token Tüketimi
- `--tree-table-indent-size` (default: `--space-4`)
