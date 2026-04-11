# RFC: Modal / Dialog (v0.2 Foundation)

## Durum
- Status: Draft (documentation RFC)
- Scope: v0.2 mevcut foundation surface
- Non-goal: focus-trap ve advanced overlay orchestration eklemek

## Amaç
Bu RFC, modal/dialog için canonical class surface, override davranışı, token tüketimi, erişilebilirlik beklentisi ve recipe ilişkisini normatif olarak tanımlar.

## Referanslar
- `docs/contracts/naming-convention-spec.md`
- `docs/contracts/token-dictionary-spec.md`
- `contracts/naming.contract.mjs`
- `packages/components/modal.css`

## Canonical Class Surface
Modal/dialog için canonical class adları:
- Wrapper: `modal`
- Backdrop: `modal-backdrop`
- Panel: `modal-dialog`
- Slots: `modal-header`, `modal-body`, `modal-footer`

`dialog-modal`, `overlay-dialog`, `modal-panel` gibi paralel canonical class yüzeyi tanımlanmamalıdır.

## State Representation
- Açık/kapalı state wrapper üzerinde `data-open="true|false"` ile temsil edilmelidir.
- Ayrı canonical class yüzeyi (`modal-open`, `modal-closed`) tanımlanmaz.
- Modal görsel state’i class çakıştırmasıyla değil attribute state ile yönetilmelidir.

## Recipe İlişkisi
v0.2'de modal class surface recipe tarafından üretilmez.

## Override Davranışı
Katman sırası: `reset -> base -> layouts -> recipes -> components -> utilities`.

Kurallar:
1. Modal kompozisyon davranışı `components` layer'dan gelir.
2. Utility class'ları wrapper/dialog seviyesinde override amaçlı kullanılabilir.
3. `force-*` utility yalnızca escape-hatch olarak kullanılabilir.

## Token Tüketimi
Modal aşağıdaki tokenları tüketir:
- Space: `--space-2`, `--space-4`
- Radius: `--radius-lg`
- Shadow: `--shadow-md`
- Color semantic: `--color-border-subtle`, `--color-bg-surface`, `--color-fg-default`

## Accessibility Beklentisi
1. Modal panel node'u `role="dialog"` ve `aria-modal="true"` taşımalıdır.
2. Dialog başlığı `aria-labelledby` ile bağlanmalıdır.
3. Kapanış aksiyonu klavye ile erişilebilir olmalıdır (`Escape` dahil).
4. Arka plan etkileşimi modal açıkken engellenmelidir (wrapper/backdrop davranışı).
5. Focus trap v0.2 için açık geliştirme alanıdır; şu aşamada temel odak güvenliği hedeflenir.

## Resolver Kullanım Sözleşmesi
v0.2'de modal için resolver API tanımlı değildir.

## Open Questions
1. Focus trap v0.2.x içinde zorunlu güvenceye alınmalı mı?
2. Body scroll-lock davranışı component sorumluluğunda mı, consumer sorumluluğunda mı kalmalı?

## Önerilen Konum
`docs/rfcs/components/modal-rfc.md`
