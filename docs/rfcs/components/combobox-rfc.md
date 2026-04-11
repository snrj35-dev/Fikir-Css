# RFC: Combobox (v0.2 Foundation)

## Durum
- Status: Draft (documentation RFC)
- Scope: v0.2 mevcut foundation surface
- Non-goal: tam keyboard navigation engine, async data source yönetimi, virtualization

## Amaç
Bu RFC, combobox için canonical class surface, override davranışı, token tüketimi, erişilebilirlik beklentisi ve recipe ilişkisini normatif olarak tanımlar.

## Referanslar
- `docs/contracts/naming-convention-spec.md`
- `docs/contracts/token-dictionary-spec.md`
- `contracts/naming.contract.mjs`
- `packages/components/combobox.css`

## Canonical Class Surface
Combobox için canonical class adları:
- Root: `combobox`
- Input: `combobox-input`
- List: `combobox-list`
- Option: `combobox-option`

`combo-box`, `combo-select`, `combobox-field`, `combobox-item` gibi paralel canonical class yüzeyi tanımlanmamalıdır.

## State Representation
- Açık/kapalı state markup/attribute ile temsil edilmelidir (`aria-expanded`, `aria-controls`, `data-open` vb.).
- Aktif seçenek `data-active="true"` ile temsil edilebilir.
- Seçili seçenek `aria-selected="true"` ile temsil edilmelidir.
- Ayrı canonical state class yüzeyi (`combobox-open`, `combobox-active`) tanımlanmaz.

## Recipe İlişkisi
v0.2'de combobox class surface recipe tarafından üretilmez.

## Override Davranışı
Katman sırası: `reset -> base -> layouts -> recipes -> components -> utilities`.

Kurallar:
1. Combobox surface `components` layer'dan gelir.
2. Utility class'ları root/input/list/option düzeyinde override amaçlı kullanılabilir.
3. `force-*` utility yalnızca escape-hatch olarak kullanılabilir.

## Token Tüketimi
Combobox surface aşağıdaki tokenları tüketir:
- Space: `--space-1`, `--space-2`, `--space-3`
- Radius: `--radius-sm`, `--radius-md`
- Typography: `--font-size-sm`
- Effects: `--shadow-sm`
- Color semantic/core: `--color-bg-surface`, `--color-bg-default`, `--color-border-subtle`, `--color-fg-default`, `--color-accent`, `--color-primary-500`, `--color-gray-50`

Normatif kural:
- Surface kararlarında semantic tokenlar varsayılan tercih olmalıdır.
- Core token yalnızca semantic karşılık yoksa kullanılmalıdır.

## Accessibility Beklentisi
1. Input üzerinde `role="combobox"` ve uygun `aria-expanded`/`aria-controls` ilişkisi kurulmalıdır.
2. Seçenek listesi `role="listbox"` ve öğeler `role="option"` taşımalıdır.
3. Erişilebilir label ilişkisi sağlanmalıdır.
4. İlk iterasyonda tam klavye modeli non-goal olsa da temel odak görünürlüğü korunmalıdır.

## Resolver Kullanım Sözleşmesi
v0.2'de combobox için resolver API tanımlı değildir.

## Open Questions
1. Autocomplete ve combobox yüzeyleri v0.3'te ayrık mı kalmalı, yoksa birleştirilmeli mi?
2. Asenkron sonuç durumları için canonical alt surface gerekir mi?

## Önerilen Konum
`docs/rfcs/components/combobox-rfc.md`
