# RFC: Search Box (v0.2 Foundation)

## Durum
- Status: Draft (documentation RFC)
- Scope: v0.2 mevcut foundation surface
- Non-goal: query orchestration, filtre state manager, geçmiş/öneri motoru

## Amaç
Bu RFC, search box için canonical class surface, override davranışı, token tüketimi, erişilebilirlik beklentisi ve recipe ilişkisini normatif olarak tanımlar.

## Referanslar
- `docs/contracts/naming-convention-spec.md`
- `docs/contracts/token-dictionary-spec.md`
- `contracts/naming.contract.mjs`
- `packages/components/search-box.css`

## Canonical Class Surface
Search box için canonical class adları:
- Root: `search-box`
- Input: `search-box-input`
- Action: `search-box-action`

`searchbar`, `search-input-group`, `site-search`, `search-submit` gibi paralel canonical class yüzeyi tanımlanmamalıdır.

## State Representation
- Disabled state öncelikle HTML `disabled` attribute ile temsil edilmelidir.
- Invalid query gibi durumlar input üzerinde semantik attribute (`aria-invalid`) ile temsil edilmelidir.
- Ayrı canonical state class yüzeyi (`search-box-disabled`, `search-box-invalid`) tanımlanmaz.

## Recipe İlişkisi
v0.2'de search box class surface recipe tarafından üretilmez.

## Override Davranışı
Katman sırası: `reset -> base -> layouts -> recipes -> components -> utilities`.

Kurallar:
1. Search box surface `components` layer'dan gelir.
2. Utility class'ları wrapper/input/action üzerinde override amaçlı kullanılabilir.
3. `force-*` utility yalnızca escape-hatch olarak kullanılabilir.

## Token Tüketimi
Search box surface aşağıdaki tokenları tüketir:
- Space: `--space-3`
- Radius: `--radius-md`
- Typography: `--font-size-sm`
- Color semantic/core: `--color-bg-surface`, `--color-border-subtle`, `--color-fg-default`, `--color-accent`, `--color-primary-500`, `--color-gray-50`

## Accessibility Beklentisi
1. Search input için erişilebilir label sağlanmalıdır.
2. Search action bir `<button type="submit">` veya `<button type="button">` olarak semantik tanımlanmalıdır.
3. Search form davranışı kullanılıyorsa `form` içinde submit akışı açık olmalıdır.
4. Placeholder metni label yerine kullanılmamalıdır.

## Resolver Kullanım Sözleşmesi
v0.2'de search-box için resolver API tanımlı değildir.

## Open Questions
1. Search box ile filter bar birleşimi için ayrı product pattern gerekli mi?
2. Input içinde ikon kullanımı canonical surface’e dahil edilmeli mi?

## Önerilen Konum
`docs/rfcs/components/search-box-rfc.md`
