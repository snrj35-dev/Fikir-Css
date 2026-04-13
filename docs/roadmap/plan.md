# Fikir CSS — v0.6.0 Plan (M9–M12)

> Oluşturulma: 2026-04-13
> Önceki M5–M8 planı arşivlendi: `docs/archive/plan-2026-04-13-m5-m8-completed.md`

---

## Analiz Bulguları (v0.5.0 sonrası durum)

| Alan | Mevcut Durum | Boşluk |
|------|-------------|--------|
| Bundle | 92 KB raw / 10.5 KB gzip | ✅ Sağlam |
| CI (GitHub Actions) | Lokal 245/245 ✅, GitHub CI ❌ | Kritik — root cause belirsiz |
| package.json repo URL | Eski `osman-developer` URL | Düzeltilmeli |
| npm publish | Yapılmadı | `NPM_TOKEN` secret eksik |
| Playground coverage | %87.3 (43 selector gösterilmiyor) | Yeni tonlar + utility'ler eklenmeli |
| Tema sistemi | `compact`, `high-contrast`, `comfortable`, `reduced-motion` var | Gallery'de gösterilmiyor, dökümansız |
| Framework örnekleri | React: orta. Vue/Svelte: stub dokü | Gerçek çalışır örnek yok |
| Migrasyon rehberleri | Bootstrap, Tailwind, MUI: stub | İçerik yok |
| Bileşen galerisi | 82 component CSS'te var, ~40'ı gallery'de | Kapsam artırılmalı |
| API referansı | Yok | Per-component prop/class docs yok |

---

## North Star (v0.6.0)

**Dağıtım ve ekosistem güvenilirliği.** npm'de yayınlanmış, CI yeşil, tema sistemi gösteriliyor, framework entegrasyonu belgelenmiş.

Metrikler:
- GitHub CI yeşil (her push'ta)
- `npm install fikir-css` gerçekten çalışıyor (npm'de yayınlanmış)
- Tema değiştirici (compact/high-contrast) gallery'de canlı demo
- Vue 3 ve Svelte için çalışır örnek repolar
- Playground coverage %87 → %95+

---

## Milestone Özeti

| Milestone | Odak | Kapsam |
|-----------|------|--------|
| M9 | Stability & Distribution | CI fix, package.json URL, npm publish hazırlığı |
| M10 | Theme System | compact/high-contrast/reduced-motion gallery demo + docs |
| M11 | Framework Examples | Vue 3 + Svelte gerçek örnekler, React güncellemesi |
| M12 | Component Showcase | Gallery coverage artışı, migrasyon rehberleri, API docs |

---

## M9 — Stability & Distribution

**Problem:** GitHub CI hâlâ kırık. `package.json`'da yanlış URL var. npm'de paket yok.

**Hedefler:**
1. GitHub CI'ı yeşile al — hangi adımın fail olduğunu logdan tespit et
2. `package.json` `repository.url` ve `homepage`'i `snrj35-dev` ile güncelle
3. npm publish workflow hazırlığı: `NPM_TOKEN` secret dokümante et, publish dry-run CI'a ekle
4. `CHANGELOG.md` güncel tut — v0.5.0 → v0.6.0 geçiş notu

**Başarı kriteri:** `git push origin main` → her iki workflow (CI + deploy-pages) yeşil.

---

## M10 — Theme System

**Problem:** `compact`, `comfortable`, `high-contrast`, `reduced-motion` temaları CSS'te var ama hiçbir yerde gösterilmiyor. Kullanıcı bunların var olduğunu bilmiyor.

**Hedefler:**
1. Gallery'ye tema değiştirici ekle (`compact` / `comfortable` / `high-contrast`)
2. `docs/guides/theme-system.md` — her tema ne değiştirir, nasıl aktive edilir
3. `reduced-motion` teması — ne kapsar, nasıl test edilir
4. Token explorer'a tema karşılaştırma modu ekle (light/dark/compact yan yana)

**Başarı kriteri:** Kullanıcı gallery'de dropdown ile tema değiştirip farkı canlı görebilir.

---

## M11 — Framework Examples

**Problem:** Vue ve Svelte adapterleri stub dokümandan ibaret. Gerçek çalışır örnek yok.

**Hedefler:**
1. `examples/vue-vite/` — Vue 3 + Composition API çalışır örnek
   - `useTheme()` composable, `resolveBtn` kullanımı, modal with helpers
2. `examples/svelte-vite/` — SvelteKit çalışır örnek
   - stores ile dark mode, typed resolvers
3. React örneğini güncelle — yeni tones (badge-success vb.) + `createFocusTrap` entegrasyonu
4. Her örnek için README ve "run in 30 seconds" talimatı

**Başarı kriteri:** `cd examples/vue-vite && npm i && npm run dev` → çalışır.

---

## M12 — Component Showcase & Docs

**Problem:** 82 component var, gallery %87 kapsıyor. Migrasyon rehberleri stub.

**Hedefler:**
1. Gallery coverage %87 → %95+ (özellikle: timeline, stat, kpi-card, stepper, tree-view)
2. `docs/guides/migration-from-bootstrap.md` tam içerik — class eşleme tablosu
3. `docs/guides/migration-from-tailwind.md` tam içerik — utility → component mappping
4. Her component için "API table" formatında inline docs (class, state, modifier listesi)
5. `playground/index.html`'e arama/filtreleme ekle

**Başarı kriteri:** "Bootstrap'tan geçiş yapıyorum" diyene doğrudan link atılabilir kılavuz var.

---

## Uzman Görüşü Özeti (2026-04-13)

> Uzman değerlendirmesine göre eklenen kararlar:

| Karar | Uzman Önerisi |
|-------|---------------|
| Milestone sırası | **M9 → M10 → M12-lite → M11 (Vue) → M11 (Svelte)** |
| npm publish | GA publish yapma; prerelease (`0.6.0-beta.1`) veya npm/CDN vaatlerini kaldır |
| Eksik bileşen önceliği | `stepper` > `stat` > `tree-view` > `timeline` > `kpi-card` |
| Framework önceliği | Önce daha fazla component docs, sonra Vue, sonra Svelte |
| site/ vs playground/ | Mümkünse birleştir — dış kullanıcı iki farklı ürün görüyor |
| İlk bakış UX | Install + Themes + Examples üçlüsü; tema switcher ilk ekranda görünmeli |

---

## Guardrails
- CI yeşil olmadan M10+ başlamaz (M9 blocker).
- README ve site üzerindeki npm/CDN vaatleri — paket yayınlanmadan kaldırılmalı veya uyarı eklenmeli.
- Her milestone en az bir "canlı demo / çalışır örnek" içerir — sadece dokümantasyon değil.
- `npm run test:ci` lokal ve CI'da yeşil kalır.
- Yeni subpath export varsa `package.json` + `package-smoke.mjs` güncellenir.
- Bu plan taslaktır — topluluk geri bildirimine göre öncelik sırası değişebilir.
