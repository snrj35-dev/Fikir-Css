# RFC: Command Bar (v1.0 Product Pattern)

## Durum
- Status: Accepted (implementation-aligned RFC)
- Scope: v1.0 beta product pattern
- Non-goal: komut routing motoru, keyboard shortcut registry, async action queue

## Amaç
Bu RFC, command-bar için canonical slot surface, app-shell entegrasyon sözleşmesi, arama + hızlı aksiyon kompozisyonu, responsive davranış ve erişilebilirlik beklentilerini normatif olarak tanımlar.

## Referanslar
- `packages/components/command-bar.css`
- `packages/components/search-box.css`
- `packages/components/app-shell.css`
- `docs/components/command-bar.md`

## Canonical Pattern Surface
Command bar için canonical marker:
- Root: `[data-pattern="command-bar"]`

Slot contract:
- `[data-slot="actions"]` — hızlı aksiyon butonları container'ı (opsiyonel)

Alt bileşenler için yeniden kullanılan surface'ler:
- Arama: `class="search-box"` > `search-box-input` + `search-box-action`
- Aksiyon butonları: `class="btn"` varyantları
- Durum badge'i: `class="badge"` (opsiyonel, slot dışında konumlandırılır)

`top-bar`, `app-command-bar`, `action-bar`, `toolbar` gibi paralel alias'lar tanımlanmaz.

## App-Shell Entegrasyon Sözleşmesi
Command bar, `app-shell-topbar` veya özel bir header içine yerleştirilir:
- Flex-grow ile mevcut genişliği doldurur
- Topbar spacing/padding'i app-shell tarafından yönetilir
- Stateless layout pattern'dır; kendi state'i yoktur

## State Representation
Pattern stateless'tır. Alt bileşenler kendi state'lerini yönetir:
- Search input: `search-box-input:focus`, `:not(:placeholder-shown)`
- Button states: standart button hover/active/disabled
- Badge states: standart badge tone varyantları

## Responsive Davranış
- Default: flex row (arama solda, aksiyonlar sağda)
- < 48rem: flex column (arama üstte, aksiyonlar altta)

## Erişilebilirlik Beklentileri
- `search-box` wrapper için `role="search"` + `aria-label` zorunludur
- `search-box-input` için `aria-label` zorunludur
- Action butonları için açıklayıcı metin veya `aria-label` zorunludur
- Command palette bağlantısı varsa `aria-haspopup="dialog"` + `aria-controls` eklenir
