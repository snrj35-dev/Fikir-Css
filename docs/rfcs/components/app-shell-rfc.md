# RFC: App Shell (v0.2 Foundation)

## Durum
- Status: Draft (documentation RFC)
- Scope: v0.2 mevcut foundation surface
- Non-goal: routing/state-aware shell manager veya responsive nav orchestration engine eklemek

## Amaç
Bu RFC, app shell için canonical class surface, override davranışı, token tüketimi, erişilebilirlik beklentisi ve recipe ilişkisini normatif olarak tanımlar.

## Referanslar
- `docs/contracts/naming-convention-spec.md`
- `docs/contracts/token-dictionary-spec.md`
- `contracts/naming.contract.mjs`
- `packages/components/app-shell.css`

## Canonical Class Surface
App shell için canonical class adları:
- Root: `app-shell`
- Topbar: `app-shell-topbar`
- Content wrapper: `app-shell-content`
- Sidebar area: `app-shell-sidebar`
- Main area: `app-shell-main`

`app-layout`, `shell-layout`, `main-shell` gibi paralel canonical class yüzeyi tanımlanmamalıdır.

## State Representation
- v0.2'de app shell için ayrı state class yüzeyi tanımlanmaz.

## Recipe İlişkisi
v0.2'de app shell class surface recipe tarafından üretilmez.

## Override Davranışı
Katman sırası: `reset -> base -> layouts -> recipes -> components -> utilities`.

Kurallar:
1. App shell surface `components` layer'dan gelir.
2. Utility class'ları root/topbar/sidebar/main seviyesinde override amaçlı kullanılabilir.
3. `force-*` utility yalnızca escape-hatch olarak kullanılabilir.

## Token Tüketimi
App shell aşağıdaki tokenları tüketir:
- Space: `--space-2`, `--space-3`
- Radius: `--radius-md`
- Color semantic: `--color-border-subtle`, `--color-bg-surface`, `--color-bg-default`, `--color-fg-default`

## Accessibility Beklentisi
1. Topbar ve navigation alanları semantik `header`/`nav` ile temsil edilmelidir.
2. Main içerik `main` etiketi veya eşdeğer landmark ile sunulmalıdır.
3. Shell içindeki aksiyonlar klavye ile erişilebilir olmalıdır.

## Resolver Kullanım Sözleşmesi
v0.2'de app shell için resolver API tanımlı değildir.

## Open Questions
1. Gelecek sürümlerde fixed/sticky shell davranışı ayrı varyant gerektiriyor mu?
2. App shell + drawer/sidebar geçişi için ortak contract gerekiyor mu?

## Önerilen Konum
`docs/rfcs/components/app-shell-rfc.md`
