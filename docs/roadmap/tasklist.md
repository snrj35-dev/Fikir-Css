# Fikir CSS — Task List (v1.0 → post-1.0)

> Oluşturulma: 2026-04-16 · Son güncelleme: 2026-04-20  
> Bu liste, `plan.md` ile birebir uyumludur.  
> v1.0.0 yayınlandı — bu liste artık **post-1.0 bakım ve guardrail** görevlerini izler.

---

## Legend
- `[ ]` not started
- `[~]` in progress
- `[x]` done
- `(M13)` … `(M20)` milestone etiketi
- `(P0)` kritik blokaj
- `(P1)` yüksek öncelik
- `(P2)` önemli ama blokaj olmayan
- `(P3)` polish / launch kalite

---

## Global release gates
Bu maddeler tamamlanmadan `1.0.0` çıkmaz:

- [x] Supported surface docs coverage `%100` `(P0)` ✓
- [x] Supported surface demo coverage `%100` `(P0)` ✓
- [ ] Interactive supported surface browser-level test coverage tamam `(P0)`
- [ ] Version / beta / latest / docs drift sıfır `(P0)`
- [x] Semver + deprecation + support policy yayımlandı `(P0)`
- [ ] Vue ve Svelte gerçek çalışan örnekler hazır `(P1)`
- [ ] RC burn-in süreci tamamlandı `(P0)`
- [ ] `npm install fikir-css` latest kanalı güvenli `(P0)`

---

# M13 — Product Truth & Surface Freeze Prep

## M13.1 Sürüm ve yayın gerçeği
- [x] `package.json`, `README.md`, `site/index.html`, `playground/index.html`, `docs/release/*` ve `docs/roadmap/*` içinde sürüm referanslarını tara `(M13)(P0)`
- [x] Eski `v0.5.x` / `beta` / `latest` drift’lerini temizle `(M13)(P0)`
- [x] `publish.yml` içinde `beta` ve `latest` akışlarını net ayır `(M13)(P0)`
- [x] `validate-version-tag-consistency` script’ini docs ve example package.json’ları da kapsayacak şekilde genişlet `(M13)(P1)`
- [x] release notlarında `beta` → `rc` → `latest` geçiş kriterlerini yaz `(M13)(P1)`

## M13.2 Support matrix reset
- [x] `docs/roadmap/support-matrix.md` dosyasını `v1.0` hazırlık matrisine çevir `(M13)(P0)`
- [x] Her surface'i `supported` / `beta` / `experimental` / `deprecated` olarak yeniden sınıflandır `(M13)(P0)`
- [x] “implemented but not product-ready” yüzeyler için gerekçeli not düş `(M13)(P1)`
- [x] `README` supported surface özetini support matrix ile senkronize et `(M13)(P0)`
- [x] `site` ve `playground` menülerini destek seviyesine göre etiketle `(M13)(P1)`

## M13.3 Surface freeze hazırlığı
- [x] selector contract freeze kurallarını yaz `(M13)(P0)`
- [x] additive vs breaking değişim örneklerini dokümante et `(M13)(P1)`
- [x] alias/deprecation politikasını güncelle `(M13)(P1)`
- [x] release note ve migration note şablonlarını `v1.0` akışına uygunlaştır `(M13)(P1)`
- [x] experimental yüzeylerin README ana akışında nasıl gösterileceğini standardize et `(M13)(P2)`

## M13.4 Ürün mesajı ve bilgi mimarisi
- [x] `README` ilk ekranını “what / why / install / themes / examples / support level” akışına göre yeniden düzenle `(M13)(P1)`
- [x] `site/index.html` ile `playground/index.html` rol ayrımını yazılı hale getir `(M13)(P1)`
- [x] “Start here” navigasyonunu consumer / contributor / maintainer olarak ayır `(M13)(P2)`
- [x] duplicate veya dağınık migration dokümanlarını sadeleştir `(M13)(P2)`

---

# M14 — Design Language Normalization

## M14.1 Semantic tone contract
- [x] tone contract’ını resmi olarak tanımla: `neutral`, `primary`, `success`, `warning`, `danger`, `info` `(M14)(P0)`
- [x] `packages/tokens/semantic.css` içinde eksik semantic token’ları ekle `(M14)(P0)`
- [x] success/warning/info subtle token davranışlarını light/dark/high-contrast için gözden geçir `(M14)(P1)`
- [x] `high-contrast` modunda semantic tone fallback stratejisini yaz `(M14)(P1)`
- [x] `docs/guides/theme-system.md` içine semantic tone matrisi ekle `(M14)(P1)`

## M14.2 Style variant contract
- [x] visual style contract’ını tanımla: `solid`, `soft`, `outline`, `ghost`, `plain/link` `(M14)(P0)`
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
- [x] `button.md` — existing doc verified `(M15)(P0)` ✓
- [x] `badge.md` — existing doc verified `(M15)(P0)` ✓
- [x] `alert.md` — existing doc verified `(M15)(P0)` ✓
- [x] `icon-button.md` `(M15)(P1)` ✓
- [x] `link.md` `(M15)(P1)` ✓
- [x] `surface.md` `(M15)(P1)` ✓
- [x] `skeleton.md` `(M15)(P1)` ✓
- [x] `spinner.md` `(M15)(P1)` ✓
- [x] `divider.md` `(M15)(P2)` ✓
- [x] `visually-hidden.md` `(M15)(P2)` ✓

## M15.3 Form / input docs
- [x] `input.md` — existing doc verified `(M15)(P0)` ✓
- [x] `field.md` `(M15)(P0)` ✓
- [x] `label.md` `(M15)(P1)` ✓
- [x] `helper-text.md` `(M15)(P1)` ✓
- [x] `error-text.md` `(M15)(P1)` ✓
- [x] `textarea.md` `(M15)(P1)` ✓
- [x] `select.md` `(M15)(P0)` ✓
- [x] `checkbox.md` `(M15)(P1)` ✓
- [x] `radio.md` `(M15)(P1)` ✓
- [x] `switch.md` `(M15)(P1)` ✓
- [x] `input-group.md` `(M15)(P1)` ✓
- [x] `number-input.md` `(M15)(P1)` ✓
- [x] `range-slider.md` `(M15)(P1)` ✓
- [x] `segmented-control.md` `(M15)(P1)` ✓
- [x] `otp-input.md` `(M15)(P2)` ✓
- [x] `search-box.md` `(M15)(P1)` ✓

## M15.4 Overlay / feedback docs
- [x] `modal.md` — existing doc verified `(M15)(P0)` ✓
- [x] `drawer.md` `(M15)(P1)` ✓
- [x] `popover.md` `(M15)(P1)` ✓
- [x] `tooltip.md` `(M15)(P1)` ✓
- [x] `dropdown-menu.md` `(M15)(P1)` ✓
- [x] `toast.md` `(M15)(P1)` ✓
- [x] `progress.md` `(M15)(P1)` ✓
- [x] `loading-overlay.md` `(M15)(P1)` ✓
- [x] `hover-card.md` `(M15)(P2)` ✓
- [x] `result.md` `(M15)(P1)` ✓

## M15.5 Navigation docs
- [x] `tabs.md` — existing doc verified `(M15)(P0)` ✓
- [x] `accordion.md` — existing doc verified `(M15)(P0)` ✓
- [x] `breadcrumb.md` `(M15)(P1)` ✓
- [x] `pagination.md` `(M15)(P1)` ✓
- [x] `navbar.md` `(M15)(P2)` ✓
- [x] `menu-bar.md` `(M15)(P1)` ✓
- [x] `sidebar-nav.md` `(M15)(P1)` ✓
- [x] `stepper.md` — existing doc verified `(M15)(P0)` ✓
- [x] `command-palette.md` `(M15)(P1)` ✓
- [x] `tree-view.md` — existing doc verified `(M15)(P0)` ✓

## M15.6 Data / display docs
- [x] `table.md` genişlet `(M15)(P1)` ✓
- [x] `data-grid.md` `(M15)(P1)` ✓
- [x] `list.md` `(M15)(P2)` ✓
- [x] `description-list.md` `(M15)(P2)` ✓
- [x] `avatar.md` `(M15)(P1)` ✓
- [x] `avatar-group.md` `(M15)(P2)` ✓
- [x] `stat.md` `(M15)(P1)` ✓
- [x] `kpi-card.md` `(M15)(P1)` ✓
- [x] `empty-state.md` `(M15)(P1)` ✓
- [x] `tag.md` `(M15)(P2)` ✓

## M15.7 Layout / shell docs
- [x] `container.md` `(M15)(P2)` ✓
- [x] `stack.md` `(M15)(P1)` ✓
- [x] `cluster.md` `(M15)(P1)` ✓
- [x] `center.md` `(M15)(P2)` ✓
- [x] `grid.md` `(M15)(P1)` ✓
- [x] `switcher.md` `(M15)(P2)` ✓
- [x] `sidebar.md` `(M15)(P2)` ✓
- [x] `page-header.md` `(M15)(P1)` ✓
- [x] `section-block.md` `(M15)(P2)` ✓
- [x] `app-shell.md` `(M15)(P1)` ✓
- [x] `split-pane.md` `(M15)(P2)` ✓

## M15.8 Demo coverage
- [x] supported surface'lerin hepsini `site/index.html` veya `playground` içinde göster `(M15)(P0)` ✓
- [x] showcase edilmeyen selector'lar için dead-surface raporunu tekrar çalıştır `(M15)(P1)` ✓
- [x] `site` tarafında high-value galeri; `playground` tarafında workflow demoları ayrımını güçlendir `(M15)(P2)` ✓
- [x] her supported surface için en az bir copy-paste örneği ekle `(M15)(P1)` ✓

## M15.9 AI / machine-readable kullanım
- [x] selector manifest kullanım rehberini güncelle `(M15)(P2)` ✓
- [x] component docs içine "AI prompt context" bölümü ekle `(M15)(P3)` ✓
- [x] docs örneklerini machine-readable consistency kontrolüne bağla `(M15)(P2)` ✓

---

# M16 — Missing Product Components & Workflow Patterns

## M16.1 Split button
- [x] RFC yaz `(M16)(P1)` ✓
- [x] naming/recipe contract ekle `(M16)(P1)` ✓
- [x] CSS implement et `(M16)(P1)` ✓
- [x] dropdown-menu entegrasyon senaryosunu tanımla `(M16)(P1)` ✓
- [x] docs ekle `(M16)(P1)` ✓
- [x] demo ekle `(M16)(P1)` ✓
- [x] keyboard/focus test ekle `(M16)(P1)` ✓

## M16.2 Time picker
- [x] RFC yaz `(M16)(P1)` ✓
- [x] time input state/format contract'ını tanımla `(M16)(P1)` ✓
- [x] CSS implement et `(M16)(P1)` ✓
- [x] docs ekle `(M16)(P1)` ✓
- [x] demo ekle `(M16)(P1)` ✓
- [x] a11y ve keyboard test ekle `(M16)(P1)` ✓

## M16.3 Date-time picker
- [x] RFC yaz `(M16)(P1)` ✓
- [x] date-picker/calendar family ile ilişkiyi tanımla `(M16)(P1)` ✓
- [x] CSS/pattern implement et `(M16)(P1)` ✓
- [x] docs ekle `(M16)(P1)` ✓
- [x] workflow demo ekle `(M16)(P1)` ✓
- [x] browser-level test ekle `(M16)(P1)` ✓

## M16.4 Filter bar
- [x] pattern RFC yaz `(M16)(P0)` ✓
- [x] search/filter/chips/reset alanı contract’ını tanımla `(M16)(P0)` ✓
- [x] CSS/pattern implement et `(M16)(P0)` ✓
- [x] docs ekle `(M16)(P0)` ✓
- [x] data-grid demo’ya entegre et `(M16)(P0)` ✓

## M16.5 Data table toolbar
- [x] pattern RFC yaz `(M16)(P0)` ✓
- [x] column visibility / density / export slot sözleşmesini tanımla `(M16)(P1)` ✓
- [x] CSS/pattern implement et `(M16)(P0)` ✓
- [x] docs ekle `(M16)(P0)` ✓
- [x] table/data-grid workflow örneği üret `(M16)(P0)` ✓

## M16.6 Empty search state
- [x] `first-use`, `no-results`, `filtered-empty` alt varyantlarını tanımla `(M16)(P1)` ✓
- [x] pattern implement et `(M16)(P1)` ✓
- [x] docs ekle `(M16)(P1)` ✓
- [x] search demosuna ekle `(M16)(P1)` ✓

## M16.7 Inline notice / status banner
- [x] page-level notice RFC yaz `(M16)(P1)` ✓
- [x] success/warning/danger/info varyantlarını normalize et `(M16)(P1)` ✓
- [x] CSS implement et `(M16)(P1)` ✓
- [x] docs ekle `(M16)(P1)` ✓
- [x] settings ve result workflow demolarına ekle `(M16)(P1)` ✓

## M16.8 Command bar
- [x] pattern RFC yaz `(M16)(P1)` ✓
- [x] app-shell/top area action surface kurallarını tanımla `(M16)(P1)` ✓
- [x] CSS implement et `(M16)(P1)` ✓
- [x] docs ekle `(M16)(P1)` ✓
- [x] app-shell demo'suna entegre et `(M16)(P1)` ✓

## M16.9 Tree table pattern
- [x] tree-view + table birleşik pattern contract'ını yaz `(M16)(P1)` ✓
- [x] indent / expand / row state sözleşmesini tanımla `(M16)(P1)` ✓
- [x] pattern demo ekle `(M16)(P1)` ✓
- [x] docs ekle `(M16)(P1)` ✓

## M16.10 Tour / coachmark pattern
- [x] full component mi pattern mi olduğuna karar ver `(M16)(P2)` ✓ (Pattern: single-annotation, data-driven)
- [x] minimum canonical pattern'i tanımla `(M16)(P2)` ✓ (RFC + data-* contract)
- [x] demo ekle `(M16)(P2)` ✓ (playground/coachmark-example.html)
- [x] docs ekle `(M16)(P2)` ✓ (docs/components/coachmark.md)

## M16.11 Güçlü tavsiye edilen eklemeler
- [x] `color-picker` değerlendirmesi ve scope kararı `(M16)(P2)` ✓ (defer: JS bağımlısı, M18+ scope)
- [x] `time-range-picker` değerlendirmesi `(M16)(P2)` ✓ (packages/components/time-range-picker.css + docs/components/time-range-picker.md)
- [x] `password-input` visibility toggle pattern `(M16)(P2)` ✓ (packages/components/password-input.css + docs/components/password-input.md)
- [x] `copy-button` pattern `(M16)(P3)` ✓ (packages/components/copy-button.css + docs/components/copy-button.md)
- [x] `stat-group` pattern `(M16)(P2)` ✓ (packages/components/stat-group.css + docs/components/stat-group.md)
- [x] `notification-center` pattern değerlendirmesi `(M16)(P3)` ✓ (defer: overlay state yönetimi M17+ scope)
- [x] `search-result-item` pattern `(M16)(P2)` ✓ (packages/components/search-result-item.css + docs/components/search-result-item.md)
- [x] `auth-screen` pattern `(M16)(P2)` ✓ (packages/components/auth-screen.css + docs/components/auth-screen.md)
- [x] `onboarding-checklist` pattern `(M16)(P3)` ✓ (packages/components/onboarding-checklist.css + docs/components/onboarding-checklist.md)

---

# M17 — Accessibility & Browser-Level Guarantees

## M17.1 Test altyapısı
- [x] browser-level test runner seç ve entegre et `(M17)(P0)` 
- [x] CI’da headless browser job ekle `(M17)(P0)` 
- [x] visual regression job'unu supported surfaces için hard gate yap `(M17)(P1)` ✓ (`.github/workflows/ci.yml` `browser-test` job)

## M17.2 Overlay interaction coverage
- [x] modal focus trap testleri `(M17)(P0)` 
- [x] drawer escape / focus restore testleri `(M17)(P0)` 
- [x] dropdown-menu keyboard navigation testleri `(M17)(P0)` 
- [x] popover dismiss / focus return testleri `(M17)(P1)` ✓
- [x] tooltip non-interactive behavior testleri `(M17)(P2)` ✓ (`tests/browser/tooltip-semantics.spec.mjs`)
- [x] command-palette keyboard flow testleri `(M17)(P0)` ✓

## M17.3 Navigation interaction coverage
- [x] tabs roving tabindex testleri `(M17)(P0)` ✓
- [x] accordion toggle semantics testleri `(M17)(P1)` ✓
- [x] menu-bar keyboard traversal testleri `(M17)(P1)` ✓
- [x] tree-view arrow key / expand-collapse testleri `(M17)(P0)` ✓
- [x] pagination current-state semantics testleri `(M17)(P2)` ✓ (`tests/browser/pagination-semantics.spec.mjs`)
- [x] stepper current/completed semantics testleri `(M17)(P2)` ✓ (`tests/browser/stepper-semantics.spec.mjs`)

## M17.4 Input interaction coverage
- [x] switch toggle semantics testleri `(M17)(P1)` ✓
- [x] range-slider keyboard increment testleri `(M17)(P1)` ✓
- [x] number-input constraints testleri `(M17)(P1)` ✓
- [x] search-box clear / focus behavior testleri `(M17)(P2)` ✓ (`tests/browser/search-box-behavior.spec.mjs`)
- [x] combobox/autocomplete browser-level testleri `(M17)(P1)` ✓
- [x] date-picker/calendar keyboard tests `(M17)(P1)` ✓
- [x] date-time-picker/time-picker tests `(M17)(P1)` ✓ (`tests/browser/time-picker-keyboard.spec.mjs`)

## M17.5 Feedback and result coverage
- [x] toast aria-live behavior testleri `(M17)(P1)` ✓
- [x] loading-overlay busy state testleri `(M17)(P2)` ✓
- [x] progress semantics testleri `(M17)(P2)` ✓
- [x] result tone/heading semantics testleri `(M17)(P2)` ✓

## M17.6 Accessibility docs
- [x] `docs/testing/accessibility-matrix.md` oluştur `(M17)(P1)`
- [x] per-component a11y checklist’lerini tamamla `(M17)(P1)`
- [x] focus-visible policy yaz `(M17)(P1)`
- [x] color/contrast policy yaz `(M17)(P1)`
- [x] reduced motion policy yaz `(M17)(P1)`
- [x] forced-colors guidance yaz `(M17)(P2)` ✓ (`docs/testing/forced-colors-guidance.md`)

## M17.7 Cross-theme / cross-mode smoke
- [x] light × dark × high-contrast smoke `(M17)(P0)` ✓
- [x] compact × default × comfortable smoke `(M17)(P1)` ✓
- [x] sharp × default × rounded smoke `(M17)(P2)` ✓ (`tests/browser/cross-theme-smoke.spec.mjs`)
- [x] reduced-motion smoke `(M17)(P1)` ✓

---
## M18.1 React example
- [x] `examples/react-vite` güncelle `(M18)(P1)` ✓
- [x] button/result/data-grid/settings/app-shell akışlarını göster `(M18)(P1)` ✓
- [x] helpers kullanımını gerçek örnekle göster `(M18)(P1)` ✓
- [x] README'yi "run in 30 seconds" seviyesine getir `(M18)(P1)` ✓

## M18.2 Vue example
- [x] `examples/vue-vite` stub'ı gerçek uygulamaya çevir `(M18)(P0)` ✓
- [x] theme toggle, density toggle ekle `(M18)(P1)` ✓
- [x] overlay/helper kullanımı örneği ekle `(M18)(P1)` ✓
- [x] README yaz `(M18)(P1)` ✓
- [x] smoke test ekle `(M18)(P1)` ✓ (`tests/browser/framework-smoke-vue.spec.mjs`)

## M18.3 Svelte example
- [x] `examples/svelte-vite` stub'ı gerçek uygulamaya çevir `(M18)(P0)` ✓
- [x] store tabanlı theme/density yönetimi ekle `(M18)(P1)` ✓
- [x] modal demo ekle `(M18)(P1)` ✓
- [x] README yaz `(M18)(P1)` ✓
- [x] smoke test ekle `(M18)(P1)` ✓ (`tests/browser/framework-smoke-svelte.spec.mjs`)

## M18.4 Starter consumer
- [x] `examples/starter-consumer`'ı latest sürüme hizala `(M18)(P0)` ✓
- [x] npm install / bundler / plain HTML talimatlarını doğrula `(M18)(P0)` ✓
- [x] slice/theme import örneklerini ekle `(M18)(P1)` ✓

## M18.5 Framework guides
- [x] `react-adapter.md` güncelle `(M18)(P1)` ✓
- [x] `vue-adapter.md` güncelle `(M18)(P1)` ✓
- [x] `svelte-adapter.md` güncelle `(M18)(P1)` ✓
- [x] `ssr-hydration-conventions.md` genişlet `(M18)(P1)` ✓

## M18.6 Adoption docs
- [x] `adding-to-existing-project.md` rehberini güçlendir `(M18)(P1)` ✓
- [x] `anti-patterns.md` dosyasını v1.0 surface ile senkronize et `(M18)(P2)` ✓
- [x] `overlay-js-helpers.md` dokümanını component docs ile bağla `(M18)(P1)` ✓
- [x] `design-token-export.md` rehberini gerçek kullanım örnekleriyle genişlet `(M18)(P2)` ✓
- [x] `figma-token-handoff.md` ve `figma-token-export.md` tutarlılık kontrolü yap `(M18)(P3)` ✓

## M18.7 Migration kit
- [x] `migration-from-bootstrap.md` doğruluk denetimi `(M18)(P1)` ✓
- [x] `migration-from-tailwind.md` doğruluk denetimi `(M18)(P1)` ✓
- [x] `migration-from-mui.md` tamamla veya scope'u dürüstçe daralt `(M18)(P1)` ✓
- [x] `plain-html-quickstart.md` ekle `(M18)(P2)` ✓
- [x] "why Fikir CSS vs utility-first" karşılaştırmasını stabilize et `(M18)(P2)` ✓

---

# M19 — Quality Gates, Packaging & RC Track

## M19.1 CI sertleştirme
- [x] browser tests CI'ya ekle `(M19)(P0)` ✓
- [x] visual regression CI'yı hard gate yap `(M19)(P1)` ✓
- [x] docs quality check'leri genişlet `(M19)(P1)` ✓
- [x] manifest-to-doc consistency check ekle `(M19)(P1)` ✓
- [x] example app smoke check ekle `(M19)(P1)` ✓

## M19.2 Package smoke ve distribution
- [x] `package-smoke.mjs`'i theme/slice/helpers/tooling importlarını da doğrulayacak şekilde genişlet `(M19)(P0)` ✓
- [ ] fresh project install smoke senaryosu ekle `(M19)(P0)`
- [x] subpath exports için ayrı smoke test yaz `(M19)(P1)` ✓ (`tests/build/subpath-exports.test.mjs`)
- [x] `npm pack` içeriğini `files` politikasına göre tekrar audit et `(M19)(P1)` ✓
- [x] publishable outputs listesini v1.0 için finalize et `(M19)(P1)` ✓

## M19.3 Docs drift ve repo hygiene
- [x] docs link audit'i sertleştir `(M19)(P1)` ✓ (0 broken links, 344 files)
- [ ] stale docs / archive boundary temizliği yap `(M19)(P2)`
- [ ] duplicate rehberleri sadeleştir `(M19)(P2)`
- [x] roadmap ile gerçek repo durumunu senkronize et `(M19)(P1)` ✓

## M19.4 RC hazırlığı
- [x] `docs/governance/semver-policy.md` oluştur `(M19)(P0)`
- [x] `docs/governance/deprecation-policy.md` oluştur `(M19)(P0)`
- [x] `docs/governance/support-policy.md` oluştur `(M19)(P0)`
- [x] `docs/release/release-checklist-v1.md` oluştur `(M19)(P0)`
- [x] `docs/release/rc-burn-in-plan.md` oluştur `(M19)(P0)`
- [x] `1.0.0-rc.1` için checklist tamamla `(M19)(P0)` ✓ (rc-notes-pack güncellendi, B3 kapatıldı)
- [x] RC feedback issue şablonu oluştur `(M19)(P2)` ✓ (`.github/ISSUE_TEMPLATE/rc_feedback.md`)

## M19.5 Benchmark ve proof
- [x] `docs/benchmark.md` verilerini güncelle `(M19)(P2)` ✓
- [x] bundle size kanıtlarını tekrar üret `(M19)(P2)` ✓ (`validate:size` CI'da aktif)
- [x] startup/parsing metodolojisini netleştir `(M19)(P2)` ✓
- [x] benchmark claims ile README iddialarını hizala `(M19)(P2)` ✓

---

# M20 — Machine-Readable Artifacts for AI Adoption

## M20.1 Selectors Manifest
- [x] `dist/contracts/selectors.json` oluştur `(M20)(P0)` ✓
- [x] tüm supported component class'larını listele `(M20)(P0)` ✓ (417 selector)
- [x] tüm supported pattern `data-*` marker'larını listele `(M20)(P0)` ✓ (3 global + 18 component groups)
- [x] variant form'larını (primary, outline, sm, lg vb) include et `(M20)(P0)` ✓
- [ ] CDN'den erişilebilir olduğunu doğrula `(M20)(P1)`

## M20.2 Anatomy & Structure Manifest
- [x] `dist/contracts/anatomy.json` oluştur `(M20)(P0)` ✓
- [x] her supported component için minimal HTML örneği ekle `(M20)(P0)` ✓ (60 component)
- [x] alt-element roller ve selector'ları belirt `(M20)(P0)` ✓
- [x] composite'ler (field, split-button, command-bar) için yapı şeması yaz `(M20)(P1)` ✓
- [x] mutually exclusive ilişkileri belirt (error-text vs helper-text) `(M20)(P1)` ✓

## M20.3 Token Values Manifest
- [x] `dist/contracts/tokens.json` oluştur `(M20)(P0)` ✓ (59 tokens, 7 groups)
- [x] `--space-*` değerleri ve px equivalents ekle `(M20)(P0)` ✓
- [x] `--font-size-*`, `--radius-*` değerleri ekle `(M20)(P0)` ✓
- [x] `--color-*` tüm tone'lar, light/dark mode mappings ekle `(M20)(P0)` ✓
- [ ] metadata: hangi component'lerde kullanıldığını belirt `(M20)(P1)`

## M20.4 Capability Matrix
- [x] `dist/contracts/capabilities.json` oluştur `(M20)(P1)` ✓ (60 component)
- [x] her component için "does" / "does_not" tablosunu yaz `(M20)(P1)` ✓
- [x] "navbar fixed position yok", "button disabled var" gibi açık belirleme `(M20)(P1)` ✓
- [x] "requires_app_css" alanında app sorumluluğunu belirt `(M20)(P1)` ✓

## M20.5 Variant Registry
- [x] `dist/contracts/variants.json` oluştur `(M20)(P0)` ✓
- [x] canonical tone'lar: `neutral`, `primary`, `success`, `warning`, `danger`, `info` `(M20)(P0)` ✓
- [x] canonical style'lar: `solid`, `soft`, `outline`, `ghost`, `plain` `(M20)(P0)` ✓
- [x] size scale: `xs`, `sm`, `md`, `lg` `(M20)(P0)` ✓
- [x] aliases ve component başına applicable variant'ları listele `(M20)(P1)` ✓ (7 recipe components)

## M20.6 Layout Primitives Defaults
- [x] `dist/contracts/primitives.json` oluştur `(M20)(P1)` ✓ (7 primitives)
- [x] `stack`, `cluster`, `center`, `grid`, `switcher` default davranışlarını belirt `(M20)(P1)` ✓
- [x] her primitive'in layout property'lerini ve default gap'ini dokümante et `(M20)(P1)` ✓

## M20.7 Manifest Distribution & Validation
- [x] build process'ine manifest generation ekle `(M20)(P0)` ✓ (`npm run build:manifests`, `build` script'ine entegre)
- [x] schema validation testleri ekle `(M20)(P1)` ✓ (`tests/build/manifests-surface.test.mjs`, 41 test)
- [ ] CDN URL'ler accessible olduğunu test et `(M20)(P1)`
- [x] `docs/guides/machine-readable-contracts.md` oluştur `(M20)(P1)` ✓

## M20.8 AI Integration Guide
- [x] Claude/ChatGPT system prompt örneği yaz `(M20)(P2)` ✓ (`docs/guides/machine-readable-contracts.md` §AI system prompt)
- [ ] web agent integration örneği yaz `(M20)(P2)`
- [ ] VS Code extension örneği yaz `(M20)(P2)`

## M20.9 Manifest Maintenance & Drift Detection
- [x] manifest JSON schema validation ekle `(M20)(P0)` ✓ (`scripts/validate-manifests.mjs`)
- [x] scripts/validate-manifests.mjs script'i oluştur `(M20)(P0)` ✓
- [x] component CSS değiştiğinde anatomy.json güncellenmesi gerektiğini detect eden CI step `(M20)(P0)` ✓ (`scripts/detect-css-anatomy-drift.mjs`, `contracts/anatomy-drift-baseline.mjs`)
- [x] manifest entry'lerine `stable_since`, `deprecated_since`, `status` field'ları ekle `(M20)(P1)` ✓ (`status` field anatomy + capabilities'e eklendi)
- [x] stale manifest detection: "3 release'den beri güncellenmeyen entry'lere uyar" CI check `(M20)(P1)` ✓ (`scripts/detect-stale-anatomy.mjs`, `npm run detect:stale-anatomy`)
- [x] deprecation warning mekanizması: eski class adları manifest'te marked olsun `(M20)(P1)` ✓ (`deprecated` field desteği naming.contract → selectors.json `deprecated_selectors`, validate-manifests'te uyarı)
- [ ] manifest diff ve changelog'a mirror et: CSS değişim → manifest changelog otomatik `(M20)(P2)`
- [x] docs: "Manifest'i nasıl güncelle" contributor rehberi yaz `(M20)(P2)` ✓ (`docs/guides/machine-readable-contracts.md` §Manifest maintenance)

---

# M21 — v1.0 Launch & Post-Launch Guardrails

## M21.1 Final freeze
- [x] support matrix final freeze `(M21)(P0)` ✓ (69 supported · 22 beta · 10 experimental · 0 deprecated — M16 "not yet implemented" listesi temizlendi)
- [x] supported surface selector freeze onayı `(M21)(P0)` ✓ (`v1.0-support-freeze-checklist.md` güncellendi, FREEZE notu eklendi)
- [x] beta/experimental yüzeyleri README ana akışından doğru konuma taşı `(M21)(P1)` ✓ (README `### Beta/Experimental` sections kaldırıldı → `docs/release/what-is-stable-in-v1.md`)

## M21.2 Final docs
- [x] `CHANGELOG.md` v1.0 girdisini yaz `(M21)(P0)` ✓
- [x] migration note yaz `(M21)(P0)` ✓ (`docs/migration/v0.6-to-v1.0-migration-note.md`)
- [x] "What's stable in 1.0?" sayfası ekle `(M21)(P1)` ✓ (`docs/release/what-is-stable-in-v1.md`)
- [x] troubleshooting / FAQ ekle `(M21)(P2)` ✓ (`docs/guides/troubleshooting-faq.md`)

## M21.3 Launch polish
- [x] homepage hero / CTA / quickstart akışını son kez gözden geçir `(M21)(P2)` ✓ (README + site/index.html stats güncellendi: 99 surfaces, ~152 KB / ~18 KB gzip)
- [x] playground ana sayfasını son kez sadeleştir `(M21)(P2)` ✓ (density + motion toggle eklendi)
- [ ] screenshot/baseline görsellerini güncelle `(M21)(P3)`

## M21.4 Publish
- [ ] `1.0.0-rc` sonrası bug listesi kapat `(M21)(P0)`
- [ ] `1.0.0` publish workflow'unu çalıştır `(M21)(P0)`
- [ ] npm dist-tag'leri doğrula `(M21)(P0)`
- [ ] GitHub release oluştur `(M21)(P1)`
- [ ] Pages içeriğini final sürümle senkronize et `(M21)(P1)`

## M21.5 Post-launch guardrails
- [x] `1.0.1` hotfix yolu için checklist oluştur `(M21)(P1)` ✓ (`docs/release/hotfix-checklist.md`)
- [x] issue templates'ı v1.0 support policy ile hizala `(M21)(P2)` ✓ (`.github/ISSUE_TEMPLATE/bug_report.md`, `support_level_promotion.md`)
- [x] roadmap'ı `post-1.0` başlığına geçir `(M21)(P2)` ✓ (bu dosyanın başlığı güncellendi)
- [x] experimental/post-1.0 backlog sayfası oluştur `(M21)(P2)` ✓ (`docs/roadmap/post-1.0-backlog.md`)

---

# Cross-cutting cleanup tasks

## CC.1 Naming / contracts / recipes
- [x] yeni component ve pattern'ler için naming.contract güncelle `(P0)` ✓
- [x] recipes.contract güncelle `(P0)` ✓
- [x] strict recipe validation testleri ekle `(P1)` ✓ (`scripts/validate-recipe-strict.mjs` yeniden yazıldı, `test:ci`'a eklendi)
- [x] docs örnekleri ile canonical selector yüzeyi eşleşiyor mu kontrol et `(P1)` ✓

## CC.2 Site / playground UX
- [x] component filter/search deneyimini iyileştir `(P2)` ✓ (playground sidebar search-box mevcut)
- [x] support level badge'lerini UI'da göster `(P2)` ✓ (playground `data-support-level` + support-pill mevcut)
- [x] theme/density/shape/motion kontrollerini görünür kıl `(P2)` ✓ (density-toggle + motion-toggle eklendi playground header'a)
- [x] empty demo state’leri temizle `(P2)` ✓

## CC.3 Token and export hygiene
- [x] Define utility-surface budget policy (core vs optional utilities) `(P2)`
- [x] Create fluid token (`clamp`) RFC + playground comparison `(P2)`
- [x] exported token JSON ile CSS token kaynakları uyumlu mu kontrol et `(P1)` ✓ (tokens.json `generate-manifests.mjs` tarafından CSS kaynaklarından otomatik üretiliyor — her build'de sync)
- [x] custom theme authoring rehberini örnekle güçlendir `(P2)` ✓
- [x] design token isimlendirme drift'lerini temizle `(P1)` ✓ (59 token, tümü standart prefix — `--space-`, `--font-`, `--radius-` vb. — drift yok)

## CC.4 Issue management
- [x] bug / docs / a11y / release-blocker label setini netleştir `(P3)` ✓ (`.github/project-management/labels.json` güncellendi: type:bug, type:a11y, type:release-blocker, support:beta eklendi)
- [x] contributor rehberini v1.0 governance ile hizala `(P3)` ✓ (`CONTRIBUTING.md` v0.3→v1.0 governance ile güncellendi)

---

# Definition of Done (her görev için)
- [ ] İlgili kod, docs ve demo yüzeyi güncel
- [ ] Gerekliyse contract ve exports güncellendi
- [ ] Gerekliyse test eklendi veya güncellendi
- [ ] Link ve snippet doğruluğu kontrol edildi
- [ ] Theme / density / dark mode etkisi gözden geçirildi
- [ ] Changelog veya migration note ihtiyacı değerlendirildi

---

# v1.0 çıkış özeti
Bu tasklist bittiğinde Fikir CSS’in v1.0 için aşağıdaki sorulara net cevabı olur:

- **Neyi destekliyor?**
- **Nasıl kullanılıyor?**
- **Hangi varyantları resmi?**
- **Ne kadar erişilebilir?**
- **Hangi frameworklerde güvenle tüketilir?**
- **Nasıl yayınlanır ve sürdürülür?**
