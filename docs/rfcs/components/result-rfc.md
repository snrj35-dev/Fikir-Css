# RFC: Result / Status Surface (v0.4 Professional Core)

## Durum
- Status: Draft (proposed RFC)
- Scope: v0.4 gap-closure component
- Non-goal: full page template engine, error boundary runtime logic

## Amaç
Bu RFC, result/status yüzeyi için canonical class surface, durum modeli, token kullanımı ve erişilebilirlik beklentilerini tanımlar.

## Referanslar
- `docs/contracts/naming-convention-spec.md`
- `docs/contracts/token-dictionary-spec.md`
- `contracts/naming.contract.mjs`
- `docs/roadmap/competitive-gap-analysis-2026-04-11.md`

## Canonical Class Surface
Önerilen canonical class adları:
- Root: `result`
- Media: `result-media`
- Title: `result-title`
- Description: `result-description`
- Actions: `result-actions`

Durum temsili class yerine data attribute ile önerilir:
- `data-result-tone="success|info|warning|danger|neutral"`

`status-page`, `result-card`, `state-screen` gibi paralel canonical class yüzeyi tanımlanmamalıdır.

## State Representation
- Durum tonu data attribute ile temsil edilir.
- Etkileşim state'leri aksiyon butonları/linkleri üzerinden yönetilir.
- Ayrı canonical state class (`result-success`, `result-error`) tanımlanmaz.

## Recipe İlişkisi
v0.4 ilk aşamada result surface recipe-generated olmayacaktır.

## Override Davranışı
Katman sırası: `reset -> base -> layouts -> recipes -> components -> utilities`.

Kurallar:
1. `result` yüzeyi semantic tokenlarla gelir.
2. Utility override mümkündür; ancak durum tonu yalnız renkle anlatılmamalı, metinle desteklenmelidir.

## Token Tüketimi
Önerilen token kullanımı:
- Space: `--space-2`, `--space-3`, `--space-4`
- Radius: `--radius-md`
- Color semantic: `--color-bg-surface`, `--color-border-subtle`, `--color-fg-default`, `--color-fg-muted`, `--color-accent`, `--color-danger`

## Accessibility Beklentisi
1. Result başlığı semantik heading yapısıyla verilmelidir.
2. Durum mesajı ekran okuyucuda anlaşılır olmalıdır.
3. Kritik hata/success akışlarında live region gereksinimi bağlama göre değerlendirilmelidir.
4. Aksiyon alanındaki kontroller button/link semantik kurallarına uymalıdır.

## Open Questions
1. `empty-state` ile `result` sınırı nasıl net ayrılmalı?
2. Full-page result ve inline result aynı class yüzeyini paylaşmalı mı?
3. Tone setine `maintenance` ayrı bir semantik olarak eklenmeli mi?

## Önerilen Konum
`docs/rfcs/components/result-rfc.md`
