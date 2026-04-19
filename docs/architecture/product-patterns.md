# Product Pattern Docs (v0.2)

## Amaç
Bu belge, v0.2 foundation üzerinde tanımlanan ürün seviyesi pattern'lerin kısa kullanım çerçevesini verir.

Kapsam:
- `page-header`
- `section-block`
- `app-shell`
- `settings-panel` (pattern composition spec)
- `filter-bar` (pattern composition spec)
- `command-bar` (pattern composition spec)
- `data-table-toolbar` (pattern composition spec)

## Pattern 1: Page Header
Canonical surface:
- `page-header`
- `page-header-content`
- `page-header-actions`

Kullanım notu:
- Başlık + açıklama metni `page-header-content` içinde tutulmalıdır.
- Birincil/ikincil aksiyonlar `page-header-actions` içinde gruplanmalıdır.

## Pattern 2: Section Block
Canonical surface:
- `section-block`
- `section-header`
- `section-body`

Kullanım notu:
- Bir settings veya details akışı birden fazla `section-block` ile bölünmelidir.
- `section-header` alanı başlık ve sağ aksiyonu birlikte taşıyabilir.

## Pattern 3: App Shell
Canonical surface:
- `app-shell`
- `app-shell-topbar`
- `app-shell-content`
- `app-shell-sidebar`
- `app-shell-main`

Kullanım notu:
- `app-shell-content` içinde sidebar + main düzeni kurulur.
- Sidebar içerik için `sidebar-nav` surface'i kullanılabilir.

## Pattern 4: Settings Panel
Canonical not:
- v0.2'de `settings-panel` adında canonical framework class'ı yoktur.
- Pattern, `page-header` + `section-block` + `field` + form control surface kompozisyonu ile kurulur.

Kullanım notu:
- Global aksiyonlar `page-header-actions` içinde gruplanmalıdır.
- Ayar grupları `section-block` ile ayrılmalıdır.
- Input state'leri için HTML attribute + mevcut component class yaklaşımı korunmalıdır.

Detay: `docs/architecture/settings-panel-pattern-spec.md`

## Pattern 5: Filter Bar
Canonical not:
- `filter-bar` adında canonical framework class'ı yoktur.
- Pattern, `data-pattern="filter-bar"` wrapper'ı ve `data-slot` contract'i ile kurulur.

Kullanım notu:
- Filtre kontrolleri ve aksiyonlar tek satırda başlayıp küçük ekranlarda satır kırabilmelidir.
- Aktif filtre özeti `tag-chip` veya `badge` ile verilmelidir.

Detay: `docs/architecture/filter-bar-pattern-spec.md`
RFC: `docs/rfcs/patterns/filter-bar-rfc.md`

## Pattern 6: Command Bar
Canonical not:
- v0.2'de `command-bar` adında canonical framework class'ı yoktur.
- Pattern, `search-box` + `btn` + `badge` + layout primitives kompozisyonu ile kurulur.

Kullanım notu:
- Sol tarafta arama, sağ tarafta hızlı aksiyonlar gruplanmalıdır.
- Command palette ile birlikte kullanımda roller ve tetikleyici erişilebilirliği korunmalıdır.

Detay: `docs/architecture/command-bar-pattern-spec.md`

## Pattern 7: Data Table Toolbar
Canonical not:
- `data-table-toolbar` adında canonical framework class'ı yoktur.
- Pattern, `data-pattern="data-table-toolbar"` wrapper'ı ve `data-slot` contract'i ile kurulur.

Kullanım notu:
- Toolbar kontrolleri etkilediği tablo ile ilişkilendirilmelidir (`aria-controls`).
- `column-visibility`, `density`, `export` ve toplu aksiyon alanları ayrı slot grupları halinde kurulmalıdır.
- Seçili satır özeti ve aktif filtre özeti mevcut surface ile verilmelidir.

Detay: `docs/architecture/data-table-toolbar-pattern-spec.md`
RFC: `docs/rfcs/patterns/data-table-toolbar-rfc.md`

## Related Specs/RFCs
- `docs/rfcs/components/page-header-rfc.md`
- `docs/rfcs/components/section-rfc.md`
- `docs/rfcs/components/app-shell-rfc.md`
- `docs/rfcs/components/sidebar-rfc.md`
- `docs/architecture/settings-panel-pattern-spec.md`
- `docs/architecture/filter-bar-pattern-spec.md`
- `docs/architecture/command-bar-pattern-spec.md`
- `docs/architecture/data-table-toolbar-pattern-spec.md`
- `docs/rfcs/patterns/filter-bar-rfc.md`
- `docs/rfcs/patterns/data-table-toolbar-rfc.md`
- `docs/architecture/search-filter-composite-examples.md`
