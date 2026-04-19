# Fikir CSS — Task List Archive (M13 → M21 + CC)

> Arşivlenme tarihi: 2026-04-20  
> Bu dosya, `tasklist.md`'nin tamamlanan milestone bölümlerini içerir.  
> v1.0.0 yayınlandığında tüm maddeler `[x]` durumdaydı.

---

## Global release gates ✓

- [x] Supported surface docs coverage `%100` `(P0)` ✓
- [x] Supported surface demo coverage `%100` `(P0)` ✓
- [x] Interactive supported surface browser-level test coverage tamam `(P0)` ✓ (272 Playwright testi geçiyor, 9 cross-theme-smoke fix edildi)
- [x] Version / beta / latest / docs drift sıfır `(P0)` ✓ (tüm dosyalar 1.0.0'a güncellendi)
- [x] Semver + deprecation + support policy yayımlandı `(P0)`
- [x] Vue ve Svelte gerçek çalışan örnekler hazır `(P1)` ✓ (`examples/vue-vite`, `examples/svelte-vite`)
- [x] RC burn-in süreci tamamlandı `(P0)` ✓ (tüm CI gate'ler geçti, 482+272 test)
- [x] `npm install fikir-css` latest kanalı güvenli `(P0)` ✓ (`publish-npm` #11 ✅, https://www.npmjs.com/package/fikir-css)

---

# M13 — Product Truth & Surface Freeze Prep

## M13.1 Sürüm ve yayın gerçeği
- [x] `package.json`, `README.md`, `site/index.html`, `playground/index.html`, `docs/release/*` ve `docs/roadmap/*` içinde sürüm referanslarını tara `(M13)(P0)`
- [x] Eski `v0.5.x` / `beta` / `latest` drift'lerini temizle `(M13)(P0)`
- [x] `publish.yml` içinde `beta` ve `latest` akışlarını net ayır `(M13)(P0)`
- [x] `validate-version-tag-consistency` script'ini docs ve example package.json'ları da kapsayacak şekilde genişlet `(M13)(P1)`
- [x] release notlarında `beta` → `rc` → `latest` geçiş kriterlerini yaz `(M13)(P1)`

## M13.2 Support matrix reset
- [x] `docs/roadmap/support-matrix.md` dosyasını `v1.0` hazırlık matrisine çevir `(M13)(P0)`
- [x] Her surface'i `supported` / `beta` / `experimental` / `deprecated` olarak yeniden sınıflandır `(M13)(P0)`
- [x] "implemented but not product-ready" yüzeyler için gerekçeli not düş `(M13)(P1)`
- [x] `README` supported surface özetini support matrix ile senkronize et `(M13)(P0)`
- [x] `site` ve `playground` menülerini destek seviyesine göre etiketle `(M13)(P1)`

## M13.3 Surface freeze hazırlığı
- [x] selector contract freeze kurallarını yaz `(M13)(P0)`
- [x] additive vs breaking değişim örneklerini dokümante et `(M13)(P1)`
- [x] alias/deprecation politikasını güncelle `(M13)(P1)`
- [x] release note ve migration note şablonlarını `v1.0` akışına uygunlaştır `(M13)(P1)`
- [x] experimental yüzeylerin README ana akışında nasıl gösterileceğini standardize et `(M13)(P2)`

## M13.4 Ürün mesajı ve bilgi mimarisi
- [x] `README` ilk ekranını "what / why / install / themes / examples / support level" akışına göre yeniden düzenle `(M13)(P1)`
- [x] `site/index.html` ile `playground/index.html` rol ayrımını yazılı hale getir `(M13)(P1)`
- [x] "Start here" navigasyonunu consumer / contributor / maintainer olarak ayır `(M13)(P2)`
- [x] duplicate veya dağınık migration dokümanlarını sadeleştir `(M13)(P2)`

---

# M14 — Design Language Normalization

## M14.1 Semantic tone contract
- [x] tone contract'ını resmi olarak tanımla: `neutral`, `primary`, `success`, `warning`, `danger`, `info` `(M14)(P0)`
- [x] `packages/tokens/semantic.css` içinde eksik semantic token'ları ekle `(M14)(P0)`
- [x] success/warning/info subtle token davranışlarını light/dark/high-contrast için gözden geçir `(M14)(P1)`
- [x] `high-contrast` modunda semantic tone fallback stratejisini yaz `(M14)(P1)`
- [x] `docs/guides/theme-system.md` içine semantic tone matrisi ekle `(M14)(P1)`

## M14.2 Style variant contract
- [x] visual style contract'ını tanımla: `solid`, `soft`, `outline`, `ghost`, `plain/link` `(M14)(P0)`
- [x] button ailesi için style matrisini normalize et `(M14)(P0)`
- [x] badge ailesi için style matrisini normalize et `(M14)(P1)`
- [x] alert / result / toast için hangi style varyantlarının resmi olduğunu belirle `(M14)(P1)`
- [x] card/surface için `flat`, `subtle`, `elevated`, `interactive` varyantlarını netleştir `(M14)(P1)`
- [x] style isimlendirme tutarlılığını contract testine bağla `(M14)(P1)`

## M14.3 Size contract
- [x] `xs/sm/md/lg` boyut ölçeğini resmi hale getir `(M14)(P1)`
- [x] button, icon-button, input, select, badge, segmented-control, pagination için size audit yap `(M14)(P1)`
- [x] touch target minimumlarını compact/default/comfortable modlarında kontrol et `(M14)(P1)`
- [x] size naming drift'lerini temizle `(M14)(P2)`

## M14.4 Density, shape ve motion
- [x] `compact/default/comfortable` davranışını dokümante et `(M14)(P0)`
- [x] table/data-grid yoğunluğu density modlarına doğru bağla `(M14)(P1)`
- [x] `shape` contract'ını component aileleri üzerinde audit et `(M14)(P1)`
- [x] `reduced-motion` için component-level etki listesini çıkar `(M14)(P1)`
- [x] forced-colors senaryosunda kritik yüzeyleri smoke et `(M14)(P1)`

## M14.5 State normalization
- [x] `loading`, `selected`, `current`, `completed`, `busy`, `drag-over` durumlarını standardize et `(M14)(P1)`
- [x] ARIA/data-* bazlı state mapping rehberi oluştur `(M14)(P1)`
- [x] state attribute'ların docs ile senkronize et `(M14)(P1)`

## M14.6 Contrast ve visual regression
- [x] contrast regression raporunu tone/style kombinasyonları için dokümante et `(M14)(P0)`
- [x] dark/high-contrast screenshot baseline stratejisini tanımla `(M14)(P1)`
- [x] semantic tone görsel matrisi playground örneği ekle `(M14)(P2)`

---

# M15 — Surface Promotion & Component Doc Completion

## M15.1 Component docs altyapısı
- [x] `docs/components/_template.md` şablonunu son hale getir `(M15)(P0)`
- [x] component dokümanı zorunlu bölümlerini lint edecek docs-quality kuralı ekle `(M15)(P1)`
- [x] doc örnek kod blokları için class drift kontrolü ekle `(M15)(P1)`

## M15.2 Core / foundation docs
- [x] `button.md` ✓ · `badge.md` ✓ · `alert.md` ✓ · `icon-button.md` ✓ · `link.md` ✓
- [x] `surface.md` ✓ · `skeleton.md` ✓ · `spinner.md` ✓ · `divider.md` ✓ · `visually-hidden.md` ✓

## M15.3 Form / input docs
- [x] `input.md` ✓ · `field.md` ✓ · `label.md` ✓ · `helper-text.md` ✓ · `error-text.md` ✓
- [x] `textarea.md` ✓ · `select.md` ✓ · `checkbox.md` ✓ · `radio.md` ✓ · `switch.md` ✓
- [x] `input-group.md` ✓ · `number-input.md` ✓ · `range-slider.md` ✓ · `segmented-control.md` ✓
- [x] `otp-input.md` ✓ · `search-box.md` ✓

## M15.4 Overlay / feedback docs
- [x] `modal.md` ✓ · `drawer.md` ✓ · `popover.md` ✓ · `tooltip.md` ✓ · `dropdown-menu.md` ✓
- [x] `toast.md` ✓ · `progress.md` ✓ · `loading-overlay.md` ✓ · `hover-card.md` ✓ · `result.md` ✓

## M15.5 Navigation docs
- [x] `tabs.md` ✓ · `accordion.md` ✓ · `breadcrumb.md` ✓ · `pagination.md` ✓ · `navbar.md` ✓
- [x] `menu-bar.md` ✓ · `sidebar-nav.md` ✓ · `stepper.md` ✓ · `command-palette.md` ✓ · `tree-view.md` ✓

## M15.6 Data / display docs
- [x] `table.md` ✓ · `data-grid.md` ✓ · `list.md` ✓ · `description-list.md` ✓ · `avatar.md` ✓
- [x] `avatar-group.md` ✓ · `stat.md` ✓ · `kpi-card.md` ✓ · `empty-state.md` ✓ · `tag.md` ✓

## M15.7 Layout / shell docs
- [x] `container.md` ✓ · `stack.md` ✓ · `cluster.md` ✓ · `center.md` ✓ · `grid.md` ✓
- [x] `switcher.md` ✓ · `sidebar.md` ✓ · `page-header.md` ✓ · `section-block.md` ✓ · `app-shell.md` ✓ · `split-pane.md` ✓

## M15.8 Demo coverage
- [x] supported surface'lerin hepsini `site/index.html` veya `playground` içinde göster ✓
- [x] showcase edilmeyen selector'lar için dead-surface raporunu tekrar çalıştır ✓
- [x] `site` / `playground` galeri-demo rol ayrımını güçlendir ✓
- [x] her supported surface için en az bir copy-paste örneği ekle ✓

## M15.9 AI / machine-readable kullanım
- [x] selector manifest kullanım rehberini güncelle ✓
- [x] component docs içine "AI prompt context" bölümü ekle ✓
- [x] docs örneklerini machine-readable consistency kontrolüne bağla ✓

---

# M16 — Missing Product Components & Workflow Patterns

## M16.1–M16.10 (Hepsi tamamlandı ✓)
- [x] Split button — RFC · contract · CSS · docs · demo · keyboard test ✓
- [x] Time picker — RFC · contract · CSS · docs · demo · a11y test ✓
- [x] Date-time picker — RFC · contract · CSS · docs · workflow demo · browser test ✓
- [x] Filter bar — RFC · contract · CSS · docs · data-grid demo ✓
- [x] Data table toolbar — RFC · contract · CSS · docs · workflow örneği ✓
- [x] Empty search state — alt varyantlar · CSS · docs · search demo ✓
- [x] Inline notice / status banner — RFC · CSS · docs · settings demo ✓
- [x] Command bar — RFC · contract · CSS · docs · app-shell demo ✓
- [x] Tree table pattern — contract · demo · docs ✓
- [x] Tour / coachmark pattern — pattern kararı · RFC · demo · docs ✓

## M16.11 Güçlü tavsiye edilen eklemeler
- [x] `time-range-picker` ✓ · `password-input` ✓ · `copy-button` ✓
- [x] `stat-group` ✓ · `search-result-item` ✓ · `auth-screen` ✓ · `onboarding-checklist` ✓

---

# M17 — Accessibility & Browser-Level Guarantees

## M17.1 Test altyapısı
- [x] Playwright browser-level test runner seçildi ve entegre edildi ✓
- [x] CI'da headless browser job eklendi ✓
- [x] Visual regression hard gate yapıldı ✓ (`ci.yml` `browser-test` job)

## M17.2–M17.5 Interaction coverage (272 test, 0 fail ✓)
- [x] Overlay: modal · drawer · dropdown-menu · popover · tooltip · command-palette ✓
- [x] Navigation: tabs · accordion · menu-bar · tree-view · pagination · stepper ✓
- [x] Input: switch · range-slider · number-input · search-box · combobox · date/time pickers ✓
- [x] Feedback: toast aria-live · loading-overlay · progress · result ✓

## M17.6 Accessibility docs
- [x] `docs/testing/accessibility-matrix.md` ✓
- [x] per-component a11y checklist'leri ✓
- [x] focus-visible · color/contrast · reduced-motion · forced-colors policy ✓

## M17.7 Cross-theme / cross-mode smoke
- [x] light × dark × high-contrast · compact × comfortable · sharp × rounded · reduced-motion ✓

---

# M18 — Framework Examples & Adoption

## M18.1–M18.4 Examples
- [x] `examples/react-vite` ✓ · `examples/vue-vite` ✓ · `examples/svelte-vite` ✓ · `examples/starter-consumer` ✓

## M18.5–M18.7 Guides & Migration
- [x] react-adapter · vue-adapter · svelte-adapter · ssr-hydration-conventions ✓
- [x] adding-to-existing-project · anti-patterns · overlay-js-helpers · design-token-export ✓
- [x] migration-from-bootstrap · migration-from-tailwind · migration-from-mui · plain-html-quickstart ✓

---

# M19 — Quality Gates, Packaging & RC Track

## M19.1 CI sertleştirme ✓
- [x] browser tests · visual regression hard gate · docs quality · manifest-to-doc check · example smoke ✓

## M19.2 Package smoke ve distribution ✓
- [x] package-smoke · fresh install smoke · subpath exports · npm pack audit · publishable outputs ✓

## M19.3 Docs drift ve repo hygiene
- [x] docs link audit ✓ (0 broken links, 344 files)
- [x] roadmap ile gerçek repo durumunu senkronize et ✓

## M19.4 RC hazırlığı ✓
- [x] semver-policy · deprecation-policy · support-policy · release-checklist-v1 · rc-burn-in-plan ✓
- [x] `1.0.0-rc.1` checklist tamamlandı ✓

## M19.5 Benchmark ve proof ✓
- [x] `docs/benchmark.md` · bundle size proof · `validate:size` CI ✓

---

# M20 — Machine-Readable Artifacts for AI Adoption

## M20.1–M20.6 Manifests (Hepsi ✓)
- [x] `selectors.json` — 429 selectors (417 component/utility + 12 pattern) ✓
- [x] `anatomy.json` — 72 component ✓
- [x] `tokens.json` — 59 tokens, 7 groups ✓
- [x] `capabilities.json` — 72 component ✓
- [x] `variants.json` — 6 tones · 5 styles · 4 sizes · 19 recipe components ✓
- [x] `primitives.json` — 7 layout primitives ✓

## M20.7 Manifest Distribution & Validation ✓
- [x] build process'e manifest generation ✓ · schema validation testleri ✓ · `machine-readable-contracts.md` ✓

## M20.8 AI Integration Guide
- [x] Claude/ChatGPT system prompt örneği ✓ (`docs/guides/machine-readable-contracts.md`)

## M20.9 Manifest Maintenance & Drift Detection ✓
- [x] `validate-manifests.mjs` · `detect-css-anatomy-drift.mjs` · `detect-stale-anatomy.mjs` ✓
- [x] `status` field · `deprecated_selectors` · contributor rehberi ✓

---

# M21 — v1.0 Launch & Post-Launch Guardrails

## M21.1 Final freeze ✓
- [x] support matrix: 69 supported · 22 beta · 10 experimental · 0 deprecated ✓
- [x] selector contract freeze ✓ · beta/experimental yüzeyler doğru yere taşındı ✓

## M21.2 Final docs ✓
- [x] `CHANGELOG.md` v1.0 · migration note · "What's stable in 1.0?" · troubleshooting FAQ ✓

## M21.3 Launch polish ✓
- [x] README + site/index.html stats (99 surfaces, ~152 KB / ~18 KB gzip) ✓
- [x] playground density + motion toggle ✓

## M21.4 Publish ✓
- [x] `publish-npm` #11 ✅ · npm dist-tag `latest` · `v1.0.0` tag · GitHub release · Pages ✓

## M21.5 Post-launch guardrails ✓
- [x] hotfix-checklist · issue templates · post-1.0-backlog.md ✓

---

# Cross-cutting cleanup tasks (CC) ✓

## CC.1 Naming / contracts / recipes ✓
- [x] naming.contract · recipes.contract · strict recipe validation · docs ↔ canonical selector check ✓

## CC.2 Site / playground UX ✓
- [x] sidebar search · support level badge'leri · density/motion toggle · empty state temizliği ✓

## CC.3 Token and export hygiene ✓
- [x] utility budget policy · fluid token RFC · token JSON ↔ CSS sync · custom theme rehberi · naming drift ✓

## CC.4 Issue management ✓
- [x] labels.json (type:bug, type:a11y, type:release-blocker, support:beta) · CONTRIBUTING.md v1.0 ✓
