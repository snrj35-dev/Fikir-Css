# RFC: Coachmark / Tour Pattern (v1.0 Product Pattern)

## Durum
- Status: Accepted (implementation-aligned RFC)
- Kapsam kararı: Pattern (CSS-only layout; JS onboarding orchestration kapsam dışı)
- Non-goal: multi-step tour engine, scroll-into-view logic, spotlight/overlay engine, step persistence

## Amaç
Bu RFC, coachmark single-annotation pattern için canonical data-* surface, konumlandırma contract'ı, açıklama slot'ları ve erişilebilirlik beklentilerini normatif olarak tanımlar.

## Referanslar
- `packages/components/coachmark.css`
- `docs/components/coachmark.md`

## Pattern Kapsam Kararı
Coachmark, tek bir annotation balloon/popover olarak implement edilmiştir. Multi-step tour orchestration (step sayacı, ileri/geri navigasyonu, spotlight/backdrop) Fikir CSS'in kapsamı dışındadır ve uygulama katmanına bırakılır.

Pattern odağı: **tek bir hedef elementi işaret eden açıklama baloncuğu** layoutu ve stillemesi.

## Canonical Pattern Surface
Coachmark için canonical marker:
- Root: `[data-pattern="coachmark"]`
- Konum: `[data-placement="top|bottom|left|right"]` (default: `bottom`)

Slot contract:
- `[data-slot="arrow"]` — işaret oku (opsiyonel, CSS ile çizilir)
- `[data-slot="header"]` — başlık satırı (title + opsiyonel adım sayacı)
- `[data-slot="title"]` — annotation başlığı
- `[data-slot="step"]` — adım göstergesi ("1 / 4" gibi)
- `[data-slot="body"]` — açıklama metni
- `[data-slot="footer"]` — aksiyon butonları (Skip / Next / Got it)
- `[data-slot="close"]` — kapat butonu (header köşesi)

`tour-step`, `onboarding-tip`, `tutorial-bubble`, `hint-popover` gibi paralel alias'lar tanımlanmaz.

## Konumlandırma Sözleşmesi
CSS kendi konumlandırma mantığını sağlamaz; bileşen `position: absolute` veya `position: fixed` ile uygulamanın JS katmanı tarafından konumlandırılır. `data-placement` attribute'u yalnızca ok yönü için CSS hook olarak kullanılır.

## State Representation
- `data-state="visible"` — coachmark aktif ve görünür
- `data-state="hidden"` — coachmark gizli (`display: none`)
- Konumlandırma: JS ile `top`, `left` style property'leri güncellenir

## Erişilebilirlik Beklentileri
- Root üzerinde `role="dialog"` + `aria-labelledby="[title-id]"` zorunludur
- `[data-slot="close"]` butonunda `aria-label="Kapat"` zorunludur
- Coachmark açıldığında focus `[data-slot="close"]` veya ilk aksiyon butonuna taşınmalıdır (JS sorumluluğu)
- Coachmark kapatıldığında focus tetikleyen elemente geri dönmelidir
- İçerik için `aria-describedby` ile body slot ilişkilendirilebilir

## Token Tüketimi
Coachmark standart token set'ini kullanır:
- Background: `--color-bg-surface`
- Border: `--color-border-subtle`
- Radius: `--radius-lg`
- Shadow: `--shadow-lg`
- Padding: `--space-4`
- Gap: `--space-3`
