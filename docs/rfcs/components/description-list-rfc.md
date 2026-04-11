# RFC: Description List (v0.2 Foundation)

## Durum
- Status: Draft (documentation RFC)
- Scope: v0.2 mevcut foundation surface
- Non-goal: editable key/value editor veya dynamic schema renderer eklemek

## Amaç
Bu RFC, description list için canonical class surface, override davranışı, token tüketimi, erişilebilirlik beklentisi ve recipe ilişkisini normatif olarak tanımlar.

## Referanslar
- `docs/contracts/naming-convention-spec.md`
- `docs/contracts/token-dictionary-spec.md`
- `contracts/naming.contract.mjs`
- `packages/components/description-list.css`

## Canonical Class Surface
Description list için canonical class adları:
- Root: `description-list`
- Term: `description-term`
- Details: `description-details`

`desc-list`, `dl-list`, `kv-list`, `description-key`, `description-value` gibi paralel canonical class yüzeyi tanımlanmamalıdır.

## State Representation
- v0.2'de description list için ayrı state class yüzeyi tanımlanmaz.
- Eksik değer veya uyarı durumu içerik/metin düzeyinde temsil edilmelidir.

## Recipe İlişkisi
v0.2'de description list class surface recipe tarafından üretilmez.

## Override Davranışı
Katman sırası: `reset -> base -> layouts -> recipes -> components -> utilities`.

Kurallar:
1. Description list surface `components` layer'dan gelir.
2. Utility class'ları root/term/details seviyesinde override amaçlı kullanılabilir.
3. `force-*` utility yalnızca escape-hatch olarak kullanılabilir.

## Token Tüketimi
Description list surface aşağıdaki tokenları tüketir:
- Space: `--space-1`, `--space-2`, `--space-3`
- Radius: `--radius-md`
- Typography: `--font-size-sm`
- Color semantic: `--color-bg-surface`, `--color-border-subtle`, `--color-fg-default`, `--color-fg-muted`

Normatif kural:
- Key/value yüzeyinde semantic token kullanımı varsayılan olmalıdır.

## Accessibility Beklentisi
1. Description list için semantik `dl` yapısı kullanılmalıdır.
2. Her `dt` terimi ilgili `dd` detayını temsil etmelidir.
3. Görsel hizalama, semantik eşleşmenin yerine geçmez.

## Resolver Kullanım Sözleşmesi
v0.2'de description list için resolver API tanımlı değildir.

## Open Questions
1. Çok kolonlu description list düzeni için v0.3'te ayrı surface gerekir mi?
2. Boş değer (`N/A`) görünümünü standardize etmek gerekir mi?

## Önerilen Konum
`docs/rfcs/components/description-list-rfc.md`
