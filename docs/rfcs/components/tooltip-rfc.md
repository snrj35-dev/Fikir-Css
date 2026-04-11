# RFC: Tooltip (v0.2 Foundation)

## Durum
- Status: Draft (documentation RFC)
- Scope: v0.2 mevcut foundation surface
- Non-goal: smart placement engine veya collision-aware positioning eklemek

## Amaç
Bu RFC, tooltip için canonical class surface, override davranışı, token tüketimi, erişilebilirlik beklentisi ve recipe ilişkisini normatif olarak tanımlar.

## Referanslar
- `docs/contracts/naming-convention-spec.md`
- `docs/contracts/token-dictionary-spec.md`
- `contracts/naming.contract.mjs`
- `packages/components/tooltip.css`

## Canonical Class Surface
Tooltip için canonical class adları:
- Wrapper: `tooltip`
- Content: `tooltip-content`

`tooltip-bubble`, `tooltip-panel`, `hint-tooltip` gibi paralel canonical class yüzeyi tanımlanmamalıdır.

## State Representation
- Tooltip görünürlüğü wrapper üzerinde `data-open="true|false"` ile temsil edilmelidir.
- Ayrı canonical class yüzeyi (`tooltip-open`, `tooltip-closed`) tanımlanmaz.
- Tooltip metni ilişkisi `aria-describedby` ile kurulmalıdır.

## Recipe İlişkisi
v0.2'de tooltip class surface recipe tarafından üretilmez.

## Override Davranışı
Katman sırası: `reset -> base -> layouts -> recipes -> components -> utilities`.

Kurallar:
1. `tooltip` ve `tooltip-content` temel davranışı `components` layer'dan gelir.
2. Utility class'ları gerektiğinde wrapper/content üzerinde override amaçlı kullanılabilir.
3. `force-*` utility yalnızca escape-hatch olarak kullanılabilir.

## Token Tüketimi
Tooltip aşağıdaki tokenları tüketir:
- Space: `--space-2`
- Radius: `--radius-sm`
- Shadow: `--shadow-sm`
- Typography: `--font-size-xs`
- Color semantic: `--color-fg-default`, `--color-bg-surface`

## Accessibility Beklentisi
1. Tooltip trigger öğesi erişilebilir isim taşımalıdır.
2. Tooltip metni trigger ile `aria-describedby` üzerinden ilişkilendirilmelidir.
3. Tooltip yalnızca `hover` ile değil `focus` ile de açılabilir olmalıdır.
4. Tooltip içeriği kritik bilgi için tek kaynak olmamalıdır.
5. Tooltip interaktif panel gibi kullanılmamalıdır; v0.2 surface bilgi amaçlıdır.

## Resolver Kullanım Sözleşmesi
v0.2'de tooltip için resolver API tanımlı değildir.

## Open Questions
1. Tooltip placement varyantları (`top`, `bottom`, `start`, `end`) v0.2.x içinde gerekli mi?
2. Gelecekte popover ile tooltip davranış sınırı hangi katmanda netleştirilmeli?

## Önerilen Konum
`docs/rfcs/components/tooltip-rfc.md`
