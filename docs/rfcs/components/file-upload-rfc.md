# RFC: File Upload (v0.2 Foundation)

## Durum
- Status: Draft (documentation RFC)
- Scope: v0.2 mevcut foundation surface
- Non-goal: upload transport katmanı, progress yönetimi, chunk/retry akışı, drag-drop davranışı

## Amaç
Bu RFC, file upload için canonical class surface, override davranışı, token tüketimi, erişilebilirlik beklentisi ve recipe ilişkisini normatif olarak tanımlar.

## Referanslar
- `docs/contracts/naming-convention-spec.md`
- `docs/contracts/token-dictionary-spec.md`
- `contracts/naming.contract.mjs`
- `packages/components/file-upload.css`

## Canonical Class Surface
File upload için canonical class adları:
- Root: `file-upload`
- Input: `file-upload-input`
- Meta text: `file-upload-meta`
- Actions container: `file-upload-actions`

`file-uploader`, `file-input`, `upload-field`, `upload-box` gibi paralel canonical class yüzeyi tanımlanmamalıdır.

## State Representation
State yüzeyi için normatif kararlar:
- Dosya seçili durumu root üzerinde `data-has-file="true|false"` ile temsil edilebilir.
- Devre dışı durum input üzerinde `disabled` ile temsil edilmelidir.
- Ayrı canonical state class yüzeyi (`file-upload-disabled`, `file-upload-has-file`) tanımlanmaz.

## Recipe İlişkisi
v0.2'de file-upload class surface recipe tarafından üretilmez.

## Override Davranışı
Katman sırası: `reset -> base -> layouts -> recipes -> components -> utilities`.

Kurallar:
1. File upload surface `components` layer'dan gelir.
2. Utility class'ları root/input/meta/actions üzerinde override amaçlı kullanılabilir.
3. `force-*` utility yalnızca escape-hatch olarak kullanılabilir.
4. Alias class üretimi yerine canonical surface korunmalıdır.

### Allowed Combinations
- Kabul edilir: `file-upload` + `data-has-file="true"` + `file-upload-meta`
- Kabul edilir: `file-upload-input` + `disabled`

### Disallowed Combinations
- Kabul edilmez: `file-upload` ile birlikte `file-uploader` paralel alias kullanımı
- Kabul edilmez: `file-upload-disabled` veya `file-upload-open` gibi state class üretimi

## Token Tüketimi
File upload surface aşağıdaki tokenları tüketir:
- Space: `--space-2`, `--space-3`
- Radius: `--radius-sm`, `--radius-md`
- Typography: `--font-size-sm`
- Color semantic/core: `--color-bg-surface`, `--color-bg-default`, `--color-border-subtle`, `--color-fg-default`, `--color-fg-muted`, `--color-accent`

Normatif kural:
- Surface kararlarında semantic tokenlar varsayılan tercih olmalıdır.
- Core token yalnızca semantic karşılık yoksa istisnai olarak kullanılmalıdır.

## Accessibility Beklentisi
1. Dosya input'u erişilebilir label ile ilişkilendirilmelidir.
2. Yardımcı metin (kabul edilen format, limit) `file-upload-meta` ile görünür sunulmalıdır.
3. `accept` ve `multiple` gibi HTML attribute'ları davranışı açıkça temsil etmek için kullanılmalıdır.
4. Disabled durumunda yalnızca görsel değişim değil, HTML `disabled` davranışı uygulanmalıdır.

## Resolver Kullanım Sözleşmesi
v0.2'de file-upload için resolver API tanımlı değildir.

## Open Questions
1. Upload progress (yüzde, durum mesajı) için ayrı canonical surface v0.3'te gerekli mi?
2. Dosya listesi görünümü bu RFC'nin parçası mı, yoksa dropzone/composite pattern konusu mu?
3. Validation error metni field/error-text surface ile nasıl standardize edilmeli?

## Önerilen Konum
`docs/rfcs/components/file-upload-rfc.md`
