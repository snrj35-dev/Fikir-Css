# Core Accessibility Expectations (M1)

## Amaç
Bu belge, desteklenen core surface için erişilebilirlik beklentilerini tek tabloda toplar ve ürün-ready kullanım sınırını netleştirir.

Kapsam:
- `button`
- `input`
- `card`
- `field` / `label` / `helper-text` / `error-text`
- `badge`
- `alert`

## Core Surface A11y Expectation Table

| Surface | Semantic beklenti | State beklentisi | Minimum doğrulama |
| --- | --- | --- | --- |
| `button` | Native `<button>` kullanılmalı | Disabled yalnızca HTML `disabled` ile temsil edilmeli | Klavye ile tetiklenebilir, disabled durumda fokus/etkileşim beklenmez |
| `input` | Native `<input>` kullanılmalı | Invalid için `aria-invalid="true"`, readonly ve disabled ayrı semantik kalmalı | Label ilişkisi kurulmalı, invalid mesajı `error-text` ile bağlanmalı |
| `card` | Varsayılan non-interactive yüzey | Clickable davranış gerekiyorsa iç aksiyon öğesi (`button`/`a`) kullanılmalı | Sadece görsel container olarak semantic bilgi taşımamalı |
| `field` kompozisyonu | `label` + kontrol + yardımcı metin ilişkisi açık olmalı | Wrapper state (`data-field-invalid`, `data-field-disabled`) semantic state ile çelişmemeli | `label[for]` ve kontrol `id` eşleşmeli |
| `badge` | Bilgilendirici metin olarak okunabilir olmalı | Yalnız renkle anlam taşımamalı | Kontrast ve metin okunabilirliği korunmalı |
| `alert` | Duruma göre uygun live-region (`role="status"`/`role="alert"`) seçilmeli | Durum tonu (info/success/warning/danger) metinle de desteklenmeli | Ekran okuyucuya anlamlı metin aktarılmalı |

## Button vs Link Semantics

Kural:
- Aynı sayfa içinde bir eylem tetikleniyorsa `button` kullanılmalı.
- Navigasyon (route/page geçişi) için `a`/`link` kullanılmalı.

Doğru örnekler:
- `button`: modal aç/kapat, form submit, tablo filtre temizleme.
- `link`: başka sayfaya gitme, doküman/harici kaynak açma.

Yanlış kullanım:
- Sayfa geçişini `button` ile yapmak.
- Aksiyon tetikleyen öğeyi sadece `a href="#"` ile modellemek.

Not:
- `link` üzerinde devre dışı benzeri durum için `aria-disabled="true"` kullanılabilir; bu durumda etkileşim davranışı uygulama tarafında kapatılmalıdır.

## Component Accessibility Checklist (M1)

Her core component release öncesi en az aşağıdakileri sağlamalı:

1. Semantic HTML doğru mu? (`button`, `input`, `label`, `a`, vb.)
2. Disabled/readonly/invalid state'leri class ile değil semantic attribute ile temsil ediliyor mu?
3. Sadece renkle anlam taşıyan bir durum var mı?
4. Klavye ile temel akış tamamlanabiliyor mu? (`Tab`, `Shift+Tab`, `Enter`, `Space`)
5. Yardımcı/hata metni ilişkisi (`helper-text`/`error-text`) kullanıcıya açık mı?
6. Icon-only kullanımda erişilebilir isim (`aria-label`) sağlanıyor mu?

## Referanslar
- `docs/architecture/form-field-examples.md`
- `docs/architecture/overlay-accessibility-expectations.md`
- `docs/architecture/icon-only-surface-guidance.md`
- `docs/testing/a11y-ci-scope.md`
- `docs/rfcs/components/button-rfc.md`
- `docs/rfcs/components/link-rfc.md`
