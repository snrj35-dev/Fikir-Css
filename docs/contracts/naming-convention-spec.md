# Naming Convention Spec (v0.2 Foundation)

## 1. Amaç ve kapsam
Bu doküman, Fikir CSS v0.2 foundation içinde class adlandırma kurallarını normatif olarak tanımlar.

Kapsam:
- utilities
- semantic components
- layout primitives
- recipe-generated classes
- state variants
- force/escape-hatch utilities
- canonical class surface ve alias/migration ilişkisi

Bu doküman bir framework feature roadmap'i değildir. Mevcut contract-driven mimarinin adlandırma davranışını standardize eder.

İlgili dokümanlar:
- `docs/contracts/naming-contract.md`
- `docs/contracts/recipe-contract.md`
- `docs/contracts/token-dictionary-spec.md`

## 2. Neden naming spec gerekiyor
Naming spec olmadan şu riskler büyür:
- Aynı kavram için birden fazla class adı oluşması (`btn` vs `button`).
- Utility ve semantic dünyasının karışması (`btn-primary` ile `bg-primary-500` ayrımının kaybolması).
- Contract dışında yeni class üretimi nedeniyle build çıktısının öngörülemez hale gelmesi.
- Büyük ekiplerde farklı ekiplerin aynı isim uzayını çakıştırması.

Bu nedenle class naming deterministic, denetlenebilir ve contract ile izlenebilir olmalıdır.

## 3. Genel naming ilkeleri
1. Contract-first: Selector isimleri must be defined in `contracts/naming.contract.mjs`.
2. Single source of truth: Build sonrası geçerli class surface must be read from `dist/contracts/selectors.json`.
3. Canonical surface: Uygulama kodu should use canonical class adlarını kullanmalıdır; geçici alias adlarına bağımlı kalmamalıdır.
4. Determinism: Aynı contract + aynı config aynı class çıktısını üretmelidir.
5. Domain separation: Utility ve component isim alanları mantıksal olarak ayrı tutulmalıdır.
6. Readability over novelty: İsimler kısa olabilir (`btn`) ama anlamı ekip içinde tekil olmalıdır.
7. No hidden generation: İnsan eliyle yazılan yeni class adları, contract dışı yüzey oluşturacak şekilde may not be introduced.

## 4. Katman bazlı adlandırma kuralları

### 4.1 Utilities
Kural seti:
- Utility class adları must use kebab-case.
- Utility class adları should encode property intent (`p-4`, `text-sm`, `bg-primary-500`).
- Utility class adları must not include component adı (`button-primary`, `card-danger` gibi).
- Utility state variantleri (örn. `hover:`, `focus-visible:`) utility domain içinde kalmalıdır.

Örnek canonical utility sınıfları:
- `p-4`
- `text-sm`
- `bg-primary-500`
- `focus-visible:ring-primary`

### 4.2 Semantic components
Kural seti:
- Semantic component class adları component rolünü temsil etmelidir (`btn`, `card`, `input`, `badge`, `alert`).
- Variant/modifier class adları base class ile aynı ailede olmalıdır (`btn-primary`, `card-elevated`).
- Aynı anlama gelen ikinci bir base class adı eşzamanlı tutulmamalıdır.

`btn` vs `button` gerilimi için normatif karar:
- v0.2 canonical base class `btn`'dir.
- `button` yeni paralel base class olarak eklenmemelidir (must not).
- `btn` -> `button` gibi bir rename ancak breaking change yönetimi ile yapılabilir.

### 4.3 Layout primitives
Kural seti:
- Layout primitive class adları yapısal davranışı temsil etmelidir (`stack`, `cluster`, `sidebar`, `center`, `switcher`).
- Layout class adları must not encode component semantics (`sidebar-card`, `stack-button` gibi).
- Layout class adları utility veya component namespace'ini taklit etmemelidir.

### 4.4 Recipe-generated classes
Kural seti:
- Recipe CSS class surface must be generated from `contracts/recipes.contract.mjs` + `contracts/naming.contract.mjs`.
- `packages/recipes/index.css` ve `packages/recipes/generated/resolvers.ts` elle canonical class surface değiştirecek şekilde düzenlenmemelidir.
- Resolver output class'ları, recipe layer'da tanımlı class'larla birebir eşleşmelidir (single class surface).

### 4.5 State variants
Kural seti:
- State variant formatı utility state syntax'ına sadık kalmalıdır (`hover:*`, `focus-visible:*`, `disabled:*`, `aria-invalid:*`, `data-open:*`).
- State variant adları must attach to a concrete token/utility intent (`hover:bg-primary-600` gibi).
- State variant adları component semantic adının yerine geçmemelidir (`btn-hover` gibi isimler should not be used).

### 4.6 Force / escape-hatch utilities
Kural seti:
- `force-*` utilities yalnızca escape-hatch olarak kullanılmalıdır (may be used, but only when necessary).
- `force-*` utilities default styling stratejisi olmamalıdır (must not be baseline approach).
- `force-*` kullanımı dokümante edilmeli ve sınırlı tutulmalıdır.
- Component/recipe base class tanımlarında `force-*` bağımlılığı oluşturulmamalıdır.

## 5. Prefix stratejisi

### 5.1 Plain mode
- Tanım: `fikir.config.mjs` içinde `naming.mode = "plain"`.
- Çıktı: class adları `base` değerleriyle aynıdır (`btn`, `p-4`, `bg-primary-500`).
- Kullanım: Daha küçük kod tabanı ve sınırlı ekip koordinasyonu için önerilir.

### 5.2 Prefixed mode
- Tanım: `naming.mode = "prefixed"`.
- Çıktı:
  - Utility: `{utilityPrefix}-{base}` (örn. `u-p-4`)
  - Component: `{componentPrefix}-{base}` (örn. `comp-btn`)
- Kullanım: Birden fazla CSS kaynağının birleştiği veya naming collision riskinin yüksek olduğu ortamlarda önerilir.
- Artifact behavior: build çıktısı tek mode üretir; plain ve prefixed selector seti aynı dist dosyasında birlikte yayınlanmaz.

### 5.3 Hangi durumda hangisi önerilir
- Plain mode should be the default for v0.2 local development and small scope usage.
- Prefixed mode should be considered when:
  - aynı uygulamada birden fazla tasarım sistemi/class ekosistemi bir araya geliyorsa,
  - büyük ekipte naming collision yaşanıyorsa,
  - kod sahipliği sınırları net değilse.

## 6. Canonical class names vs alias/migration yaklaşımı
Normatif kaynaklar:
- Canonical surface: `dist/contracts/selectors.json`
- Alias migration map: `dist/contracts/alias-migration.json`

Kurallar:
- Uygulama kodu must target canonical class names.
- Alias map migration yardımı içindir; kalıcı API gibi davranılmamalıdır.
- Dual class shipping (aynı anda canonical + alias active surface) v0.2 hedefi değildir.
- Alias kaldırımı sonrası refactorlar alias map üzerinden yapılmalıdır.

## 7. Yasak / kaçınılacak adlandırmalar
Aşağıdaki adlandırmalar must not be used:
- Aynı role paralel base class: `btn` varken `button`.
- Belirsiz prefix benzetmeleri: `util-*`, `cmp-*` gibi contract dışı prefixler.
- Utility içinde semantic isim: `button-red`, `card-padding-lg`.
- Semantic class içinde utility sentaksı taklidi: `btn-p-4`.
- Geçici/debug class'ların kalıcı yüzeye taşınması: `tmp-*`, `debug-*`.

## 8. Çakışma önleme kuralları
1. Her selector key (`component.*`, `utility.*`) must be unique.
2. Aynı `base` adı farklı domainlerde ancak bilinçli ve belgeli ise kullanılmalıdır; aksi halde should be avoided.
3. Yeni selector eklemeden önce mevcut canonical surface kontrol edilmelidir (`dist/contracts/selectors.json`).
4. PR incelemesinde naming değişikliği contract diff üzerinden değerlendirilmelidir.
5. Contract dışı manual selector eklenmesi CI'da engellenmelidir (policy hedefi).

## 9. Örnekler

### 9.1 İyi örnekler
- Semantic: `btn btn-primary btn-sm`
- Utility: `p-4 bg-primary-500 text-white`
- Layout: `stack`, `cluster`, `sidebar`
- State utility: `focus-visible:ring-primary`
- Escape hatch (sınırlı): `force-bg-red-500`

### 9.2 Kötü örnekler
- `button button-primary` (canonical surface dışı paralel adlandırma)
- `btn-bg-primary-500` (semantic + utility karışımı)
- `u-btn-primary` plain mode canonical class yerine alias bağımlılığı
- `comp-card` canonical yerine migration alias kullanımı

### 9.3 Migration örnekleri
- `u-bg-primary-500` -> `bg-primary-500`
- `comp-btn-primary` -> `btn-primary`
- `comp-card-p-md` -> `card-p-md`

Migration sırasında kaynak referans:
- `dist/contracts/alias-migration.json`

## 10. Generated selector surface ile naming contract ilişkisi
İlişki zinciri:
1. `contracts/naming.contract.mjs` selector anahtarlarını ve base adlarını tanımlar.
2. `fikir.config.mjs` naming mode/prefix parametrelerini taşır.
3. `scripts/build-css.mjs` bu iki kaynaktan effective selector map üretir.
4. Çıktı olarak `dist/contracts/selectors.json` canonical/effective surface'i yayınlar.

Kural:
- İnsan tarafından yazılan class kullanım rehberi must align with generated selector surface.
- Recipe resolver çıktısı (`packages/recipes/generated/resolvers.ts`) ve recipe CSS (`packages/recipes/index.css`) aynı naming surface'e bağlı kalmalıdır.

## 11. Büyük ekipler için öneriler
1. Naming değişiklikleri için code owner onayı should be required.
2. Her sprintte selector surface diff'i gözden geçirilmeli.
3. Alias migration dosyası üzerinden toplu refactor planı tutulmalı.
4. Utility ve semantic ownership alanları ekip bazında netleştirilmeli.
5. `force-*` kullanımı için kısa gerekçe notu PR içinde zorunlu tutulmalı.

## 12. Küçük proje vs büyük proje naming modu
Küçük proje:
- `plain` mode önerilir.
- Daha okunabilir class adları ve düşük entegrasyon maliyeti sağlar.

Büyük proje / çok ekipli ortam:
- `prefixed` mode değerlendirilmelidir.
- Namespace ayrımı ile çakışma riski düşürülür.

Geçiş notu:
- Mode değişimi API yüzeyini etkileyebileceği için breaking olarak ele alınmalıdır.

## 13. Breaking change yönetimi
Aşağıdaki değişiklikler breaking sayılmalıdır:
- Canonical class rename (örn. `btn` -> `button`)
- Prefix mode davranış değişikliği
- Selector key silinmesi veya semantic anlam değişikliği

Breaking change süreci:
1. Contract değişikliği açıkça belgelenmelidir.
2. `dist/contracts/alias-migration.json` güncel migration eşlemesi üretmelidir.
3. Migration notu (`docs/migration/`) güncellenmelidir.
4. CI testleri canonical/alias tutarlılığını geçmelidir.

## 14. Açık kararlar / future improvements
Open question 1:
- `btn` -> `button` gibi daha uzun semantic adlara geçiş uzun vadede isteniyor mu, yoksa `btn` canonical olarak kalacak mı?

Open question 2:
- Prefix stratejisi repo içinde tek mode ile mi sürdürülmeli, yoksa release artifact seviyesinde mode varyantları mı üretilmeli?

Open question 3:
- `force-*` kullanımına CI seviyesinde sayısal limit/gate eklenmeli mi?

Open question 4:
- Utility ve component base adlarında olası çakışmaları build aşamasında hard fail eden ek doğrulama gerekli mi?

Open question 5:
- Naming spec ihlalleri için lint/codemod akışı v0.3 hedefinde hangi kapsamda zorunlu olmalı?
