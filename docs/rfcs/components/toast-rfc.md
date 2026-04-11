# RFC: Toast (v0.2 Foundation)

## Durum
- Status: Draft (documentation RFC)
- Scope: v0.2 mevcut foundation surface
- Non-goal: queue manager veya cross-tab notification sistemi eklemek

## Amaç
Bu RFC, toast için canonical class surface, override davranışı, token tüketimi, erişilebilirlik beklentisi ve recipe ilişkisini normatif olarak tanımlar.

## Referanslar
- `docs/contracts/naming-convention-spec.md`
- `docs/contracts/token-dictionary-spec.md`
- `contracts/naming.contract.mjs`
- `packages/components/toast.css`

## Canonical Class Surface
Toast için canonical class adları:
- Container: `toast-viewport`
- Item: `toast`

`toast-item`, `toast-container`, `notification-toast` gibi paralel canonical class yüzeyi tanımlanmamalıdır.

## State Representation
- Açık/kapalı state toast node'u üzerinde `data-open="true|false"` ile temsil edilmelidir.
- Tone state gerekiyorsa `data-tone="danger"` gibi attribute ile temsil edilmelidir.
- Ayrı canonical class yüzeyi (`toast-open`, `toast-closed`, `toast-danger`) tanımlanmaz.

## Recipe İlişkisi
v0.2'de toast class surface recipe tarafından üretilmez.

## Override Davranışı
Katman sırası: `reset -> base -> layouts -> recipes -> components -> utilities`.

Kurallar:
1. `toast` ve `toast-viewport` temel davranışı `components` layer'dan gelir.
2. Utility class'ları gerektiğinde wrapper/item üzerinde override amaçlı kullanılabilir.
3. `force-*` utility yalnızca escape-hatch olarak kullanılabilir.

## Token Tüketimi
Toast aşağıdaki tokenları tüketir:
- Space: `--space-2`, `--space-3`, `--space-4`
- Radius: `--radius-md`
- Shadow: `--shadow-md`
- Color semantic: `--color-border-subtle`, `--color-bg-surface`, `--color-fg-default`, `--color-danger`

## Accessibility Beklentisi
1. Toast container `aria-live` (örn. `polite`) ve `aria-atomic` kullanmalıdır.
2. Kapatma aksiyonu klavye ile erişilebilir olmalıdır.
3. Toast yalnızca renk ile anlam taşımamalıdır; metin açık olmalıdır.
4. Kritik hata mesajlarında `aria-live="assertive"` tüketici tarafından bilinçli seçilmelidir.

## Resolver Kullanım Sözleşmesi
v0.2'de toast için resolver API tanımlı değildir.

## Open Questions
1. Toast queue kapasitesi ve sıralama politikası framework içinde mi, tüketicide mi kalmalı?
2. Auto-dismiss süresi component default'u olarak mı, consumer tarafında mı yönetilmeli?

## Önerilen Konum
`docs/rfcs/components/toast-rfc.md`
