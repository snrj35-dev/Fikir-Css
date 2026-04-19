# Command Bar Pattern Spec (v1.0)

## Durum
- Status: Accepted (implemented pattern spec)
- Scope: v1.0 foundation class surface
- Non-goal: global hotkey manager, command routing engine, fuzzy search behavior

## Amaç
Bu belge, ürün üst çubuğunda komut ve arama aksiyonlarını birleştiren `Command Bar` pattern'ini mevcut v0.2 surface ile tanımlar.

## Kapsam ve Sınırlar
Pattern aşağıdaki mevcut sınıflarla kurulmalıdır:
- Layout: `cluster`, `stack`, `switcher`
- Search: `search-box`, `search-box-input`, `search-box-action`
- Actions: `btn`, `btn-outline`, `btn-primary`, `btn-neutral`, `btn-sm`
- Status: `badge`

`command-bar` adında canonical framework class yüzeyi v0.2'de yoktur.
Pattern wrapper gerekiyorsa proje-yerel class veya `data-pattern="command-bar"` kullanılmalıdır.

## Pattern Yapısı
Önerilen alt bölgeler:
1. Sol: arama giriş alanı (search-box)
2. Sağ: hızlı aksiyonlar (new, export, shortcuts)
3. Opsiyonel: durum etiketi (`badge`) veya context bilgisi

## Override ve Kompozisyon Kuralları
- Spacing/dizilim farkları utilities veya layout primitives ile yapılmalıdır.
- Sürekli override ihtiyacı varsa pattern kompozisyonu gözden geçirilmelidir.
- `btn` axis çakışmaları aynı node üzerinde birlikte kullanılmamalıdır.

## App-shell / Top Area Integration
Command bar tipik olarak uygulamanın üst toolbar alanında yer alır:

```
┌──────────────────────────────────────────────────────┐
│ [Logo] [search] [quick action] [badge] [user menu]   │  <- app-shell-topbar
└──────────────────────────────────────────────────────┘
```

**Rules:**
- `app-shell-topbar` içinde `data-pattern="command-bar"` ile işaretlenebilir
- Layout genellikle `cluster` + `stack` kombinasyonu olur
- Responsive davranış: narrow ekranlarda search icon-only, tablet+da search açılır
- Diğer topbar elemanları (logo, user menu) ile aynı flex context'te yer alır
- Focus order: search input → quick actions → user menu (soldan sağa)

## Accessibility Beklentileri
- Arama alanı erişilebilir label taşımalıdır (`aria-label` veya `<label>`).
- Aksiyonlar gerçek `button`/`a` elementiyle sunulmalıdır.
- Komut paleti tetikleyicisi varsa açık/kapalı durumu erişilebilir attribute ile ifade edilmelidir.
- Tab sırası: search input → action buttons → diğer topbar controls doğal akışta ilerlemeli.
- Screen reader: search alanının amacı açık olmalı ("Command bar search", "Product search" vs).

## Contract İlişkisi
- Kullanılan framework class'ları `dist/contracts/selectors.json` içinde olmalıdır.
- BCommand Bar vs Command Palette Boundary (v1.0)

**Command Bar (this pattern):**
- Üst toolbar bölgesinde yer alan arama + quick actions kombinasyonu
- Kullanıcı arama ve temel eylemleri hızlı erişsin diye
- Persistent, her zaman görünür, app context'te yer alır

**Command Palette (separate surface):**
- Global keyboard shortcut (`Ctrl+K` / `⌘K`) ile modal overlay olarak açılır
- Fuzzy search, full command discovery, keyboard-first navigation
- `command-palette` CSS surface ile desteklenir
- App-shell tarafından bağımsız, JavaScript hotkey manager gerektirir

**Integration:**
- Command bar search ve command palette çoğunlukla farklı amaca hizmet eder
- Command bar: "Bu sayfada ara/filtrele"
- Command palette: "Global komut ara, uygulamaya git"
- Aynı `input` elemanını paylaştırılamaz; ikisi de sağlana bilebilir (örn: navbar'da search + keyboard shortcut talimatı)
```html
<section class="stack gap-2" data-pattern="command-bar">
  <div class="cluster gap-2">
    <form class="search-box" role="search" aria-label="Command bar search">
      <input class="search-box-input" type="search" aria-label="Search" />
      <button class="search-box-action" type="submit">Search</button>
    </form>

    <button class="btn btn-outline btn-sm" type="button">Quick open</button>
    <button class="btn btn-primary btn-sm" type="button">New record</button>
    <span class="badge">project: core</span>
  </div>
</section>
```

## Open Questions
1. Command bar ve command palette arasındaki sorumluluk sınırı v0.3'te daha net ayrıştırılmalı mı?
2. Kısayol gösterimleri (`⌘K`) için ayrı semantic surface gerekli mi?
