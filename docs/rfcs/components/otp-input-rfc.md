# RFC: OTP / Pin Input (v0.2 Foundation)

## Durum
- Status: Draft (documentation RFC)
- Scope: v0.2 mevcut foundation surface
- Non-goal: input mask engine, sms autofill orchestration, keyboard navigation runtime

## Amaç
Bu RFC, OTP/Pin input için canonical class surface, state davranışı, token tüketimi ve erişilebilirlik beklentilerini normatif olarak tanımlar.

## Referanslar
- `docs/contracts/naming-convention-spec.md`
- `docs/contracts/token-dictionary-spec.md`
- `contracts/naming.contract.mjs`
- `packages/components/otp-input.css`

## Canonical Class Surface
OTP / Pin input için canonical class adları:
- Root: `otp-input`
- Group: `otp-input-group`
- Slot: `otp-input-slot`

`pin-input`, `otp-group`, `otp-slot`, `verification-input` gibi paralel canonical class yüzeyi tanımlanmamalıdır.

## State Representation
- Her slot için invalid state `aria-invalid="true"` ile temsil edilir.
- Disabled state `disabled` attribute'u ile temsil edilir.
- Ayrı canonical state class (`otp-input-invalid`, `otp-input-disabled`) tanımlanmaz.

## Recipe İlişkisi
v0.2'de otp-input class surface recipe tarafından üretilmez.

## Override Davranışı
Katman sırası: `reset -> base -> layouts -> recipes -> components -> utilities`.

Kurallar:
1. `otp-input-slot` tek başına değil, `otp-input` kompozisyonu içinde kullanılmalıdır.
2. Utility override mümkün olsa da semantik slot yapısı korunmalıdır.

## Token Tüketimi
- Space: `--space-2`
- Radius: `--radius-md`
- Typography: `--font-size-md`
- Color semantic/core: `--color-bg-surface`, `--color-bg-default`, `--color-fg-default`, `--color-fg-muted`, `--color-border-subtle`, `--color-accent`, `--color-danger`

## Accessibility Beklentisi
1. OTP grubu için erişilebilir isim (`aria-label` veya ilişkili `<label>`) sağlanmalıdır.
2. Slot input'larında `inputmode="numeric"` gibi semantik yardımcılar tüketici seviyesinde kullanılmalıdır.
3. Validation mesajı gerekiyorsa `aria-describedby` ile bağlanmalıdır.

## Resolver Kullanım Sözleşmesi
v0.2'de otp-input için resolver API tanımlı değildir.

## Open Questions
1. v0.3'te otomatik odak geçişi için behavior-aware pattern eklenecek mi?
2. Masked display (•) varyantı canonical surface'e dahil edilmeli mi?

## Önerilen Konum
`docs/rfcs/components/otp-input-rfc.md`
