# Fikir CSS — Roadmap

> Son güncelleme: 2026-04-27  
> v1.2.0 sürüm hazırlıkları tamamlandı ✅ — Tüm v1.2 detayları için bkz. [archive](../archive/plan-2026-04-27-v1.2-completed.md)

---

## Özet

Fikir CSS v1.2.0 "Premium & Ecosystem" hedeflerine ulaşıldı. Bu aşamada Glassmorphism, OLED Dark Mode, mikro-etkileşimler ve sınırlı utility katmanı sisteme entegre edildi.

---

## M25 — v1.3.0 & Scale (Future)

Bu aşamada v1.2.0 sürümünün yaygınlaştırılması ve kurumsal ölçekteki ihtiyaçlar planlanmaktadır.

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
  - [x] AI ajanlarının bazen eski dokümanlardan öğrendiği `comp-` ön eklerini (legacy prefix) uydurmasını kesin olarak yasaklayan kısa bir kuralın `SKILL.md` içine eklenmesi.
  - [x] Vibe coder'ların projeye anında adapte olabilmesi için `.cursorrules` (Cursor IDE) veya `.github/copilot-instructions.md` gibi yapay zeka özel config dosyalarının repo root dizinine dahil edilmesi.

---

### 24.5 — Contract-Driven Architecture Hardening (Lessons Learned)

Son dashboard testlerinden elde edilen "yorumum.md" bulguları doğrultusunda, kütüphanenin katı hiyerarşisinin ve bileşen stillerinin daha affedici ve tutarlı hale getirilmesi planlanmıştır:

- **App Shell Hiyerarşisi ve Fullscreen Düzeni:** `app-shell` bileşeninin varsayılan olarak bir "kart" gibi davranması (border ve radius içermesi) tam ekran dashboard tasarımlarını zorlaştırmaktadır. Edge-to-edge tam ekran destekleyen bir `data-variant="fullscreen"` varyasyonunun eklenmesi ve `app-shell-content` zorunluluğunun daha net yönetilmesi.
- **Kenarlık Çorbası (Border Soup) Önlemleri:** `app-shell-sidebar` içine konulan `sidebar-nav` gibi iç içe geçen yapısal bileşenlerde kenarlık ve arka plan çakışmalarını önlemek için, "iç içe geçme (nesting)" durumlarına özel CSS kuralları (örn: `{{component.appShellSidebar}} {{component.sidebarNav}} { border: none; }`) yazılması.
- **State Yönetiminde Tutarlılık (ARIA vs Data-*):** Dokümantasyonda (`SKILL.md`) aktif durumlar için `data-active="true"` önerilirken, çekirdek CSS'in `[aria-current="page"]` kullanması kafa karışıklığı yaratmaktadır. Tüm navigasyon bileşenlerinde state yönetiminin standardize edilmesi ve dokümantasyonun güncellenmesi.
- **Mobil App Shell Davranışı:** `app-shell-sidebar` bileşeninin mobil görünümde (`max-width: 64rem`) off-canvas (çekmece/drawer) davranışı sergileyebilmesi için CSS tabanlı medya sorgularının (transform/z-index ayarlarının) çekirdek kütüphaneye dahil edilmesi.

---

### 24.6 — Tooling & Ecosystem Gaps (AI Feedback)

Yapay zeka araçlarının (Claude vb.) Fikir CSS ile üretim yaparken karşılaştığı temel "ekosistem eksiklikleri" şu başlıklar altında giderilecektir:

- **CDN CORS ve Manifest Erişimi:** AI asistanlarının `selectors.json` ve diğer manifest dosyalarını sorunsuz fetch edebilmesi için CDN veya GitHub Pages üzerinden CORS ayarlarının yapılandırılması ve README'ye net erişim yollarının eklenmesi.
- **Notasyon Tutarlılığı:** Dokümantasyonda ve `SKILL.md` dosyasında yer alan BEM benzeri (örn. `toast--success`) hatalı modifier notasyonlarının, Fikir CSS'in *plain* sınıf yapısına (örn. `toast toast-success`) uygun olarak tamamen temizlenmesi.
- **JS Helpers (Vanilla):** CDN üzerinden sadece CSS alan kullanıcıların `modal`, `toast`, `drawer` gibi etkileşimli bileşenleri yönetebilmesi için `fikir-helpers.js` adında bağımsız, minimal bir yardımcı betiğin yayınlanması.
- **Canlı Galeri Etkileşimi:** Playground (Component Gallery) sayfasına bileşen kodlarını kolayca kopyalamak için "Kodu Kopyala" butonlarının ve "Karanlık/Aydınlık/Kompakt Mod" önizleme seçeneklerinin eklenmesi.
- **Onboarding (İlk Adım):** Yeni kullanıcıların ve AI asistanlarının hızlıca çıktı üretebilmesi için "5 Dakikada Dashboard" (Zero-to-Dashboard) tarzı bir eğitim rehberinin oluşturulması.

---

### 24.7 — Dashboard & Composition Katmanı (3-Model AI Benchmark — Gerçek Bulgular)

> **Kaynak:** Claude, Gemini ve ChatGPT'ye aynı görev verildi — "Fikir CSS kullanarak dashboard.html yaz" — ve ardından dürüst geri bildirim istendi. Üç model de benzer noktalarda "kaçtı". Bu bulgular doğrudan geliştirme backlog'una alınmaktadır.

**Benchmark Skorları:**

| Model | Katkı Skoru | Kaçma Nedeni |
|---|---|---|
| Claude | %40–50 | Composition örneği yoktu, `kpi-card` vardı ama nasıl kullanacağını bilmiyordu |
| Gemini | ~%15 | Sidebar/grid/card yok zannetdi; framework'ü temel CSS reset gibi kullandı |
| ChatGPT | %35–45 | Layout sistemi belirsizdi, dashboard template bulamadı |

**Ortak Tema:** "Component var, composition yok." — Üç model de aynı yerde tıkandı.

---

#### 24.7.1 — Page-Level Composition Şablonları (En Kritik Eksik)

Üç modelin de ortak sızlandığı en büyük boşluk: tekil component'lar var, ama bir "sayfanın nasıl kurulacağı" görünmüyor. `app-shell + sidebar-nav + navbar + kpi-card` üçlüsünün birlikte nasıl kullanılacağını gösteren tek bir referans HTML bile olmadığı için tüm modeller custom layout yazdı.

- **`examples/dashboard/`** klasörü: `app-shell`, `sidebar-nav`, `navbar`, `kpi-card`, `stat`, `badge`, `table` kullanılarak sıfır custom CSS ile yazılmış tam bir referans dashboard HTML dosyası.
- **Page-level şablonlar:** SaaS Dashboard, CRM Panel, Analytics Dashboard, Settings Page — copy-paste ile production'a gidebilecek düzeyde.
- **Composition dokümantasyonu:** `app-shell + sidebar + navbar` üçlüsü için canonical "iskelet" şablonunun docs'a eklenmesi.

#### 24.7.2 — SKILL.md Zenginleştirme (AI'ın Bulduğu Ama Kullanamadığı Yüzeyler)

Claude açıkça belirtti: `kpi-card` ve `stat` yüzeyleri var ama SKILL.md'de snippet olmadığı için custom yazdı. Gemini ise bu yüzeylerin varlığından bile haberdar olmadı.

- `kpi-card`, `stat`, `sidebar-nav`, `app-shell` için tam çalışan **minimal HTML snippet**'lerinin SKILL.md içine eklenmesi.
- Her snippet'in yanına hangi `data-*` attribute'larının kullanılabileceğinin not edilmesi.
- "Bu yüzeyleri gördüğünde şunu kullan" tarzında AI için **decision tree** eklenmesi.

#### 24.7.3 — Zero Custom CSS Hedefi (Framework Olgunluk KPI'ı)

ChatGPT'nin en keskin tespiti: "AI bile `<style>` açıyorsa framework eksiktir." Bu, framework'ün olgunluk ölçütü olarak benimsenmesi önerilen bir KPI.

- **Hedef:** Docs'taki tüm örnek sayfaların `<style>` etiketi olmadan, yalnızca Fikir CSS surface'leri kullanılarak yazılması.
- **Test yöntemi:** Her yeni component veya şablon, AI'a "sıfır custom CSS yaz" kısıtıyla test ettirilecek. Geçemeyen alanlar backlog'a eklenir.
- **Docs copy-paste kalitesi:** Tailwind'in büyümesinin arkasındaki temel motor olan "docs'tan kopyala-yapıştır çalışır" deneyiminin Fikir CSS örneklerinde de sağlanması.

#### 24.7.4 — Layout Composition Primitifleri

Her üç model de grid/layout katmanında custom CSS yazdı. `cluster` ve `stack` primitifleri var ancak dashboard için yeterli değil.

- **`sidebar-layout` composition token'ı:** `grid-template-columns: 280px 1fr` gibi canonical sidebar layout'u için hazır bir surface veya utility.
- **`stat-grid` / `kpi-grid` pattern:** 4 kolonlu KPI grid düzeni için standart bir composition class'ı.
- Bu primitiflerin SKILL.md'de ve playground'da örneklendirilmesi.

---

## İlgili Dokümantasyon

- [Açık görevler](./tasklist.md)
- [Post-1.0 Backlog](./post-1.0-backlog.md)
- [Support matrix](./support-matrix.md)
- [Archive — Geçmiş planlar](../archive/)
