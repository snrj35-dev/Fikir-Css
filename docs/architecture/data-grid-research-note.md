# Data Grid Research Note (P4->P6, v0.2 Foundation)

## Amaç
Bu not, `data-grid` yüzeyine geçişte gerekli mimari ve erişilebilirlik risklerini görünür kılar.

Not: P4 aşamasında phase-gated karar girdisi olarak başlamıştır. P6 Paket-5 ile minimal implementation kapsamı onaylanmış, ileri etkileşimler hâlâ kapsam dışı bırakılmıştır.

## Kapsam
- `table` ile `data-grid` sınırını netleştirme
- Contract/naming etkisi
- Token ve layer etkisi
- Erişilebilirlik ve interaction karmaşıklığı
- v0.2 -> v0.3 geçiş için gate kriterleri

## Table vs Data Grid Ayrımı
`table` (v0.2 mevcut):
- Statik veya düşük etkileşimli veri sunumu
- Basit seçili satır gibi sınırlı state
- Native tablo semantiği odakta

`data-grid` (P4 araştırma, P6 minimal implementation):
- Sıralama, kolon görünürlüğü, yoğun etkileşim, keyboard navigation
- Olası hücre odak modeli ve aria-grid semantiği
- Daha yüksek davranış/uyumluluk riski

Karar (faz bazlı):
- P4 aşamasında `table` mevcut ihtiyacı karşılar ve `data-grid` phase-gated ilerler.
- P6 Paket-5 ile minimal `data-grid` surface implementation'a alınmıştır.
- Davranış-ağır özellikler phase gate sonrası kapsam dışında tutulmuştur.

## Risk Alanları
1. Interaction modeli:
   - Hücre odaklama, roving tabindex, keyboard shortcut çatışmaları.
2. Accessibility modeli:
   - Native `table` ile `aria-grid` arasında doğru semantik seçimi.
3. Contract yüzeyi:
   - Erken ve geniş class surface tanımı naming şişmesine yol açabilir.
4. Test maliyeti:
   - Durum kombinasyonlarının katlanarak artması.
5. Runtime sınırı:
   - v0.2 low-runtime ilkesinin bozulma riski.

## Naming/Contract Notları
- P4 öncesi yaklaşım: `data-grid` canonical surface contract'a phase gate onayı gelmeden eklenmemelidir.
- P6 sonrası durum: minimal canonical surface contract'a eklenmiştir (`data-grid`, `data-grid-head/body/row/cell`).
- Alias/migration planı implementation başlangıcında netleştirilmelidir.

## Token/Layers Notları
- `components` layer yeterli görünmektedir.
- Aşırı durum sınıfı eklemekten kaçınılmalıdır.
- Yoğunluk/kolon görünürlüğü gibi ihtiyaçlar önce utility + minimal component surface ile sınanmalıdır.

## Phase Gate Önerisi
Data Grid implementation başlamadan önce aşağıdakiler sağlanmalıdır:
1. RFC’de interaction scope net ve sınırlı olmalı.
2. Accessibility beklentileri test planına bağlanmalı.
3. Naming contract için minimal selector seti belirlenmeli.
4. Build/test pipeline için grid’e özel guard testleri tanımlanmalı.
5. `table` surface ile çakışma/tekrar riski kabul edilebilir seviyeye indirilmeli.

## Sonuç
- Minimal `data-grid` surface (`data-grid`, `data-grid-head/body/row/cell`) implementation'a alınmıştır.
- Behavior-ağır özellikler (virtualization, resize, drag/drop, gelişmiş keyboard engine) sonraki fazlara bırakılmıştır.
