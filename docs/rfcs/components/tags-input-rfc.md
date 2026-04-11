# RFC: Tags Input (v0.4 Workflow Completeness)

## Durum
- Status: Draft (proposed RFC)
- Scope: v0.4 gap-closure component
- Non-goal: NLP tag suggestion engine, async validation service

## Amaç
Bu RFC, tags-input surface'i için canonical class yüzeyi, state davranışı, token tüketimi ve erişilebilirlik beklentisini tanımlar.

## Referanslar
- `docs/contracts/naming-convention-spec.md`
- `docs/contracts/token-dictionary-spec.md`
- `contracts/naming.contract.mjs`
- `docs/roadmap/competitive-gap-analysis-2026-04-11.md`

## Canonical Class Surface
Önerilen canonical class adları:
- Root: `tags-input`
- Input field: `tags-input-field`
- Tag list: `tags-input-list`
- Tag item: `tags-input-item`
- Remove action: `tags-input-remove`

`chips-input`, `multi-tag-input`, `tokenizer` gibi paralel canonical class yüzeyi tanımlanmamalıdır.

## State Representation
- Invalid durum `data-tags-invalid="true"` ile temsil edilebilir.
- Disabled durum `data-tags-disabled="true"` ve field/remove disable davranışıyla temsil edilebilir.
- Ayrı canonical state class (`tags-input-invalid`, `tags-input-disabled`) tanımlanmaz.

## Recipe İlişkisi
v0.4 ilk aşamada tags-input recipe-generated olmayacaktır.
Canonical surface `components` layer içinde sunulur.

## Override Davranışı
Katman sırası: `reset -> base -> layouts -> recipes -> components -> utilities`.

Kurallar:
1. Tags-input temel görünümü `components` layer'dan gelir.
2. Utility override mümkündür; fakat tag silme/ekleme affordance görünürlüğü korunmalıdır.

## Token Tüketimi
Önerilen token kullanımı:
- Space: `--space-1`, `--space-2`
- Radius: `--radius-md`
- Color semantic: `--color-border-subtle`, `--color-bg-surface`, `--color-fg-default`, `--color-accent`, `--color-danger`

## Accessibility Beklentisi
1. Input alanı erişilebilir label ile ilişkilendirilmelidir.
2. Tag remove kontrolleri açık erişilebilir isim taşımalıdır (`aria-label`).
3. Invalid durumda hata metni `aria-describedby` ile ilişkilendirilebilir.
4. Klavye odak sırası input ve remove kontrollerinde öngörülebilir olmalıdır.

## Open Questions
1. Backspace ile son tag silme davranışı core kapsamına dahil edilmeli mi?
2. Maksimum tag limiti state'i ayrı canonical data attribute gerektirir mi?
3. Tag öneri/autocomplete entegrasyonu aynı surface içinde mi, ayrı pattern olarak mı ele alınmalı?

## Önerilen Konum
`docs/rfcs/components/tags-input-rfc.md`
