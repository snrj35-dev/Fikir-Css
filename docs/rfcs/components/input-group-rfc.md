# RFC: Input Group (v0.2 Foundation)

## Durum
- Status: Draft (documentation RFC)
- Scope: v0.2 mevcut foundation surface
- Non-goal: yeni input-group variant/feature eklemek

## Amaç
Bu RFC, input-group için canonical class surface, override davranışı, token tüketimi, erişilebilirlik beklentisi ve mevcut form control yüzeyleriyle ilişkisini normatif olarak tanımlar.

## Referanslar
- `docs/contracts/naming-convention-spec.md`
- `docs/contracts/token-dictionary-spec.md`
- `contracts/naming.contract.mjs`
- `packages/components/input-group.css`

## Canonical Class Surface
Input group için canonical class adları aşağıdaki gibi olmalıdır:
- Wrapper: `input-group`
- Accessory/addon: `input-group-addon`

`input-prefix`, `input-suffix`, `field-group` gibi paralel canonical class yüzeyi tanımlanmamalıdır.

## State Representation
- Invalid state, öncelikle child control üzerinde `aria-invalid="true"` ile temsil edilmelidir.
- Group seviyesinde görsel niyet gerekiyorsa `data-input-group-invalid="true"` kullanılabilir.
- Ayrı canonical class yüzeyi (`input-group-invalid`, `input-group-disabled`) tanımlanmaz.

## Recipe İlişkisi
v0.2'de input-group class surface recipe tarafından üretilmez.

## Override Davranışı
Katman sırası: `reset -> base -> layouts -> recipes -> components -> utilities`.

Kurallar:
1. `input-group` kompozisyon davranışı `components` layer'dan gelir.
2. Child control canonical class'ları (`input`, `textarea`, `select`) korunmalıdır.
3. Utility class'ları gerektiğinde wrapper/addon üstünde override amaçlı kullanılabilir.
4. `force-*` utility yalnızca escape-hatch olarak kullanılabilir.

### Allowed Combinations
- `input-group` + `input-group-addon` + `input`
- `input-group` + `input` + `input-group-addon`

### Disallowed Combinations
- `input-group input-group-sm` (v0.2 canonical surface'te yok)
- `input-group input-prefix` (canonical surface dışı)

## Token Tüketimi
Input-group aşağıdaki tokenları tüketir:
- Space: `--space-3`
- Typography: `--font-size-sm`
- Color semantic:
  - `--color-border-subtle`
  - `--color-bg-default`
  - `--color-fg-muted`
  - `--color-danger`

## Accessibility Beklentisi
1. Input-group wrapper semantik container'dır; erişilebilir isim child control ve label ile sağlanmalıdır.
2. Addon metni kontrolün erişilebilir adının parçası olacaksa `aria-label`/`aria-describedby` stratejisi tüketici tarafından açık yönetilmelidir.
3. Invalid durumda semantic kaynak child control (`aria-invalid`) olmalıdır.
4. Sadece addon görselliği, form semantics'i yerine geçmez.

## Resolver Kullanım Sözleşmesi
v0.2'de input-group için resolver API tanımlı değildir.

## Open Questions
1. Addon için icon-only kullanımında standart erişilebilirlik deseni (örn. `aria-hidden`) RFC seviyesinde zorunlu olmalı mı?
2. Input-group için sık kullanılan varyantlar (dense, separated) utility kompozisyonuyla mı kalmalı?

## Önerilen Konum
`docs/rfcs/components/input-group-rfc.md`
