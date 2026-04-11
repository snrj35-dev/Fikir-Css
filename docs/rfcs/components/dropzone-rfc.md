# RFC: Dropzone (v0.2 Foundation)

## Durum
- Status: Draft (documentation RFC)
- Scope: v0.2 mevcut foundation surface
- Non-goal: drag-drop event engine, upload transport katmanı, progress yönetimi

## Amaç
Bu RFC, dropzone için canonical class surface, override davranışı, token tüketimi, erişilebilirlik beklentisi ve recipe ilişkisini normatif olarak tanımlar.

## Referanslar
- `docs/contracts/naming-convention-spec.md`
- `docs/contracts/token-dictionary-spec.md`
- `contracts/naming.contract.mjs`
- `packages/components/dropzone.css`

## Canonical Class Surface
Dropzone için canonical class adları:
- Root: `dropzone`
- Hidden file input: `dropzone-input`
- Hint text: `dropzone-hint`
- Meta text: `dropzone-meta`
- Actions container: `dropzone-actions`

`drop-zone`, `upload-dropzone`, `droparea`, `dropzone-open` gibi paralel canonical class yüzeyi tanımlanmamalıdır.

## State Representation
State yüzeyi için normatif kararlar:
- Drag-over görünümü root üzerinde `data-drag-over="true|false"` ile temsil edilebilir.
- Devre dışı görünüm root üzerinde `data-disabled="true|false"` ile temsil edilebilir.
- Dosya input erişilebilirliği HTML `input[type="file"]` ile korunmalıdır.
- Ayrı canonical state class yüzeyi (`dropzone-disabled`, `dropzone-open`) tanımlanmaz.

## Recipe İlişkisi
v0.2'de dropzone class surface recipe tarafından üretilmez.

## Override Davranışı
Katman sırası: `reset -> base -> layouts -> recipes -> components -> utilities`.

Kurallar:
1. Dropzone surface `components` layer'dan gelir.
2. Utility class'ları root/hint/meta/actions seviyesinde override amaçlı kullanılabilir.
3. `force-*` utility yalnızca escape-hatch olarak kullanılabilir.
4. Alias class üretimi yerine canonical surface korunmalıdır.

### Allowed Combinations
- Kabul edilir: `dropzone` + `data-drag-over="true"`
- Kabul edilir: `dropzone` + `data-disabled="true"` + `dropzone-actions`

### Disallowed Combinations
- Kabul edilmez: `dropzone` ile birlikte `drop-zone` paralel alias kullanımı
- Kabul edilmez: `dropzone-open`, `dropzone-disabled` gibi state class üretimi

## Token Tüketimi
Dropzone surface aşağıdaki tokenları tüketir:
- Space: `--space-2`, `--space-4`
- Radius: `--radius-md`
- Typography: `--font-size-sm`
- Color semantic/core: `--color-bg-surface`, `--color-border-subtle`, `--color-fg-default`, `--color-fg-muted`, `--color-accent`, `--color-primary-500`

Normatif kural:
- Surface kararlarında semantic tokenlar varsayılan tercih olmalıdır.
- Core token yalnızca semantic karşılık yoksa istisnai olarak kullanılmalıdır.

## Accessibility Beklentisi
1. Dropzone alanı bir label ve yardımcı metin ile açıklanmalıdır.
2. Gizli file input bir `label for` ilişkisiyle tetiklenebilmelidir.
3. Fare/sürükle-bırak yanında klavye ve tıklama ile dosya seçimi mümkün olmalıdır.
4. Desteklenen format/limit bilgisi görünür metinle verilmelidir.

## Resolver Kullanım Sözleşmesi
v0.2'de dropzone için resolver API tanımlı değildir.

## Open Questions
1. Dropzone ve file-upload surface'leri v0.3'te tek bileşene mi indirgenmeli?
2. Upload progress ve hata durumu için ayrı canonical alt-surface gerekli mi?
3. Çoklu dosya önizleme listesi bu RFC içinde mi, ayrı composite pattern içinde mi ele alınmalı?

## Önerilen Konum
`docs/rfcs/components/dropzone-rfc.md`
