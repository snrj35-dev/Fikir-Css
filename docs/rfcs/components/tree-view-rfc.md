# RFC: Tree View (v0.4 Workflow Completeness)

## Durum
- Status: Draft (proposed RFC)
- Scope: v0.4 gap-closure component
- Non-goal: virtualized mega-tree engine, drag-drop reorder system

## Amaç
Bu RFC, tree-view surface'i için canonical class yüzeyi, state davranışı, token tüketimi ve erişilebilirlik beklentisini tanımlar.

## Referanslar
- `docs/contracts/naming-convention-spec.md`
- `docs/contracts/token-dictionary-spec.md`
- `contracts/naming.contract.mjs`
- `docs/roadmap/competitive-gap-analysis-2026-04-11.md`

## Canonical Class Surface
Önerilen canonical class adları:
- Root: `tree-view`
- Item: `tree-view-item`
- Child group: `tree-view-group`
- Toggle control: `tree-view-toggle`
- Item label: `tree-view-label`

`tree`, `folder-tree`, `nav-tree` gibi paralel canonical class yüzeyi tanımlanmamalıdır.

## State Representation
- Genişletilmiş/daraltılmış item durumu `data-tree-expanded="true|false"` ile temsil edilir.
- Disabled item `aria-disabled="true"` veya disabled toggle ile temsil edilebilir.
- Ayrı canonical state class (`tree-view-open`, `tree-view-collapsed`) tanımlanmaz.

## Recipe İlişkisi
v0.4 ilk aşamada tree-view recipe-generated olmayacaktır.
Canonical surface `components` layer içinde tutulur.

## Override Davranışı
Katman sırası: `reset -> base -> layouts -> recipes -> components -> utilities`.

Kurallar:
1. Tree-view temel görünümü `components` layer'dan gelir.
2. Utility override mümkündür, ancak expand/collapse state semantiği korunmalıdır.

## Token Tüketimi
Önerilen token kullanımı:
- Space: `--space-1`, `--space-2`
- Radius: `--radius-sm`
- Color semantic: `--color-border-subtle`, `--color-bg-surface`, `--color-fg-default`, `--color-accent`

## Accessibility Beklentisi
1. Tree yapısı semantik role/attribute beklentileriyle (`role="tree"`, `role="treeitem"`) birlikte kullanılmalıdır.
2. Toggle kontrolü erişilebilir isim taşımalıdır.
3. Expand/collapse durumu ekran okuyucuda anlaşılır olmalıdır (`aria-expanded`).
4. Klavye gezinimi için temel odak görünürlüğü korunmalıdır.

## Open Questions
1. İlk sürümde nested depth sınırı dokümante edilmeli mi?
2. Roving tabindex modeli ilk sürümde zorunlu release kriteri olmalı mı?
3. Tree-view ve sidebar-nav arasında hangi kullanım sınırı önerilmeli?

## Önerilen Konum
`docs/rfcs/components/tree-view-rfc.md`
