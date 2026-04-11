# RFC: Autocomplete (v0.2 Foundation)

## Durum
- Status: Draft (documentation RFC)
- Scope: v0.2 mevcut foundation surface
- Non-goal: async suggestion pipeline, ranking engine, debounce/IME orchestration

## Amaç
Bu RFC, autocomplete için canonical class surface, override davranışı, token tüketimi, erişilebilirlik beklentisi ve recipe ilişkisini normatif olarak tanımlar.

## Referanslar
- `docs/contracts/naming-convention-spec.md`
- `docs/contracts/token-dictionary-spec.md`
- `contracts/naming.contract.mjs`
- `packages/components/autocomplete.css`

## Canonical Class Surface
Autocomplete için canonical class adları:
- Root: `autocomplete`
- Input: `autocomplete-input`
- List: `autocomplete-list`
- Option: `autocomplete-option`

`auto-complete`, `typeahead`, `suggestion-list`, `autocomplete-item` gibi paralel canonical class yüzeyi tanımlanmamalıdır.

## State Representation
- Açık/kapalı state attribute ile temsil edilmelidir (`aria-expanded`, `data-open`).
- Aktif öneri `data-active="true"` ile temsil edilebilir.
- Ayrı canonical state class yüzeyi (`autocomplete-open`, `autocomplete-active`) tanımlanmaz.

## Recipe İlişkisi
v0.2'de autocomplete class surface recipe tarafından üretilmez.

## Override Davranışı
Katman sırası: `reset -> base -> layouts -> recipes -> components -> utilities`.

Kurallar:
1. Autocomplete surface `components` layer'dan gelir.
2. Utility class'ları root/input/list/option düzeyinde override amaçlı kullanılabilir.
3. `force-*` utility yalnızca escape-hatch olarak kullanılabilir.

## Token Tüketimi
Autocomplete surface aşağıdaki tokenları tüketir:
- Space: `--space-1`, `--space-2`, `--space-3`
- Radius: `--radius-sm`, `--radius-md`
- Typography: `--font-size-sm`
- Effects: `--shadow-sm`
- Color semantic: `--color-bg-surface`, `--color-bg-default`, `--color-border-subtle`, `--color-fg-default`, `--color-accent`

## Accessibility Beklentisi
1. Input için erişilebilir label sağlanmalıdır.
2. Öneri listesi `role="listbox"` ve öğeler `role="option"` taşımalıdır.
3. Otomatik tamamlama davranışı label/yardım metniyle açık olmalıdır.
4. İlk iterasyonda tam keyboard modeli non-goal kapsamındadır.

## Resolver Kullanım Sözleşmesi
v0.2'de autocomplete için resolver API tanımlı değildir.

## Open Questions
1. Combobox ve autocomplete yüzeyleri v0.3'te ortak tabana çekilmeli mi?
2. Boş sonuç durumu için ayrı canonical alt-surface gerekli mi?

## Önerilen Konum
`docs/rfcs/components/autocomplete-rfc.md`
