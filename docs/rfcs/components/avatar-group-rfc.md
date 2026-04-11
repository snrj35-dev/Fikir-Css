# RFC: Avatar Group (v0.2 Foundation)

## Durum
- Status: Draft (documentation RFC)
- Scope: v0.2 mevcut foundation surface
- Non-goal: presence indicator veya overflow counter behavior runtime'ı

## Amaç
Bu RFC, avatar group için canonical class surface, token tüketimi, override davranışı ve erişilebilirlik beklentisini normatif olarak tanımlar.

## Referanslar
- `docs/contracts/naming-convention-spec.md`
- `docs/contracts/token-dictionary-spec.md`
- `contracts/naming.contract.mjs`
- `packages/components/avatar-group.css`
- `packages/components/avatar.css`

## Canonical Class Surface
Avatar group için canonical class adları:
- Root: `avatar-group`
- Item wrapper: `avatar-group-item`

`avatar-stack`, `group-avatar`, `avatar-list`, `avatar-overlap` gibi paralel canonical class yüzeyi tanımlanmamalıdır.

## State Representation
- v0.2'de avatar group için ayrı state class yüzeyi tanımlanmaz.

## Recipe İlişkisi
v0.2'de avatar-group class surface recipe tarafından üretilmez.

## Override Davranışı
Katman sırası: `reset -> base -> layouts -> recipes -> components -> utilities`.

Kurallar:
1. `avatar-group` içinde bireysel avatar boyut class'ları (`avatar-sm/md/lg`) kullanılabilir.
2. Üst üste bindirme davranışı `avatar-group-item` üzerinden yönetilir.

## Token Tüketimi
- Space: `--space-2`
- Color semantic: `--color-bg-surface`, `--color-border-subtle`

## Accessibility Beklentisi
1. Grup içindeki avatarlar anlamlı `aria-label`/`alt` ile sunulmalıdır.
2. Grup konteyneri gerektiğinde `aria-label` ile bağlam kazanmalıdır.

## Resolver Kullanım Sözleşmesi
v0.2'de avatar-group için resolver API tanımlı değildir.

## Open Questions
1. `+N` overflow göstergesi ayrı canonical surface gerektirir mi?

## Önerilen Konum
`docs/rfcs/components/avatar-group-rfc.md`
