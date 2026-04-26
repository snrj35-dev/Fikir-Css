# Fikir CSS — Roadmap

> Son güncelleme: 2026-04-26  
> v1.1.0 sürüm hazırlıkları tamamlandı ✅ — Tüm v1.1 detayları için bkz. [archive](../archive/plan-2026-04-26-v1.1-completed.md)

---

## Özet

Fikir CSS v1.1.0 olgunluk hedeflerine ulaşıldı. Bu aşamada dokümantasyon standardizasyonu, CI drift check ve dashboard smoke testleri tamamlanarak kütüphanenin güvenilirliği artırıldı.

---

## M24 — v1.2.0 & Maintenance (2026-04-26)

Bu aşamada v1.1.0 sürümünün son kontrolleri ve bir sonraki majör iyileştirmeler planlanmaktadır.

### 24.1 — Sürüm Öncesi Son Kontroller (P1)

1.1.0 sürümü yayınlanmadan önce yapılması gereken kritik doğrulamalar:

- [ ] Tüm değişiklikler additive, breaking yok (Sürüm öncesi son kontrol)
  - [ ] `selectors.json` ve `anatomy.json` üzerinde geriye dönük uyumluluk kontrolü
  - [ ] Mevcut CSS değişkenlerinin (tokens) korunup korunmadığının teyidi

---

### 24.2 — Görsel Evrim ve Premium Hissiyat (Vision)

Fikir CSS'in mevcut temiz ve profesyonel görünümünü modern web trendleriyle harmanlayarak "Premium & Wow" hissiyatı yaratma planları:

- **Glassmorphism (Cam Efekti):** `navbar`, `modal` ve `app-shell` bileşenleri için arka planda bulanıklık (backdrop-filter) kullanan, yarı saydam `data-variant="glass"` varyasyonlarının eklenmesi.
- **Mikro Etkileşimler (Micro-animations):** Butonlar, linkler ve özellikle `hover-card` gibi bileşenlerde CSS tabanlı yaylı (spring) animasyonlar ve tıkla-dalgalan (ripple/scale) efektlerinin sisteme dahil edilmesi.
- **Mesh Gradients ve Border Efektleri:** Özel vurgulu veri kartları (`kpi-card`, `stat-group`) için modern CSS mesh gradient tokenları ve hareketli border (conic-gradient border) animasyonlarının eklenmesi.
- **OLED Dark Mode:** Standart karanlık moda ek olarak, saf siyah (`#000000`) ağırlıklı derin kontrastlı `data-theme="oled"` temasının tasarlanması.

---

### 24.3 — Mimari ve İşlevsel Eksikliklerin Giderilmesi

Mevcut 99 yüzey (surface) devasa bir alan kaplıyor. Ancak modern web uygulamalarının karmaşık ihtiyaçları için şu eksiklikler planlanmıştır:

- **Headless UI Entegrasyon (Adapter) Rehberleri:** Fikir CSS sıfır-runtime (zero-runtime) olarak mükemmel çalışıyor. Ancak `date-range-picker`, `combobox`, `tree-view` gibi erişilebilirlik (a11y) açısından karmaşık state yönetimi gerektiren bileşenler için **Radix UI**, **Zag.js** veya **React Aria** ile entegrasyon (adapter) rehberlerinin yazılması.
- **Çok Sınırlı "Utility" Kaçış Kapıları:** "Contract-driven" yapı korunmalı; ancak geliştiricilerin sadece basit bir `margin-top` veya `padding` vermek için inline-style (`style="..."`) yazmasını engellemek adına, çok katı kurallara bağlı sınırlı bir "spacing/layout utility" katmanının (örn: `p-4`, `mt-2`) projeye entegre edilmesi değerlendirilmelidir.

---

### 24.4 — AI, Agent ve Vibe Coder Deneyimi (DX)

Mevcut durumda `README.md` ve `SKILL.md` dosyaları AI entegrasyonu için endüstri standartlarının ötesinde mükemmel bir temel sunuyor. Projenin "farklı mantığı" AI için çok net çizilmiş.

- **Mevcut Durum Analizi:** 
  - AI'ın en büyük zaafı olan "BEM veya Tailwind class'ları uydurma" huyu, `selectors.json` zorunluluğu ve `data-*` attribute yönlendirmesiyle başarılı bir şekilde engellenmiştir.
  - `SKILL.md` dosyası, yapay zeka ajanları (agents) için harika bir "System Prompt" niteliği taşıyor ve proje tokenlarıyla tam uyumlu.
- **Gelecek İyileştirmeler:**
  - AI ajanlarının bazen eski dokümanlardan öğrendiği `comp-` ön eklerini (legacy prefix) uydurmasını kesin olarak yasaklayan kısa bir kuralın `SKILL.md` içine eklenmesi.
  - Vibe coder'ların projeye anında adapte olabilmesi için `.cursorrules` (Cursor IDE) veya `.github/copilot-instructions.md` gibi yapay zeka özel config dosyalarının repo root dizinine dahil edilmesi.

---

## İlgili Dokümantasyon

- [Açık görevler](./tasklist.md)
- [Post-1.0 Backlog](./post-1.0-backlog.md)
- [Support matrix](./support-matrix.md)
- [Archive — Geçmiş planlar](../archive/)
