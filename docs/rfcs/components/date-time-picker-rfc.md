# RFC: Date-Time Picker (v1.0 Product Component)

## Durum
- Status: Draft (implementation-aligned RFC)
- Scope: v1.0 product component surface
- Non-goal: timezone-aware datetime, DST handling, duration picker, complex recurrence rules

## Amaç
Bu RFC, date-time picker için canonical class surface, date ve time section sözleşmesi, state representation, override davranışı, token tüketimi ve erişilebilirlik beklentilerini normatif olarak tanımlar. Date-time picker, kullanıcının tarih ve saati aynı inputta seçmesini sağlayan form bileşenidir.

## Referanslar
- `docs/contracts/naming-convention-spec.md`
- `docs/architecture/headless-contract-spec.md`
- `contracts/naming.contract.mjs`
- `packages/components/date-time-picker.css`
- `packages/components/date-picker.css`
- `packages/components/time-picker.css`
- `packages/components/input.css`

## Canonical Class Surface
Date-time picker için canonical class adları:
- Root: `date-time-picker`
- Input: `date-time-picker-input`
- Trigger: `date-time-picker-trigger`
- Panel: `date-time-picker-panel`
- Date section: `date-time-picker-date-section`
- Time section: `date-time-picker-time-section`
- Calendar grid: `date-time-picker-calendar`
- Calendar day: `date-time-picker-day`
- Hour/minute field: `date-time-picker-field`
- Increment button: `date-time-picker-increment`
- Decrement button: `date-time-picker-decrement`

`datetimepicker`, `datetime-picker-open`, `date-time-open` gibi paralel canonical class alias'ları tanımlanmamalıdır.

## State Representation
State yüzeyi için normatif kararlar:
- Açık/kapalı görünüm root üstünde `data-open="true|false"` ile temsil edilmelidir.
- Input değeri geçerli değilse `aria-invalid="true"` ile temsil edilmelidir.
- Trigger üzerinde `aria-expanded="true|false"` ve `aria-controls` birlikte kullanılmalıdır.
- Seçili tarih `data-selected="true"` ile (calendar içinde) temsil edilmelidir.
- Ayrı canonical state class yüzeyi (`date-time-picker-open`, `date-time-picker-invalid`) tanımlanmaz.

## Input Contract
1. `date-time-picker-input` base `input` class'ını tüketmelidir.
2. Format placeholder veya hint olarak `YYYY-MM-DD HH:MM` veya benzer sunulmalıdır.
3. Input üzerinde opsiyonel `type="datetime-local"` kullanılabilir veya text-based custom yapı tercih edilebilir.
4. Invalid durumda `aria-invalid="true"` input'a uygulanmalıdır.

## Panel Composition Contract
Panel iki ana bölümden oluşur:

1. **Date Section** (`date-time-picker-date-section`)
   - Takvim grid'i (`date-time-picker-calendar`) içerir
   - Gün seçimi için hücreler (`date-time-picker-day`)
   - Month/year navigation (opsiyonel)

2. **Time Section** (`date-time-picker-time-section`)
   - Hour/minute/second alanları (`date-time-picker-field`)
   - Spinner butonları (artı/eksi)
   - Text input alternatifi

Panel kapalıyken gizli durumda olmalı; açıkken görünür olmalıdır. Date ve time section'ları dikey olarak yığılmalıdır.

## Recipe İlişkisi
`date-time-picker` wrapper'ı recipe tarafından üretilmez. Input ve trigger düğmeleri mevcut form surface'lerini tüketir.

Kurallar:
1. `date-time-picker-input`, `input` base class'ı olmadan kullanılmamalıdır.
2. Trigger düğmesi `btn btn-sm btn-outline` gibi mevcut button recipe class'larını tüketmelidir.
3. Calendar hücreleri ve spinner butonları `btn btn-xs btn-ghost` benzeri kombinasyonlarla kurulabilir.
4. Date-time picker için ayrı `date-time-picker-sm`, `date-time-picker-primary` gibi yeni recipe axis'leri tanımlanmaz.

## Date-Picker ve Time-Picker Entegrasyon Senaryosu
Normatif kompozisyon:
- Root wrapper `date-time-picker` ile birlikte dropdown/popover davranışını taşıyabilir.
- Panel `date-time-picker-panel` içinde `date-time-picker-date-section` ve `date-time-picker-time-section` beraber kurulabilir.
- Date section, mevcut date-picker CSS surface'ini yeniden kullanabilir.
- Time section, mevcut time-picker CSS surface'ini yeniden kullanabilir.

Kabul edilir:
- `date-time-picker` + `data-open="true"` + `date-time-picker-panel`
- `date-time-picker-trigger btn btn-sm btn-outline` tetiklemesi
- `date-time-picker-panel` > `date-time-picker-date-section` + `date-time-picker-time-section`

Kabul edilmez:
- Date-time picker için yeni `datetime-picker-dialog` gibi panel class'ı üretmek
- Input ve trigger üzerinde çakışan class set'leri kullanmak
- Date ve time section'larının yanyana (horizontal) layout'u olmak (vertical layout tercih edilir)

## Override Davranışı
Katman sırası: `reset -> base -> layouts -> recipes -> components -> utilities`.

Kurallar:
1. Date-time picker surface `components` layer'dan gelir.
2. Panel bölüm spacing'i utilities ile esnetilebilir.
3. Format kararı (ISO 8601 vs local) implementation seviyesinde yapılabilir.
4. Date/time validation (geçerli range) implementation seviyesinde yapılabilir.

## Token Tüketimi
- Space: `--space-1`, `--space-2`, `--space-3`
- Radius: `--radius-sm`, `--radius-md`
- Typography: `--font-size-sm`, `--font-size-xs`
- Effects: `--shadow-sm`
- Colors: `--color-bg-surface`, `--color-bg-default`, `--color-border-subtle`, `--color-fg-default`, `--color-accent`

Normatif not:
- Date-time picker, renk/ton kontratını doğrudan tanımlamaz; input ve button recipe'lerinden tüketir.

## Accessibility Beklentisi
1. Date-time input için erişilebilir label sağlanmalıdır.
2. Trigger öğesi `<button type="button">` olmalıdır ve erişilebilir bir isim taşımalıdır.
3. Trigger-panel ilişkisi `aria-controls` ve `aria-expanded` ile kurulmalıdır.
4. Calendar hücreleri etkileşimliyse `button` elementi kullanılmalıdır.
5. Hour, minute, second alanları label/title taşımalıdır.
6. Increment/decrement butonları `aria-label` taşımalıdır.
7. `Escape` ile panel kapanmalı ve focus trigger'a dönebilmelidir.
8. Tab ile input -> trigger -> calendar/time navigasyon sırası doğru olmalıdır.
9. Arrow keys calendar grid'de ve time field'lerde navigasyon/artırma-azaltma sağlamalıdır (önerilen).
10. Seçim doğrulandıktan sonra panel otomatik kapatılabilir.

## Resolver Kullanım Sözleşmesi
v1.0'da date-time-picker için ayrı resolver API tanımlı değildir.

## Open Questions
1. Timezone seçimi bu RFC'ye dahil edilmeli mi, yoksa ayrı component/pattern mi?
2. UTC vs local time representation nasıl yönetilecek?
3. Seconds alanı zorunlu mu, opsiyonel mi?
4. Granularity (saatlik, dakikalık, saniyelik) kontrol seviyesi nerede olmalı?
5. Modal vs popover vs inline panel davranışı hangi senaryoda tercih edilecek?

## Önerilen Konum
`docs/rfcs/components/date-time-picker-rfc.md`
