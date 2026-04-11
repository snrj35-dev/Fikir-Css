# RFC: Card (v0.2 Foundation)

## Durum
- Status: Draft (documentation RFC)
- Scope: v0.2 mevcut foundation surface
- Non-goal: yeni card variant/feature eklemek

## Amaç
Bu RFC, card için canonical class surface, override davranışı, token tüketimi, erişilebilirlik beklentisi ve recipe ilişkisini normatif olarak tanımlar.

## Referanslar
- `docs/contracts/naming-convention-spec.md`
- `docs/contracts/token-dictionary-spec.md`
- `contracts/naming.contract.mjs`
- `contracts/recipes.contract.mjs`

## Canonical Class Surface
Card için canonical class adları aşağıdaki gibi olmalıdır:
- Base: `card`
- Variant axis: `card-plain`, `card-elevated`
- Padding axis: `card-p-sm`, `card-p-md`, `card-p-lg`

Canonical adlar `dist/contracts/selectors.json` ile doğrulanmalıdır.
`panel`, `surface-card` gibi paralel semantic base class adları eklenmemelidir.

### State Representation
State yüzeyi için normatif kararlar:
- `loading` state, v0.2 card canonical surface'inin parçası değildir.
- Card varsayılan olarak non-interactive olduğu için `disabled` canonical class yüzeyi tanımlanmaz.
- Interaktif card davranışı gerekiyorsa state HTML/ARIA seviyesinde temsil edilmelidir.

## Recipe İlişkisi
Card class surface recipe-driven olarak üretilir.
- CSS kaynağı: `packages/recipes/index.css` (generated)
- Resolver kaynağı: `packages/recipes/generated/resolvers.ts` (generated)
- Placeholder dosya: `packages/components/card.css`

Kurallar:
1. Card canonical surface elle `packages/components/card.css` içine yazılmamalıdır.
2. Card resolver ve recipe CSS aynı contract surface'e bağlı kalmalıdır.
3. Resolver defaultları (`variant=plain`, `padding=md`) sözleşme dışı sessizce değişmemelidir.

## Override Davranışı
Katman sırası: `reset -> base -> layouts -> recipes -> components -> utilities`.

Normatif kurallar:
1. Utility class'ları card recipe tanımlarını override edebilir.
2. Aynı axis'ten birden fazla class aynı anda kullanılmamalıdır.
   - Örn: `card-plain` + `card-elevated`
   - Örn: `card-p-sm` + `card-p-lg`
3. Card üzerinde spacing/radius/shadow override gerekiyorsa önce utility tercih edilmeli, recipe class çakıştırması yapılmamalıdır.
4. `force-*` utility yalnızca escape-hatch olarak kullanılabilir.

### Allowed Combinations
- Kabul edilir: `card card-elevated card-p-lg`

### Disallowed Combinations
- Kabul edilmez: `card card-plain card-elevated`
- Kabul edilmez: `card card-p-sm card-p-lg`

### Override Örneği (İstisnai)
- Override kabul edilir ancak istisnai: `card card-p-md p-4`

## Token Tüketimi
Card recipe tanımları aşağıdaki token ailelerini tüketir:
- Color semantic:
  - `--color-bg-surface`
  - `--color-fg-default`
  - `--color-border-subtle`
- Radius: `--radius-lg`
- Shadow: `--shadow-sm`
- Space: `--space-3`, `--space-4`, `--space-6`

Normatif kural:
- Card görsel anlamı semantic tokenlar üzerinden korunmalıdır.
- Raw/core color token'lar card surface kararlarında doğrudan varsayılan tercih olmamalıdır; ancak semantic karşılık yoksa istisnai olarak kullanılabilir.

## Accessibility Beklentisi
Card bileşeni varsayılan olarak yapısal konteynerdir.

Normatif beklentiler:
1. Card tek başına interaktif değildir.
2. Interaktif hale getirilecekse semantic element seçimi tüketicide açık yapılmalıdır.
   - Örn: link kartı için `<a>`
   - Örn: buton davranışı için `<button>`
3. Sadece class eklemek, erişilebilir etkileşim semantics'i üretmez.
4. İçerik hiyerarşisi (başlık, metin, aksiyon) erişilebilir markup ile kurulmalıdır.

## Resolver Kullanım Sözleşmesi
Resolver çıktısı canonical class string döndürmelidir.
Örnek hedef çıktı formatı:
- `card card-elevated card-p-lg`

Normatif kural:
- Resolver output ile recipe CSS class surface ayrışmamalıdır.
- Resolver class sırası deterministic olmalıdır: `base -> variant -> padding`.
- Bu sıra test/snapshot karşılaştırmalarında korunmalıdır.

## Open Questions
1. Card için border yoğunluğu gibi yeni axis gereksinimi oluşursa recipe axis mi, utility kompozisyonu mu tercih edilmeli?
2. Card için interactive alt türler (link-card vb.) ayrı semantic class surface gerektiriyor mu?

## Önerilen Konum
`docs/rfcs/components/card-rfc.md`
