# RFC: Command Palette (v0.2 Foundation)

## Durum
- Status: Draft (documentation RFC)
- Scope: v0.2 mevcut foundation surface
- Non-goal: global hotkey manager, fuzzy search engine, command routing altyapısı

## Amaç
Bu RFC, command palette için canonical class surface, override davranışı, token tüketimi, erişilebilirlik beklentisi ve recipe ilişkisini normatif olarak tanımlar.

## Referanslar
- `docs/contracts/naming-convention-spec.md`
- `docs/contracts/token-dictionary-spec.md`
- `contracts/naming.contract.mjs`
- `packages/components/command-palette.css`

## Canonical Class Surface
Command palette için canonical class adları:
- Root: `command-palette`
- Dialog: `command-palette-dialog`
- Input: `command-palette-input`
- List: `command-palette-list`
- Item: `command-palette-item`

`command-menu`, `palette-dialog`, `command-list`, `command-item` gibi paralel canonical class yüzeyi tanımlanmamalıdır.

## State Representation
- Açık/kapalı state attribute ile temsil edilmelidir (`data-open`, `aria-hidden` vb.).
- Aktif komut `data-active="true"` ile temsil edilebilir.
- Ayrı canonical state class yüzeyi (`command-palette-open`, `command-active`) tanımlanmaz.

## Recipe İlişkisi
v0.2'de command palette class surface recipe tarafından üretilmez.

## Override Davranışı
Katman sırası: `reset -> base -> layouts -> recipes -> components -> utilities`.

Kurallar:
1. Command palette surface `components` layer'dan gelir.
2. Utility class'ları dialog/input/list/item düzeyinde override amaçlı kullanılabilir.
3. `force-*` utility yalnızca escape-hatch olarak kullanılabilir.

## Token Tüketimi
Command palette surface aşağıdaki tokenları tüketir:
- Space: `--space-1`, `--space-2`, `--space-3`
- Radius: `--radius-sm`, `--radius-md`
- Typography: `--font-size-sm`
- Effects: `--shadow-md`
- Color semantic/core: `--color-bg-surface`, `--color-bg-default`, `--color-border-subtle`, `--color-fg-default`, `--color-accent`, `--color-primary-500`, `--color-gray-50`

## Accessibility Beklentisi
1. Dialog/palette kapsayıcısı uygun semantik role sahip olmalıdır (`role="dialog"` veya ürün kararına uygun eşdeğer).
2. Command input erişilebilir label taşımalıdır.
3. Komut listesi ve öğeleri yardımcı role/attribute yapısına sahip olmalıdır.
4. İlk iterasyonda global keyboard capture non-goal kapsamındadır.

## Resolver Kullanım Sözleşmesi
v0.2'de command-palette için resolver API tanımlı değildir.

## Open Questions
1. Command palette ile command bar ilişkisi tek RFC altında mı ele alınmalı?
2. Kategori/grup başlıkları için ayrı canonical surface gerekir mi?

## Önerilen Konum
`docs/rfcs/components/command-palette-rfc.md`
