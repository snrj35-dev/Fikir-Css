# Command Bar Pattern Spec (v0.2)

## Durum
- Status: Draft (pattern spec)
- Scope: v0.2 foundation class surface
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

## Accessibility Beklentileri
- Arama alanı erişilebilir label taşımalıdır.
- Aksiyonlar gerçek `button`/`a` elementiyle sunulmalıdır.
- Komut paleti tetikleyicisi varsa açık/kapalı durumu erişilebilir attribute ile ifade edilmelidir.

## Contract İlişkisi
- Kullanılan framework class'ları `dist/contracts/selectors.json` içinde olmalıdır.
- Bu spec, naming/recipe contract'ta değişiklik gerektirmez.

## Minimal Kullanım Örneği
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
