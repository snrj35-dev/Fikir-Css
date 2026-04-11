# Fikir CSS — Product Supremacy Plan (v1.0 Track)

> Last reviewed: 2026-04-11
> Replaces: `docs/archive/plan-2026-04-11-v0.4-released.md`

## 1. Purpose
Bu planın amacı v0.4 release-candidate seviyesinden, rakipleri geçen tam ürün seviyesine çıkmaktır.

Ana hedef:
- Ürün kalitesi puanı: `9.9/10`
- Çıkış noktası: contract-driven foundation
- Varış noktası: production-grade design system platform

## 2. North Star and Scoring Model
`9.9/10` hedefi aşağıdaki ağırlıklı modelle ölçülür:

1. Surface depth and completeness (`20%`)
- Geniş component seti + workflow-level composability

2. Accessibility and quality trust (`20%`)
- Keyboard, semantic, contrast, screen-reader beklentileri

3. Runtime and bundle performance (`15%`)
- Raw/gzip bütçe, stable parsing footprint, low runtime overhead

4. DX and tooling excellence (`20%`)
- Type-safe recipes, conflict resolution, migration safety, deterministic build

5. Documentation and adoption readiness (`15%`)
- Onboarding clarity, examples, support-level transparency

6. Governance and release discipline (`10%`)
- Milestone hygiene, evidence-based promotions, predictable release flow

Exit condition:
- Ağırlıklı ortalama `>= 9.9`
- En az iki ardışık release candidate turunda korunmuş skor

## 3. Competitor-Surpass Definition
Rakipleri “geçmek” sadece özellik sayısı değil, bütünsel deneyim üstünlüğü olarak tanımlanır.

1. Tailwind class-speed + utility ergonomics
- Hedef: utility hızını korurken semantic/headless/product-pattern katmanlarını aynı sistemde sunmak

2. Bootstrap ready-component convenience
- Hedef: temel bileşenleri hızlı kullanılabilir şekilde sunarken a11y ve theme kontrolünden ödün vermemek

3. MUI/Chakra/Mantine design-system maturity
- Hedef: token yönetişimi, support-level modeli, migration ve release disipliniyle enterprise güveni

4. Panda build-time + type-safe yaklaşımı
- Hedef: runtime maliyetini düşük tutarak type-aware recipe sözleşmelerini standartlaştırmak

5. Headless/Radix state-aware kalite
- Hedef: interaction/accessibility davranışlarını styled + headless birlikte sürdürülebilir hale getirmek

## 4. Strategic Product Pillars

### Pillar A — Foundation Engine 2.0
Hedef:
- Token sistemi, naming contract, manifest pipeline ve selector governance’i uzun vadeli ürün çekirdeği haline getirmek.

Çıktılar:
- token lifecycle policy
- contract compatibility matrix
- strict alias deprecation protocol

### Pillar B — Complete Component System
Hedef:
- Desteklenen yüzeyi, gerçek ürün ekiplerinin günlük ihtiyaçlarını tek repo içinde karşılayacak seviyeye çıkarmak.

Çıktılar:
- parity-level component coverage
- supported vs experimental net ayrımı
- workflow-complete examples

### Pillar C — Dual API (Utility + Semantic + Headless)
Hedef:
- Utility-first, semantic-first ve headless-first kullanım biçimlerini aynı doğruluk modeline bağlamak.

Çıktılar:
- variant/state contracts
- composable headless guidance
- class conflict resolution strategy

### Pillar D — Theme and Brand Scalability
Hedef:
- Light/dark ötesinde enterprise tema varyasyonlarını güvenle taşıyabilmek.

Çıktılar:
- theme packs
- density/motion/contrast modes
- brand override governance

### Pillar E — Quality Automation at Scale
Hedef:
- Release öncesi kritik regresyonları mümkün olan en erken adımda yakalamak.

Çıktılar:
- expanded a11y CI
- deterministic visual baselines + diff strategy
- release quality scorecard

### Pillar F — Adoption and Ecosystem Readiness
Hedef:
- Harici ekiplerin onboarding süresini azaltmak ve entegrasyon güvenini yükseltmek.

Çıktılar:
- docs IA refinement
- starter kits + adapter guidance
- feedback-to-roadmap closed loop

## 5. Milestone Framework

### Milestone M1 — Product Core Lift
Hedef skor: `>= 9.0`

Must include:
- v0.4 sonrası support matrix genişletme turu
- component promotion evidence standardization
- release and governance workflow stabilization

### Milestone M2 — Competitive Parity+
Hedef skor: `>= 9.4`

Must include:
- high-value missing surfaces completion
- headless/styled parity guidance
- stronger visual + a11y automation

### Milestone M3 — Surpass Layer
Hedef skor: `>= 9.7`

Must include:
- enterprise workflow bundles
- advanced theming and integration model
- benchmark-backed comparative wins

### Milestone M4 — v1.0 Product Confidence
Hedef skor: `>= 9.9`

Must include:
- final support-level freeze
- migration certainty and compatibility guarantees
- publishable product-grade docs + governance package

## 6. Guardrails
- No promotion without explicit evidence bundle.
- No release without `npm run test:ci` and release checklist pass.
- No performance claim without measured raw + gzip data.
- No API expansion without contract-key and migration impact review.
- No docs claim without runnable playground/reference evidence.

## 7. Success Criteria
Bu plan başarılı sayılırsa:
- Fikir CSS, utility + semantic + headless katmanlarını tek sistemde güvenle sunar.
- Supported surface, rakip karşılaştırmalarında kritik kullanım senaryolarını kapsar.
- CI/release süreçleri regressions yakalayan güvenilir kalite ağına dönüşür.
- Harici feedback düzenli toplanır ve roadmap issue’larına geri beslenir.
- Ürün puanı en az iki ardışık turda `9.9/10` seviyesine ulaşır.
