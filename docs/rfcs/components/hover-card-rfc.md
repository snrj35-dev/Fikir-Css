# RFC: Hover Card (v0.2 Foundation)

## Durum
- Status: Draft (documentation RFC)
- Scope: v0.2 mevcut foundation surface
- Non-goal: positioning engine, collision/flip algoritması, trigger orchestration

## Amaç
Bu RFC, hover card için canonical class surface, override davranışı, token tüketimi, erişilebilirlik beklentisi ve recipe ilişkisini normatif olarak tanımlar.

## Referanslar
- `docs/contracts/naming-convention-spec.md`
- `docs/contracts/token-dictionary-spec.md`
- `contracts/naming.contract.mjs`
- `packages/components/hover-card.css`

## Canonical Class Surface
Hover card için canonical class adları:
- Root: `hover-card`
- Content: `hover-card-content`

`hovercard`, `hover-panel`, `profile-hover-card`, `hover-card-open` gibi paralel canonical class yüzeyi tanımlanmamalıdır.

## State Representation
State yüzeyi için normatif kararlar:
- Açık/kapalı görünüm root üzerinde `data-open="true|false"` ile temsil edilmelidir.
- Ayrı canonical state class yüzeyi (`hover-card-open`, `hover-card-closed`) tanımlanmaz.

## Recipe İlişkisi
v0.2'de hover-card class surface recipe tarafından üretilmez.

## Override Davranışı
Katman sırası: `reset -> base -> layouts -> recipes -> components -> utilities`.

Kurallar:
1. Hover card surface `components` layer'dan gelir.
2. Utility class'ları root/content üzerinde override amaçlı kullanılabilir.
3. `force-*` utility yalnızca escape-hatch olarak kullanılabilir.
4. Alias class üretimi yerine canonical surface korunmalıdır.

### Allowed Combinations
- Kabul edilir: `hover-card` + `data-open="true"` + `hover-card-content`

### Disallowed Combinations
- Kabul edilmez: `hover-card` ile birlikte `hovercard` paralel alias kullanımı
- Kabul edilmez: `hover-card-open` gibi state class üretimi

## Token Tüketimi
Hover card surface aşağıdaki tokenları tüketir:
- Space: `--space-2`, `--space-3`
- Radius: `--radius-md`
- Effects: `--shadow-md`
- Color semantic/core: `--color-bg-surface`, `--color-border-subtle`, `--color-fg-default`

Normatif kural:
- Surface kararlarında semantic tokenlar varsayılan tercih olmalıdır.
- Core token yalnızca semantic karşılık yoksa istisnai olarak kullanılmalıdır.

## Accessibility Beklentisi
1. Hover card içeriği tetikleyici öğe ile anlamlı ilişkiye sahip olmalıdır.
2. Sadece hover değil, focus ile de erişilebilir olmalıdır.
3. İçerik bilgi amaçlıysa `role="status"`/metin ilişkisi gibi semantik yaklaşım korunmalıdır.
4. İnteraktif içerik varsa klavye erişimi korunmalıdır.

## Resolver Kullanım Sözleşmesi
v0.2'de hover-card için resolver API tanımlı değildir.

## Open Questions
1. Hover card ve tooltip/popover sınırları v0.3'te daha katı ayrılmalı mı?
2. Position strategy (top/right/left) için ayrı canonical alt-surface gerekli mi?
3. Delay davranışı (show/hide delay) framework kapsamına alınmalı mı?

## Önerilen Konum
`docs/rfcs/components/hover-card-rfc.md`
