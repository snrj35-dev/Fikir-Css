# RFC: Field / Form Field (v0.2 Foundation)

## Durum
- Status: Draft (documentation RFC)
- Scope: v0.2 mevcut foundation surface
- Non-goal: yeni form control üretmek

## Amaç
Bu RFC, field kompozisyonu için canonical class surface, override davranışı, token tüketimi, erişilebilirlik beklentisi ve input ile ilişkili kullanım sözleşmesini normatif olarak tanımlar.

## Referanslar
- `docs/contracts/naming-convention-spec.md`
- `docs/contracts/token-dictionary-spec.md`
- `contracts/naming.contract.mjs`
- `packages/components/field.css`
- `packages/components/label.css`
- `packages/components/helper-text.css`
- `packages/components/error-text.css`

## Canonical Class Surface
Field kompozisyonunda canonical class adları aşağıdaki gibi olmalıdır:
- Wrapper: `field`
- Label: `label`
- Helper text: `helper-text`
- Error text: `error-text`

Canonical adlar `dist/contracts/selectors.json` ile doğrulanmalıdır.
`form-field`, `field-label`, `field-helper`, `field-error` gibi paralel canonical class yüzeyi eklenmemelidir.

## State Representation
State yüzeyi için normatif kararlar:
- Field invalid durumu öncelikle kontrol düzeyinde `aria-invalid="true"` ile temsil edilmelidir.
- Wrapper düzeyi görsel niyet gerekiyorsa `data-field-invalid="true"` kullanılabilir.
- Disabled field görünümü gerekiyorsa `data-field-disabled="true"` wrapper düzeyinde kullanılabilir.
- Ayrı canonical class (`field-invalid`, `field-disabled`) tanımlanmaz.

## Override Davranışı
Katman sırası: `reset -> base -> layouts -> recipes -> components -> utilities`.

Normatif kurallar:
1. `field`, `label`, `helper-text`, `error-text` temel görünümü `components` layer'dan gelir.
2. Utility class'ları bu semantic yüzeyi override etmek için kullanılabilir.
3. Aynı amacı taşıyan semantic + utility çakışmaları sürekli kullanım paterni haline getirilmemelidir.
4. `force-*` utility'ler yalnızca escape-hatch olarak kullanılabilir.

### Allowed Combinations
- `field` + `label` + `input` + `helper-text`
- `field` + `label` + `input` + `error-text`

### Disallowed Combinations
- `field form-field`
- `label field-label`

## Token Tüketimi
Field kompozisyonu aşağıdaki token ailelerini tüketir:
- Space: `--space-2`
- Typography: `--font-size-sm`
- Color semantic:
  - `--color-fg-default`
  - `--color-fg-muted`
  - `--color-danger`

Normatif kural:
- Text amaçlı kararlar semantic token ile ifade edilmelidir.
- Raw/core color token doğrudan varsayılan tercih olmamalıdır.

## Accessibility Beklentisi
1. Her form kontrolü erişilebilir bir isim almalıdır (`label[for]` + `id` veya eşdeğeri).
2. Yardım/hata metni kontrol ile `aria-describedby` üzerinden ilişkilendirilmelidir.
3. Hata durumu semantic olarak işaretlenmelidir (`aria-invalid="true"`).
4. `error-text` görsel bir ipucudur; tek başına semantic hata durumu yerine geçmez.

## Open Questions
1. `field` için standart slot attribute sözleşmesi (`data-field-slot=*`) v0.2 içinde normatif hale getirilmeli mi?
2. `label` için required işareti (`*`) canonical surface mi, utility örneği mi olmalı?

## Önerilen Konum
`docs/rfcs/components/field-rfc.md`
