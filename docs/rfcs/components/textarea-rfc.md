# RFC: Textarea (v0.2 Foundation)

## Durum
- Status: Draft (documentation RFC)
- Scope: v0.2 mevcut foundation surface
- Non-goal: yeni textarea variant/feature eklemek

## Amaç
Bu RFC, textarea için canonical class surface, override davranışı, token tüketimi, erişilebilirlik beklentisi ve recipe ilişkisini normatif olarak tanımlar.

## Referanslar
- `docs/contracts/naming-convention-spec.md`
- `docs/contracts/token-dictionary-spec.md`
- `contracts/naming.contract.mjs`
- `packages/components/textarea.css`

## Canonical Class Surface
Textarea için canonical semantic class aşağıdaki gibi olmalıdır:
- Base: `textarea`

v0.2'de textarea için recipe-generated variant seti yoktur.
`textarea` dışında paralel semantic base class (`text-area`, `input-area` vb.) eklenmemelidir.

### State Representation
State yüzeyi için normatif kararlar:
- `loading` state, v0.2 textarea canonical surface'inin parçası değildir.
- `disabled` state öncelikle HTML `disabled` attribute'u ile temsil edilmelidir.
- `readonly` state öncelikle HTML `readonly` attribute'u ile temsil edilmelidir.
- Ayrı canonical class yüzeyi (`textarea-disabled`, `textarea-readonly`, `textarea-invalid`) tanımlanmaz.

## Recipe İlişkisi
v0.2'de textarea class surface recipe tarafından üretilmez.

Kurallar:
1. Textarea canonical surface `components` layer içinde tanımlıdır.
2. Textarea için resolver API beklentisi yoktur.
3. Textarea recipe modeline taşınacaksa bu ayrı RFC + breaking etkisi değerlendirmesi ile ele alınmalıdır.

## Override Davranışı
Katman sırası: `reset -> base -> layouts -> recipes -> components -> utilities`.

Normatif kurallar:
1. `textarea` temel görünümü `components` layer'dan gelir.
2. Utility class'ları (`rounded-lg`, `p-4`, `border-subtle`) textarea üzerinde override amaçlı kullanılabilir.
3. Override kullanımı aynı amacı taşıyan çakışmaları sınırlı tutmalıdır.
4. `force-*` utility'ler yalnızca escape-hatch olarak kullanılabilir.

### Allowed Combinations
- Kabul edilir: `textarea`
- Kabul edilir: `textarea rounded-lg`

### Disallowed Combinations
- Kabul edilmez: `textarea textarea-sm` (v0.2 canonical surface'te yok)

### Override Örneği (İstisnai)
- Override kabul edilir ancak istisnai: `textarea border-subtle rounded-lg`

## Token Tüketimi
Textarea bileşeni aşağıdaki tokenları tüketir:
- Space: `--space-3`
- Radius: `--radius-md`
- Color semantic:
  - `--color-border-subtle`
  - `--color-bg-surface`
  - `--color-fg-default`
  - `--color-fg-muted`
  - `--color-accent`
  - `--color-danger`

Normatif kural:
- Textarea yüzeyi semantic color tokenları öncelikli tercih etmelidir.
- Raw/core color referansı yalnızca semantic karşılığı yoksa kullanılabilir.

## Accessibility Beklentisi
1. Native `<textarea>` öğesi kullanılmalıdır.
2. Erişilebilir label ilişkisi kurulmalıdır (`<label for>` + `id` veya eşdeğeri).
3. Hata durumu semantic olarak işaretlenmelidir (`aria-invalid="true"`).
4. Yardım/hata metni gerekiyorsa `aria-describedby` ile ilişkilendirilmelidir.
5. `readonly` ve `disabled` farklı semantiklere sahiptir; birbirinin yerine kullanılmamalıdır.

## State Utility İlişkisi
Textarea ile birlikte kullanılabilecek mevcut state utility yüzeyi:
- `aria-invalid:ring-danger`
- `focus-visible:ring-primary`
- `disabled:opacity-50`

Normatif kural:
- `aria-invalid:ring-danger` etkisinin uygulanması için ilgili node üzerinde class + `aria-invalid="true"` birlikte bulunmalıdır.

## Resolver Kullanım Sözleşmesi
v0.2'de textarea için resolver API tanımlı değildir.

## Open Questions
1. Textarea için boyut varyantları gerekirse semantic class mı (`textarea-sm`) yoksa utility kompozisyonu mu tercih edilmeli?
2. Textarea resize davranışı utility kontrollü mü olmalı, component default'u mu korunmalı?

## Önerilen Konum
`docs/rfcs/components/textarea-rfc.md`
