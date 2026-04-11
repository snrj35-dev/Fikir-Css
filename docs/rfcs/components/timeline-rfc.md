# RFC: Timeline (v0.2 Foundation)

## Durum
- Status: Draft (documentation RFC)
- Scope: v0.2 mevcut foundation surface
- Non-goal: yatay timeline, etkileşimli zoom veya tarih ölçekleme davranışı eklemek

## Amaç
Bu RFC, timeline için canonical class surface, override davranışı, token tüketimi, erişilebilirlik beklentisi ve recipe ilişkisini normatif olarak tanımlar.

## Referanslar
- `docs/contracts/naming-convention-spec.md`
- `docs/contracts/token-dictionary-spec.md`
- `contracts/naming.contract.mjs`
- `packages/components/timeline.css`

## Canonical Class Surface
Timeline için canonical class adları:
- Root: `timeline`
- Item: `timeline-item`
- Marker: `timeline-marker`
- Content: `timeline-content`
- Title: `timeline-title`
- Meta: `timeline-meta`

`timeline-list`, `timeline-entry`, `timeline-dot`, `timeline-event` gibi paralel canonical class yüzeyi tanımlanmamalıdır.

## State Representation
- v0.2'de timeline için ayrı state class yüzeyi tanımlanmaz.
- Durum farkları (`completed`, `pending`) içerik veya mevcut utility kombinasyonlarıyla temsil edilmelidir.

## Recipe İlişkisi
v0.2'de timeline class surface recipe tarafından üretilmez.

## Override Davranışı
Katman sırası: `reset -> base -> layouts -> recipes -> components -> utilities`.

Kurallar:
1. Timeline surface `components` layer'dan gelir.
2. Utility class'ları root/item/content düzeyinde override amaçlı kullanılabilir.
3. `force-*` utility yalnızca escape-hatch olarak kullanılabilir.

## Token Tüketimi
Timeline surface aşağıdaki tokenları tüketir:
- Space: `--space-2`, `--space-3`
- Typography: `--font-size-sm`, `--font-size-md`
- Color semantic/core: `--color-bg-surface`, `--color-border-subtle`, `--color-fg-default`, `--color-fg-muted`, `--color-primary-500`

Normatif kural:
- Timeline görsel kararlarında semantic tokenlar tercih edilmelidir.
- Core token kullanımı yalnızca semantic karşılık yoksa yapılmalıdır.

## Accessibility Beklentisi
1. Timeline bir olay listesi olarak semantik list yapısıyla kullanılmalıdır (`ol`/`ul` veya eşdeğer).
2. Olay başlığı (`timeline-title`) ve zaman/meta (`timeline-meta`) birlikte sunulmalıdır.
3. Marker tek başına anlam taşımıyorsa metin açıklaması zorunludur.

## Resolver Kullanım Sözleşmesi
v0.2'de timeline için resolver API tanımlı değildir.

## Open Questions
1. v0.3'te yatay timeline için ayrı canonical surface gerekli mi?
2. Durum bazlı marker tonları için semantic token genişlemesi gerekir mi?

## Önerilen Konum
`docs/rfcs/components/timeline-rfc.md`
