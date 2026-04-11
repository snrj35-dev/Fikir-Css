# Fikir CSS — Product Plan

> Contract-driven CSS foundation prototype için bileşen, pattern ve ürünleşme yol haritası

## 1. Amaç

Bu belge, Fikir CSS'in mevcut v0.2 foundation aşamasından daha geniş bir component ve product surface'e nasıl evrileceğini planlar.

Amaçlar:

- Bileşen yüzeyini rastgele değil, fazlı biçimde büyütmek
- Primitive, composite ve product pattern katmanlarını birlikte ele almak
- Spec-first yaklaşımı korumak
- Foundation, contract, naming ve token disiplinini bozmadan ilerlemek
- Küçük ekip ve ürün ekipleri için farklı değer katmanlarını sıralamak

Bu plan, tek tek dağınık feature eklemek yerine kontrollü workstream'ler ve fazlar üzerinden ilerlemeyi önerir.

---

## 2. Planlama İlkeleri

### 2.1 Spec-first
Yeni component veya pattern implementation'ı, mümkün olduğunda önce RFC/spec ile tanımlanmalıdır.

### 2.2 Contract-first
Naming, selector surface, token kullanımı ve recipe ilişkisi mevcut contract-driven mimariyle uyumlu kalmalıdır.

### 2.3 Batch-oriented delivery
Tek tek izole feature eklemek yerine ilişkili yüzeyler batch/workstream halinde ilerletilmelidir.

### 2.4 Product realism
Sadece tekil UI elemanları değil, gerçek ürün yapıları da roadmap içinde düşünülmelidir.

### 2.5 Enforcement before expansion
Yeni yüzey eklenmeden önce mevcut yüzey için test, docs ve override davranışı yeterince güvence altına alınmalıdır.

---

## 3. Bileşen Envanteri

### 3.1 Core / Foundation

- Button
- Icon Button
- Link
- Card
- Badge
- Alert
- Divider
- Skeleton
- Spinner
- Surface
- Visually Hidden

### 3.2 Form / Input

- Input
- Textarea
- Select
- Checkbox
- Radio
- Switch
- Range Slider
- OTP / Pin Input
- Field / Form Field
- Label
- Helper Text
- Error Text
- Input Group
- Combobox
- Autocomplete

### 3.3 Overlay / Feedback

- Modal / Dialog
- Drawer
- Popover
- Tooltip
- Dropdown Menu
- Context Menu
- Hover Card
- Toast
- Progress
- Loading Overlay

### 3.4 Navigation

- Tabs
- Accordion
- Breadcrumb
- Pagination
- Navbar
- Sidebar
- Command Palette
- Menu Bar
- Steps / Stepper

### 3.5 Data Display

- Table
- Data Grid
- List
- Description List
- Avatar
- Avatar Group
- Tag / Chip
- Stat
- Empty State
- Timeline
- KPI Card

### 3.6 Layout / App Shell

- Container
- Stack
- Cluster
- Sidebar Layout
- Switcher
- Center
- Grid
- Page Header
- Section
- App Shell
- Split Pane

### 3.7 Content / Rich UI

- Text
- Heading
- Code
- Code Block
- Callout
- Quote
- Kbd
- Markdown Surface

### 3.8 Advanced / Product Surface

- Date Picker
- Date Range Picker
- Calendar
- File Upload
- Dropzone
- Search Box
- Filter Bar
- Data Table Toolbar
- Command Bar
- Editable Field

---

## 4. Öncelik Fazları

### 4.1 Phase 1 — Mutlaka lazım olanlar

Bu faz, framework'ün en hızlı değer üreten ve gerçek ürünlerde en sık kullanılan yüzeylerini kapsar.

- Button
- Input
- Card
- Badge
- Alert
- Label
- Helper Text
- Error Text
- Modal
- Tabs
- Accordion
- Toast
- Table
- Pagination
- Avatar
- Empty State
- Skeleton
- Spinner

#### Phase 1 hedefleri
- Temel component surface'in ürün kullanılabilirliğini göstermek
- Primitive + ilk composite katmanı kurmak
- Demo ve docs'ta gerçek kullanım örnekleri sunmak
- Override davranışını somutlaştırmak
- A11y ve token tüketimi konusunda güvenilir örnekler üretmek

---

### 4.2 Phase 2 — Ürün ekipleri için yüksek değer

Bu faz, dashboard, admin panel ve daha zengin uygulama yüzeyleri için gerekli yapı taşlarını kapsar.

- Select
- Checkbox
- Radio
- Switch
- Textarea
- Dropdown Menu
- Popover
- Tooltip
- Drawer
- Breadcrumb
- Navbar
- Sidebar
- Stepper
- Stat
- Timeline
- Input Group

#### Phase 2 hedefleri
- Form ve navigation yüzeyini olgunlaştırmak
- Overlay / interaction surface'i genişletmek
- App shell ve settings/dashboard akışlarını desteklemek
- Küçük demo yerine gerçek ürün senaryolarına daha yakın örnekler sunmak

---

### 4.3 Phase 3 — Framework’ü güçlü gösterenler

Bu faz, Fikir CSS'in ileri seviye yeteneklerini ve daha yüksek geliştirici deneyimini görünür kılar.

- Combobox
- Autocomplete
- Command Palette
- Date Picker
- Date Range Picker
- File Upload
- Dropzone
- Data Grid
- Hover Card
- Editable Field

#### Phase 3 hedefleri
- Gelişmiş ürün yüzeylerini desteklemek
- Composite component yeteneğini göstermek
- Interaction complexity içeren bileşenlerde contract disiplini korumak
- Framework'ün farklılaşma alanlarını güçlendirmek

---

## 5. Üç Katmanlı Ürün Yüzeyi

Fikir CSS'te component listesi sadece tekil UI elemanları olarak ele alınmamalıdır. Yol haritası üç ayrı yüzeyi birlikte kapsamalıdır.

### 5.1 Primitive components

Düşük seviyeli ama yaygın kullanılan yüzeyler:

- Button
- Input
- Card

Bu katman:
- canonical class surface
- recipe yüzeyi
- token kullanımı
- basic accessibility beklentisi
açısından en net tanımlanan katman olmalıdır.

### 5.2 Composite components

Birden fazla primitive ve state yüzeyini birleştiren bileşenler:

- Modal
- Dropdown Menu
- Table
- Form Field

Bu katman:
- slot/composition modeli
- layout ve utility ilişkisi
- interaction states
- wrapper/child surface
konularını taşır.

### 5.3 Product patterns

Gerçek uygulama iskeletleri ve workflow yüzeyleri:

- App Shell
- Filter Bar
- Data Table Toolbar
- Settings Panel

Bu katman, Fikir CSS'in sadece component kütüphanesi değil, ürün geliştirme yüzeyi olduğunu gösterir.

---

## 6. Workstream Bazlı Yol Haritası

Tek tek feature yerine, ilişkili alanları workstream olarak ele almak önerilir.

### 6.1 Workstream A — Core Component Refinement

Kapsam:
- Button
- Input
- Card
- Badge
- Alert
- Label / Helper Text / Error Text

Amaç:
- Mevcut RFC yüzeylerini implementation ile hizalamak
- Primitive layer'ı stabilize etmek
- Validation ve demo örnekleri eklemek

### 6.2 Workstream B — Overlay & Interaction

Kapsam:
- Modal
- Toast
- Popover
- Tooltip
- Dropdown Menu
- Drawer

Amaç:
- Overlay ve feedback yüzeyini standartlaştırmak
- State, focus ve layering davranışını ürün seviyesinde test etmek

### 6.3 Workstream C — Forms & Field Composition

Kapsam:
- Select
- Checkbox
- Radio
- Switch
- Textarea
- Field / Form Field
- Input Group

Amaç:
- Form semantics ve validation ilişkisini genişletmek
- Label/help/error modelini alan bazında birleştirmek

### 6.4 Workstream D — Navigation & Shell

Kapsam:
- Tabs
- Accordion
- Breadcrumb
- Pagination
- Navbar
- Sidebar
- Stepper
- App Shell
- Page Header
- Section

Amaç:
- Application shell ve navigation yüzeyini oturtmak
- Layout primitives ile higher-level patterns arasındaki sınırı netleştirmek

### 6.5 Workstream E — Data & Display

Kapsam:
- Table
- Avatar
- Empty State
- Stat
- Timeline
- KPI Card
- Data Grid
- List
- Description List

Amaç:
- Data-heavy ürünler için display yüzeyi hazırlamak
- Table/Data Grid farkını netleştirmek
- Dense information surfaces için token ve layout kararlarını test etmek

### 6.6 Workstream F — Advanced Product Surface

Kapsam:
- Combobox
- Autocomplete
- Command Palette
- Date Picker
- Date Range Picker
- File Upload
- Dropzone
- Search Box
- Filter Bar
- Data Table Toolbar
- Command Bar
- Editable Field

Amaç:
- Framework'ün ileri seviye kullanım alanlarını açmak
- Complex interaction ve composite state yönetimini olgunlaştırmak

---

## 7. Aşama Aşama Uygulama Stratejisi

### Stage 1 — Foundation Alignment
- RFC'li primitive'leri implementation ile hizala
- Core docs, tests ve playground yüzeyini güncelle
- Default/override davranışlarını netleştir

### Stage 2 — Composite Layer
- Overlay ve form composition surface ekle
- Accessibility ve slot/composition davranışlarını tanımla
- Daha güçlü demo akışları kur

### Stage 3 — Product Pattern Layer
- App shell, filter bar, toolbar gibi pattern'leri ekle
- Component library'den product surface'e geçişi görünür kıl

### Stage 4 — Advanced Surface
- Daha zor interaction bileşenlerine geç
- Build/test/docs disiplinini koruyarak ileri yüzeyleri ekle

---

## 8. Non-Goals

Bu planın amacı:
- Her component'i aynı anda implement etmek değildir
- Sadece “çok component olsun” diye yüzey büyütmek değildir
- Headless behavior engine veya ağır runtime mimarisi kurmak değildir
- Contract ve naming disiplini pahasına hızlı demo toplamak değildir

---

## 9. Başarı Ölçütleri

Bir faz veya workstream tamamlanmış sayılmadan önce aşağıdaki sorulara olumlu cevap verilmelidir:

- Surface için RFC/spec var mı?
- Naming spec ve token dictionary ile uyumlu mu?
- Contract surface test veya validation ile korunuyor mu?
- Demo/playground içinde gerçek örnek var mı?
- README/docs içinde referans mevcut mu?
- Override davranışı belgelendi mi?
- Accessibility beklentisi yazıldı mı?

---

## 10. Önerilen Yakın Yol Haritası

En mantıklı kısa vadeli sıra:

1. Core Component Refinement batch
   - Button state refinement
   - Input validation surface
   - Card composition / slot surface
   - ilgili testler
   - playground güncellemesi

2. Forms & Field Composition batch
   - Label
   - Helper Text
   - Error Text
   - Field / Form Field
   - Textarea
   - Select
   - Checkbox / Radio / Switch

3. Overlay & Interaction batch
   - Modal
   - Toast
   - Tooltip
   - Popover
   - Dropdown Menu
   - Drawer

4. Navigation & Shell batch
   - Tabs
   - Accordion
   - Pagination
   - Breadcrumb
   - Navbar
   - Sidebar
   - Page Header / Section / App Shell

---

## 11. Sonuç

Fikir CSS için doğru büyüme stratejisi, uzun bileşen listesine rağmen bunları tek tek dağınık eklemek değil; primitive, composite ve product pattern katmanlarını birlikte düşünerek fazlı ve workstream bazlı ilerlemektir.

Bu planın amacı, framework'ü sadece “çok component barındıran” bir yapı değil, dokümante edilmiş, test edilen ve ürün senaryolarını karşılayan bir sistem olarak büyütmektir.
