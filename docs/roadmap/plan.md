# Fikir CSS — Post-1.0 Roadmap

> Son güncelleme: 2026-04-20  
> v1.0.0 yayınlandı ✅ — Tüm v1.0 detayları için bkz. [archive](../archive/plan-2026-04-20-v1.0-completed.md)

---

## Özet

Fikir CSS v1.0.0 başarıyla yayınlandı. Aşağıda post-v1.0 çalışmaları (1.1.0+ hedefi) özetlenmiştir.

---

## M23 — v1.1.0 Maturity Gaps & 1.1.0 Readiness (2026-04-20)

> Kaynak: M22 üç-sprint değerlendirmesi sonrası dürüst skorkart. 
> **1.1.0 release'i tag'lenmeden önce 23.1 + 23.2 + 23.3 tamamlanmış olmalı.**

---

### 23.1 — Gerçek açıklar (P1 — 1.1.0 blocker)

#### 23.1.1 — Docs ↔ selectors CI drift check `(P1 blocker)`

**Sorun:**  
- `contracts/selectors.json`'de 400+ class var
- `docs/components/*.md` + `docs/patterns/*.md` 85+ dosya
- M22'de `kpi-card.md` ve `app-shell.md` üretime çıkan yanlış class adları öğretiyordu (`comp-kpi-card-metric`, `app-shell-footer` gibi)
- Kök neden: CI'da "docs code fence'leri yalnız selectors.json'da olan class'ları kullanıyor" testi **yok**

**Hedef:**  
`tests/source/docs-selectors-consistency.test.mjs` yaz:
- Her `docs/components/*.md` ve `docs/patterns/*.md` içindeki code fence'lerden `class="…"` token'larını çıkar
- `dist/contracts/selectors.json`'da olmayan class'ları fail et
- Allowlist: utility, state, data-* attributes istisnaları belirle

**Başarı kriteri:**  
- CI: "docs code fence'inde unknown class" hatası verir
- M22 tipi bug sessizce düzeltilmez; merge blocker olur

---

#### 23.1.2 — Dashboard starter Playwright smoke test `(P1 blocker)`

**Sorun:**  
Canonical örneğin kendi kendini test etmemesi = drift garantisi.

**Dogfooding feedback:**  
Yapılan dashboard'da (test/dashboard.html):
- Layout: app-shell + navbar + sidebar custom grid CSS (contract bilinmedi)
- Form: input validation state'i (data-invalid, data-disabled) bilinmedi
- Layout primitive'leri (cluster, stack, center) bilinmedi → inline style overuse
- Selectors.json bakmadığımız için %50-60 custom CSS yazma zorunluluğu

**Hedef:**  
`tests/playwright/dashboard-starter.spec.mjs` yaz. Senaryolar:
- Starter'ı yükle → `examples/dashboard-starter/` render doğrula
- `app-shell` + KPI grid + tablo + timeline görün
- Modal aç/kapat → focus trap çalışıyor mu
- Toast görün/kaybol → accessible mi
- `data-theme="dark"` toggle → chart token'ları değişmeli (token reaktivitesi)
- Form validation: input `data-invalid="true"` state'i doğru render ediyor mu

**Başarı kriteri:**  
- 5 senaryo hepsi geçiyor
- Canonical örnek düzenlenirse test fail eder
- Rapor: "app-shell, navbar, sidebar-nav, page-header, timeline contract'ları test kapsamında doğrulansın"

---

#### 23.1.4 — Form validation state contract `(P1 blocker)`

**Sorun:**  
Input, textarea, select, checkbox form bileşenlerinin state'i (`data-invalid`, `data-disabled`, `data-readonly`) kontrat'ları **specification kapalı veya inconsistent**.

**Dogfooding feedback:**  
Test dashboard'ında form validation state'i bilinmedi:
```html
<!-- Neleri bilmediğimiz: -->
<input data-invalid="true|false" />  <!-- ← kontrat nedir? CSS selector nedir? -->
<textarea data-disabled="true" />    <!-- ← destekleniyor mu? -->
<select data-invalid="true" />       <!-- ← hangisi kontrat içinde? -->
```

**Hedef:**  
- Form state contract'ını `contracts/capabilities.json`'a ekle: `{ "component": "input", "states": ["invalid", "disabled", "readonly", "required"] }`
- Her form element'in CSS selector'ünü `selectors.json`'a ekle
- Docs: `docs/components/input.md` state attribute'larını explicit yaz

**Başarı kriteri:**  
- Input/textarea/select/checkbox form state'i test kapsamında doğrulansın
- Docs'ta clear example: "invalid state = data-invalid='true' + CSS render olur"

---

**Sorun:**  
- `data-density="compact"` bazı component'lerde hiçbir şey yapmıyor
- Dogfooder'lar tespit etti ama matris yazılı değil
- Kullanıcı güveni sarsılır: "compact'ı kullanabilir miyim?"

**Hedef:**  
- Her **supported component** için `compact` davranışı dokumentasyonu: `tangible` / `subtle` / `no-op`
- `no-op` işaretli component'leri:
  - Hedef 1: iyileştir (eğer feasible)
  - Hedef 2: kalıcı `intentional no-op` notu ile capabilities.json'a işaretle
- Çıkış: `docs/guides/density.md` + `dist/contracts/capabilities.json` per-component `density_effect` alanı

**Başarı kriteri:**  
- Her supported surface için şu soruya cevap var: "compact mode'da ne değişir? (tangible / subtle / no-op)"
- capabilities.json: `"component": "button", "density_effect": "tangible"` gibi

---

### 23.2 — Teknik borç (P2 — 1.1.0 öncesi tercihen)

#### 23.2.1 — Anatomy coverage tamamlama `(P2)`

26 component hâlâ anatomy contract dışında (detect-css-anatomy-drift uyarıları).

**Dogfooding feedback:**  
Test dashboard'ında (2026-04-20):
- app-shell: layout grid custom CSS (contract'ı bilinmedi)
- navbar: flex + border custom CSS (contract'ı bilinmedi)
- sidebar-nav: padding + border custom CSS (contract'ı bilinmedi)
- page-header: undocumented
- timeline: undocumented
- **Sonuç:** 5 component undocumented → developers custom CSS yazma zorunluluğu (verimliliğe 40-50%)

**Hedef:** Layout + shell + data bileşenlerinin **anatomy + data-* contract'ları** critical.

**High-priority (5):** 
- [ ] **app-shell** — grid layout, child element contract
- [ ] **navbar** — flex direction, states (sticky, elevated)
- [ ] **page-header** — anatomy + spacing contract
- [ ] **sidebar-nav** — child link contract, active state
- [ ] **timeline** — event structure, alignment

**Remaining (21):**
- [ ] autocomplete, calendar, callout, code, code-block, combobox, context-menu
- [ ] date-picker, date-range-picker, date-time-picker, dropzone, editable-field, file-upload
- [ ] heading, kbd, markdown-surface, number-input, quote, range-slider, rating
- [ ] settings-panel, split-button, tags-input, text, time-picker, tree-table

**Exit criteria (1.1.0):**  
- 26'nın en az 15'i kapalı
- Minimum: top 5 layout/shell anatomy + undocumented form state'leri

---

#### 23.2.2 — Pattern gallery kalan 3 recipe `(P2)`

M22 exit criteria: "en az 6 composite recipe"  
Şu an: 2 (form-layout, sidebar-drawer-responsive)

**Kalan:**
1. `docs/patterns/data-table-toolbar-pagination.md`  
   - row selection + bulk action + sticky header + pagination
   
2. `docs/patterns/skeleton-to-content.md`  
   - skeleton-table → gerçek içerik geçiş animasyonu
   - timing best practices
   
3. `docs/patterns/command-palette-binding.md`  
   - arama + filter + keyboard nav
   - JS binding örneği (CDN friendly)

**Başarı kriteri:**  
- Her pattern 200+ satır, canonical example + JS setup + a11y notes

---

#### 23.2.3 — Component doc şablonu standardizasyonu `(P3)`

**Sorun:**  
`docs/components/*.md` serbest form — AI parsing'i ve insan yön bulması zor.  
**Dogfooding feedback (GLM):** Navbat, sidebar-nav, app-shell, page-header, timeline support matrix'te listelenmiş ama "nasıl kullanılır" eksik → custom CSS yazma zorunluluğu → verimliliği %40-50'ye düşüyor. selectors.json erişim olsaydı %60-70 verimli olabilirdi.

**Hedef:**  
Canonical şablon uygula:
1. Status (supported / beta / experimental)
2. Canonical anatomy table
3. Basic usage
4. Variants (tone, style, size, state)
5. CSS custom properties
6. Tokens used
7. A11y checklist
8. AI notes (selectors.json reference + data-* patterns)
9. Related components

**Öncelik:** app-shell, navbar, page-header, sidebar-nav, timeline ilk 5 → others after

**Referans:**  
- `kpi-card.md` ✅
- `app-shell.md` ✅
- `chart-frame.md` ✅

---

### 23.3 — Vibe-coder onboarding (P2 — kullanıcı bazında genişleme)

#### 23.3.1 — "Getting started → dashboard çalışır" path `(P2)`

**Sorun:**  
- AI için iyiyiz
- İnsan junior dev: 85+ component doc kaybolmaya müsait
- Giriş yolu uzun

**Hedef:**  
`docs/getting-started.md` yeniden düzenle — 15 dakikada:
1. Starter indir
2. 3 key component gör (button, card, modal)
3. Kendi sayfanı yaz

Şu an muhtemelen feature listing — pedagojik path yok.

**Başarı kriteri:**  
- Başlangıç kodu copypaste → ilk sayfanın çalışması 15 dakika içinde

---

#### 23.3.2 — "Utility-first'ten geliyorum" pedagojik köprüsü `(P2)`

**Sorun:**  
`why-fikir-css-vs-utility-first.md` defensive ("bizim farkımız…")

**Hedef:**  
Tailwind → Fikir CSS cheat sheet:
- Tailwind: `flex gap-4 items-center` → Fikir: `cluster` primitive
- Tailwind: `grid grid-cols-4 gap-6` → Fikir: `grid` + `--grid-min` token
- Yan yana karşılaştırma tablosu

**Başarı kriteri:**  
- Tailwind dev ders almadan başlayabiliyor

---

#### 23.3.3 — IDE autocomplete (VS Code custom data) `(P2)`

**Sorun:**  
- selectors.json + anatomy.json zaten manifest yayınlanıyor
- Ama editörde autocomplete vermiyor

**Hedef:**  
Minimal efor / yüksek etki: VS Code custom data dosyaları üret:
- `dist/vscode/html-custom-data.json`
- `dist/vscode/css-custom-data.json`

(Extension yazmaya gerek yok; VS Code yerel `.vscode/settings.json`'dan okuyabiliyor)

**Başarı kriteri:**  
- User: `.vscode/settings.json`'a path ekler → `class="btn btn-"` yazdığında autocomplete açılıyor

---

#### 23.3.4 — AI usability improvement — realistic boundaries `(P3)`

**Sorun:**  
Dogfooding feedback: Prompt yazsa bile AI varsayım bias'ına düşer.
- "Selectors.json var" → Ben bakmam, inline style yaparım (heuristic)
- "Cluster primitive kullan" → Cluster nedir? Grid yaparım
- Training data: Bootstrap/Tailwind/BEM dominan → o pattern'leri seçerim
- **Sonuç:** Prompt < Architecture enforcement

**Gerçekçi bulgu:**  
- ❌ Prompt yazmanın sınırlı etkisi
- ✅ Architecture + enforcement >> Documentation

**Hedef (P3 — nice-to-have):**  
1. **CI enforcement:** Unknown class → merge fail (23.1.1 zaten yapıyor)
2. **Linter:** data-invalid, data-disabled validation
3. **Copy-paste docs:** Şablonlu örnekler (kopyala → çalış garantisi)
4. **Selectors.json prominent:** README'de zorunlu okuma marker
5. **System prompt:** "DO use selectors.json NOT inline style" (AI assistant'lar için)

**Başarı kriteri:**  
- Sonraki test dashboard: %60-70 verimlilik (varsayımlardan %40-50'den çıkış)
- CI enforcement aktif

**Not:** Prompting alone won't work — enforcement + templates > all

---

### 23.4 — Exit criteria (1.1.0 release)

1.1.0 minor release çıkmadan önce:

- [ ] 23.1.1 — CI drift check test yazılmış ve geçiyor
- [ ] 23.1.2 — Dashboard Playwright 5 senaryo geçiyor (app-shell, navbar, page-header, sidebar-nav, timeline contract'ları test kapsamında)
- [ ] 23.1.3 — Form state contract (data-invalid, data-disabled, data-readonly) specification doğrulansın
- [ ] 23.1.4 — Density matrix + capabilities.json `density_effect` alanı
- [ ] 23.2.1 — 26 anatomy'den 15+ kapalı (minimum: top 5 layout/shell)
- [ ] 23.2.2 — Pattern gallery 5+ recipe'de
- [ ] 23.3.1 — Getting started 15 dakika path
- [ ] 23.3.2 — Utility-first rehberi yayınlandı
- [ ] Tüm değişiklikler additive, breaking yok

---

### 23.5 — Skorkart (2026-04-20)

| Boyut | Skor | Not |
|-------|------|-----|
| Kod mimarisi | 9/10 | Contract disiplini, token disiplini, zero-runtime |
| Test coverage | 8/10 | 482 test güçlü; dashboard smoke coverage açık |
| AI-anlaşılırlık | 8/10 | M22 öncesi 5/10 → anatomy + starter = sıçrama |
| İnsan (vibe coder) onboarding | 6/10 | Dokümantasyon bol, giriş yolu uzun |
| Sürüm / governance | 9/10 | Release policy + support matrix + hotfix checklist |
| Docs drift riski | 6/10 | CI drift check yok; M22'de 2 dosya sessizce düzeldi. **AI feedback:** GLM %40-50 verimli (navbar/sidebar-nav/app-shell/page-header/timeline undocumented) |

**Sürüm hedefi:** `1.1.0` — 23.1 + 23.2 + 23.3 tamamlanınca tag

---

## Dogfooding Insights — Test Dashboard (2026-04-20)

> Yapılan test dashboard (`/home/osman/Desktop/test/dashboard.html`) üzerinden gerçekçi AI kullanım feedback.  
> **Amaç:** Fikir CSS'i contract-first kullanmak vs varsayımlara düşmek — verimliliğe etki.

---

### Özet

- **Verimliliğe %40-50** (50-60 custom CSS zorunluluğu)
- **Potansiyel: %60-70** (selectors.json + component contract'ları bilinçli kullanılırsa)
- **Kritik bulgular:** Component API discovery eksikliği + form state contract specification kapalı

---

### ✅ Doğru Yapılanlar

1. **CDN import** — Doğru URL
2. **Token kullanımı** — `--color-*`, `--space-*`, `--font-size-*`, `--radius-*` maksimum
3. **Data-theme toggle** — `data-theme="light|dark"` doğru implement
4. **Semantic classes** — `btn`, `card`, `alert`, `badge`, `table`, `field` doğru
5. **ARIA attributes** — role, aria-label, aria-modal eklendi
6. **Concept understanding** — Contract-based, data-driven state felsefesi anlaşıldı

---

### ❌ Yanlış / Eksik Yapılanlar

#### 1. Layout component'leri contract'larını bakmadık
```html
<!-- ❌ Yapılan (custom grid) -->
<div class="app-shell" style="display: grid; grid-template-columns: 250px 1fr;">

<!-- ✅ Olması gereken (component contract) -->
<div class="app-shell">
  <aside class="sidebar">...</aside>
  <main>...</main>
</div>
```
**Etkilenen:** app-shell, navbar, sidebar-nav, page-header, timeline  
**Sonuç:** 50-60% custom CSS yazma zorunluluğu

---

#### 2. Selectors.json'a bakmadık
```html
<!-- Bilmediğimiz: -->
<button class="btn btn-primary">  <!-- Gerçek selector nedir? -->
<div class="card card-elevated">  <!-- Gerçek selector nedir? -->
```
**Eksik bilgi:** `dist/contracts/selectors.json` runtime mapping'i hiç kontrol edilmedi  
**Sonuç:** Generated selector'ları doğrudan kullanma riskine maruz kaldık

---

#### 3. Form state contract'larını bilmediğimiz
```html
<!-- Kontrat bilinmedi: -->
<input data-invalid="true|false" />  <!-- ← spec açık mı? -->
<textarea data-disabled="true" />    <!-- ← supported mı? -->
<select data-invalid="true" />       <!-- ← CSS selector nedir? -->
```
**Eksik:** Input/textarea/select/checkbox state'i specification kapalı  
**Sonuç:** Form validation eksik kaldı

---

#### 4. Layout primitive'leri fark etmedik
```html
<!-- Bilinmeyenler: -->
<div class="cluster">              <!-- flex + gap (bilmedik) -->
<div class="stack">                <!-- flex-direction: column (bilmedik) -->
<div class="center">               <!-- center align (bilmedik) -->
<div class="grid">                 <!-- responsive grid (bilmedik) -->
```
**Sonuç:** Inline style overuse (`style="display: flex; gap: var(--space-3);"`)

---

#### 5. Data-attribute'ları kullanmadık
```html
<!-- Hiç kullanılmadı: -->
data-density="compact|comfortable"
data-motion="reduced"
data-open="true|false"             <!-- Modal/Toast için -->
data-active="true|false"           <!-- Active state -->
data-disabled="true|false"         <!-- Form state -->
data-variant="primary|danger|..."  <!-- Button/Badge state -->
```
**Kullanılan:** Sadece `data-theme`

---

### 📊 Verimlilik Breakdown

| Metrik | Skor | Not |
|--------|------|-----|
| Token sistemi | 9/10 | Maksimum doğru kullanım |
| Semantic classes | 8/10 | Doğru ama contract bilinmedi |
| Component discovery | 3/10 | Support matrix var, API eksik |
| Data-attributes | 4/10 | Sadece data-theme |
| Layout primitives | 2/10 | Hiç bilinmedi |
| Selectors.json | 0/10 | Hiç açılmadı |
| **OVERALL** | **5/10** | **%40-50 verimliliğe = custom CSS zorunluluğu** |

**Potansiyel:** Selectors.json + contract'lar bilinçli kullanılırsa **%60-70**

---

### 🎓 Sonraki Test'te Yapacaklar

1. ✅ **Contract-first mindset:** "Bu component var mı?" → "Spec nedir?" → "Şu şekilde kullan"
2. ✅ **Selectors.json reference:** İlk adım — runtime mapping'i bilmek
3. ✅ **Layout primitive'leri:** cluster, stack, center, grid öğren
4. ✅ **Form state standardizasyonu:** data-invalid, data-disabled, data-readonly doğru
5. ✅ **Density + motion:** data-density, data-motion bilinçli kullanım

**Tahmin:** **%70-80 verimlilik**

---

### 📌 Fikir CSS Geliştirme İçin Açık Sorular

1. **Layout responsive:** cluster, stack, grid responsive davranışı nasıl (minmax vs data-*)? 
2. **Component padding:** card, button, input padding'leri spec'de mi?
3. **Form state:** data-invalid, data-disabled, data-readonly spec'de kapalı mı?
4. **Cascade:** Inline style + Fikir class sorun yaratıyor mu?
5. **Beta/Experimental:** AI context'inde bu bilgiye nasıl erişilecek?

---

| Surface | Blocker | Takvim |
|---------|---------|--------|
| `autocomplete` | Keyboard interaction spec freeze | 1.1.0 |
| `combobox` | Keyboard interaction spec freeze | 1.1.0 |
| `context-menu` | Positioning contract (Floating UI) | 1.1.0 |
| `tags-input` | Tag add/remove interaction API | 1.1.0 |
| `rating` | Half-star + keyboard contract | 1.1.0 |

---

## Experimental → Beta promotions (1.1.0+)

| Surface | Blocker |
|---------|---------|
| `inline-notice` | Semantic distinction from `alert`/`callout` |
| `split-button` | Keyboard/menu interaction contract spec |
| `tree-table` | Row expand/collapse keyboard nav contract |
| `copy-button` | Clipboard API integration pattern spec |
| `command-bar` | Slot contract and action grouping spec |

---

## Feature backlog (P2 ve sonrası)

### Tokens & tokens metadata
- Token usage mapping: hangi component'lerde hangi token kullanıldığını `tokens.json`'a ekle
- Manifest diff otomasyonu: CSS değişim → CHANGELOG otomatik
- Stale manifest detection: 3+ release boyunca değişmemiş entries'i uyar

### CDN & distribution
- CDN accessibility test: unpkg / jsDelivr URL'leri CI'da valide et
- Headless helpers CDN smoke test: `dist/helpers/*.mjs` erişilebilirlik

### DX improvements
- Web agent integration örneği
- VS Code extension örneği
- Fluid tokens pilot (`clamp()` spacing)

### Docs & examples
- Utility-first → Fikir CSS pedagojik rehberi
- Component doc şablonu standardizasyonu
- Visual regression baseline güncellemeleri

---

## Support window

- **v1.0.x**: Critical bugfix yalnızca (3 ay)
- **v1.1.0+**: Planned (2026-Q2 / Q3)

Detaylı timeline için bkz. [governance](../governance/release-schedule.md)

---

## İlgili dökümanlar

- [Backlog detayları](./post-1.0-backlog.md)
- [Açık görevler](./tasklist.md)
- [Support matrix](./support-matrix.md)
