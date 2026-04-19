# RFC: Empty Search State (v1.0 Pattern)

## Durum
- Status: Draft (implementation-aligned pattern RFC)
- Scope: v1.0 product pattern surface
- Non-goal: auto-suggest, typo correction, full-text search engine

## Amaç
Bu RFC, empty search state pattern'i için canonical attribute surface, variant sözleşmesi (first-use, no-results, filtered-empty), override davranışı, token tüketimi ve erişilebilirlik beklentilerini normatif olarak tanımlar.

## Referanslar
- `docs/contracts/naming-convention-spec.md`
- `docs/architecture/headless-contract-spec.md`
- `packages/components/empty-state.css`
- `packages/components/empty-search-state.css`
- `packages/components/search-box.css`

## Canonical Pattern Surface
`empty-search-state` pattern'i için canonical işaretleme:
- Root: `data-pattern="empty-search-state"`
- Variant: `data-variant="first-use" | "no-results" | "filtered-empty"`
- Icon area: `data-slot="icon"`
- Title: `data-slot="title"`
- Description: `data-slot="description"`
- Action area: `data-slot="actions"`

`empty-search`, `search-empty-state`, `no-results` gibi paralel canonical pattern alias'ları tanımlanmamalıdır.

## Variant Contract
Üç normatif varyant tanımlanır:

### 1. `first-use` — Henüz arama yapılmadı
- **Durum:** Arama alanı boş, başlamak için rehberlik
- **Mesaj:** "Ara" veya "Başlamak için bir arama yapın"
- **Icon:** Arama simgesi veya burada başla işareti
- **Action:** Opsiyonel (başlatma talimatı veya örnek sorgu)
- **Ton:** Pozitif, davetçi

### 2. `no-results` — Arama yapıldı ama sonuç yok
- **Durum:** Arama metni var, eşleşme yok
- **Mesaj:** "Sonuç bulunamadı" veya "{query} için sonuç yok"
- **Icon:** Araştırma veya boş kutu simgesi
- **Action:** Önerilir - arama temizle, terimleri değiştir, filtreleri sıfırla
- **Ton:** Nötr, yardımcı

### 3. `filtered-empty` — Filtreler uygulandı ama sonuç yok
- **Durum:** Filtre(ler) aktif, eşleşme yok
- **Mesaj:** "Seçili filtreler için sonuç bulunamadı"
- **Icon:** Filtre simgesi veya boş kutu
- **Action:** Önerilir - filtreleri düzenle, seçimi temizle
- **Ton:** Nötr, nötr problem çözme

## State Representation
- Hangi varyant aktifse ilgili `data-variant` attribute'u root'ta bulunmalıdır.
- Ayrı canonical state class yüzeyi (`empty-search-state-first-use`, `empty-search-state-active`) tanımlanmaz.

## Composition
Empty search state, mevcut empty-state surface'i yeniden kullanır:
- Root wrapper: `data-pattern="empty-search-state"` ile `empty-state` veya benzer container
- Icon: `empty-state-icon` class'ı
- Title: `empty-state-title` class'ı (opsiyonel `aria-live` bölgesi)
- Description: `empty-state-description` class'ı
- Actions: `empty-state-actions` class'ı

Kabul edilir:
- `<div data-pattern="empty-search-state" data-variant="no-results">` + `empty-state` struktur
- `empty-state-icon`, `empty-state-title`, `empty-state-description`, `empty-state-actions` alt sınıfları

Kabul edilmez:
- Yeni `empty-search-state`, `no-results-state` gibi base class üretimi
- Variant türlerinin ayrı semantic class'lar (`empty-search-first-use`, `empty-search-no-results`) olması

## Override Davranışı
Katman sırası: `reset -> base -> layouts -> recipes -> components -> utilities`.

Kurallar:
1. Empty search state pattern'i `components` layer'dan gelir.
2. Variant stilleri (ikon, renk, layout) utilities ile esnetilebilir.
3. Yeni semantic class eklenmeden mevcut empty-state surface kullanılmalıdır.
4. Variant-spesifik override'lar `data-variant` selector'ü ile yapılabilir.

## Token Tüketimi
- Space: `--space-1`, `--space-2`, `--space-3`
- Colors: `--color-fg-default`, `--color-fg-muted`
- Typography: `--font-size-sm`, `--font-size-lg`

## Accessibility Beklentisi
1. Title (`empty-state-title`) üzerine `aria-live="polite"` ve `aria-label` opsiyonel olarak eklenebilir.
2. Description metni tüm bilgiyi içermelidir; ikon sadece tamamlayıcı olmalıdır.
3. Action button'ları erişilebilir isim taşımalıdır.
4. Screen reader'a "Sonuç bulunamadı" veya "Arama yapın" gibi durum açık olmalıdır.
5. Boş sayfa (no-results), konu kullanıcısına yardımcı olmalı.

## Resolver Kullanım Sözleşmesi
v1.0'da empty-search-state pattern'i için ayrı resolver API tanımlı değildir.

## Open Questions
1. Typo-suggestion (benzer sonuçlar) bu pattern'e dahil edilmeli mi?
2. Recent searches veya popular searches bu pattern'in parçası mı?
3. Variant geçişi (first-use → no-results) runtime mi, template mi yönetilir?

## Önerilen Konum
`docs/rfcs/patterns/empty-search-state-rfc.md`
