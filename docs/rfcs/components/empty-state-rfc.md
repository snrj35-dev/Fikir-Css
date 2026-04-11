# RFC: Empty State (v0.2 Foundation)

## Durum
- Status: Draft (documentation RFC)
- Scope: v0.2 mevcut foundation surface
- Non-goal: icon set, illustration pack veya ürün-özel içerik varyantları eklemek

## Amaç
Bu RFC, empty state için canonical class surface, override davranışı, token tüketimi, erişilebilirlik beklentisi ve recipe ilişkisini normatif olarak tanımlar.

## Referanslar
- `docs/contracts/naming-convention-spec.md`
- `docs/contracts/token-dictionary-spec.md`
- `contracts/naming.contract.mjs`
- `packages/components/empty-state.css`

## Canonical Class Surface
Empty state için canonical class adları:
- Root: `empty-state`
- Media: `empty-state-media`
- Title: `empty-state-title`
- Description: `empty-state-description`
- Actions: `empty-state-actions`

`empty`, `blank-state`, `zero-state`, `empty-panel` gibi paralel canonical class yüzeyi tanımlanmamalıdır.

## State Representation
- v0.2'de empty state için ayrı durum class yüzeyi tanımlanmaz.
- Durum farkları içerik/aksiyon seviyesinde temsil edilmelidir.

## Recipe İlişkisi
v0.2'de empty-state class surface recipe tarafından üretilmez.

## Override Davranışı
Katman sırası: `reset -> base -> layouts -> recipes -> components -> utilities`.

Kurallar:
1. Empty state surface `components` layer'dan gelir.
2. Utility class'ları root ve alt slot düzeyinde override amaçlı kullanılabilir.
3. `force-*` utility yalnızca escape-hatch olarak kullanılabilir.

## Token Tüketimi
Empty state surface aşağıdaki tokenları tüketir:
- Space: `--space-2`, `--space-3`, `--space-4`
- Radius: `--radius-md`
- Color semantic: `--color-bg-surface`, `--color-bg-default`, `--color-border-subtle`, `--color-fg-default`, `--color-fg-muted`
- Typography: `--font-size-sm`, `--font-size-md`

Normatif kural:
- İçerik ağırlıklı yüzeylerde semantic tokenlar kullanılmalıdır.
- Core tokenlar doğrudan karar mekanizması olarak varsayılan olmamalıdır.

## Accessibility Beklentisi
1. Empty state bölgesi anlamlı bir landmark içinde kullanılmalıdır (`section`, `article`, ilgili `aria-label`).
2. Başlık ve açıklama metni hiyerarşik olarak sunulmalıdır.
3. Aksiyon butonları gerçek eylemi açıkça ifade etmelidir.
4. Sadece görsel ikonla anlam taşınmamalıdır; metin açıklaması zorunludur.

## Resolver Kullanım Sözleşmesi
v0.2'de empty state için resolver API tanımlı değildir.

## Open Questions
1. `empty-state-compact` gibi yoğun görünüm varyantı v0.3'te gerekli mi?
2. Action yokken root spacing davranışı için ayrı kural gerekir mi?

## Önerilen Konum
`docs/rfcs/components/empty-state-rfc.md`
