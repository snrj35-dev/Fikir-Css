# RFC: Editable Field (v0.2 Foundation)

## Durum
- Status: Draft (documentation RFC)
- Scope: v0.2 mevcut foundation surface
- Non-goal: form state engine, autosave/persistence katmanı, optimistic update davranışı

## Amaç
Bu RFC, editable field için canonical class surface, override davranışı, token tüketimi, erişilebilirlik beklentisi ve recipe ilişkisini normatif olarak tanımlar.

## Referanslar
- `docs/contracts/naming-convention-spec.md`
- `docs/contracts/token-dictionary-spec.md`
- `contracts/naming.contract.mjs`
- `packages/components/editable-field.css`

## Canonical Class Surface
Editable field için canonical class adları:
- Root: `editable-field`
- Read/display area: `editable-field-display`
- Edit area: `editable-field-editor`
- Actions container: `editable-field-actions`

`inline-editor`, `editable-input`, `field-editor`, `edit-field` gibi paralel canonical class yüzeyi tanımlanmamalıdır.

## State Representation
State yüzeyi için normatif kararlar:
- Düzenleme modu root üzerinde `data-editing="true|false"` ile temsil edilmelidir.
- Disabled görünüm gerekiyorsa root üzerinde `data-disabled="true|false"` kullanılabilir.
- Ayrı canonical state class yüzeyi (`editable-field-editing`, `editable-field-disabled`) tanımlanmaz.

## Recipe İlişkisi
v0.2'de editable-field class surface recipe tarafından üretilmez.

## Override Davranışı
Katman sırası: `reset -> base -> layouts -> recipes -> components -> utilities`.

Kurallar:
1. Editable field surface `components` layer'dan gelir.
2. Utility class'ları root/display/editor/actions yüzeylerinde override amaçlı kullanılabilir.
3. `force-*` utility yalnızca escape-hatch olarak kullanılabilir.
4. Alias class üretimi yerine canonical surface korunmalıdır.

### Allowed Combinations
- Kabul edilir: `editable-field` + `data-editing="false"` + `editable-field-display`
- Kabul edilir: `editable-field` + `data-editing="true"` + `editable-field-editor` + `editable-field-actions`

### Disallowed Combinations
- Kabul edilmez: `editable-field` ile birlikte `inline-editor` paralel alias kullanımı
- Kabul edilmez: `editable-field-editing`, `editable-field-disabled` gibi state class üretimi

## Token Tüketimi
Editable field surface aşağıdaki tokenları tüketir:
- Space: `--space-2`, `--space-3`
- Radius: `--radius-md`
- Typography: `--font-size-sm`
- Color semantic/core: `--color-bg-surface`, `--color-border-subtle`, `--color-fg-default`

Normatif kural:
- Surface kararlarında semantic tokenlar varsayılan tercih olmalıdır.
- Core token yalnızca semantic karşılık yoksa istisnai olarak kullanılmalıdır.

## Accessibility Beklentisi
1. Display ve edit modları semantik olarak ayırt edilebilir olmalıdır.
2. Edit moduna geçiş kontrolü (buton/link) klavye ile erişilebilir olmalıdır.
3. Düzenlenen kontrol erişilebilir label taşımalıdır.
4. Kaydet/iptal aksiyonları semantik butonlarla sunulmalıdır.

## Resolver Kullanım Sözleşmesi
v0.2'de editable-field için resolver API tanımlı değildir.

## Open Questions
1. Inline save/cancel davranışı için ortak interaction pattern spec v0.3'te ayrı mı olmalı?
2. Validation state gösterimi field/error-text surface ile nasıl standardize edilmeli?
3. Çok satırlı editable field (textarea) bu canonical surface'in parçası mı olmalı?

## Önerilen Konum
`docs/rfcs/components/editable-field-rfc.md`
