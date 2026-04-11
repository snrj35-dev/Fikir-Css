# Token Dictionary Spec (v0.2 Foundation)

## 1. Amaç ve kapsam
Bu doküman, Fikir CSS v0.2 foundation için token sözlüğünün normatif referansıdır.

Kapsam:
- token kategorileri
- adlandırma grammar'i
- namespace kuralları
- semantic/core ayrımı
- tema override modeli
- katmanların token tüketim kuralları

Bu doküman yeni token ailesi veya yeni mimari katman tanımlamaz. Mevcut v0.2 davranışını standartlaştırır.

İlgili dokümanlar:
- `docs/contracts/naming-contract.md`
- `docs/contracts/naming-convention-spec.md`
- `docs/contracts/recipe-contract.md`

## 2. Token sistemi neden gerekli
Token sistemi aşağıdaki nedenlerle zorunludur:
- Değerlerin tekrarını azaltır.
- Katmanlar arası (utility/component/recipe) görsel tutarlılık sağlar.
- Tema override akışını tek noktadan yönetir.
- Değer değişimini sınıf API'sini bozmadan yapmayı mümkün kılar.

Token kullanılmadığında aynı değerler farklı dosyalarda dağılır ve migration maliyeti artar.

## 3. Token kategorileri

### 3.1 Core tokens
Core token'lar ham tasarım ölçeğini taşır.

Örnek:
- `--space-*`
- `--font-size-*`
- `--radius-*`
- `--shadow-*`
- `--color-primary-*`, `--color-gray-*`, `--color-danger-*`
- `--container-*`

Kaynak: `packages/tokens/core.css`.

### 3.2 Semantic tokens
Semantic token'lar kullanım niyetini temsil eder.

Örnek:
- `--color-bg-default`
- `--color-bg-surface`
- `--color-fg-default`
- `--color-fg-muted`
- `--color-border-subtle`
- `--color-accent`
- `--color-danger`

Kaynak: `packages/tokens/semantic.css`.

### 3.3 Contextual / theme overrides
Tema override'ları semantic token değerlerini bağlama göre değiştirir.

v0.2:
- light: `:root, [data-theme="light"]` üzerinden semantic token tanımı
- dark: `[data-theme="dark"]` üzerinden semantic token override

Kaynaklar:
- `packages/tokens/semantic.css`
- `packages/tokens/themes/dark.css`

## 4. Token naming grammar
Normatif grammar:
- Token adı must start with `--`.
- Token adı must use kebab-case.
- Genel form: `--{domain}-{name}-{scale?}`

Geçerli örnekler:
- `--space-4`
- `--font-size-sm`
- `--radius-md`
- `--color-primary-500`
- `--color-bg-default`
- `--container-md`

Geçersiz örnekler:
- `--Space-4`
- `--colorBgDefault`
- `--buttonPrimary`

## 5. Token namespace kuralları
Namespace kuralları:
1. `--color-*` yalnızca renk ailesi için kullanılmalıdır.
2. `--space-*` yalnızca spacing ölçeği için kullanılmalıdır.
3. `--font-size-*` yalnızca tipografi boyutu için kullanılmalıdır.
4. `--radius-*` yalnızca radius değerleri için kullanılmalıdır.
5. `--shadow-*` yalnızca gölge değerleri için kullanılmalıdır.
6. `--container-*` yalnızca layout container boyutları için kullanılmalıdır.

Semantic namespace kuralı:
- Semantic token adları should encode intent, raw pigment değil.
- Örnek: `--color-fg-default` doğru, `--color-gray-900-semantic` yanlış.

## 6. Desteklenen token aileleri
Durum sınıflandırması v0.2 için aşağıdaki gibidir.

Active (v0.2 sözlükte var):
- color
- space
- radius
- shadow
- typography (font-size)
- sizing/container

Defined as consumer property, token family olarak ayrı ölçek yok:
- border

Not yet defined in v0.2 token dictionary:
- motion
- z-index

Kural:
- `motion` ve `z-index` için yeni tokenlar bu aşamada otomatik eklenmemelidir.
- İhtiyaç oluşursa önce bu spec'e eklenmeli, sonra token sözlüğüne alınmalıdır.

## 7. Core token vs semantic token ayrımı
Temel kural:
- Core token = ham değer ölçeği.
- Semantic token = UI rolü/niyeti.

Kullanım kuralı:
- Component, recipe ve base layer should prefer semantic tokens.
- Utility layer may use semantic veya core token; ancak public utility davranışıyla uyumlu olmalıdır.

Renk özel kuralı:
- Raw/core color (`--color-primary-500`, `--color-gray-900`) doğrudan kullanım only if utility seviyesinde açık ton çağrısı gerekiyorsa kullanılabilir.
- Component/recipe içinde foreground/background/border anlamı varsa semantic token must be preferred.

## 8. Tema modeli

### 8.1 `:root`
`:root` global baseline token değerlerini taşır.
- Core ölçek burada tanımlanır.
- Light semantic baseline da v0.2'de burada bulunur.

### 8.2 light
v0.2 light tema semantic değerleri `:root, [data-theme="light"]` altında aynı blokta tutulur.

Kural:
- Aynı semantic değeri farklı dosyalarda duplicate etmeyin.

### 8.3 dark
Dark tema semantic token override'ları yalnızca `[data-theme="dark"]` altında yapılmalıdır.

Kural:
- Dark override core tokenları yeniden tanımlamamalıdır.
- Dark override semantic token yüzeyini hedeflemelidir.

### 8.4 future theme packs
Gelecek tema paketleri için model:
- Yeni tema semantic override şeklinde eklenmelidir (`[data-theme="x"]`).
- Core ölçek tema başına kopyalanmamalıdır.

## 9. Token override kuralları
Override kural seti:
1. Core token override only if scale-level değişim zorunluysa yapılmalıdır.
2. Tema değişimi için öncelik semantic token override olmalıdır.
3. Component dosyasında local token shadowing (aynı isimli geçici yeniden tanım) should not be used.
4. Utility/component/recipe katmanları token değerini değil token referansını tüketmelidir.
5. `!important` ile token override yalnızca escape-hatch durumunda kullanılmalıdır.

## 10. Hangi şey token olmalı, hangi şey olmamalı
Token olmalı:
- Tekrar eden değerler
- Tema ile değişmesi beklenen değerler
- Ölçek mantığı olan değerler (space, radius, size)

Token olmamalı:
- Tek kullanım için yazılmış, tekrar etmeyen rastgele değer
- Yalnızca tek component'e özel ve dışarı açılmayan değer
- Variant adıyla birebir aynı olan ve abstraction kazandırmayan değer

Yeni semantic token açma kuralı:
- Yeni semantic token must be opened when aynı UI niyeti en az iki bağımsız tüketicide tekrar ediyorsa veya tema bazlı override gerektiriyorsa.
- Tek bir component'e özgü ve tekrar etmeyen ihtiyaç için semantic token açılmamalıdır.

Token şişmesini önleme prensibi:
- Önce mevcut semantic token aranmalı.
- Yoksa mevcut core + mevcut semantic bağ ile çözülebiliyor mu kontrol edilmeli.
- Yalnızca çözülmüyorsa yeni semantic token eklenmelidir.

## 11. Örnek token sözlüğü
v0.2'de mevcut örnek sözlük (kısaltılmış):

Core:
- `--space-0`, `--space-1`, `--space-2`, `--space-3`, `--space-4`, `--space-6`
- `--font-size-xs`, `--font-size-sm`, `--font-size-md`, `--font-size-lg`
- `--radius-sm`, `--radius-md`, `--radius-lg`
- `--shadow-sm`, `--shadow-md`
- `--color-primary-500`, `--color-primary-600`, `--color-danger-500`
- `--color-gray-50`, `--color-gray-100`, `--color-gray-300`, `--color-gray-700`, `--color-gray-900`
- `--container-md`

Semantic:
- `--color-bg-default`
- `--color-bg-surface`
- `--color-fg-default`
- `--color-fg-muted`
- `--color-border-subtle`
- `--color-accent`
- `--color-danger`

## 12. Kullanım örnekleri

### 12.1 Utility layer
Örnek (`packages/utilities/color.css`):
- `background: var(--color-primary-500);`
- `background: var(--color-bg-surface);`
- `color: var(--color-fg-default);`

Kural:
- Utility doğası gereği hem core hem semantic tüketime izinlidir.

### 12.2 Component layer
Örnek (`packages/components/input.css`):
- `border: 1px solid var(--color-border-subtle);`
- `background: var(--color-bg-surface);`
- `color: var(--color-fg-default);`

Kural:
- Component layer semantic tokenları öncelikli tüketmelidir.

### 12.3 Recipe layer
Örnek (`packages/recipes/index.css`):
- `background: var(--color-bg-surface);`
- `border-color: var(--color-border-subtle);`
- `padding: var(--space-4);`

Kural:
- Recipe çıktısı semantic + scale token kullanımına bağlı kalmalı, hardcoded pigment değerlerini minimize etmelidir.

## 13. Yasak / kaçınılacak token pattern'leri
Aşağıdakiler must not be used:
- Aynı anlam için çoğaltılmış semantic tokenlar (`--color-text-default`, `--color-fg-default` birlikte)
- Domain dışı isimler (`--spacing-4` varken `--space-4`)
- Component adı taşıyan tokenlar (`--button-primary-bg`)
- Tema dosyasında core ölçeğin yeniden kopyalanması

Kaçınılması gerekenler:
- Semantic tokenı atlayıp component içinde sürekli raw/core renk kullanımı
- Geçici değerleri tokenlaştırarak sözlüğü şişirmek

## 14. Migration ve versioning notları
Versioning kuralları:
- Token rename breaking change olarak ele alınmalıdır.
- Semantic tokenın anlam değişimi de breaking kabul edilmelidir.
- Yeni token eklemek non-breaking olabilir; ancak mevcut tokenın yerine geçiyorsa migration notu gereklidir.

Migration akışı:
1. Değişiklik önce token sözlüğünde belgelenmelidir.
2. Etkilenen utility/component/recipe tüketimleri güncellenmelidir.
3. Tema override dosyaları semantic yüzey açısından kontrol edilmelidir.
4. Release notunda token migration notu yayınlanmalıdır.

## 15. Açık kararlar / future improvements
Open question 1:
- `border` için ayrı bir core token ailesi (`--border-width-*`, `--border-style-*`) gerekli mi?

Open question 2:
- Typography için line-height/letter-spacing tokenları v0.3'te sözlüğe alınmalı mı?

Open question 3:
- `motion` token ailesi eklenecekse minimum set ne olmalı (`duration`, `easing`)?

Open question 4:
- `z-index` ailesi eklenecekse katman isimleri hangi semantic modelle tanımlanmalı?

Open question 5:
- Token dictionary için otomatik lint/validation kapsamı hangi aşamada zorunlu hale getirilmeli?
