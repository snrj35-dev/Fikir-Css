# RFC: Number Input (v0.4 Professional Core)

## Durum
- Status: Draft (proposed RFC)
- Scope: v0.4 gap-closure component
- Non-goal: full locale formatting engine, currency masking engine

## Amaç
Bu RFC, number input surface'i için canonical class yüzeyi, state davranışı, token tüketimi ve erişilebilirlik beklentisini tanımlar.

## Referanslar
- `docs/contracts/naming-convention-spec.md`
- `docs/contracts/token-dictionary-spec.md`
- `contracts/naming.contract.mjs`
- `docs/roadmap/competitive-gap-analysis-2026-04-11.md`

## Canonical Class Surface
Önerilen canonical class adları:
- Root: `number-input`
- Step controls wrapper: `number-input-controls`
- Step button: `number-input-step`

`input-number`, `numeric-input`, `spinner-input` gibi paralel canonical class yüzeyi tanımlanmamalıdır.

## State Representation
- Disabled state HTML `disabled` ile temsil edilmelidir.
- Invalid state `aria-invalid="true"` ile temsil edilmelidir.
- Step sınırları (`min`/`max`) native input semantics ile yönetilmelidir.
- Ayrı canonical state class (`number-input-invalid`, `number-input-disabled`) tanımlanmaz.

## Recipe İlişkisi
v0.4 ilk aşamada number-input recipe-generated olmayacaktır.
Surface `components` layer içinde canonical classlarla sunulur.

## Override Davranışı
Katman sırası: `reset -> base -> layouts -> recipes -> components -> utilities`.

Kurallar:
1. `number-input` temel görünümü `components` layer'dan gelir.
2. Utility override mümkündür ancak aynı amaçlı çakışmalar sınırlandırılmalıdır.
3. `force-*` utility yalnızca escape-hatch olarak kullanılmalıdır.

## Token Tüketimi
Önerilen token kullanımı:
- Space: `--space-2`, `--space-3`
- Radius: `--radius-md`
- Color semantic: `--color-border-subtle`, `--color-bg-surface`, `--color-fg-default`, `--color-accent`, `--color-danger`

## Accessibility Beklentisi
1. Native `<input type="number">` kullanılmalıdır.
2. Erişilebilir label ilişkisi zorunludur (`label` + `for/id` veya eşdeğeri).
3. Step butonları kullanılıyorsa erişilebilir isimleri açık olmalıdır (`aria-label`).
4. Invalid state için hata metni ilişkisi `aria-describedby` ile kurulmalıdır.
5. Klavye davranışı native beklentiyle uyumlu olmalıdır (ok tuşları, min/max sınırı).

## Open Questions
1. Step controls her zaman görünür mü olmalı, yoksa opsiyonel mi?
2. Locale-specific sayı formatı core kapsamına dahil mi, yoksa consumer sorumluluğu mu?
3. Number input ve existing `input` sınıfı görsel olarak ne kadar ortaklaşmalı?

## Önerilen Konum
`docs/rfcs/components/number-input-rfc.md`
