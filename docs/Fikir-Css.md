# Fikir CSS
> Utility-first + semantic component + token-driven + accessible + type-safe + low-runtime overhead

> Status: `stale` ideation document. Use `README.md`, `docs/roadmap/plan.md`, and `docs/roadmap/tasklist.md` for current product scope.

Bu belge, modern CSS framework’lerin güçlü yanlarını tek bir sistemde birleştiren hayali bir framework tasarımı için temel mimari dokümandır. İlk fikirler önceki notlardan derlenmiş ve ürünleştirilebilir bir çerçeveye dönüştürülmüştür. Kaynak notlar: fileciteturn0file0

---

## 1. Amaç

Fikir CSS, tek bir doğru kullanım biçimi dayatmayan; küçük projelerden büyük ürün ekiplerine kadar farklı ihtiyaçlara cevap verebilen bir frontend styling sistemi olarak tasarlanır.

Hedefler:

- Hızlı prototipleme
- Uzun ömürlü tasarım sistemi
- Yüksek erişilebilirlik standardı
- Düşük runtime maliyeti
- Utility ve semantic API’nin birlikte sunulması
- CSS-first kullanım ile TypeScript-aware entegrasyonun aynı sistemde bulunması

Bu framework’ün ana fikri şudur:

- İsteyen yalnızca utility class kullanır.
- İsteyen semantic component class’ları kullanır.
- İsteyen recipe tabanlı, type-safe API ile entegrasyon yapar.

---

## 2. Tasarım İlkeleri

### 2.1 Esneklik
Framework tek bir çalışma biçimi zorlamaz. Kullanıcı, proje ölçeğine ve ekip alışkanlığına göre farklı katmanlardan yararlanabilir.

### 2.2 Tutarlılık
Tüm spacing, radius, typography, color, shadow ve motion kararları merkezi token sistemi üzerinden akar.

### 2.3 Erişilebilirlik
A11y sonradan eklenen bir özellik değil, çekirdek tasarım ilkesidir.

### 2.4 Düşük Karmaşıklık
Güçlü ama kontrolsüz büyümeyen bir sistem hedeflenir. Söz dizimi kısa kalır; ancak anlamsal kullanım isteyenler için semantic soyutlamalar da bulunur.

### 2.5 Performans
Gereksiz CSS çıktısı, ağır runtime ve şişkin bundle yapıları önlenir.

### 2.6 Modern CSS Önceliği
Flexbox, Grid, container queries, CSS custom properties, cascade layers ve modern selector/state mekanizmaları birinci sınıf kabul edilir.

---

## 3. Ürün Vizyonu

Fikir CSS şu problemlere aynı anda çözüm üretir:

- Tailwind tarzı hızlı geliştirme ihtiyacı
- Bootstrap tarzı hazır bileşen ihtiyacı
- MUI/Chakra/Mantine tarzı tasarım sistemi ciddiyeti
- Panda CSS tarzı type-safe ve build-time üretim avantajı
- Headless UI yaklaşımına uygun state-aware stil modeli
- Kurumsal ölçek için sürdürülebilir tema ve varyant mimarisi

Bu yüzden Fikir CSS bir “sadece class framework’ü” değildir. Daha doğru tanım şudur:

**Bir tasarım sistemi çekirdeği + stil motoru + bileşen katmanı + ürün paterni kütüphanesi**

---

## 4. Mimari Genel Bakış

Fikir CSS tabandan tavana şu katmanlardan oluşur:

1. Design Tokens Core
2. Reset + Base Layer
3. Layout Engine
4. Utility Layer
5. State Variants Layer
6. Component Recipes
7. Semantic Components
8. Behavior-Aware Patterns
9. TypeScript Integration Layer
10. Tooling & DX Layer

Her katman birbirinden bağımsız kullanılabilir; ancak beraber kullanıldığında tam sistem ortaya çıkar.

---

## 5. Katman 1 — Design Tokens Core

Bu katman framework’ün temelidir.

### 5.1 Kapsam

Aşağıdaki tüm tasarım primitive’leri token olarak tanımlanır:

- Renkler
- Boşluklar
- Typography scale
- Border radius
- Border widths
- Shadows
- Z-index seviyeleri
- Opacity ölçekleri
- Motion süreleri
- Easing eğrileri
- Breakpoint’ler
- Container width değerleri

### 5.2 Token formatı

Tüm token’lar CSS custom properties olarak tanımlanır.

Örnek:

```css
:root {
  --space-1: 0.25rem;
  --space-2: 0.5rem;
  --radius-sm: 0.375rem;
  --radius-md: 0.625rem;
  --font-size-1: 0.875rem;
  --font-size-2: 1rem;
  --color-primary-500: oklch(62% 0.18 262);
  --shadow-md: 0 8px 24px rgb(0 0 0 / 0.12);
  --motion-fast: 120ms;
}
```

### 5.3 Token kategorileri

#### Core tokens
Raw değerlerdir. Doğrudan primitive tanımlar içerir.

#### Semantic tokens
UI anlamına göre isimlendirilir:

- `--color-bg-default`
- `--color-bg-surface`
- `--color-fg-default`
- `--color-fg-muted`
- `--color-border-subtle`
- `--color-border-strong`
- `--color-accent`
- `--color-danger`

Bu yapı sayesinde tema değişimi ucuz hale gelir.

### 5.4 Tema yaklaşımı

Temalar body class’ı zorunlu kılmadan token override mantığıyla uygulanabilir.

Desteklenecek modlar:

- Light
- Dark
- High contrast
- Brand themes
- Compact density
- Comfortable density
- Rounded mode
- Sharp mode
- Reduced motion mode

---

## 6. Katman 2 — Reset + Base Layer

Bu katman modern, hafif ve erişilebilir bir başlangıç zemini sağlar.

### 6.1 Amaç
Tarayıcı farklılıklarını makul ölçüde normalize etmek ve erişilebilir bir başlangıç hali oluşturmak.

### 6.2 İçerik

- Box sizing standardizasyonu
- Margin reset
- Medya elemanlarının responsive davranışı
- Form elemanlarının tutarlı başlangıç stili
- Heading ve metin hiyerarşisinin normalize edilmesi
- Focus-visible prensibiyle çalışan odak stilleri

### 6.3 İlke
Agresif reset yapılmaz. Geliştiricinin doğal HTML davranışıyla kavga etmeyen bir temel sunulur.

---

## 7. Katman 3 — Layout Engine

Bu katman framework’ün en kritik farklılaştırıcı alanlarından biridir.

Normal utility framework’ler sadece `display:flex` ve `grid-cols-*` verir. Fikir CSS ise doğrudan ürün kompozisyonları için layout soyutlamaları sunar.

### 7.1 Primitive layout abstractions

Başlangıçta şu kompozisyon sınıfları yer alır:

- `stack`
- `cluster`
- `center`
- `sidebar`
- `switcher`
- `grid`
- `container`
- `bleed`
- `cover`
- `frame`

### 7.2 Anlamları

#### `stack`
Dikey akış düzeni. Belirli aralıklarla öğeleri üst üste dizer.

#### `cluster`
Yatay ve wrap destekli grup düzeni. Buton grupları, tag listeleri gibi yapılar için.

#### `sidebar`
İki kolonlu ama uyarlanabilir düzen. Bir alan sabit, diğeri akışkan olabilir.

#### `switcher`
Kapsayıcı genişliğine göre öğeleri yan yana veya alt alta dizer.

#### `center`
Maksimum genişlik ve yatay ortalama için.

#### `bleed`
Bir öğenin kapsayıcı taşmasını kontrollü şekilde sağlar.

### 7.3 Örnek

```html
<div class="stack gap-4">
  <header class="cluster gap-2 justify-between">
    <h1>Dashboard</h1>
    <div class="cluster gap-2">
      <button class="btn btn-primary">Kaydet</button>
      <button class="btn btn-secondary">İptal</button>
    </div>
  </header>

  <main class="sidebar gap-6" data-sidebar="280">
    <aside>Filtreler</aside>
    <section>İçerik</section>
  </main>
</div>
```

---

## 8. Katman 4 — Utility Layer

Bu katman Tailwind benzeri hız sağlar; ancak token disiplinine sıkı bağlıdır.

### 8.1 Amaç
Sık tekrar eden stil ihtiyaçlarını kısa ve öngörülebilir class’larla çözmek.

### 8.2 Kapsam

- Spacing
- Typography
- Color
- Background
- Border
- Radius
- Shadow
- Display
- Flexbox
- Grid
- Position
- Overflow
- Sizing
- Visibility
- Effects
- Motion

### 8.3 Söz dizimi ilkeleri

- Kısa ama okunabilir olmalı
- Aynı şeyin 18 farklı alias’ı olmamalı
- Token dışına çıkmak istisna olmalı
- Responsive ve state varyantları doğal olmalı

### 8.4 Örnek utility’ler

```html
<div class="flex items-center gap-3 px-4 py-2 rounded-md bg-surface text-fg-default shadow-sm">
  <span class="text-sm font-medium">Etiket</span>
</div>
```

---

## 9. Katman 5 — State Variants Layer

Bu katman modern UI geliştirme için zorunludur.

Framework yalnızca `hover:` ve `focus:` gibi klasik varyantlarla sınırlı kalmaz.

### 9.1 Desteklenecek varyant tipleri

- Pseudo states  
  - `hover:`
  - `focus:`
  - `focus-visible:`
  - `active:`
  - `disabled:`
  - `checked:`

- ARIA states  
  - `aria-expanded:`
  - `aria-selected:`
  - `aria-invalid:`
  - `aria-checked:`

- Data states  
  - `data-open:`
  - `data-state-active:`
  - `data-placement-top:`

- Context states  
  - `dark:`
  - `contrast:`
  - `motion-safe:`
  - `motion-reduce:`

- Structure states  
  - `first:`
  - `last:`
  - `odd:`
  - `even:`

### 9.2 Örnek

```html
<button class="bg-primary-500 hover:bg-primary-600 aria-invalid:ring-danger data-open:shadow-lg">
  Action
</button>
```

### 9.3 İlke
State stilleri headless component sistemleriyle doğal biçimde uyumlu olmalıdır.

---

## 10. Cascade Layers (@layer) Stratejisi

Katman 4-6 arasında utility ve semantic class'ları aynı anda sunduğumuzda, CSS Specificity (Özgüllük) çatışmaları kaçınılmazdır. Fikir CSS bunu @layer mekanizmasıyla çözer.

### 10.1 Problem
Utility class'ları (`bg-red-500`) ve semantic class'ları (`.btn-primary`) aynı dokümanda kullanıldığında, hangisinin uygulanacağının garantisi yoktur.

```html
<!-- Hangisi kazanırsa kazansın, yanılabilir sonuçlar -->
<button class="btn-primary bg-red-500">
  Aksiyonu Bağla
</button>
```

### 10.2 Çözüm: @layer katmanları

Tüm stil dosyaları şu cascade layers içinde organize edilir:

```css
@layer reset, base, layouts, recipes, components, utilities;
```

Bu sırada tanımlanan katmanlar, sonrakiler (sağındakiler) eski katmanları ezer.

- **reset**: Tarayıcı normalize'ı
- **base**: Başlangıç stilleri
- **layouts**: Layout primitives
- **recipes**: Component recipe'leri
- **components**: Semantic component'ler
- **utilities**: Low-level utility class'ları

### 10.3 Pratik uygulaması

```css
/* tokens/core.css */
@layer reset, base, layouts, recipes, components, utilities;

/* reset/index.css */
@layer reset {
  * { box-sizing: border-box; }
  body { margin: 0; }
}

/* utilities/color.css */
@layer utilities {
  .bg-red-500 { background-color: var(--color-red-500); }
  .text-white { color: white; }
}

/* components/button.css */
@layer components {
  .btn-primary { 
    background-color: var(--color-primary-500);
    color: white;
    /* ... diğer stiller */
  }
}
```

### 10.4 Garantiler

Bu yapı sayesinde:
- Utility class'ları en üst katmanda yer aldığı için öngörülebilir biçimde baskın davranır
- Semantic component'ler baz sağlar ama override edilebilir
- Specificity savaşları sona erer
- İçe aktarımdan dışa doğru katmanlaşma açık olur

### 10.5 İstisna: `!important` (Escape Hatch)

Birincil çözüm iyi tasarlanmış `@layer` sırası olmalıdır. `!important`, framework'ün varsayılan önerisi değil; yalnızca zorlayıcı senaryolarda başvurulan bir escape hatch olarak düşünülmelidir (ör. üçüncü parti CSS'i kırmak).

```css
@layer utilities {
  /* Escape hatch: sınırlı kullanım */
  .u-force-mt-0 { margin-top: 0 !important; }
}
```

---

## 11. Katman 6 — Component Recipes

Bu katman utility kaosunu azaltmak için oluşturulur.

### 11.1 Amaç
Sık kullanılan class kombinasyonlarını anlamlı varyantlar halinde paketlemek.

### 11.2 Recipe mantığı

Bir recipe şu parametreleri içerebilir:

- variant
- size
- tone
- emphasis
- radius
- density
- state

### 11.3 Örnek API

```ts
button({
  variant: "solid",
  size: "lg",
  tone: "primary",
})
```

Bunun CSS/HTML karşılığı semantic bir class seti de üretebilir:

```html
<button class="btn btn-solid btn-lg btn-primary">Kaydet</button>
```

### 11.4 Kazançlar

- Tutarlılık
- Daha temiz markup
- Güçlü design system kontrolü
- Type-safe autocomplete
- Daha iyi dokümantasyon

### 11.5 Teknik Uygulama Örneği

Recipe API'nin backend'de nasıl çalıştığına dair bir taslak:

```typescript
// packages/recipes/button.ts
import { cva } from 'fikir-css-core';

export const button = cva('btn', {
  variants: {
    tone: {
      primary: 'bg-primary-500 text-white hover:bg-primary-600 focus-visible:ring-primary-300',
      danger: 'bg-danger-500 text-white hover:bg-danger-600 focus-visible:ring-danger-300',
      success: 'bg-success-500 text-white hover:bg-success-600 focus-visible:ring-success-300',
      neutral: 'bg-gray-200 text-gray-900 hover:bg-gray-300 focus-visible:ring-gray-400',
    },
    size: {
      xs: 'px-2 py-1 text-xs rounded-sm',
      sm: 'px-3 py-1.5 text-sm rounded-md',
      md: 'px-4 py-2 text-base rounded-md',
      lg: 'px-6 py-3 text-lg rounded-lg',
    },
    variant: {
      solid: 'border-none shadow-sm',
      outline: 'border-2 bg-transparent',
      ghost: 'border-none bg-transparent',
      link: 'border-none bg-transparent underline',
    },
    emphasis: {
      high: 'font-semibold',
      medium: 'font-medium',
      low: 'font-normal',
    },
  },
  defaultVariants: {
    tone: 'primary',
    size: 'md',
    variant: 'solid',
    emphasis: 'medium',
  },
  compoundVariants: [
    {
      variant: 'outline',
      tone: 'primary',
      className: 'border-primary-500 text-primary-600',
    },
  ],
});

// Kullanım
const MyButton = ({ label, isLoading }) => (
  <button 
    className={button({ tone: 'danger', size: 'sm', variant: 'solid' })}
    disabled={isLoading}
  >
    {label}
  </button>
);
```

Bu approach'ın avantajları:
- **Type-safe**: TypeScript otomatik tamamlama
- **Build-time**: CSS pre-computed, runtime yok
- **Composable**: Variant'ları dinamik kombinleyebilme
- **DX**: IDE support ve açık dokümantasyon

---

## 12. Katman 7 — Semantic Components

Bu katman hızlı kullanım isteyen ekipler için hazır gelir.

### 12.1 İlk sürüm bileşenleri

- Button
- Input
- Textarea
- Select
- Checkbox
- Radio
- Switch
- Card
- Badge
- Alert
- Modal
- Drawer
- Dropdown
- Popover
- Tooltip
- Tabs
- Accordion
- Table
- Pagination
- Navbar
- Sidebar
- Breadcrumb
- Toast
- Skeleton

### 12.2 Çift mod yaklaşımı

Her bileşen iki seviyede sunulur:

#### Styled
Kutudan çıkar çıkmaz kullanılabilir.

#### Unstyled / Headless
Davranış veya yapı korunur; görünüm geliştiriciye bırakılır.

### 12.3 Örnek button varyantları

- `btn-solid`
- `btn-soft`
- `btn-outline`
- `btn-ghost`
- `btn-link`

Ton örnekleri:

- `btn-primary`
- `btn-neutral`
- `btn-success`
- `btn-warning`
- `btn-danger`

Boyut örnekleri:

- `btn-xs`
- `btn-sm`
- `btn-md`
- `btn-lg`

---

## 13. Slot ve Kompozisyon Mimarisi

Semantik bileşenlere (card, modal, toolbar vb.) çoğu zaman kullanıcı içerik eklemek ister. Fikir CSS bu senaryoyu "slot pattern" ile çözer.

### 13.1 Problem
Card bileşenini ele alalım:

```html
<div class="card">
  <div class="card-header">Başlık</div>
  <div class="card-body">İçerik</div>
  <div class="card-footer">Alt bilgi</div>
</div>
```

Ancak kullanıcı card header'ına ekstra stil eklemek isterse (örneğin `bg-blue-500`), style çakışması riski vardır:

```html
<!-- Hangisinin stili uygulanır? -->
<div class="card-header bg-blue-500">Başlık</div>
```

### 13.2 Class Conflict Çözümü (String Seviyesi)

Fikir CSS, Tailwind'in `tailwind-merge` yaklaşımından ilham alarak class string düzeyinde conflict çözümü önerir:

```markdown
1. Class önceliğini tespit et
2. Çakışan property'leri belirle
3. Sonra YAML kurallarına göre merge et
```

Uygulamada:

```html
<!-- .card-header varsayılan bir arka plan rengine sahip -->
<div class="card-header bg-blue-500">Başlık</div>
<!-- Sonuç: bg-blue-500 kazanır (çünkü cascade layer'daki her property override edilebilir) -->
```

Not: Bu katman sadece class string conflict'ini çözer; slot API tasarımı ayrı bir problemdir.

### 13.3 Slot API Tasarımı

Bileşenin her bölümü "slot" adı verilen birer açık noktaya dönüştürülür:

```tsx
// Unstyled / Headless component
export const Card = ({
  children,
  headerProps = {},
  bodyProps = {},
  footerProps = {},
}) => (
  <div className="card">
    <div className="card-header" {...headerProps}>
      {children?.header}
    </div>
    <div className="card-body" {...bodyProps}>
      {children?.body}
    </div>
    <div className="card-footer" {...footerProps}>
      {children?.footer}
    </div>
  </div>
);

// Kullanım
<Card
  headerProps={{ className: 'bg-blue-500 text-white' }}
  bodyProps={{ className: 'p-6' }}
>
  // İçerik
</Card>
```

### 13.4 CSS Şablonu Yaklaşımı

Eğer CSS-only çözüm tercih edilirse:

```css
.card {
  display: flex;
  flex-direction: column;
}

.card[data-header-style] > .card-header {
  /* Override edilebilir alan */
}

/* Kullanıcı class'ları öncelikli olarak tanımlanır */
@layer utilities {
  /* User-provided classes burada */
}
```

### 13.5 İlke
- Slot'lar flexible kalmalı
- Override'lar doğal olmalı
- Default stiller başlangıç noktası (değişmez değil)
- Class conflict çözümü ile slot API sorumlulukları ayrıştırılmalı
- "Prop merging" pattern'i ile uyumlu olmalı

---

## 14. Katman 8 — Behavior-Aware Patterns

Bu Fikir CSS’in farklılaşacağı üst katmandır.

Birçok framework buton ve kart verir; fakat gerçek ürün paternlerini zayıf bırakır. Fikir CSS burada hazır iskeletler sunar.

### 14.1 Örnek pattern'ler

- Form layout
- Auth page shell
- Dashboard shell
- Settings panel
- Responsive sidebar app shell
- Command palette surface
- Data table wrapper
- Empty state
- Search/filter toolbar
- Split view editor shell

### 14.2 Amaç
Takımların “her projede sıfırdan aynı yapıyı kurma” yükünü azaltmak.

### 14.3 Örnek

```html
<div class="app-shell">
  <aside class="app-sidebar">...</aside>
  <div class="app-main">
    <header class="topbar">...</header>
    <section class="content-stack">...</section>
  </div>
</div>
```

---

## 15. Katman 9 — TypeScript Integration Layer

Bu katman modern React/Next.js/Vue ekosistemi için önemlidir.

### 15.1 İlke
Sistem CSS-first olmalıdır. Yani HTML class kullanımı tek başına yeterli olmalıdır. Ancak isteyen ekipler için type-safe entegrasyon da sağlanmalıdır.

### 15.2 Sağlanacak yetenekler

- Token autocomplete
- Variant autocomplete
- Recipe function API
- Build-time CSS generation
- Invalid token kullanımında uyarı
- Editor entegrasyonu

### 15.3 Server-Side Rendering (SSR) ve Next.js App Router Uyumluluğu

Katman 9'un çalışabilirliği modern Next.js ekosistemiyle güçlü uyumu hedefler.

#### 15.3.1 Problem

Dokümanda "low-runtime" denmiş, ancak mekanizma netleştirilmelidir. Eğer Recipe API (Katman 11) runtime'da CSS üretirse, Next.js App Router tarafında "use client" gereksinimi doğabilir. Bu da hedeflenen Server Components mimarisini zayıflatabilir.

#### 15.3.2 Önerilen Mimari: Build-Time Static Analysis

Panda CSS usulü yaklaşım:

- **Compile-time CSS Generation**: TypeScript/JSX kodu build sırasında taranır
- **CSS extraction**: Stil bilgileri mümkün olduğunca static CSS'e çıkarılır
- **Hedeflenen Engine Modu**: Runtime style injection'ı minimize eden (mümkünse sıfırlayan) çalışma biçimi

```typescript
// build-time tarafından
// Input:
const className = button({ tone: 'primary', size: 'lg' });

// Output (static CSS):
// .btn-f1a2b3 { background: var(--color-primary-500); ... }
// className = 'btn-f1a2b3'
```

#### 15.3.3 Hedeflenen Kazanımlar

- **Düşük Runtime Maliyeti**: CSS-in-JS injection yükü azaltılır
- **RSC Uyum Hedefi**: Server Components akışıyla çakışmayan bir model
- **Hızlı Runtime**: Önceden hesaplanmış class isimleri
- **Güçlü DX**: TypeScript desteği + build-time hataları

#### 15.3.4 İmplementasyon

```typescript
// fikir.config.js
export default {
  engine: 'static', // 'static' | 'runtime'
  buildTime: true,   // Build-time CSS generation
  cssOutput: 'dist/fikir.css',
  jsOutput: 'dist/fikir.js', // Sadece type definitions
}
```

#### 15.3.5 RSC Hedef Senaryosu

Static extraction modunda bu yapı, Fikir CSS bileşenlerinin Next.js App Router içinde server component olarak kullanılmasını hedefler:

```typescript
// app/page.tsx (Server Component)
import { button } from 'fikir-css/recipes';

export default function Page() {
  // Uygun koşullarda Recipe API kullanılabilir, 'use client' gerekmeyebilir
  const btnClass = button({ tone: 'primary' });
  return <button className={btnClass}>Kaydet</button>;
}
```

### 15.4 Hedef
Aynı sistem hem şu geliştiriciye hitap eder:

```html
<div class="card card-elevated p-4 rounded-lg"></div>
```

Hem de şu geliştiriciye:

```ts
const className = card({
  elevation: "md",
  radius: "lg",
  padding: "4",
})
```

---

## 16. Katman 10 — Tooling & DX

Başarılı bir framework sadece stil sunmaz; güçlü geliştirme ergonomisi de sağlar.

### 16.1 Hedef araçlar

- IDE autocomplete
- Class intelligence
- Token linting
- Variant inspection
- Unused recipe detection
- CSS output analyzer
- “Why is this style not applied?” debug aracı
- Figma token import/export
- Design token diff araçları

### 16.2 DX öncelikleri

- İlk kurulum kolaylığı
- Düşük bilişsel yük
- Dokümantasyon zenginliği
- Örneklerin gerçek ürün senaryolarına yakın olması

---

## 17. Theming Sistemi

### 17.1 Katmanlı tema yapısı

1. Core tokens
2. Semantic tokens
3. Brand overrides
4. Contextual overrides
5. User preference overrides

### 17.2 Modlar

- Light / Dark
- High contrast
- Reduced motion
- Compact / Comfortable
- Brand-specific palettes
- Rounded / Sharp surfaces

### 17.3 Örnek

```css
[data-theme="dark"] {
  --color-bg-default: oklch(18% 0.01 260);
  --color-bg-surface: oklch(22% 0.01 260);
  --color-fg-default: oklch(96% 0.01 260);
  --color-border-subtle: oklch(32% 0.01 260);
}
```

---

## 18. Responsive Sistem

### 18.1 Breakpoint'ler
Klasik ekran tabanlı breakpoint sistemi desteklenir.

Örnek:

- `sm:`
- `md:`
- `lg:`
- `xl:`

### 18.2 Container queries
Modern responsive yaklaşımın merkezine alınır.

Amaç:
Bir bileşenin sadece viewport’a değil, bulunduğu kapsayıcıya göre davranabilmesi.

Örnek kullanım düşüncesi:

- `@container card (min-width: 32rem)`
- `cq-md:grid`
- `cq-lg:items-center`

### 18.3 İlke
Yeni nesil komponentler viewport yerine mümkün olduğunda container-aware davranmalıdır.

---

## 19. Motion Sistemi

### 19.1 Yaklaşım
Gösterişli ama ağır animasyonlar yerine ürün odaklı, kısa ve kontrollü motion primitive’leri sağlanır.

### 19.2 Motion utility'leri

- `animate-in`
- `animate-out`
- `fade-in`
- `fade-out`
- `slide-up`
- `slide-down`
- `scale-in`
- `scale-out`

### 19.3 Erişilebilirlik
`prefers-reduced-motion` ile otomatik uyum şarttır.

---

## 20. Erişilebilirlik İlkeleri

Bu alan çekirdek tasarım kararlarından biridir.

### 20.1 Standartlar

- Yeterli kontrast
- Klavye ile tam erişim
- Focus-visible standardı
- Hata durumlarının semantik sunumu
- ARIA state’leri ile uyumlu stiller
- Reduced motion desteği
- Form yardım/hata metinlerinin standardizasyonu

### 20.2 Bileşen seviyesinde beklentiler

- Button ve link ayrımı net olmalı
- Modal focus trap ile uyumlu olmalı
- Tooltip tek bilgi kaynağı olmamalı
- Input error state’leri görsel ve semantik olarak birlikte sunulmalı

---

## 21. Performans Modeli

### 21.1 Hedefler

- Küçük CSS çıktısı
- Tree-shakable utility sistemi
- Component-level parçalı yükleme
- Minimum runtime style injection
- Build-time optimize edilmiş token/recipe üretimi

### 21.2 Kaçınılacak şeyler

- Monolitik dev CSS bundle
- Aşırı runtime bağımlılığı
- Kontrolsüz class çoğalması
- Aynı stilin birden çok isimle tekrarı

---

## 22. Söz Dizimi Yaklaşımı

Bu framework’ün en önemli denge noktası budur.

### 22.1 Neden hibrit model?
Salt utility model bazı ekiplerde çok hızlıdır, ancak HTML’i kalabalıklaştırabilir. Salt semantic model ise bazen çok katı kalır.

### 22.2 Çözüm
İki dünyanın birlikte çalıştığı model:

- Utility class’lar mevcut kalır
- Sık kombinasyonlar recipe class olarak çıkar
- Hazır semantic component class’ları sunulur
- İsteyen headless kullanım yapar

### 22.3 Örnek

```html
<button class="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-primary-500 text-white shadow-sm hover:bg-primary-600">
  Kaydet
</button>
```

veya

```html
<button class="btn btn-primary btn-md">Kaydet</button>
```

veya

```ts
button({ tone: "primary", size: "md", variant: "solid" })
```

Hepsi aynı tasarım sistemiyle beslenir.

---

## 23. Framework'lerden Alınan Güçlü Yanlar ve Karşılaştırma

### Tailwind’den
- Hız
- Utility-first yaklaşım
- Varyant sistemi
- Düşük seviyede yüksek kontrol

### Bootstrap’ten
- Hızlı başlangıç
- Net dokümantasyon
- Hazır bileşen disiplini

### MUI’den
- Kurumsal ölçek düşüncesi
- Güçlü component API
- Tasarım sistemi ciddiyeti

### Chakra UI’dan
- Erişilebilirlik odağı
- Geliştirici dostu component ergonomisi

### Bulma’dan
- Sadelik
- Okunabilir class isimleri

### Mantine / Panda CSS çizgisinden
- Theme esnekliği
- Type-safe modern yapı
- Güçlü stil motoru yaklaşımı

### 23.1 Karşılaştırma Tablosu

| Özellik | Tailwind CSS | MUI / Mantine | Fikir CSS |
|---------|--------------|---------------|----------|
| **Geliştirme Hızı** | Çok Yüksek | Orta (Özelleştirme yavaşlatır) | Çok Yüksek |
| **Öğrenme Eğrisi** | Düşük | Orta | Düşük-Orta (Hibrit yapıya bağlı) |
| **HTML Temizliği** | Kirli (Class hell) | Temiz | Seçime Bağlı (Temizlenebilir) |
| **Layout Zekası** | Sadece Low-level Flex/Grid | Hazır Grid/Box | Semantic Layout Primitives (Stack, Sidebar, vb.) |
| **Type-Safety** | Pluginler ile | Dahili | Dahili (Recipe API + Build-time) |
| **Component Hazırlığı** | Minimal | Tam teşekküllü | Seçilebilir (Styled + Headless) |
| **Tema Sistemi** | Temel | Güçlü | Güçlü (Multi-modal) |
| **Erişilebilirlik** | Sorumlu (Kullanıcı) | Çekirdek | Çekirdek + Bileşen düzeyinde |
| **Build-time CSS** | Evet | Parça parça | Evet (Panda benzeri) |
| **Server Components** | Destekli | Sınırlı | Hedeflenen destek (statik engine modunda) |
| **Customization** | Sınırlı ve kompleks | Geniş | Katmanlı özelleştirme |
| **CSS Specificity** | Cascade Layers ile | Styled-Components | Öngörülebilir (`@layer` ile) |

---

## 24. Örnek Dizin Yapısı

```text
Fikir-css/
├─ packages/
│  ├─ tokens/
│  │  ├─ core.css
│  │  ├─ semantic.css
│  │  ├─ themes/
│  │  │  ├─ light.css
│  │  │  ├─ dark.css
│  │  │  └─ high-contrast.css
│  ├─ reset/
│  │  └─ index.css
│  ├─ layouts/
│  │  ├─ stack.css
│  │  ├─ cluster.css
│  │  ├─ sidebar.css
│  │  └─ switcher.css
│  ├─ utilities/
│  │  ├─ spacing.css
│  │  ├─ typography.css
│  │  ├─ color.css
│  │  ├─ effects.css
│  │  └─ motion.css
│  ├─ recipes/
│  │  ├─ button.ts
│  │  ├─ card.ts
│  │  └─ input.ts
│  ├─ components/
│  │  ├─ button.css
│  │  ├─ card.css
│  │  ├─ input.css
│  │  ├─ modal.css
│  │  └─ table.css
│  ├─ patterns/
│  │  ├─ app-shell.css
│  │  ├─ auth-layout.css
│  │  ├─ settings-panel.css
│  │  └─ data-table-shell.css
│  ├─ tooling/
│  │  ├─ lint/
│  │  ├─ vscode-extension/
│  │  └─ debug-tools/
│  └─ docs/
│     └─ content/
├─ apps/
│  ├─ docs-site/
│  └─ playground/
└─ package.json
```

---

## 25. İlk Versiyon İçin Yol Haritası

### 25.1 v0.1 — Foundation
- Token sistemi
- Reset + base
- Temel utility’ler
- Layout primitives
- Light/dark tema
- Basit docs sitesi

### 25.2 v0.2 — Core Product Layer
- Button, input, card, badge, alert
- State variants
- Basic recipe API
- VS Code autocomplete prototipi

### 25.3 v0.3 — App Shells
- Sidebar shell
- Dashboard shell
- Auth page shell
- Modal, dropdown, tabs

### 25.4 v0.4 — Type-safe Engine
- TS recipe inference
- Token linting
- Build-time optimization
- Tree-shaking altyapısı

### 25.5 v1.0 — Production Ready
- Geniş component seti
- Pattern library
- Theme packs
- Container query desteği
- Debugging araçları
- Figma token entegrasyonu

---

## 26. Kullanım Senaryoları

### 26.1 Küçük proje
Geliştirici çoğunlukla utility class’ları kullanır, birkaç semantic component ile hız kazanır.

### 26.2 Ürün ekibi
Recipe API ve semantic tokens üzerinden kurumsal bir design system oluşturur.

### 26.3 UI kit geliştiricisi
Headless bileşenler + state variants + recipe sistemi ile markaya özel arayüz katmanı kurar.

### 26.4 SaaS dashboard
App shell, form layout, table wrapper ve theme altyapısını birlikte kullanır.

---

## 27. Riskler ve Tasarım Gerilimleri

Bu framework’ün en zor tarafı teknik uygulanabilirlik değil, denge yönetimidir.

### 27.1 Olası riskler ve Çözümler

- Çok fazla soyutlama ile karmaşıklık artışı
- Utility ve semantic API’nin çakışması
- Çok modlu sistemin öğrenme eğrisini artırması
- Fazla özellik nedeniyle bundle/disiplin bozulması

#### Tuzak 1: "Config Fatigue" (Konfigürasyon Yorgunluğu)

**Sorun**: Kullanıcı token tanımlamaktan projeye başlayamaz hale gelebilir.

**Çözüm**: "Sensible Defaults" (Mantıklı Varsayılanlar) ile dolu bir preset sunulmalı. Kullanıcı sadece `fikir.config.js` içinde `theme: { extend: ... }` yapmalı.

```javascript
// fikir.config.js (minimal başlangıç)
export default {
  theme: {
    extend: {
      colors: {
        brand: '#your-color',
      },
    },
  },
};
```

#### Tuzak 2: Specificity War

**Sorun**: `.btn-primary` sınıfı ile `.bg-red-500` aynı anda kullanıldığında hangisi kazanacak?

**Çözüm**: Birincil çözüm, Cascade Layers (`@layer`) yaklaşımıdır (Bölüm 10). Utility class'larına otomatik `!important` eklemek varsayılan olmamalı; yalnızca escape hatch olarak opsiyonel kalmalıdır.

```css
@layer utilities {
  /* Escape hatch örneği: sınırlı ve bilinçli kullanım */
  .u-force-bg-red-500 { background-color: red !important; }
}
```

### 27.2 Kontrol prensipleri

- Basit varsayılanlar
- İleri kullanımın kademeli açılması
- Net dokümantasyon
- Güçlü lint kuralları
- Her katmanın kendi sınırlarının açık tanımlanması

---

## 28. MVP Kapsamı Önerisi

İlk çalışan sürüm için aşağıdaki kapsam yeterlidir:

- Core + semantic tokens
- Reset + base
- Spacing / typography / color / layout utility’leri
- `stack`, `cluster`, `sidebar`, `center`, `switcher`
- `btn`, `card`, `input`, `badge`, `alert`
- Light/dark mode
- Hover/focus/disabled/aria-invalid/data-open varyantları
- Basit recipe API
- Playground + docs

Bu kapsam, framework’ün karakterini kanıtlamak için yeterlidir.

---

## 29. Kısa Konumlandırma Cümlesi

**Fikir CSS, utility hızını, semantic bileşen ergonomisini ve token-driven tasarım sistemi disiplinini tek bir modern frontend katmanında birleştiren hibrit bir CSS framework yaklaşımıdır.**

---

## 30. Sonuç

Fikir CSS’in özü şudur:

- Hızlı başlar
- Kurumsal ölçekte büyür
- Tek yaklaşım dayatmaz
- Modern CSS’i merkez alır
- Erişilebilirlikten ödün vermez
- Type-safe entegrasyonu destekler
- Tasarım sistemi ile ürün geliştirme arasında köprü kurar

Bu belge, framework’ün 1.0 öncesi konsept mimarisi için temel referans olarak kullanılabilir.

---

## 31. Bir Sonraki Dokümanlar

Bu belgenin üzerine inşa edilebilecek mantıklı devam dokümanları:

1. Naming Convention Spec
2. Token Dictionary Spec
3. Button / Input / Card Component RFC
4. Recipe API Draft
5. Theme Architecture Spec
6. App Shell Patterns Spec
7. CLI & Build Pipeline Spec
8. Docs IA ve içerik planı

### 31.1 Naming Convention Spec için Önerilen Kapsam

`btn-primary` (semantic) ve `bg-primary-500` (utility) gibi benzer adların büyük ekiplerde zihinsel model karışıklığı üretme riski özellikle ele alınmalıdır.

Bu bölümde en az şu kararlar netleştirilmelidir:

- Katman bazlı ad ayrımı: utility, semantic component, recipe ve state adlarının ayrı ad alanlarında tanımlanması
- Opsiyonel utility prefix modu: `u-bg-primary-500`, `u-mt-4` gibi kullanımların konfigürasyonla açılıp kapanması
- Semantic component belirteci: `comp-button`, `comp-card` veya mevcut `btn/card` çizgisinin korunacağı net tercih
- Takım ölçeğine göre öneri: küçük projede prefixsiz sade mod, büyük ekipte prefixli güvenli mod
- Geçiş stratejisi: prefix açıldığında otomatik codemod/lint uyarıları ile kırılmadan migrasyon
