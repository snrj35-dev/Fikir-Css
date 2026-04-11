# RFC: Select (v0.2 Foundation)

## Durum
- Status: Draft (documentation RFC)
- Scope: v0.2 mevcut foundation surface
- Non-goal: yeni select variant/feature eklemek

## Amaç
Bu RFC, select için canonical class surface, override davranışı, token tüketimi, erişilebilirlik beklentisi ve recipe ilişkisini normatif olarak tanımlar.

## Referanslar
- `docs/contracts/naming-convention-spec.md`
- `docs/contracts/token-dictionary-spec.md`
- `contracts/naming.contract.mjs`
- `packages/components/select.css`

## Canonical Class Surface
Select için canonical semantic class aşağıdaki gibi olmalıdır:
- Base: `select`

v0.2'de select için recipe-generated variant seti yoktur.
`select` dışında paralel semantic base class (`dropdown`, `select-input` vb.) eklenmemelidir.

### State Representation
State yüzeyi için normatif kararlar:
- `loading` state, v0.2 canonical select surface'inin parçası değildir.
- `disabled` state öncelikle HTML `disabled` attribute'u ile temsil edilmelidir.
- Invalid state semantic olarak `aria-invalid="true"` ile temsil edilmelidir.
- Ayrı canonical class yüzeyi (`select-disabled`, `select-invalid`) tanımlanmaz.

## Recipe İlişkisi
v0.2'de select class surface recipe tarafından üretilmez.

Kurallar:
1. Select canonical surface `components` layer içinde tanımlıdır.
2. Select için resolver API beklentisi yoktur.
3. Select recipe modeline taşınacaksa bu ayrı RFC + breaking etkisi değerlendirmesi ile ele alınmalıdır.

## Override Davranışı
Katman sırası: `reset -> base -> layouts -> recipes -> components -> utilities`.

Normatif kurallar:
1. `select` temel görünümü `components` layer'dan gelir.
2. Utility class'ları (`rounded-lg`, `p-4`, `border-subtle`) select üzerinde override amaçlı kullanılabilir.
3. Override kullanımı aynı amacı taşıyan çakışmaları sınırlı tutmalıdır.
4. `force-*` utility'ler yalnızca escape-hatch olarak kullanılabilir.

### Allowed Combinations
- Kabul edilir: `select`
- Kabul edilir: `select rounded-lg`

### Disallowed Combinations
- Kabul edilmez: `select select-sm` (v0.2 canonical surface'te yok)

### Override Örneği (İstisnai)
- Override kabul edilir ancak istisnai: `select border-subtle rounded-lg`

## Token Tüketimi
Select bileşeni aşağıdaki tokenları tüketir:
- Space: `--space-3`
- Radius: `--radius-md`
- Color semantic:
  - `--color-border-subtle`
  - `--color-bg-surface`
  - `--color-bg-default`
  - `--color-fg-default`
  - `--color-fg-muted`
  - `--color-accent`
  - `--color-danger`

Normatif kural:
- Select yüzeyi semantic color tokenları öncelikli tercih etmelidir.
- Raw/core color referansı yalnızca semantic karşılığı yoksa kullanılabilir.

## Accessibility Beklentisi
1. Native `<select>` öğesi kullanılmalıdır.
2. Erişilebilir label ilişkisi kurulmalıdır (`<label for>` + `id` veya eşdeğeri).
3. Placeholder yerine ilk seçenek için anlamlı bir seçim metni kullanılmalıdır.
4. Invalid state gerekiyorsa semantic olarak işaretlenmelidir (`aria-invalid="true"`).
5. Yardım/hata metni gerekiyorsa `aria-describedby` ile ilişkilendirilmelidir.

## State Utility İlişkisi
Select ile birlikte kullanılabilecek mevcut state utility yüzeyi:
- `aria-invalid:ring-danger`
- `focus-visible:ring-primary`
- `disabled:opacity-50`

Normatif kural:
- `aria-invalid:ring-danger` etkisinin uygulanması için ilgili node üzerinde class + `aria-invalid="true"` birlikte bulunmalıdır.

## Resolver Kullanım Sözleşmesi
v0.2'de select için resolver API tanımlı değildir.

## Open Questions
1. Select için size variant ihtiyacı doğarsa semantic class mı (`select-sm`) yoksa utility kompozisyonu mu tercih edilmeli?
2. Select chevron göstergesi component içinde mi kalmalı, utility/consumer tarafına mı bırakılmalı?

## Önerilen Konum
`docs/rfcs/components/select-rfc.md`
