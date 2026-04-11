# RFC: Input (v0.2 Foundation)

## Durum
- Status: Draft (documentation RFC)
- Scope: v0.2 mevcut foundation surface
- Non-goal: yeni input variant/feature eklemek

## Amaç
Bu RFC, input için canonical class surface, override davranışı, token tüketimi, erişilebilirlik beklentisi ve recipe ilişkisini normatif olarak tanımlar.

## Referanslar
- `docs/contracts/naming-convention-spec.md`
- `docs/contracts/token-dictionary-spec.md`
- `contracts/naming.contract.mjs`
- `packages/components/input.css`

## Canonical Class Surface
Input için canonical semantic class aşağıdaki gibi olmalıdır:
- Base: `input`

v0.2'de input için recipe-generated variant seti yoktur.
`input` dışında paralel semantic base class (`text-input`, `field-input` vb.) eklenmemelidir.

### State Representation
State yüzeyi için normatif kararlar:
- `loading` state, v0.2 input canonical surface'inin parçası değildir.
- `disabled` state öncelikle HTML `disabled` attribute'u ile temsil edilmelidir.
- Ayrı bir `input-disabled` canonical class yüzeyi tanımlanmaz.

## Recipe İlişkisi
v0.2'de input class surface recipe tarafından üretilmez.

Kurallar:
1. Input canonical surface `components` layer içinde tanımlıdır.
2. Input için resolver API beklentisi yoktur.
3. Input recipe'ye taşınacaksa bu ayrı RFC + breaking etkisi değerlendirmesi ile ele alınmalıdır.

## Override Davranışı
Katman sırası: `reset -> base -> layouts -> recipes -> components -> utilities`.

Normatif kurallar:
1. `input` temel görünümü `components` layer'dan gelir.
2. Utility class'ları (örn. `rounded-lg`, `p-4`, `border-subtle`) `input` üstünde override amaçlı kullanılabilir.
3. Override kullanımı, aynı amacı taşıyan çakışmalı class kombinasyonlarını azaltacak şekilde sınırlandırılmalıdır.
4. `force-*` utility'ler yalnızca escape-hatch olarak kullanılabilir.

### Allowed Combinations
- Kabul edilir: `input`
- Kabul edilir: `input rounded-lg`

### Disallowed Combinations
- Kabul edilmez: `input input-sm` (v0.2 canonical surface'te yok)

### Override Örneği (İstisnai)
- Override kabul edilir ancak istisnai: `input border-subtle rounded-lg`

Focus davranışı:
- `input:focus-visible` için border-color değişimi component katmanında tanımlıdır.
- Utility state class'ları eklenirse specificity/layer etkisi bilinçli yönetilmelidir.

## Token Tüketimi
Input bileşeni aşağıdaki tokenları tüketir:
- Space: `--space-3`
- Radius: `--radius-md`
- Color semantic:
  - `--color-border-subtle`
  - `--color-bg-surface`
  - `--color-fg-default`
  - `--color-accent` (focus-visible border)

Normatif kural:
- Input yüzeyi semantic color tokenları öncelikli tercih etmelidir.
- Raw/core color referansı yalnızca semantic karşılığı yoksa kullanılabilir.

## Accessibility Beklentisi
Input tüketiminde minimum beklenti:
1. Native form control (`input`, `textarea`, `select`) kullanılmalıdır.
2. Her input için erişilebilir label ilişkisi kurulmalıdır (`<label for>` veya eşdeğer erişilebilir isim).
3. Hata durumu semantic olarak işaretlenmelidir (`aria-invalid="true"` vb.).
4. Focus göstergesi görünür kalmalıdır; override ile tamamen kaldırılmamalıdır.
5. Placeholder metni label yerine geçmez.

## State Utility İlişkisi
Input ile birlikte kullanılabilecek mevcut state utility yüzeyi:
- `aria-invalid:ring-danger`
- `focus-visible:ring-primary`
- `disabled:opacity-50`

Normatif kural:
- State utility kullanımı semantic HTML/ARIA durumuyla tutarlı olmalıdır.
- `aria-invalid:ring-danger` etkisinin uygulanması için ilgili node üzerinde class + `aria-invalid="true"` attribute'u birlikte bulunmalıdır.

## Resolver Kullanım Sözleşmesi
v0.2'de input için resolver API tanımlı değildir.

Normatif kural:
- Input class surface'i için resolver sırası/determinism sözleşmesi bu sürümde uygulanmaz.

## Open Questions
1. Input için size variant ihtiyacı doğarsa semantic class mı (`input-sm`) yoksa utility kompozisyonu mu tercih edilecek?
2. Input'un recipe modeline alınması gerçekten gerekli mi, yoksa semantic tek-surface korunmalı mı?

## Önerilen Konum
`docs/rfcs/components/input-rfc.md`
