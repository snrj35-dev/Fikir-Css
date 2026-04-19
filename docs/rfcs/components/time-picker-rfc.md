# RFC: Time Picker (v1.0 Product Component)

## Durum
- Status: Draft (implementation-aligned RFC)
- Scope: v1.0 product component surface
- Non-goal: timezone çözümü, duration picker, time range picker, async time validation

## Amaç
Bu RFC, time picker için canonical class surface, input/panel sözleşmesi, state representation, override davranışı, token tüketimi ve erişilebilirlik beklentilerini normatif olarak tanımlar. Time picker, kullanıcının HH:MM:SS formatında saat girişi yapmasını sağlayan form bileşenidir.

## Referanslar
- `docs/contracts/naming-convention-spec.md`
- `docs/architecture/headless-contract-spec.md`
- `contracts/naming.contract.mjs`
- `packages/components/time-picker.css`
- `packages/components/input.css`
- `packages/components/date-picker.css`

## Canonical Class Surface
Time picker için canonical class adları:
- Root: `time-picker`
- Input: `time-picker-input`
- Trigger: `time-picker-trigger`
- Panel: `time-picker-panel`
- Hour field: `time-picker-hour`
- Minute field: `time-picker-minute`
- Second field: `time-picker-second`
- Increment button: `time-picker-increment`
- Decrement button: `time-picker-decrement`

`timepicker`, `time-input`, `hour-picker`, `time-picker-open` gibi paralel canonical class alias'ları tanımlanmamalıdır.

## State Representation
State yüzeyi için normatif kararlar:
- Açık/kapalı görünüm root üstünde `data-open="true|false"` ile temsil edilmelidir.
- Input değeri geçerli değilse `aria-invalid="true"` ile temsil edilmelidir.
- Trigger üzerinde `aria-expanded="true|false"` ve `aria-controls` birlikte kullanılmalıdır.
- Ayrı canonical state class yüzeyi (`time-picker-open`, `time-picker-invalid`) tanımlanmaz.

## Input Contract
1. `time-picker-input` base `input` class'ını tüketmelidir.
2. Format placeholder veya hint olarak `HH:MM:SS` veya `HH:MM` sunulmalıdır.
3. Input üzerinde opsiyonel `type="time"` kullanılabilir veya text-based custom yapı tercih edilebilir.
4. Invalid durumda `aria-invalid="true"` input'a uygulanmalıdır.

## Panel Contract
1. `time-picker-panel` veri girilmek için interaktif alan sunar.
2. Hour, minute, second alanları spinner (artı/eksi butonu) veya doğrudan text input olarak kurulabilir.
3. Panel kapalıyken gizli durumda olmalı; açıkken görünür olmalıdır.
4. Panel ARIA dialog semantikleri barındırmalıdır (opsiyonel `role="dialog"`).

## Recipe İlişkisi
`time-picker` wrapper'ı recipe tarafından üretilmez. Input ve trigger düğmeleri mevcut form surface'lerini tüketir.

Kurallar:
1. `time-picker-input`, `input` base class'ı olmadan kullanılmamalıdır.
2. Trigger düğmeleri `btn btn-sm btn-outline` gibi mevcut button recipe class'larını tüketmelidir.
3. Increment/decrement butonları `btn btn-xs btn-ghost` benzeri kombinasyonlarla kurulabilir.
4. Time picker için ayrı `time-picker-sm`, `time-picker-primary` gibi yeni recipe axis'leri tanımlanmaz.

## Dropdown Trigger Entegrasyon Senaryosu
Normatif kompozisyon:
- Root wrapper `time-picker` ile birlikte dropdown/popover davranışını taşıyabilir.
- Panel `time-picker-panel` ve `popover-content` veya similar içerik taşıyıcısı ile kurulabilir.
- Trigger `time-picker-trigger btn btn-sm btn-outline` kombinasyonuyla kurulabilir.

Kabul edilir:
- `time-picker` + `data-open="true"` + `time-picker-panel`
- `time-picker-trigger btn btn-sm btn-outline` tetiklemesi

Kabul edilmez:
- Time picker paneli için `time-picker-dropdown` gibi yeni panel class'ı üretmek
- Input ve trigger üzerinde çakışan class set'leri kullanmak

## Override Davranışı
Katman sırası: `reset -> base -> layouts -> recipes -> components -> utilities`.

Kurallar:
1. Time picker surface `components` layer'dan gelir.
2. Input ve panel spacing'i utilities ile esnetilebilir; yeni semantic alias class eklenmemelidir.
3. Format/bahasa kararı (12-saat vs 24-saat) implementation seviyesinde yapılabilir.
4. Keyboard increment step (15 dakika vs dakika) implementation seviyesinde yapılabilir.

## Token Tüketimi
- Space: `--space-1`, `--space-2`, `--space-3`
- Radius: `--radius-sm`, `--radius-md`
- Typography: `--font-size-sm`, `--font-size-xs`
- Effects: `--shadow-sm`
- Colors: `--color-bg-surface`, `--color-bg-default`, `--color-border-subtle`, `--color-fg-default`, `--color-accent`

Normatif not:
- Time picker, renk/ton kontratını doğrudan tanımlamaz; input ve button recipe'lerinden tüketir.

## Accessibility Beklentisi
1. Time input için erişilebilir label sağlanmalıdır.
2. Trigger öğesi `<button type="button">` olmalıdır ve erişilebilir bir isim taşımalıdır.
3. Trigger-panel ilişkisi `aria-controls` ve `aria-expanded` ile kurulmalıdır.
4. Hour, minute, second alanları ayrı giriş alanları veya spinners olarak kurulduğunda her biri bir label/title taşımalıdır.
5. Increment/decrement butonları `aria-label` taşımalıdır (örn. "Increase hour").
6. `Escape` ile panel kapanmalı ve focus trigger'a dönebilmelidir.
7. Tab ile input -> trigger -> panel içi navigasyon sırası doğru olmalıdır.
8. Arrow-up/arrow-down ile saat/dakika artırma/azaltma davranışı önerilen ek özelliktir.

## Resolver Kullanım Sözleşmesi
v1.0'da time-picker için ayrı resolver API tanımlı değildir.

## Open Questions
1. 12-saat vs 24-saat format tercihine karar vermek hangi seviyede yapılmalı (CSS, component, template)?
2. Seconds alanı zorunlu mu, opsiyonel mi? Scope kararı ne zaman verilecek?
3. Spinner vs text input arabirim seçimi implementation mi, RFC RFC'ye mi bağlı?
4. Time validation (00-59 minutes vb.) bu RFC kapsamında mı, validation plugin'i kapsamında mı?

## Önerilen Konum
`docs/rfcs/components/time-picker-rfc.md`
