# RFC: Switch (v0.2 Foundation)

## Durum
- Status: Draft (documentation RFC)
- Scope: v0.2 mevcut foundation surface
- Non-goal: yeni switch variant/feature eklemek

## Amaç
Bu RFC, switch için canonical class surface, override davranışı, token tüketimi, erişilebilirlik beklentisi ve recipe ilişkisini normatif olarak tanımlar.

## Referanslar
- `docs/contracts/naming-convention-spec.md`
- `docs/contracts/token-dictionary-spec.md`
- `contracts/naming.contract.mjs`
- `packages/components/switch.css`

## Canonical Class Surface
Switch için canonical semantic class aşağıdaki gibi olmalıdır:
- Base: `switch`

v0.2'de switch için recipe-generated variant seti yoktur.
`switch` dışında paralel semantic base class (`toggle`, `toggle-switch` vb.) eklenmemelidir.

### State Representation
- On/off state, HTML `checked` attribute'u ile temsil edilmelidir.
- Disabled state, HTML `disabled` attribute'u ile temsil edilmelidir.
- Invalid state gerektiğinde `aria-invalid="true"` ile temsil edilmelidir.
- Ayrı canonical class yüzeyi (`switch-on`, `switch-disabled`, `switch-invalid`) tanımlanmaz.

## Recipe İlişkisi
v0.2'de switch class surface recipe tarafından üretilmez.

## Override Davranışı
Katman sırası: `reset -> base -> layouts -> recipes -> components -> utilities`.

Kurallar:
1. `switch` temel görünümü `components` layer'dan gelir.
2. Utility class'ları override amaçlı kullanılabilir.
3. `force-*` utility yalnızca escape-hatch olarak kullanılabilir.

### Allowed Combinations
- `switch`
- `switch rounded-lg`

### Disallowed Combinations
- `switch switch-sm` (v0.2 canonical surface'te yok)

## Token Tüketimi
Switch aşağıdaki tokenları tüketir:
- Color semantic: `--color-accent`, `--color-danger`, `--color-bg-default`, `--color-bg-surface`, `--color-border-subtle`

## Accessibility Beklentisi
1. v0.2’de switch görünümü, native `<input type="checkbox">` üstünde uygulanır.
2. Kontrol bir label ile ilişkilendirilmelidir.
3. Yardım/hata metni gerekiyorsa `aria-describedby` kullanılmalıdır.
4. Sadece görsel değişim yeterli değildir; semantic checked/disabled state HTML seviyesinde temsil edilmelidir.

## Resolver Kullanım Sözleşmesi
v0.2'de switch için resolver API tanımlı değildir.

## Open Questions
1. Switch için `role="switch"` kullanımını v0.2’de normatif yapmak gerekli mi?
2. Switch thumb/track boyutları utility ile mi yönetilmeli, semantic varyant gerekli mi?

## Önerilen Konum
`docs/rfcs/components/switch-rfc.md`
