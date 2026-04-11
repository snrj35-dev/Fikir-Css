# RFC: Button (v0.2 Foundation)

## Durum
- Status: Draft (documentation RFC)
- Scope: v0.2 mevcut foundation surface
- Non-goal: yeni button variant/feature eklemek

## Amaç
Bu RFC, button için canonical class surface, override davranışı, token tüketimi, erişilebilirlik beklentisi ve recipe ilişkisini normatif olarak tanımlar.

## Referanslar
- `docs/contracts/naming-convention-spec.md`
- `docs/contracts/token-dictionary-spec.md`
- `contracts/naming.contract.mjs`
- `contracts/recipes.contract.mjs`

## Canonical Class Surface
Button için canonical class adları aşağıdaki gibi olmalıdır:
- Base: `btn`
- Variant axis: `btn-solid`, `btn-outline`
- Tone axis: `btn-primary`, `btn-neutral`, `btn-danger`
- Size axis: `btn-sm`, `btn-md`, `btn-lg`

Canonical adlar `dist/contracts/selectors.json` ile doğrulanmalıdır.
`button` adlı paralel base class eklenmemelidir.

### State Representation
State yüzeyi için normatif kararlar:
- `loading` state, v0.2 canonical class surface'inin parçası değildir.
- `disabled` state öncelikle HTML `disabled` attribute'u ile temsil edilmelidir.
- Ayrı bir `btn-disabled` canonical class yüzeyi tanımlanmaz.

## Recipe İlişkisi
Button class surface recipe-driven olarak üretilir.
- CSS kaynağı: `packages/recipes/index.css` (generated)
- Resolver kaynağı: `packages/recipes/generated/resolvers.ts` (generated)
- Placeholder dosya: `packages/components/button.css`

Kurallar:
- `packages/components/button.css` içinde canonical surface elle tanımlanmamalıdır.
- Button recipe sınıfları yalnızca `contracts/recipes.contract.mjs` ve `contracts/naming.contract.mjs` üzerinden değişmelidir.

## Override Davranışı
Katman sırası: `reset -> base -> layouts -> recipes -> components -> utilities`.

Normatif kurallar:
1. `utilities` layer, aynı specificity düzeyinde `recipes` layer'ı override edebilir.
2. Aynı axis'ten birden fazla class aynı node'da birlikte kullanılmamalıdır.
   - Örn: `btn-primary` ve `btn-danger` aynı anda verilmemelidir.
3. Axis kompozisyonu tekil olmalıdır:
   - 1 variant + 1 tone + 1 size.
4. `force-*` utility'ler yalnızca escape-hatch olarak kullanılabilir.

### Allowed Combinations
- Kabul edilir: `btn btn-outline btn-danger btn-sm`

### Disallowed Combinations
- Kabul edilmez: `btn btn-primary btn-danger`

### Override Örneği (İstisnai)
- Override kabul edilir ancak istisnai: `btn btn-primary bg-red-500`

## Token Tüketimi
Button recipe tanımları aşağıdaki token ailelerini tüketir:
- Space: `--space-2`, `--space-3`, `--space-4`
- Radius: `--radius-md`
- Typography: `--font-size-sm`, `--font-size-md`, `--font-size-lg`
- Color semantic/core:
  - `--color-primary-500`
  - `--color-bg-surface`
  - `--color-fg-default`
  - `--color-border-subtle`
  - `--color-danger`

Normatif kural:
- Yeni button stil kararı semantic token ile ifade edilebiliyorsa semantic token tercih edilmelidir.
- Raw/core color token'lar component surface kararlarında doğrudan varsayılan tercih olmamalıdır; ancak semantic karşılık yoksa istisnai olarak kullanılabilir.
- Doğrudan literal renk (`#fff` gibi) kullanımı varsayılan yaklaşım olmamalıdır; gerekirse geçici istisna olarak açıkça not edilmelidir.

## Accessibility Beklentisi
Button tüketiminde minimum beklenti:
1. Etkileşimli butonlar için native `<button>` öğesi kullanılmalıdır.
2. `type` attribute (`button`, `submit`, `reset`) açık verilmelidir.
3. Disabled davranışı için semantic HTML (`disabled`) kullanılmalıdır.
4. Görsel focus durumu görünür olmalıdır.
   - Base `:focus-visible` outline veya utility focus ring yaklaşımı korunmalıdır.
5. Yalnızca CSS class ataması, non-button elemente tam erişilebilir button davranışı kazandırmaz.

## Resolver Kullanım Sözleşmesi
Resolver çıktısı canonical class string döndürmelidir.
Örnek hedef çıktı formatı:
- `btn btn-outline btn-danger btn-sm`

Normatif kural:
- Resolver output ve recipe CSS surface ayrışmamalıdır.
- Resolver class sırası deterministic olmalıdır: `base -> variant -> tone -> size`.
- Bu sıra test/snapshot karşılaştırmalarında korunmalıdır.

## Open Questions
1. Button için text color literal (`#fff`) kullanımının semantic token'a taşınması v0.2 kapsamında mı, yoksa v0.3 mü?
2. Aynı axis çakışmalarını (örn. `btn-sm` + `btn-lg`) runtime lint ile zorunlu yakalama gerekli mi?
3. Icon-only button canonical surface bu RFC kapsamında mı, yoksa ayrı bir accessibility/RFC konusu mu?

## Önerilen Konum
`docs/rfcs/components/button-rfc.md`
