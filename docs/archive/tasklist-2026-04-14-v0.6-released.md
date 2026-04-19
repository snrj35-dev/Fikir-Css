# Fikir CSS — v0.6.0 Task List (M9–M12)

> Oluşturulma: 2026-04-13
> Önceki M5–M8 tasklist arşivlendi: `docs/archive/tasklist-2026-04-13-m5-m8-completed.md`
> Bu liste taslaktır — topluluk geri bildirimine göre güncellenecek.

## Legend
- `[ ]` not started
- `[~]` in progress
- `[x]` done

## Milestones
- `(M9)` Stability & Distribution
- `(M10)` Theme System
- `(M11)` Framework Examples
- `(M12)` Component Showcase & Docs

---

## M9 — Stability & Distribution
> **Odak:** CI yeşil, doğru URL'ler, npm/CDN vaatleri gerçekle uyumlu.

- [x] GitHub Actions CI logunu incele — `docs-link-audit` ve `tasklist-hardening` fail `(M9)`
- [x] CI fail olan adımı düzelt — stub dosyalar + carry-over items eklendi, 245/245 yeşil `(M9)`
- [x] `package.json` → `repository.url`, `homepage`, `bugs.url` `snrj35-dev` ile güncellendi `(M9)`
- [x] README üzerindeki npm/CDN bağlantıları: ⚠️ "npm publish pending" uyarısı eklendi; CDN örneği GitHub Pages URL'sine çevrildi `(M9)` ← uzman bulgusu
- [x] `site/index.html` CDN fallback kaldırıldı — npm paketi yayınlanmadığından `onerror` fallback işe yaramaz `(M9)` ← uzman bulgusu
- [x] npm account / `NPM_TOKEN` secret eklendi — `fikir-css@0.6.0-beta.6` npm'de `@beta` dist-tag ile yayınlandı `(M9)` ← uzman önerisi
- [x] `publish.yml` workflow'una `npm publish --dry-run` doğrulama adımı eklendi `(M9)`
- [x] `playground/index.html` versiyon badge'ini `v1.0-M2` → `v0.5.0` olarak düzelt `(M9)` ← uzman #2 bulgusu
- [x] `site/` + `playground/` birleştirme fizibilite değerlendirmesi — karar: birleştirme yok, `plan.md`'ye eklendi `(M9)`
- [x] Site ana sayfası yeniden düzenlendi: Install + Theme Switcher + Real App Examples + gallery heading `(M9)` ← uzman #2 bulgusu
- [x] `CHANGELOG.md`'ye v0.6.0-beta Unreleased başlığı eklendi `(M9)`
- [x] `test:ci` zincirinde `build` başa taşındı — CI'da `dist/` yokken `test:source` patlıyordu `(M9)`
- [x] `build` script'ine 3 eksik contract raporu eklendi: `contract-drift`, `bundle-layers`, `component-css-map` `(M9)`
- [x] `validate-size-thresholds`: cold-start (`previousBytes=0`) durumunda diff kontrolü atlanıyor `(M9)`
- [x] `publish.yml`'ye `--tag beta` eklendi — `latest` dist-tag'i etkilenmiyor `(M9)`

---

## M10 — Theme System
> **Odak:** compact/high-contrast/reduced-motion temalarını kullanılabilir hale getir.

- [x] Gallery'ye tema değiştirici dropdown eklendi (`light`/`dark`/`high-contrast` + density) `(M10)`
- [x] `docs/guides/theme-system.md` tam içerik — tüm temalar, aktivasyon, token override, custom theme `(M10)`
- [x] Token explorer'a `↔ Compare` modu eklendi — iki tema yan yana renk karşılaştırması `(M10)`
- [x] `reduced-motion` dokümantasyonu `theme-system.md`'ye dahil edildi `(M10)`
- [x] README'ye tema değiştirme kodu snippet'ı + "Neden Tailwind değil?" tablosu + npm badge eklendi `(M10/M12)`

---

## M11 — Framework Examples
> **Odak:** Vue 3 ve Svelte için çalışır örnek, React örneği güncellendi.

- [x] `docs/guides/vue-adapter.md` tam içerik — modal, segmented-control, dynamic classes, SSR `(M11)`
- [x] `docs/guides/svelte-adapter.md` güncellendi — `@beta` tag, dark mode store, SvelteKit `(M11)`
- [ ] `examples/vue-vite/` çalışır uygulama (stub var, full app M13) `(M11)`
- [ ] `examples/svelte-vite/` çalışır uygulama (stub var, full app M13) `(M11)`
- [ ] `examples/react-vite/src/App.jsx` güncelle `(M11)`

---

## M12 — Component Showcase & Docs
> **Odak:** Gallery coverage %95+, migrasyon rehberleri, component API docs.

- [x] `site/index.html` gallery'ye eklendi: `stepper`, `timeline`, `tree-view` (sidebar + sections) `(M12)`
- [x] Gallery'ye eklendi: `progress`, `rating`, `range-slider`, `calendar` — site/index.html `(M12)`
- [x] `playground/index.html` sidebar'a bileşen arama/filtreleme eklendi — `demo.js` filter logic `(M12)`
- [x] `docs/migration/from-bootstrap.md` — tam class eşleme tablosu + modal/dropdown/dark mode migration `(M12)`
- [x] `docs/migration/from-tailwind.md` — utility→component mapping + token karşılıkları `(M12)`
- [x] `docs/components/_template.md` — standart doc şablonu (API table, a11y, tokens) `(M12)`
- [x] 10 bileşen dokümanı: button, modal, alert, input, badge, accordion, tabs, card, stepper, tree-view, timeline `(M12)`
- [x] `docs/benchmark.md` — bundle size + runtime + feature karşılaştırma tablosu (Bootstrap, Tailwind, Bulma, Pico) `(M12)`
- [x] Per-component CSS tree-shaking RFC notu → `docs/rfcs/per-component-tree-shaking-rfc-note.md` `(M12-note)`

---

## Carry-over Completed (Locked)
> M1–M4 track'ten taşınan, değişmez tamamlanmış görevler.

- [x] Define utility-surface budget policy (core vs optional utilities) `(P2)`
- [x] Create fluid token (`clamp`) RFC + playground comparison `(P2)`

---

## Definition of Done (M9–M12)
Her görev için:
- [ ] İlgili playground/docs örnekleri güncel ve link-valid
- [ ] `npm run test:ci` lokal ve CI'da yeşil
- [ ] Yeni naming contract key varsa `naming.contract.mjs` ve build güncel
- [ ] Yeni subpath export varsa `package.json` ve `package-smoke.mjs` güncel
- [ ] Bu liste topluluk geri bildirimine göre güncellenir
