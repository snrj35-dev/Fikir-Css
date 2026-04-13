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
- [ ] `site/` + `playground/` birleştirme fizibilite değerlendirmesi — dış kullanıcı iki farklı ürün görüyor `(M9)` ← uzman bulgusu
- [ ] Site ana sayfasını yeniden düzenle: **Install + Theme Switcher + Real App Examples** üçlüsü önce, component galeri sonra `(M9)` ← uzman #2 bulgusu
- [x] `CHANGELOG.md`'ye v0.6.0-beta Unreleased başlığı eklendi `(M9)`
- [x] `test:ci` zincirinde `build` başa taşındı — CI'da `dist/` yokken `test:source` patlıyordu `(M9)`
- [x] `build` script'ine 3 eksik contract raporu eklendi: `contract-drift`, `bundle-layers`, `component-css-map` `(M9)`
- [x] `validate-size-thresholds`: cold-start (`previousBytes=0`) durumunda diff kontrolü atlanıyor `(M9)`
- [x] `publish.yml`'ye `--tag beta` eklendi — `latest` dist-tag'i etkilenmiyor `(M9)`

---

## M10 — Theme System
> **Odak:** compact/high-contrast/reduced-motion temalarını kullanılabilir hale getir.

- [ ] Gallery'ye tema değiştirici dropdown ekle (`light` / `dark` / `compact` / `high-contrast`) `(M10)`
- [ ] `docs/guides/theme-system.md` oluştur — her tema ne değiştirir, nasıl aktive edilir `(M10)`
- [ ] Token explorer'a tema karşılaştırma modu ekle (iki tema yan yana) `(M10)`
- [ ] `reduced-motion` teması dokümantasyonu — prefers-reduced-motion ile ilişkisi `(M10)`
- [ ] README'ye tema değiştirme kodu snippet'ı ekle `(M10)`

---

## M11 — Framework Examples
> **Odak:** Vue 3 ve Svelte için çalışır örnek, React örneği güncellendi.

- [ ] `examples/vue-vite/` oluştur — Vue 3 + Composition API `(M11)`
  - `useTheme()` composable, `resolveBtn` kullanımı
  - Modal + `createFocusTrap` helper entegrasyonu
  - README: "30 saniyede çalıştır"
- [ ] `examples/svelte-vite/` oluştur — SvelteKit `(M11)`
  - Svelte store ile dark mode toggle
  - Typed resolver kullanımı
  - README: "30 saniyede çalıştır"
- [ ] `examples/react-vite/src/App.jsx` güncelle — yeni badge/alert tones, helpers entegrasyonu `(M11)`
- [ ] `docs/guides/vue-adapter.md` tam içerik `(M11)`
- [ ] `docs/guides/svelte-adapter.md` tam içerik `(M11)`

---

## M12 — Component Showcase & Docs
> **Odak:** Gallery coverage %95+, migrasyon rehberleri, component API docs.

- [ ] Gallery'ye ekle (doğrulanmış öncelik): `stepper` → `tree-view` → `timeline` → `stat` polish/API → `kpi-card` `(M12)` ← uzman #2 düzeltmesi (`stat` zaten gallery'de, `stepper` hiç görünmüyor)
  - `stepper`: `[data-step-state]` veya `:has()` ile CSS-only active/completed state ← uzman #4
  - `tree-view`: CSS `grid` indent + `[aria-expanded]` state, recursive yapı ← uzman #4
  - `timeline`: `@container` sorgusu — mobil/desktop layout shift riski ← uzman #4
- [ ] Gallery'ye ekle: `progress`, `rating`, `range-slider`, `calendar` `(M12)`
- [ ] `playground/index.html`'e metin arama / bileşen filtreleme ekle `(M12)`
- [ ] `docs/guides/migration-from-bootstrap.md` tam içerik — class eşleme tablosu `(M12)`
- [ ] `docs/guides/migration-from-tailwind.md` tam içerik — utility → component mapping `(M12)`
- [ ] Her bileşen için standart doc şablonu oluştur: "ne zaman kullanılır / required classes / modifier'lar / state'ler / **a11y checklist** / örnek markup / anti-pattern" — en az 10 bileşen `(M12)` ← uzman #2 + #3
- [ ] "API table" formatını doc şablonuna dahil et `(M12)`
- [ ] `docs/testing/parsing-cost-benchmark.md` gerçek Lighthouse verileriyle tamamla — şu an sadece metodoloji stub'u `(M12)` ← uzman #3 bulgusu
- [ ] README'ye "Neden Tailwind değil?" karşılaştırma tablosu ekle (bundle size, theming, learning curve) `(M12)` ← uzman #3 bulgusu
- [ ] Per-component CSS tree-shaking (`import 'fikir-css/button.css'`) — M13+ için RFC notu yaz; şu an bilinçli mimari tercih (10.5 KB gzip yeterli) `(M12-note)` ← uzman #3 bulgusu

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
