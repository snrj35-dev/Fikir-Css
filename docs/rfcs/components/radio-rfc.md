# RFC: Radio (v0.2 Foundation)

## Durum
- Status: Draft (documentation RFC)
- Scope: v0.2 mevcut foundation surface
- Non-goal: yeni radio variant/feature eklemek

## Amaç
Bu RFC, radio için canonical class surface, override davranışı, token tüketimi, erişilebilirlik beklentisi ve recipe ilişkisini normatif olarak tanımlar.

## Referanslar
- `docs/contracts/naming-convention-spec.md`
- `docs/contracts/token-dictionary-spec.md`
- `contracts/naming.contract.mjs`
- `packages/components/radio.css`

## Canonical Class Surface
Radio için canonical semantic class aşağıdaki gibi olmalıdır:
- Base: `radio`

v0.2'de radio için recipe-generated variant seti yoktur.
`radio` dışında paralel semantic base class (`radio-input`, `choice-radio` vb.) eklenmemelidir.

### State Representation
- Checked state, HTML `checked` attribute'u ile temsil edilmelidir.
- Disabled state, HTML `disabled` attribute'u ile temsil edilmelidir.
- Invalid state gerektiğinde `aria-invalid="true"` ile temsil edilmelidir.
- Ayrı canonical class yüzeyi (`radio-checked`, `radio-disabled`, `radio-invalid`) tanımlanmaz.

## Recipe İlişkisi
v0.2'de radio class surface recipe tarafından üretilmez.

## Override Davranışı
Katman sırası: `reset -> base -> layouts -> recipes -> components -> utilities`.

Kurallar:
1. `radio` temel görünümü `components` layer'dan gelir.
2. Utility class'ları override amaçlı kullanılabilir.
3. `force-*` utility yalnızca escape-hatch olarak kullanılabilir.

### Allowed Combinations
- `radio`
- `radio rounded-md`

### Disallowed Combinations
- `radio radio-sm` (v0.2 canonical surface'te yok)

## Token Tüketimi
Radio aşağıdaki tokenları tüketir:
- Color semantic: `--color-accent`, `--color-danger`

## Accessibility Beklentisi
1. Native `<input type="radio">` kullanılmalıdır.
2. Aynı gruptaki radio kontrollerinde `name` attribute'u ortak olmalıdır.
3. Radio grupları için `fieldset/legend` kullanımı tercih edilmelidir.
4. Hata durumunda semantic state (`aria-invalid`) kullanılmalıdır.

## Resolver Kullanım Sözleşmesi
v0.2'de radio için resolver API tanımlı değildir.

## Open Questions
1. Radio için yoğunluk/size varyantları utility ile mi yönetilmeli?
2. Grup seviyesi invalid gösterimi için ek semantic wrapper sözleşmesi gerekli mi?

## Önerilen Konum
`docs/rfcs/components/radio-rfc.md`
