# RFC: Popover (v0.2 Foundation)

## Durum
- Status: Draft (documentation RFC)
- Scope: v0.2 mevcut foundation surface
- Non-goal: placement engine, collision detection veya nested popover manager eklemek

## Amaç
Bu RFC, popover için canonical class surface, override davranışı, token tüketimi, erişilebilirlik beklentisi ve recipe ilişkisini normatif olarak tanımlar.

## Referanslar
- `docs/contracts/naming-convention-spec.md`
- `docs/contracts/token-dictionary-spec.md`
- `contracts/naming.contract.mjs`
- `packages/components/popover.css`

## Canonical Class Surface
Popover için canonical class adları:
- Wrapper: `popover`
- Content: `popover-content`

`popover-panel`, `overlay-popover`, `popover-open` gibi paralel canonical class yüzeyi tanımlanmamalıdır.

## State Representation
- Popover görünürlüğü wrapper üzerinde `data-open="true|false"` ile temsil edilmelidir.
- Ayrı canonical class yüzeyi (`popover-open`, `popover-closed`) tanımlanmaz.
- Trigger node, `aria-expanded` ve `aria-controls` ile state/ilişkiyi taşımalıdır.

## Recipe İlişkisi
v0.2'de popover class surface recipe tarafından üretilmez.

## Override Davranışı
Katman sırası: `reset -> base -> layouts -> recipes -> components -> utilities`.

Kurallar:
1. `popover` ve `popover-content` temel davranışı `components` layer'dan gelir.
2. Utility class'ları gerektiğinde wrapper/content üzerinde override amaçlı kullanılabilir.
3. `force-*` utility yalnızca escape-hatch olarak kullanılabilir.

## Token Tüketimi
Popover aşağıdaki tokenları tüketir:
- Space: `--space-2`, `--space-3`
- Radius: `--radius-md`
- Shadow: `--shadow-md`
- Color semantic: `--color-border-subtle`, `--color-bg-surface`, `--color-fg-default`

## Accessibility Beklentisi
1. Trigger öğesi klavye ile erişilebilir olmalıdır.
2. Trigger üzerinde `aria-expanded` state'i açık/kapalıya göre güncellenmelidir.
3. Trigger ile içerik ilişkisi `aria-controls` ve uygun id ile kurulmalıdır.
4. Escape tuşu ve dış tıklama ile kapanış desteği bulunmalıdır.
5. Popover içeriği interaktif olabilir; bu nedenle tooltip yerine popover tercih edilmelidir.

## Resolver Kullanım Sözleşmesi
v0.2'de popover için resolver API tanımlı değildir.

## Open Questions
1. Focus return davranışı trigger'a zorunlu olarak geri verilmeli mi?
2. Gelecek sürümlerde popover placement seçenekleri (`top`, `bottom`, `start`, `end`) canonical surface'e eklenmeli mi?

## Önerilen Konum
`docs/rfcs/components/popover-rfc.md`
