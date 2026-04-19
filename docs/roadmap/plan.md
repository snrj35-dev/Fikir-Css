# Fikir CSS — v1.0 Ürünleşme Planı

> Oluşturulma: 2026-04-16  
> Baseline: `v1.0.0` repo snapshot  
> Hedef: Fikir CSS’i “güçlü prototip” seviyesinden “güvenle benimsenebilir, sürüm disiplini oturmuş, dokümante edilmiş, erişilebilir ve örneklerle doğrulanmış v1.0 ürün” seviyesine taşımak.

---

## 0. Gerçekçi çerçeve

“Hiçbir sorun, problem, eksik kalmaması” pratikte garanti edilemez. Ama v1.0 için amaç şudur:

- bilinen kritik boşlukların kapatılması,
- desteklenen yüzeyin netleştirilmesi,
- deneysel alanların ya ürünleştirilmesi ya da kapsam dışına alınması,
- tüketici güvenini zedeleyen sürüm/dokümantasyon drift’lerinin temizlenmesi,
- erişilebilirlik, örnek uygulama, paketleme ve yayın süreçlerinin ölçülebilir hale getirilmesi.

Bu plan “her şeyi ekleyelim” planı değil; “v1.0’da neyi garanti ediyoruz, neyi etmiyoruz” planıdır.

---

## 1. Baseline özeti (mevcut snapshot)

Repo bugün itibarıyla aşağıdaki güçlü tabana sahip:

- `82` component/pattern yüzeyi (`packages/components/*.css`)
- `95` test dosyası
- `15` playground HTML sayfası
- `23` export/subpath yüzeyi
- `26` npm script’i
- token, theme, density, motion ve shape temeli
- typed resolver ve helper yüzeyi
- publishable output doğrulama ve package smoke akışı

Ama v1.0 öncesi kapatılması gereken boşluklar da net:

1. **Ürün anlatısı drift’i**
   - farklı dosyalarda sürüm, beta/latest, destek seviyesi ve örnek kapsamı aynı şeyi söylemiyor.
2. **Doküman kapsama açığı**
   - 82 yüzeye karşı yalnızca sınırlı sayıda component dokümanı var.
3. **Framework örneklerinde asimetri**
   - React daha gerçek; Vue/Svelte daha zayıf.
4. **Davranışsal test açığı**
   - çok sayıda yapı testi var; browser-level interaction garantisi henüz yeterince sert değil.
5. **Surface promotion problemi**
   - supported / beta / experimental sınırı var ama ürün hikâyesine yeterince sert yansımıyor.
6. **Varyant sistemi eksik standardizasyon**
   - her component için tone, style, size, density ve state matrisi tam normalize edilmiş değil.
7. **v1.0 release governance eksiği**
   - freeze, deprecation, migration, RC burn-in, support window net değil.

---

## 2. v1.0 North Star

Fikir CSS v1.0 yayınlandığında kullanıcı şu üç soruya 10 saniyede güvenle cevap alabilmeli:

1. **Ne kadar olgun?**  
   Cevap: desteklenen yüzey, deneysel yüzey, garanti edilen API ve semver politikası açık.

2. **Nasıl kullanırım?**  
   Cevap: HTML, React, Vue ve Svelte için çalışan örnekler; theme/density/shape kullanım rehberi; migration rehberleri hazır.

3. **Buna güvenebilir miyim?**  
   Cevap: browser-level testler, package smoke, docs kalite kontrolleri, release checklist, RC süreci ve changelog disiplini var.

---

## 3. v1.0 ürün tanımı

Aşağıdaki maddelerin tamamı sağlanmadan `1.0.0` yayınlanmaz:

### 3.1 API ve surface doğruluğu
- Her public surface `supported`, `beta`, `experimental`, `deprecated` veya `removed` olarak işaretlenmiş olacak.
- `supported` yüzeyde selector contract freeze uygulanacak.
- `beta` yüzeylerde additive değişim sınırı yazılı olacak.
- `experimental` yüzeyler README ana akışında “ready” gibi sunulmayacak.

### 3.2 Dokümantasyon tamlığı
- Her `supported` surface için bir component dokümanı olacak.
- Her doküman şu bölümleri içerecek:
  - ne zaman kullanılır
  - ne zaman kullanılmaz
  - canonical class surface
  - states / data-* / aria ilişkisi
  - tone/style/size varyantları
  - erişilebilirlik checklist’i
  - AI / LLM usage notu
  - anti-pattern’ler
  - gerçek örnek

### 3.3 Görsel ve etkileşimsel doğrulama
- Her `supported` interactive surface için en az bir browser-level test olacak.
- Light / dark / high-contrast + compact / default / comfortable kombinasyonları için smoke coverage olacak.
- Focus, keyboard, reduced motion ve forced-colors davranışları test edilecek.

### 3.4 Paket ve sürüm güveni
- `npm install fikir-css` akışı latest için güvenli olacak.
- `beta` ve `latest` ayrımı workflow ile mekanik olarak zorlanacak.
- `npm pack` smoke, subpath import smoke ve fresh-consumer smoke release gate olacak.

### 3.5 Tüketici deneyimi
- `README` ilk 2 dakikada kullanıcıyı sonuca götürecek.
- Site ve playground tek ürün hikâyesi anlatacak.
- CDN, npm, bundler, slice ve theme import örnekleri doğrulanmış olacak.

---

## 4. Kapsam ilkeleri

### 4.1 v1.0’ın dahil ettiği şey
- kararlı component ve pattern sistemi
- normalize edilmiş token/theme varyant sistemi
- erişilebilir interactive helpers
- framework örnekleri
- migration rehberleri
- sürüm ve release governance

### 4.2 v1.0’ın özellikle dahil ETMEDİĞİ şey
Bunlar v1.0 sonrası değerlendirilir; v1.0’ı geciktirme gerekçesi yapılmaz:

- tam teşekküllü rich text editor
- tam veri sanallaştırma motoru
- chart kütüphanesi yazmak
- drag-and-drop kanban sistemi
- tam WYSIWYG layout builder
- native mobile UI kit eşleniği

Bu alanlar için en fazla pattern/rehber seviyesi hedeflenir.

---

## 5. Tasarım dili minimum matrisi (v1.0 için zorunlu)

v1.0’da varyant sistemi parçalı değil, sistematik olmalı.

### 5.1 Renk/semantic tone matrisi
Aşağıdaki semantic tone’lar en az ilgili component family’lerinde normalize edilmelidir:

- `neutral`
- `primary`
- `success`
- `warning`
- `danger`
- `info`

**Uygulama alanı:**
- button
- badge
- alert
- toast
- result
- progress
- stat / kpi-card
- segmented-control (seçilmiş durum)
- tabs / stepper / pagination current state
- tree-view selection / active node state

### 5.2 Style variant matrisi
Bileşen ailesine göre aşağıdaki stiller normalize edilmelidir:

- `solid`
- `soft`
- `outline`
- `ghost`
- `plain` veya `link` (uygun ailelerde)

**Beklenen aileler:**
- button
- badge
- alert (uygun alt küme)
- card / surface
- segmented-control
- menu / dropdown / popover action yüzeyleri

### 5.3 Boyut matrisi
En azından şu ölçek korunmalı:

- `xs`
- `sm`
- `md`
- `lg`

Bütün bileşenlerde zorunlu değil; ama button, input, select, icon-button, badge, segmented-control, pagination, tabs, toast yoğunluğu için standardize edilmeli.

### 5.4 Density matrisi
Global density contract:

- `compact`
- `default`
- `comfortable`

Bu modlar sadece spacing’i değil, touch target, typography ve table/data-grid yoğunluğunu da kontrollü etkilemeli.

### 5.5 Shape matrisi
Global shape contract:

- `sharp`
- `default`
- `rounded`

Shape yalnız border-radius değil; segmented-control, chips, buttons ve cards’ın algısal bütünlüğünü de etkilemeli.

### 5.6 Motion matrisi
- default motion
- reduced motion
- forced no-animation safety paths

### 5.7 State matrisi
Desteklenen surface’lerde aşağıdaki durumlar normalize edilmeli:

- `hover`
- `active`
- `focus-visible`
- `disabled`
- `loading`
- `selected`
- `checked`
- `open`
- `current`
- `completed`
- `invalid`
- `read-only`
- `busy`
- `drag-over` (upload/dropzone alanında)

---

## 6. Component kapsam kararı

v1.0 başarısı sadece yeni component eklemekle değil, mevcut 82 yüzeyi temiz şekilde sınıflandırmakla ölçülür.

### 6.1 v1.0’da “supported” olması hedeflenen temel yüzeyler

#### Core / foundation
- button
- icon-button
- link
- badge
- alert
- card
- surface
- divider
- skeleton
- spinner
- visually-hidden

#### Form / input
- field
- label
- helper-text
- error-text
- input
- textarea
- select
- checkbox
- radio
- switch
- input-group
- number-input
- range-slider
- segmented-control
- otp-input
- search-box

#### Overlay / feedback
- modal
- drawer
- popover
- tooltip
- dropdown-menu
- toast
- progress
- loading-overlay
- hover-card
- result

#### Navigation
- tabs
- accordion
- breadcrumb
- pagination
- navbar
- menu-bar
- sidebar-nav
- stepper
- command-palette
- tree-view

#### Data / display
- table
- data-grid
- list
- description-list
- avatar
- avatar-group
- stat
- kpi-card
- empty-state
- timeline
- tag-chip

#### Layout / shell
- container
- stack
- cluster
- center
- grid
- switcher
- sidebar
- page-header
- section-block
- app-shell
- split-pane

### 6.2 v1.0’da “beta” olarak kalabilecek yüzeyler
Bunlar implement edilmiş olabilir ama v1.0’da additive değişime açık bırakılabilir:

- autocomplete
- combobox
- context-menu
- date-picker
- date-range-picker
- calendar
- editable-field
- file-upload
- dropzone
- tags-input
- rating
- settings-panel

### 6.3 v1.0 öncesi EKLENMESİ gereken yeni component/pattern yüzeyleri
Bu bölüm gerçekten ürün boşluğu olan alanlardır:

#### Mutlaka eklenmeli
1. **split-button**
   - primary action + secondary menu akışı için
2. **time-picker**
   - date-picker/date-range-picker yanında önemli eksik
3. **date-time-picker**
   - dashboard/enterprise kullanımında kritik
4. **filter-bar**
   - table/data-grid/list filtreleme için canonical pattern
5. **data-table-toolbar**
   - arama, filtre, yoğunluk, sütun görünürlüğü, export alanı için
6. **empty-search-state**
   - no-results / filtered-empty / first-use ayrımıyla
7. **status-banner / inline-notice**
   - page-level persistent feedback yüzeyi
8. **command-bar**
   - app-shell ve data-screen’ler için
9. **tree-table pattern**
   - tree-view + table birleşimi için pattern-level sözleşme
10. **tour / coachmark pattern**
   - ürün onboarding’i için en az pattern seviyesi

#### Güçlü tavsiye edilen eklemeler
- `color-picker`
- `time-range-picker`
- `password-input` visibility toggle pattern
- `copy-button` pattern
- `stat-group` pattern
- `notification-center` pattern
- `search-result-item` pattern
- `auth-screen` pattern
- `onboarding-checklist` pattern

### 6.4 v1.0 sonrası değerlendirilecekler
- chart wrappers as first-class component
- kanban board
- rich text editor
- advanced scheduler / gantt
- full virtualization contracts
- drag handle / sortable collection

---

## 7. v1.0 iş akışları (workstreams)

Bu plan sekiz ana iş akışına bölünür.

### WS1 — Ürün doğruluğu ve sürüm gerçeği
Amaç: repo, docs, site, npm ve workflow aynı gerçeği anlatsın.

**Teslimatlar**
- version/tag truth table
- support matrix güncellemesi
- beta/latest release policy
- deprecation policy
- migration note template
- release readiness checklist

**Exit criteria**
- repoda eski sürüm referansı kalmaz
- workflow latest/beta ayrımını zorlar
- README ile package publish kanalı çelişmez

---

### WS2 — Token, theme, density ve style system
Amaç: renk ve stil varyantları component bazında değil sistem bazında yönetilsin.

**Teslimatlar**
- semantic tone matrisi
- style variant contract
- density impact audit
- shape audit
- motion audit
- theme comparison docs and demos

**Exit criteria**
- desteklenen component ailelerinde tone/style uyumu var
- hiçbir component keyfi ve belgelenmemiş tone ismi kullanmıyor
- high-contrast, dark, compact ve reduced-motion senaryoları görsel + davranışsal testte geçiyor

---

### WS3 — Supported surface stabilization
Amaç: mevcut 82 surface’i temizlemek, promote etmek, gerektiğinde daraltmak.

**Teslimatlar**
- supported/beta/experimental yeniden sınıflandırma
- unsupported veya redundant yüzeylerin sadeleştirilmesi
- canonical selector yüzeyi freeze
- component-level API docs

**Exit criteria**
- her supported surface için docs + demo + test var
- same-family drift minimuma inmiş
- naming contract ile docs birebir uyumlu

---

### WS4 — Eksik component ve pattern coverage
Amaç: ürün kullanımında hissedilen boşlukları kapatmak.

**Teslimatlar**
- split-button
- time-picker
- date-time-picker
- filter-bar
- data-table-toolbar
- empty-search-state
- inline-notice
- command-bar
- tree-table pattern
- tour/coachmark pattern

**Exit criteria**
- dashboard, settings, CRUD, analytics, onboarding ve auth benzeri yaygın ekranlar yalnız mevcut sistemle kurulabiliyor

---

### WS5 — Erişilebilirlik ve interaction guarantees
Amaç: “ARIA var” seviyesinden “davranış garantisi var” seviyesine geçmek.

**Teslimatlar**
- keyboard interaction matrix
- focus management matrix
- screen-reader expectation docs
- browser-level tests
- forced-colors / reduced-motion smoke
- accessibility review checklist

**Exit criteria**
- modal, drawer, dropdown, menu-bar, tabs, accordion, command-palette, tree-view, combobox, date-picker family için browser-level interaction testleri var
- tab order, escape handling, roving tabindex ve aria state senkronu kanıtlanmış

---

### WS6 — Documentation, examples ve adoption kit
Amaç: dış kullanıcı 15 dakikada kavrayabilsin.

**Teslimatlar**
- README rewrite
- all-supported component docs
- migration guides
- framework quickstarts
- copy-paste starter recipes
- token/theme guide polish
- AI assistant guide
- troubleshooting guide

**Exit criteria**
- HTML/React/Vue/Svelte başlangıç akışları tek denemede çalışıyor
- migration rehberleri gerçek eşleme tablolarına sahip
- site ve playground arasında rol ayrımı net

---

### WS7 — Quality engineering ve CI hardening
Amaç: kalite insan disiplinine değil, otomasyona bağlı olsun.

**Teslimatlar**
- browser matrix CI
- visual regression hard gate (en az supported surfaces için)
- docs lint / docs drift checks
- manifest-to-doc consistency checks
- example app smoke
- package install smoke
- release candidate checklist automation

**Exit criteria**
- v1.0 release’i manuel güvene değil, CI gate’lere dayanır

---

### WS8 — Distribution, governance ve launch
Amaç: yayınlandıktan sonra da güven kaybı yaşanmasın.

**Teslimatlar**
- semver policy
- support policy
- contribution boundaries
- issue triage labels
- roadmap hygiene
- changelog discipline
- RC plan
- launch checklist

**Exit criteria**
- `1.0.0-rc` → burn-in → `1.0.0`
- bugfix policy ve deprecation path yazılı

---

## 8. Milestone planı

Aşağıdaki milestone’lar mevcut `v1.0.0` durumundan `1.0.0`’a giden önerilen sıradır.

---

## M13 — Product Truth & Surface Freeze Prep

**Amaç:** ürünün anlattığı şey ile repoda olan şey aynı hale gelsin.

### Kapsam
- version/reference drift temizliği
- support matrix revizyonu
- experimental/beta/supported yeniden sınıflandırma
- README, site, playground ve npm mesajlarının hizalanması
- release policy taslağı
- deprecation/migration policy taslağı

### Başarı kriteri
- “Bu proje ne kadar stabil?” sorusuna repo içinde tek bir cevap var.

---

## M14 — Design Language Normalization

**Amaç:** tone/style/size/density/shape kontratını v1.0 için normalize etmek.

### Kapsam
- semantic tone audit
- style variant audit
- size audit
- density audit
- shape audit
- missing token additions
- contrast regression audit
- state naming normalization

### Başarı kriteri
- button, badge, alert, toast, result, stat, tabs, stepper, segmented-control, menu ve surface ailelerinde sistematik varyant seti tamam.

---

## M15 — Surface Promotion & Component Doc Completion

**Amaç:** supported yüzeylerin her biri demo+doc+test ile ürün yüzeyine taşınsın.

### Kapsam
- tüm supported surface’ler için component docs
- playground/site coverage yükseltme
- experimental yüzeylerden promote edileceklerin netleştirilmesi
- demo drift temizliği
- AI context / selector examples güncelleme

### Başarı kriteri
- supported bir component’in “docs yok / örnek yok / test yok” durumu kalmaz.

---

## M16 — Missing Product Components & Workflow Patterns

**Amaç:** gerçek ürün ekranlarını tamamlayan boşlukları kapatmak.

### Kapsam
- split-button
- time-picker
- date-time-picker
- filter-bar
- data-table-toolbar
- empty-search-state
- inline-notice
- command-bar
- tree-table pattern
- tour/coachmark pattern

### Başarı kriteri
- dashboard, admin panel, settings, search, onboarding ve data-heavy ekranlar canonical pattern’lerle kurulabiliyor.

---

## M17 — Accessibility & Browser-Level Guarantees

**Amaç:** interaction-heavy surfaces için tarayıcı seviyesinde güven tesis etmek.

### Kapsam
- Playwright tabanlı keyboard/focus testleri
- visual regression gate
- reduced-motion / forced-colors smoke
- browser matrix
- accessibility docs
- helper API stabilizasyonu

### Başarı kriteri
- interactive supported surface’lerde behavior sözleşmesi otomasyonla doğrulanıyor.

---

## M18 — Framework Adoption & Consumer Experience

**Amaç:** HTML, React, Vue ve Svelte tüketimi eşik düşürecek kadar iyi olsun.

### Kapsam
- React örneği güncelleme
- Vue gerçek demo app
- Svelte gerçek demo app
- framework rehberleri
- SSR/hydration guidance
- starter-consumer güçlendirme
- slice/theme consumption docs

### Başarı kriteri
- 4 tüketim yolunda da tek komutla çalışan örnek var.

---

## M19 — Quality Gates, Packaging & RC Track

**Amaç:** release adayını otomasyonla korumak.

### Kapsam
- CI gate sertleştirme
- docs/manifest drift kontrolü
- package smoke genişletme
- subpath import smoke
- version tag consistency
- release candidate checklist
- `1.0.0-rc.1` yayın süreci

### Başarı kriteri
- RC yayını için gerekli kanıtların tamamı CI ve dokümanlarda mevcut.

---

## M20 — v1.0 Launch & Post-Launch Guardrails

**Amaç:** `1.0.0`’ı güvenle yayınlayıp sürdürülebilir hale getirmek.

### Kapsam
- final support matrix freeze
- changelog finalizasyonu
- migration notes
- homepage polish
- launch examples
- support window açıklaması
- issue templates / bug report quality
- first patch readiness (`1.0.1` hotfix path)

### Başarı kriteri
- `1.0.0` yayınlandıktan sonra “şimdi ne olacak?” sorusu cevapsız kalmaz.

---

## 9. Dosya/alan bazlı çalışma haritası

### Contracts / build
- `contracts/naming.contract.mjs`
- `contracts/recipes.contract.mjs`
- `scripts/build-css.mjs`
- `scripts/css-manifest*.mjs`
- `scripts/report-*.mjs`
- `scripts/validate-*.mjs`

### Tokens / themes
- `packages/tokens/core.css`
- `packages/tokens/semantic.css`
- `packages/tokens/themes/*.css`

### Components / patterns
- `packages/components/*.css`
- gerekiyorsa yeni component dosyaları
- gerekiyorsa pattern docs + playground sections

### Helpers / tooling
- `packages/helpers/*`
- `packages/tooling/*`
- `dist/tooling/*` çıktıları

### Docs
- `README.md`
- `docs/components/*.md`
- `docs/guides/*.md`
- `docs/migration/*.md`
- `docs/governance/*.md`
- `docs/release/*.md`
- `docs/testing/*.md`
- `docs/roadmap/support-matrix.md`

### Examples / demos
- `examples/react-vite`
- `examples/vue-vite`
- `examples/svelte-vite`
- `examples/starter-consumer`
- `site/index.html`
- `playground/*.html`
- `playground/demo.js`
- `playground/demo.css`

### QA
- `tests/source/*.test.mjs`
- `tests/build/*.test.mjs`
- gerekiyorsa yeni browser/e2e test klasörü
- `.github/workflows/*.yml`

---

## 8. Machine-Readable Artifacts for AI Adoption

v1.0 başarısının bir boyutu da AI asistanların (Claude, ChatGPT, web agents) Fikir CSS'i güvenle kullanabilmesidir. Bu, human-readable dokümanın ötesinde, machine-readable manifest'ler ve contract'lar gerektirir.

### 8.1 Problem analizi
AI kullanıcılar "Fikir CSS'i bir template'e nasıl entegre ederim?" diye sorduğunda:

1. **Class adları bilinmiyor** — `sidebar-nav-item` mi? `nav-link` mi? Tahmin etmek zorunda kalıyor.
2. **Component iç yapısı net değil** — `field > label + input + helper-text` mı? Belgenlerden reverse-engineer etmek gerekiyor.
3. **Token değerleri erişilemiyor** — `--space-4` kaç px? Custom CSS yazmak zorunda kalıyor.
4. **Component yetenekleri ambiguous** — `navbar` fixed + blur yapıyor mu? Tahmin etmek gerekiyor.
5. **Variant isimleri tutarsız** — `badge-success` mi `badge-green` mi?

**Sonuç:** AI, custom CSS'e çok fazla ihtiyaç duyuyor, yanlış class adları ve redundant override'lar oluşuyor.

### 8.2 Çözüm: Canonical Machine-Readable Manifests
v1.0'da aşağıdaki JSON manifest'ler **CDN'de erişilebilir** olmalıdır:

1. **Selectors Manifest** (`dist/contracts/selectors.json`)
   - Tüm supported component/pattern class adlarının listesi
   - Canonical ve variant form'ları
   - `data-*` pattern marker'ları

2. **Anatomy Manifest** (`dist/contracts/anatomy.json`)
   - Component iç yapı örnekleri
   - Alt-element roller
   - Minimal HTML pattern'leri
   - Örn: `field > label + input + (helper-text|error-text)`

3. **Token Values Manifest** (`dist/contracts/tokens.json`)
   - `--space-*`, `--font-size-*`, `--color-*` değerleri
   - px equivalents
   - Light/dark mode mappings

4. **Capability Matrix** (`dist/contracts/capabilities.json`)
   - Component "does" ve "does not" tablosunu
   - `navbar` fixed yapıyor mu? Yok.
   - `button` disabled state'i yapıyor mu? Evet.
   - App'ın sorumlu olduğu CSS'ler

5. **Variant Registry** (`dist/contracts/variants.json`)
   - Canonical tone adları: `neutral`, `primary`, `success`, `warning`, `danger`, `info`
   - Canonical style'lar: `solid`, `soft`, `outline`, `ghost`, `plain`
   - Size ölçeği: `xs`, `sm`, `md`, `lg`
   - Component başına applicable variant'lar

6. **Layout Primitive Defaults** (`dist/contracts/primitives.json`)
   - `stack`: default gap var(--space-4)
   - `cluster`: default gap var(--space-2), flex-wrap
   - `center`: CSS grid place-items
   - Her primitive'in default davranışı

### 8.3 Manifest distribüsyon
- Build-time'da `dist/contracts/` klasöründe generate edilecek
- CDN (unpkg, jsdelivr) üzerinden erişilebilir:
  - `https://unpkg.com/fikir-css@1.0.0/dist/contracts/selectors.json`
  - vs
- Her manifest'in v1.0 freeze tarihi belirtilecek

### 8.4 Success metric
v1.0 sonrası:
- AI template generation'da custom CSS miktarı **%60 azalsın**
- Yanlış class adı kullanımı **sıfıra** insin
- Component yapı hataları **sıfıra** insin

### 8.5 Manifest Maintenance & Automation (Bakım Riski Çözümü)

v1.0'dan sonra manifest'ler zamanla "eski" hale gelme riskine karşı **otomatik kontrol mekanizmaları** gereklidir.

#### 8.5.1 Problem: Manifest Drift
Örnek senaryo:
```
v1.0.0'da: field component → anatomy.json doğru
↓
v1.0.5'de: field component'e yeni sub-selector eklendi
↓
anatomy.json hâlâ eski
↓
AI: eski pattern'e göre kod üretiyor → hata
```

#### 8.5.2 Çözüm: Multi-layered Validation

**Katman 1: Schema Validation**
```json
// dist/contracts/schema.json
{
  "selectors.json": {
    "type": "object",
    "properties": {
      "components": {
        "type": "object",
        "required": ["canonical", "selectors"],
        "additionalProperties": {...}
      }
    }
  },
  "anatomy.json": {
    "type": "object",
    "required": ["structure", "minimal_example"],
    "properties": {
      "stable_since": {"type": "string", "format": "semver"},
      "deprecated_since": {"type": "string", "format": "semver"},
      "status": {"enum": ["stable", "beta", "deprecated"]}
    }
  }
}
```

CI'da her build'de:
```bash
scripts/validate-manifests.mjs
  ├─ JSON schema validation
  ├─ required fields check
  ├─ enum values check (status, tone names)
  └─ fail if invalid
```

**Katman 2: Drift Detection**
Component CSS değiştiğinde anatomy.json'ın güncellenmesi gerektiğini detect etme:

```bash
scripts/detect-manifest-drift.mjs
  ├─ CSS selector'ları parse et (packages/components/*.css)
  ├─ anatomy.json'daki selector'larla karşılaştır
  ├─ "❌ anatomy.json'da field-group bulunamadı (field.css'de var)" uyarısı
  └─ CI fail (manifest sync zorunlu)
```

**Katman 3: Versioning & Deprecation Tracking**
Her manifest entry'ye lifecycle metadata:

```json
{
  "field": {
    "stable_since": "1.0.0",
    "last_updated": "2026-04-17",
    "status": "stable",
    "breaking_changes": [],
    "deprecated_since": null
  },
  "old-avatar-legacy": {
    "stable_since": "0.5.0",
    "deprecated_since": "1.1.0",
    "status": "deprecated",
    "migration_note": "Use avatar instead"
  }
}
```

CI'da staleness check:
```bash
if (last_updated < 3_releases_ago && status === "stable") {
  warn: "field manifest 3 release'dir güncellenmemiş, doğrula"
}
```

**Katman 4: Automated Diff Tracking**
Component docs'ta manifest değişimlerini takip etme:

```
CHANGELOG.md:
## v1.0.5
- field component: label nesting optional hale geldi
  - anatomy.json güncellendi: label now optional
  - selectors.json: `field-label` yeni alias eklendi
```

Otomatik generate eden script:
```bash
scripts/manifest-changelog.mjs
  ├─ git diff --name-only (packages/components/*.css)
  ├─ İlgili entry'leri anatomy.json'da bul
  ├─ Çağımların changelog fragment'i oluştur
  └─ CHANGELOG.md'ye append et (manual review ile)
```

**Katman 5: Contributor Guidance**
`CONTRIBUTING.md`'ye manifest update workflow:

```markdown
## Component CSS değiştiğinde

1. CSS'i yazın
2. `packages/components/[name].css` kaydedin
3. `npm run validate-manifests` → fail mı?
   - Evet → anatomy.json'ı güncelleyin
   - `dist/contracts/anatomy.json`'da entry bulun
   - `minimal_example` ve `structure` kısmını update edin
4. `npm run manifest-changelog` → CHANGELOG fragment suggest edecek
5. PR'ı açın (manifest update'leri include et)
```

#### 8.5.3 Implementation Requirements

- Manifest validation testler (unit) — **P0**
- CSS→anatomy drift detection script — **P0**
- Versioning metadata schema — **P1**
- Staleness alert mekanizması — **P1**
- Automated changelog generation — **P2**
- Contributor guide update — **P1**

#### 8.5.4 Long-term Reliability
Bu mekanizmalar sayesinde:
- Component CSS değişti → manifest otomatik sync uyarısı
- Eski manifest entry'ler flag'lenir (deprecated)
- AI 3 release eski pattern'e göre kod üretmez
- Manifest changelog = otomatik dokumentasyon

---

## 10. Ölçülebilir v1.0 çıkış kriterleri

### 10.1 Doküman kapsaması
- supported surface docs coverage: `%100`
- component docs şablon uyumu: `%100`
- migration guide coverage: Bootstrap, Tailwind, MUI, plain HTML, framework quickstarts

### 10.2 Demo kapsaması
- supported surface demo coverage: `%100`
- hero/demo/site coverage: high-value surfaces first
- empty or stub example kalmamalı

### 10.3 Kalite kapıları
- local ve CI green
- package smoke green
- fresh install green
- browser-level interactive tests green
- docs drift green
- visual regression green
- contrast regression green

### 10.4 Sürüm ve governance
- semver policy yazılı
- deprecation path yazılı
- support matrix freeze
- RC süreci uygulanmış
- latest ve beta yayın akışları net

---

## 11. Riskler

### 11.1 Scope şişmesi
Her iyi fikir v1.0’a girmemeli. “Eksik component” listesi sınırsız büyüyebilir.  
**Önlem:** only must-have workflow gaps v1.0’a alınır; geri kalan post-1.0 listesine gider.

### 11.2 Experimental surface overload
Fazla sayıda yarı-olgun surface ürünü bulanıklaştırır.  
**Önlem:** promote et ya da geri plana çek; gri alan bırakma.

### 11.3 Docs yetişir ama behavior yetişmez riski
Güzel doküman, zayıf etkileşim davranışını gizleyebilir.  
**Önlem:** interactive surfaces için browser-level test zorunlu.

### 11.4 Theme çeşitleri arttıkça regressions artar
Light/dark/high-contrast + density + shape kombinasyonları çoğalır.  
**Önlem:** kombinasyon matrisi için smoke ve visual regression.

### 11.5 Framework örnekleri bakım yükü yaratır
React, Vue, Svelte eşdeğer kalmakta zorlanabilir.  
**Önlem:** örnekleri küçük ama gerçek tut; component library wrapper’a dönüşme.

---

## 12. v1.0 sonrası backlog’a bırakılabilecek adaylar

Bunlar değerli olabilir ama v1.0’ı bloke etmemelidir:

- chart wrapper / chart pattern docs
- advanced scheduler
- kanban / sortable list
- virtualization contracts
- drag-and-drop primitives
- rich text editing
- multi-step form wizard DSL
- pro data-grid extensions

---

## 13. Son söz

Bu planın özü şu:

Fikir CSS’in v1.0’a gitmesi için en büyük iş artık “daha fazla CSS yazmak” değil;  
**desteklenen yüzeyi kesinleştirmek, varyant sistemini normalize etmek, interaction garantisi vermek, doküman ve örnekleri ürün seviyesine çıkarmak ve release disiplinini kalıcı hale getirmek.**

v1.0 başarı tanımı:  
**“İnsanlar bunu sadece beğenmiyor; güvenerek projelerine alabiliyor.”**
