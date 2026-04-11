# Layout Primitives Refinement Notes (P6 Paket-4)

## Kapsam
Bu not, `container`, `stack`, `cluster`, `sidebar`, `switcher`, `center`, `grid` layout primitives için yapılan refinement kararlarını özetler.

## Primitive Güncellemeleri
- `container`: max genişlik + gutter parametreleri (`--container-max`, `--container-gutter`) ile merkezlenmiş sayfa iskeleti.
- `stack`: daha güvenli genişlik davranışı (`min-inline-size: 0`) ve opsiyonel split-after deseni (`data-stack-split-after`).
- `cluster`: justify ve nowrap senaryoları için data-driven seçenekler.
- `sidebar`: minimum sidebar genişliği ve sağ tarafa alma seçeneği (`data-sidebar-side="end"`).
- `switcher`: minimum item genişliğinin token/custom property ile ayarlanması (`--switcher-min`).
- `center`: özelleştirilebilir max/gutter ve opsiyonel intrinsic centering.
- `grid`: auto-fit tabanlı responsive grid primitive (`--grid-min`, `--grid-gap`).

## Uygulama Notları
- Primitive class adları korunmuştur; mevcut markup kırmadan davranış zenginleştirilmiştir.
- Yeni primitive dosyaları:
  - `packages/layouts/container.css`
  - `packages/layouts/grid.css`
- Güncellenen primitive dosyaları:
  - `packages/layouts/stack.css`
  - `packages/layouts/cluster.css`
  - `packages/layouts/center.css`
  - `packages/layouts/sidebar.css`
  - `packages/layouts/switcher.css`

## Playground Kapsamı
Layout refinement örnekleri `playground/index.html` içinde:
- Layout primitives bölümü (`container`, `grid`, `sidebar`, `switcher`, `center`, `stack`, `cluster` kombinasyonları)
- Split pane örneği (`split-pane`)
