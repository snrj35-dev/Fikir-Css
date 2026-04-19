# RFC: Empty Search State (v1.0 Product Pattern)

## Durum
- Status: Accepted (implementation-aligned RFC)
- Scope: v1.0 supported product pattern
- Non-goal: animation engine, search suggestions API, query highlighting

## Amaç
Bu RFC, empty-search-state pattern için canonical data-* surface, üç semantik varyant (first-use, no-results, filtered-empty), slot contract ve erişilebilirlik beklentilerini normatif olarak tanımlar.

## Referanslar
- `packages/components/empty-search-state.css`
- `docs/components/empty-search-state.md`

## Canonical Pattern Surface
Empty search state için canonical marker:
- Root: `[data-pattern="empty-search-state"]`
- Varyant: `[data-variant="first-use|no-results|filtered-empty"]`

Slot contract:
- `[data-slot="icon"]` — dekoratif ikon (aria-hidden zorunlu)
- `[data-slot="title"]` — başlık (h2 veya uygun heading seviyesi)
- `[data-slot="description"]` — açıklama metni
- `[data-slot="actions"]` — aksiyon butonları (Clear, Browse vb.)

`empty-state`, `no-results-state`, `search-empty` gibi paralel alias'lar tanımlanmaz.
`empty-state` component ile ayrımdır: generic empty-state genel boşluk için, `empty-search-state` yalnızca arama/filtre bağlamı için kullanılır.

## Semantik Varyantlar
- `first-use` — arama henüz yapılmamış; arama yapmaya teşvik
- `no-results` — arama yapıldı ama sonuç yok; kurtarma önerileri
- `filtered-empty` — filtreler uygulandı ama eşleşme yok; filtre ayarlama önerileri

## State Representation
Pattern kendi state'ini tutmaz. Varyant `data-variant` attribute'u ile belirtilir; gösterim/gizleme JS tarafından yönetilir.

## Erişilebilirlik Beklentileri
- `[data-slot="icon"]` üzerinde `aria-hidden="true"` zorunludur
- `[data-slot="title"]` için semantik heading kullanılmalıdır (h2, h3 vb.)
- Container için `role="status"` veya `aria-live="polite"` arama sonuçları değiştiğinde eklenebilir
- Action butonları için net `aria-label` önerilir
