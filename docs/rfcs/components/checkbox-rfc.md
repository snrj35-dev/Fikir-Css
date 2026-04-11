# RFC: Checkbox (v0.2 Foundation)

## Durum
- Status: Draft (documentation RFC)
- Scope: v0.2 mevcut foundation surface
- Non-goal: yeni checkbox variant/feature eklemek

## Amaç
Bu RFC, checkbox için canonical class surface, override davranışı, token tüketimi, erişilebilirlik beklentisi ve recipe ilişkisini normatif olarak tanımlar.

## Referanslar
- `docs/contracts/naming-convention-spec.md`
- `docs/contracts/token-dictionary-spec.md`
- `contracts/naming.contract.mjs`
- `packages/components/checkbox.css`

## Canonical Class Surface
Checkbox için canonical semantic class aşağıdaki gibi olmalıdır:
- Base: `checkbox`

v0.2'de checkbox için recipe-generated variant seti yoktur.
`checkbox` dışında paralel semantic base class (`check`, `check-input` vb.) eklenmemelidir.

### State Representation
- Checked state, HTML `checked` attribute'u ile temsil edilmelidir.
- Disabled state, HTML `disabled` attribute'u ile temsil edilmelidir.
- Invalid state gerektiğinde `aria-invalid="true"` ile temsil edilmelidir.
- Ayrı canonical class yüzeyi (`checkbox-checked`, `checkbox-disabled`, `checkbox-invalid`) tanımlanmaz.

## Recipe İlişkisi
v0.2'de checkbox class surface recipe tarafından üretilmez.

## Override Davranışı
Katman sırası: `reset -> base -> layouts -> recipes -> components -> utilities`.

Kurallar:
1. `checkbox` temel görünümü `components` layer'dan gelir.
2. Utility class'ları override amaçlı kullanılabilir.
3. `force-*` utility yalnızca escape-hatch olarak kullanılabilir.

### Allowed Combinations
- `checkbox`
- `checkbox rounded-md`

### Disallowed Combinations
- `checkbox checkbox-sm` (v0.2 canonical surface'te yok)

## Token Tüketimi
Checkbox aşağıdaki tokenları tüketir:
- Color semantic: `--color-accent`, `--color-danger`

## Accessibility Beklentisi
1. Native `<input type="checkbox">` kullanılmalıdır.
2. Kontrol bir label ile ilişkilendirilmelidir.
3. Gruplanan checkbox setleri için `fieldset/legend` tercih edilmelidir.
4. Hata durumunda yalnızca görsel işaret değil, semantic state de verilmelidir.

## Resolver Kullanım Sözleşmesi
v0.2'de checkbox için resolver API tanımlı değildir.

## Open Questions
1. Checkbox için indeterminate görünüm canonical surface kapsamına alınmalı mı?
2. Checkbox size varyantları utility ile mi, semantic class ile mi yönetilmeli?

## Önerilen Konum
`docs/rfcs/components/checkbox-rfc.md`
