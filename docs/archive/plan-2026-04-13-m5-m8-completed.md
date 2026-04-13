# Fikir CSS — Adoption-First Plan (M5–M8)

> Last reviewed: 2026-04-12
> Previous M1–M4 plan archived to `docs/archive/plan-2026-04-12-m4-completed.md`

---

## North Star

**Teknik temel sağlam. Şimdi hedef: bir geliştirici ilk 10 dakikada Fikir CSS'e güvenmeli ve bir şey çalıştırabilmeli.**

Metrik:
- Bir geliştirici repo'yu clone'lamadan bileşenleri görebilmeli (hosted site)
- `npm install fikir-css` + tek dosya import → görsel sonuç ≤ 5 dakika
- Alert/badge/btn gibi temel bileşenler tam variant setiyle kullanılabilir
- Mevcut projeye eklendiğinde class çakışması riski belgelenmiş ve azaltılmış

---

## Milestone Özeti

| Milestone | Odak | Kapsam |
|-----------|------|--------|
| M5 | First Impression & Discovery | Hosted site, component gallery, 5-min guide, token explorer |
| M6 | Component Completeness | Alert/badge tones, btn tek class, CSS reset netliği |
| M7 | Overlay JS Helpers | Focus trap, keyboard nav snippets, dismiss helper |
| M8 | Adoption Safety | Scope collision guide, "add to existing project" rehberi, Figma kit |

---

## M5 — First Impression & Discovery

**Problem:** Repo'yu clone'lamadan Fikir CSS'i değerlendirmek mümkün değil. Bu en büyük benimseme engeli.

**Hedefler:**
1. GitHub Pages üzerinde hosted component gallery + doc sitesi
2. README'de tek link → anında bileşen görseli
3. Token visual explorer (renk paleti, spacing, typography)
4. CHANGELOG.md ile tarihli release geçmişi

**Başarı kriteri:** Bir geliştirici URL paylaştığında karşı taraf bileşenleri canlı görebilmeli.

---

## M6 — Component Completeness

**Problem:** `alert-danger` var ama `alert-warning`, `alert-success`, `alert-info` yok. `btn` tek başına işe yaramıyor. Bu "tamamlanmamış" hissi yaratıyor.

**Hedefler:**
1. Alert tüm tones: `warning`, `success`, `info`, `neutral`
2. Badge tüm tones tamamlanmış
3. `btn` tek class ile kullanılabilir (varsayılan görünüm) VEYA neden iki class gerektiği açıkça belgelenmiş
4. CSS reset'in ne yaptığı, nasıl opt-out edileceği belgelenmiş

**Başarı kriteri:** "Bu kütüphane temel bileşenlerde eksik" yorumu ortadan kalkar.

---

## M7 — Overlay JS Helpers

**Problem:** `modal`, `dropdown`, `popover` CSS ile tanımlanıyor ama JS davranışı (focus trap, Escape, backdrop click, roving tabindex) tamamen consumer'a bırakılmış. Büyük ürünlerde bu boşluk hissedilir.

**Hedefler:**
1. `fikir-css/helpers` subpath export: vanilla JS yardımcılar
   - `createFocusTrap(element)` — focus trap + return on close
   - `bindOverlayKeyboard(element)` — Escape → kapat, backdrop click → kapat
   - `createRovingTabindex(container)` — arrow key navigation
2. Her yardımcı için playground demo
3. "Headless boundary" doc: CSS'de ne var, JS'de ne bekleniyor

**Başarı kriteri:** Bir geliştirici modal açıp kapatmak için sıfırdan JS yazmak zorunda kalmaz.

---

## M8 — Adoption Safety

**Problem:** `modal`, `input`, `table`, `btn` gibi generic class isimleri mevcut projeye eklendiğinde çakışma riski yüksek. Bu risk belgelenmemiş.

**Hedefler:**
1. "Mevcut projeye nasıl eklenir" rehberi — scope stratejisi, prefixed mode açıklaması
2. CSS layer yalıtımı: `@layer` ile conflict prevention
3. Figma community token kit (renk/spacing/radius token'larını Figma'ya aktarım)
4. "5 dakikada entegre et" interaktif tutorial (playground tabı)

**Başarı kriteri:** "Mevcut Bootstrap projeme ekleyebilir miyim?" sorusuna net yanıt var.

## Guardrails
- M5 tamamlanmadan M6'ya geçilmez (discovery çözülmeden completeness ikincil önceliktir).
- Her M'de en az bir "Başarı kriteri" kanıtlanmadan milestone kapatılmaz.
- `npm run test:ci` her commit'te yeşil kalır.
- Yeni bileşen tonu / variant eklenirken naming.contract.mjs güncellenir ve build geçer.
