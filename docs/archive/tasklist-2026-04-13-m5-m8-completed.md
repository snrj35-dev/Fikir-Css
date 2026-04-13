# Fikir CSS — Adoption-First Task List (M5–M8)

> Last reviewed: 2026-04-12
> Previous M1–M4 tasklist archived to `docs/archive/tasklist-2026-04-12-m4-completed.md`

## Legend
- `[ ]` not started
- `[~]` in progress
- `[x]` done

## Milestones
- `(M5)` First Impression & Discovery
- `(M6)` Component Completeness
- `(M7)` Overlay JS Helpers
- `(M8)` Adoption Safety

---

## M5 — First Impression & Discovery
> **Odak:** Repo clone'lamadan Fikir CSS'i değerlendirilebilir hale getir.

- [x] GitHub Pages hosted component gallery sitesi oluştur `(M5)`
- [x] README'ye hosted site linkini ekle — `https://snrj35-dev.github.io/Fikir-Css/` `(M5)`
- [x] Playground'a token visual explorer sayfası ekle (renk paleti, spacing, radius, shadow) `(M5)`
- [x] `CHANGELOG.md` oluştur — her versiyon için tarihli özet `(M5)`
- [x] Her bileşen için "tüm variant'ları gösteren" tek sayfa playground tabı `(M5)`
- [x] README'ye "5 dakikada çalışan örnek" kod bloğu ekle (CDN ile, clone gerekmeden) `(M5)`

---

## M6 — Component Completeness
> **Odak:** Temel bileşenlerde "eksik" hissini gider.

- [x] `alert` tüm tones ekle: `alert-warning`, `alert-success`, `alert-info`, `alert-neutral` `(M6)`
- [x] `badge` tüm tones ekle: `badge-warning`, `badge-success`, `badge-info` `(M6)`
- [x] `naming.contract.mjs` + `recipes.contract.mjs` alert/badge yeni tonlar ile güncelle `(M6)`
- [x] `btn` tek class kullanımını belgele — gallery'de bare `btn` demo + açıklama eklendi `(M6)`
- [x] CSS reset dokümantasyonu — `docs/guides/css-reset.md` `(M6)`
- [x] `input` focus/invalid/disabled görsel durumlarını gallery'de göster `(M6)`
- [x] Playground component gallery sayfasına tüm yeni variant'ları ekle `(M6)`

---

## M7 — Overlay JS Helpers
> **Odak:** Modal/dropdown/popover'ı JS yazmadan çalıştırılabilir hale getir.

- [x] `packages/helpers/` klasörü oluştur `(M7)`
- [x] `createFocusTrap(element)` — focus trap + kapanışta odak geri dönüşü `(M7)`
- [x] `bindOverlayKeyboard(element)` — Escape → kapat, backdrop click → kapat `(M7)`
- [x] `createRovingTabindex(container)` — arrow key ile navigasyon `(M7)`
- [x] `fikir-css/helpers` subpath export'u `package.json`'a ekle `(M7)`
- [x] Her helper için TypeScript `.d.ts` tanımı `(M7)`
- [x] Gallery site modal demo helpers ile güncellendi `(M7)`
- [x] `docs/guides/overlay-js-helpers.md` — kopyala-yapıştır örneklerle kullanım rehberi `(M7)`
- [x] `docs/architecture/headless-contract-spec.md`'yi güncelle: CSS sınırı vs JS beklentisi net çizgi `(M7)`

---

## M8 — Adoption Safety
> **Odak:** "Mevcut projeme ekleyebilir miyim?" sorusunu net yanıtla.

- [x] `docs/guides/adding-to-existing-project.md` tam içerik: `@layer`, Bootstrap, Tailwind, incremental `(M8)`
- [x] Prefixed mode geçiş rehberi — `adding-to-existing-project.md` içinde `(M8)`
- [x] `docs/guides/css-reset.md` — reset katmanının tam açıklaması + opt-out adımları `(M8)`
- [x] Playground'a "5 dakikada entegre et" interaktif tutorial tabı `(M8)` → `playground/quickstart.html`
- [x] Figma token export rehberi — `docs/guides/figma-token-export.md` `(M8)`
- [x] `docs/guides/collision-prevention.md` — generic class isimlerinin çakışma senaryoları ve çözümleri `(M8)`

---

## Carry-over Completed (Locked)
> These items are locked as done from the M1–M4 track.

- [x] Define utility-surface budget policy (core vs optional utilities) `(P2)`
- [x] Create fluid token (`clamp`) RFC + playground comparison `(P2)`

---

## Definition of Done (M5–M8)
Her görev için:
- [ ] İlgili playground/docs örnekleri güncel ve link-valid
- [ ] `npm run test:ci` yeşil
- [ ] Yeni naming contract key varsa `naming.contract.mjs` ve build güncel
- [ ] Yeni subpath export varsa `package.json` ve `package-smoke.mjs` güncel
