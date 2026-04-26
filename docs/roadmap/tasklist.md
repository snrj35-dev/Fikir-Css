# Fikir CSS — Open Tasks

> Son güncelleme: 2026-04-26  
> v1.1.0 Maturity Gaps tamamlandı ✅ — Detaylar için bkz. [archive](../archive/tasklist-2026-04-26-v1.1-completed.md)

---

## Legend
- `[ ]` açık — yapılacak
- `[x]` tamamlandı
- `(P1)` yüksek öncelik — sürüm blocker
- `(P2)` planlandı ama takvimli değil

---

## v1.1.0 Final Release Tasks

- [ ] Tüm değişiklikler additive, breaking yok (Sürüm öncesi son kontrol) `(P1)`

---

## M24 — v1.2.0 & Next-Gen Vision Tasks

### 1. AI, Agent ve DX İyileştirmeleri (Hızlı Kazanımlar - P1/P2)
- [ ] `SKILL.md` güncellemesi: AI için "eski/legacy prefix uydurma" yasağının açıkça eklenmesi `(P2)`
- [ ] `.cursorrules` (veya `.github/copilot-instructions.md`) dosyasının oluşturulması ve proje root dizinine eklenmesi `(P2)`

### 2. Görsel Evrim ve Premium Hissiyat (P2)
- [ ] **Glassmorphism:** `navbar`, `modal`, `app-shell` için `data-variant="glass"` varyasyonunun (backdrop-filter) uygulanması `(P2)`
- [ ] **OLED Dark Mode:** Saf siyah (`#000000`) ağırlıklı derin kontrastlı `data-theme="oled"` temasının oluşturulması `(P2)`
- [ ] **Mikro-etkileşimler:** Buton, link ve `hover-card` bileşenleri için CSS tabanlı yaylı (spring) hover/ripple animasyonlarının eklenmesi `(P2)`
- [ ] **Mesh Gradient & Borders:** `kpi-card`, `stat-group` gibi kartlar için hareketli conic-gradient border ve mesh gradient tokenlarının eklenmesi `(P3)`

### 3. Mimari ve İşlevsel İyileştirmeler (P2/P3)
- [ ] **Sınırlı Utility Katmanı:** Contract-driven yapıyı bozmadan sadece spacing/layout (`p-4`, `mt-2` vb.) için minimal bir utility katmanının planlanıp eklenmesi `(P2)`
- [ ] **Headless UI Adapter:** `date-range-picker`, `combobox` vb. a11y-heavy bileşenler için Radix UI / Zag.js entegrasyon rehberlerinin dokümantasyona eklenmesi `(P3)`
- [ ] Mevcut `Experimental` bileşenlerin revize edilerek `Beta` veya `Supported` statüsüne yükseltilmesi `(P3)`

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
- [Archive — Tamamlanan görevler](../archive/)
