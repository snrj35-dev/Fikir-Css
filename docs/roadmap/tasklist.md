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
> **Odak:** CI yeşil, doğru URL'ler, npm publish hazır.

- [ ] GitHub Actions CI logunu incele — hangi adım fail oluyor tespit et `(M9)`
- [ ] CI fail olan adımı düzelt — yeşile al `(M9)`
- [ ] `package.json` → `repository.url` ve `homepage` `snrj35-dev` ile güncelle `(M9)`
- [ ] npm account aç / var olanı kullan, `NPM_TOKEN` secret GitHub'a ekle `(M9)`
- [ ] `publish.yml` workflow'unu test et — `npm publish --dry-run` CI adımı ekle `(M9)`
- [ ] `CHANGELOG.md`'ye v0.6.0 başlığı ekle `(M9)`

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

- [ ] Gallery'ye eksik bileşenleri ekle: `timeline`, `stat`, `kpi-card`, `stepper`, `tree-view` `(M12)`
- [ ] Gallery'ye ekle: `progress`, `rating`, `range-slider`, `calendar` `(M12)`
- [ ] `playground/index.html`'e metin arama / bileşen filtreleme ekle `(M12)`
- [ ] `docs/guides/migration-from-bootstrap.md` tam içerik — class eşleme tablosu `(M12)`
- [ ] `docs/guides/migration-from-tailwind.md` tam içerik — utility → component mapping `(M12)`
- [ ] Her bileşen için "API table" (class, modifier, state) formatı — en az 10 bileşen `(M12)`

---

## Definition of Done (M9–M12)
Her görev için:
- [ ] İlgili playground/docs örnekleri güncel ve link-valid
- [ ] `npm run test:ci` lokal ve CI'da yeşil
- [ ] Yeni naming contract key varsa `naming.contract.mjs` ve build güncel
- [ ] Yeni subpath export varsa `package.json` ve `package-smoke.mjs` güncel
- [ ] Bu liste topluluk geri bildirimine göre güncellenir
