# RFC: Tabs (v0.2 Foundation)

## Durum
- Status: Draft (documentation RFC)
- Scope: v0.2 mevcut foundation surface
- Non-goal: URL senkronizasyonu veya lazy panel yükleme stratejisi eklemek

## Amaç
Bu RFC, tabs için canonical class surface, override davranışı, token tüketimi, erişilebilirlik beklentisi ve recipe ilişkisini normatif olarak tanımlar.

## Referanslar
- `docs/contracts/naming-convention-spec.md`
- `docs/contracts/token-dictionary-spec.md`
- `contracts/naming.contract.mjs`
- `packages/components/tabs.css`

## Canonical Class Surface
Tabs için canonical class adları:
- Root: `tabs`
- List: `tabs-list`
- Trigger: `tabs-trigger`
- Panel: `tabs-panel`

`tab`, `tab-list`, `tab-trigger`, `tab-panel` gibi paralel canonical class yüzeyi tanımlanmamalıdır.

## State Representation
- Aktif trigger/panel `data-active="true|false"` ile temsil edilmelidir.
- Ayrı `tabs-active` canonical class yüzeyi tanımlanmaz.

## Recipe İlişkisi
v0.2'de tabs class surface recipe tarafından üretilmez.

## Override Davranışı
Katman sırası: `reset -> base -> layouts -> recipes -> components -> utilities`.

Kurallar:
1. Tabs surface `components` layer'dan gelir.
2. Utility class'ları root/list/trigger/panel seviyesinde override amaçlı kullanılabilir.
3. `force-*` utility yalnızca escape-hatch olarak kullanılabilir.

## Token Tüketimi
Tabs aşağıdaki tokenları tüketir:
- Space: `--space-2`, `--space-3`
- Radius: `--radius-md`
- Color semantic: `--color-border-subtle`, `--color-bg-surface`, `--color-fg-default`, `--color-primary-500`

## Accessibility Beklentisi
1. Tabs listesi `role="tablist"` taşımalıdır.
2. Trigger öğeleri `role="tab"` ile temsil edilmelidir.
3. Aktif panel bilgisi kullanıcıya metinsel olarak da anlaşılır olmalıdır.
4. v0.2'de tam klavye modelinin (ok tuşları/home/end) enforce edilmesi non-goal kapsamındadır.

## Resolver Kullanım Sözleşmesi
v0.2'de tabs için resolver API tanımlı değildir.

## Open Questions
1. Gelecek sürümlerde tabs için orientation (`horizontal`, `vertical`) varyantı gerekli mi?
2. ARIA ilişkilendirmesi (`aria-controls` / `aria-labelledby`) zorunlu hale getirilmeli mi?

## Önerilen Konum
`docs/rfcs/components/tabs-rfc.md`
