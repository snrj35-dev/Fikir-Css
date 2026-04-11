# RFC: Drawer (v0.2 Foundation)

## Durum
- Status: Draft (documentation RFC)
- Scope: v0.2 mevcut foundation surface
- Non-goal: responsive multi-side drawer placement ve focus-trap engine eklemek

## Amaç
Bu RFC, drawer için canonical class surface, override davranışı, token tüketimi, erişilebilirlik beklentisi ve recipe ilişkisini normatif olarak tanımlar.

## Referanslar
- `docs/contracts/naming-convention-spec.md`
- `docs/contracts/token-dictionary-spec.md`
- `contracts/naming.contract.mjs`
- `packages/components/drawer.css`

## Canonical Class Surface
Drawer için canonical class adları:
- Wrapper: `drawer`
- Backdrop: `drawer-backdrop`
- Panel: `drawer-panel`
- Slots: `drawer-header`, `drawer-body`, `drawer-footer`

`side-drawer`, `drawer-open`, `drawer-dialog` gibi paralel canonical class yüzeyi tanımlanmamalıdır.

## State Representation
- Açık/kapalı state wrapper üzerinde `data-open="true|false"` ile temsil edilmelidir.
- Ayrı canonical class yüzeyi (`drawer-open`, `drawer-closed`) tanımlanmaz.
- Wrapper üzerinde `aria-hidden` state'i görünürlük ile tutarlı olmalıdır.

## Recipe İlişkisi
v0.2'de drawer class surface recipe tarafından üretilmez.

## Override Davranışı
Katman sırası: `reset -> base -> layouts -> recipes -> components -> utilities`.

Kurallar:
1. Drawer kompozisyonu `components` layer'dan gelir.
2. Utility class'ları wrapper/panel/slot seviyesinde override amaçlı kullanılabilir.
3. `force-*` utility yalnızca escape-hatch olarak kullanılabilir.

## Token Tüketimi
Drawer aşağıdaki tokenları tüketir:
- Space: `--space-2`, `--space-4`
- Shadow: `--shadow-md`
- Color semantic: `--color-border-subtle`, `--color-bg-surface`, `--color-fg-default`

## Accessibility Beklentisi
1. Drawer panel `role="dialog"` ve `aria-modal="true"` taşımalıdır.
2. Panel başlığı `aria-labelledby` ile bağlanmalıdır.
3. Escape tuşu ve backdrop etkileşimi ile kapanış sağlanmalıdır.
4. Drawer açıkken `aria-hidden` state'i wrapper düzeyinde doğru güncellenmelidir.
5. v0.2'de tam focus-trap davranışı non-goal kapsamındadır.

## Resolver Kullanım Sözleşmesi
v0.2'de drawer için resolver API tanımlı değildir.

## Open Questions
1. Gelecek sürümlerde left/right placement varyantları canonical surface'e alınmalı mı?
2. Body scroll-lock davranışı framework sorumluluğuna alınmalı mı?

## Önerilen Konum
`docs/rfcs/components/drawer-rfc.md`
