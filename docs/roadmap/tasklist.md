# Fikir CSS — Open Tasks (Post-1.0)

> Son güncelleme: 2026-04-20  
> **v1.0.0 yayınlandı** ✅  
> Detaylı roadmap → [plan.md](./plan.md) · M23 — v1.1.0 Maturity Gaps  
> Tamamlanan milestone'lar → [archive/](../archive/)  
> Geniş backlog → [post-1.0-backlog.md](./post-1.0-backlog.md)

---

## Legend
- `[ ]` açık — yapılacak
- `[x]` tamamlandı
- `(P1)` yüksek öncelik — v1.1.0 blocker
- `(P2)` planlandı ama takvimli değil
- `(P3)` nice-to-have

---

## M23 — v1.1.0 Maturity Gaps

Detay: bkz. [plan.md § M23](./plan.md#m23--v110-maturity-gaps--110-readiness-2026-04-20)

### 23.1 — Gerçek açıklar (P1 blocker)

#### 23.1.1 — Docs ↔ selectors CI drift check `(P1 blocker)`
- [ ] `tests/source/docs-selectors-consistency.test.mjs` yaz
  - Her `docs/components/*.md` + `docs/patterns/*.md` code fence'lerindeki `class="…"` doğrula
  - `dist/contracts/selectors.json`'da olmayan class fail et
  - Allowlist: utility, state, data-* attributes istisnaları
  - **Neden:** M22'de kpi-card.md ve app-shell.md yanlış class öğretiyordu. ChatGPT'nin uyarısı: "docs drift = AI yanılmasının root cause"

#### 23.1.2 — Dashboard starter Playwright smoke test `(P1 blocker)`
- [ ] `tests/playwright/dashboard-starter.spec.mjs` yaz
  - Senaryo 1: Starter render → app-shell + KPI + tablo + timeline doğrula
  - Senaryo 2: Modal aç/kapat → focus trap çalışıyor mu
  - Senaryo 3: Toast görün/kaybol
  - Senaryo 4: `data-theme="dark"` toggle → chart tokens değişmeli
  - Senaryo 5: Responsive layout kontrol
  - **Neden:** Canonical örneğin kendi kendini test etmemesi = drift garantisi

#### 23.1.3 — Form validation state contract `(P1 blocker)`
- [ ] Form state contract (data-invalid, data-disabled, data-readonly) specification doğrula
  - Input, textarea, select, checkbox state'leri `capabilities.json`'a ekle
  - CSS selector mapping `selectors.json`'da doğrula
  - Docs: `docs/components/input.md` + form state examples
  - Test: Playwright'da form validation state'i doğrula
  - **Dogfooding:** Test dashboard'ında form state API'si bilinmedi

#### 23.1.4 — Density impact matrix `(P1 blocker)`
- [ ] `docs/guides/density.md` yaz — her supported component'in compact davranışı (tangible / subtle / no-op)
- [ ] `dist/contracts/capabilities.json`'a `density_effect` alanı ekle
  - Örnek: `"button": { "density_effect": "tangible" }`
  - **Neden:** Dogfooder: compact'ın bazı component'lerde efekti yok

---

### 23.2 — Teknik borç (P2)

#### 23.2.1 — Anatomy coverage tamamlama `(P2)`
26 component hâlâ anatomy contract dışında. **AI discovery'de sorun:** support matrix'te listelenmişken API'leri undocumented → Developers custom CSS yazıyor. Hedef: 1.1.0'da en az 15'i kapanmış.

**Yapılacak komponentler:**
- [ ] **app-shell** ⚠️ (Dogfooding: custom CSS yazıldı, manifest listede ama API'si unclear)
- [ ] **navbar** ⚠️ (idem)
- [ ] **page-header** ⚠️ (idem)
- [ ] **sidebar-nav** ⚠️ (idem)
- [ ] **timeline** ⚠️ (idem)
- [ ] autocomplete
- [ ] calendar
- [ ] callout
- [ ] code
- [ ] code-block
- [ ] combobox
- [ ] context-menu
- [ ] date-picker
- [ ] date-range-picker
- [ ] date-time-picker
- [ ] dropzone
- [ ] editable-field
- [ ] file-upload
- [ ] heading
- [ ] kbd
- [ ] markdown-surface
- [ ] number-input
- [ ] quote
- [ ] range-slider
- [ ] rating
- [ ] settings-panel
- [ ] split-button
- [ ] tags-input
- [ ] text
- [ ] time-picker
- [ ] tree-table

Her biri için `contracts/anatomy.contract.mjs`'e minimum:
- `root_selector`
- `element` + `elements[]`
- `minimal_html`

#### 23.2.2 — Pattern gallery kalan 3 recipe `(P2)`
- [ ] `docs/patterns/data-table-toolbar-pagination.md` — row selection + bulk action + sticky header + pagination
- [ ] `docs/patterns/skeleton-to-content.md` — skeleton-table → gerçek içerik geçiş animasyonu + timing
- [ ] `docs/patterns/command-palette-binding.md` — arama + filter + keyboard nav JS binding (CDN friendly)

#### 23.2.3 — Component doc şablonu standardizasyonu `(P3)`
- [ ] Canonical şablona hizala: status + anatomy table + usage + variants + CSS props + tokens + a11y + AI notes + related
  - **Dogfooding feedback:** GLM navbar/sidebar-nav/app-shell/page-header/timeline için custom CSS yazdı (API undocumented)
  - **Başlangıç:** app-shell, navbar, page-header, sidebar-nav, timeline (5 high-impact component)
- [ ] Referans: kpi-card.md, app-shell.md, chart-frame.md

---

### 23.3 — Vibe-coder onboarding (P2)

#### 23.3.1 — "Getting started → dashboard çalışır" path `(P2)`
- [ ] `docs/getting-started.md` yeniden düzenle
  - 15 dakikada: starter indir → 3 key component (button, card, modal) gör → kendi sayfanı yaz
  - **Sorun:** Giriş yolu uzun, junior dev kaybolabiliyor

#### 23.3.2 — "Utility-first'ten geliyorum" pedagojik köprüsü `(P2)`
- [ ] `why-fikir-css-vs-utility-first.md` → cheat sheet'e çevir
  - Tailwind: `flex gap-4 items-center` → Fikir: `cluster`
  - Tailwind: `grid grid-cols-4 gap-6` → Fikir: `grid` + `--grid-min`
  - Yan yana karşılaştırma tablosu

#### 23.3.3 — IDE autocomplete (VS Code custom data) `(P2)`
- [ ] `dist/vscode/html-custom-data.json` otomatik üret (selectors.json'dan)
- [ ] `dist/vscode/css-custom-data.json` otomatik üret (tokens.json'dan)
  - Hedef: User `.vscode/settings.json`'a path ekler → autocomplete çalışır

#### 23.3.4 — AI usability improvement — realistic boundaries `(P3)`
- [ ] **CI enforcement:** Unknown class → merge fail (23.1.1 ile koordine)
- [ ] **Linter:** data-invalid, data-disabled, data-readonly validation
- [ ] **Docs şablonlar:** Copy-paste örnekler (selectors.json referanslı)
- [ ] **README:** Selectors.json zorunlu okuma marker
- [ ] **AI system prompt:** "Use selectors.json NOT inline style" (AI assistant context)
  - **Insight:** Prompt < Architecture. Enforcement > Documentation
  - **Target:** Next test dashboard %60-70 verimlilik (%40-50'den çıkış)

---

### 23.4 — Exit criteria (1.1.0 release)

1.1.0 çıkmadan önce:
- [ ] 23.1.1 — CI drift check test yazılmış ve geçiyor
- [ ] 23.1.2 — Dashboard Playwright 5 senaryo geçiyor (app-shell, navbar, page-header, sidebar-nav, timeline)
- [ ] 23.1.3 — Form state contract (data-invalid, data-disabled, data-readonly) specification
- [ ] 23.1.4 — Density matrix + capabilities.json
- [ ] 23.2.1 — 26 anatomy'den 15+ kapalı (minimum: top 5)
- [ ] 23.2.2 — Pattern gallery 5+ recipe'de
- [ ] 23.3.1 — Getting started yeniden yazılmış
- [ ] 23.3.2 — Utility-first rehberi yayınlandı
- [ ] Tüm değişiklikler additive, breaking yok

---

## Promotion candidates (Beta → Supported)

Aşağıdaki surface'ler 1.1.0+ öncesinde spec freeze sonrası promote edilecek:

| Surface | Blocker | Takvim |
|---------|---------|--------|
| `autocomplete` | Keyboard interaction spec freeze | 1.1.0 |
| `combobox` | Keyboard interaction spec freeze | 1.1.0 |
| `context-menu` | Positioning contract (Floating UI) | 1.1.0 |
| `tags-input` | Tag add/remove interaction API | 1.1.0 |
| `rating` | Half-star + keyboard contract | 1.1.0 |

---

## Experimental → Beta candidates

| Surface | Blocker | Status |
|---------|---------|--------|
| `inline-notice` | Semantic distinction from alert/callout | değerlendiriliyor |
| `split-button` | Keyboard/menu interaction contract | değerlendiriliyor |
| `tree-table` | Row expand/collapse keyboard nav | değerlendiriliyor |
| `copy-button` | Clipboard API integration pattern | değerlendiriliyor |
| `command-bar` | Slot contract and action grouping | değerlendiriliyor |

---

## v1.0.x Patch görevler

Critical bugfix yalnızca:

- [ ] CDN URL accessibility validation — unpkg / jsDelivr linklerini CI'da doğrula `(P2)`
- [ ] Token metadata — hangi component'lerde hangi token kullanıldığını `tokens.json`'a ekle `(P2)`
- [ ] Stale manifest detection — 3+ release boyunca değişmemiş anatomy entries uyar `(P2)`

---

## Definition of Done

Her görev kapanmadan önce:
- [ ] İlgili kod güncel
- [ ] Docs ve examples güncel
- [ ] Contract ve exports güncel
- [ ] Test eklendi veya güncellendi (uygunsa)
- [ ] Link ve snippet doğruluğu kontrol edildi
- [ ] Theme / density / dark mode / a11y etkisi gözden geçirildi

---

## İlgili Dokümantasyon

- [Plan — Detaylı roadmap](./plan.md)
- [Post-1.0 Backlog](./post-1.0-backlog.md)
- [Support Matrix](./support-matrix.md)
- [Release Governance](../governance/)
- [v1.0 tamamlandı](../archive/plan-2026-04-20-v1.0-completed.md)
