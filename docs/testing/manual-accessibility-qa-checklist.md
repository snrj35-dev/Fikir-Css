# Manual Accessibility QA Checklist (M1)

## Amaç
Desteklenen surface için release öncesi minimum manuel erişilebilirlik kontrol adımlarını standartlaştırmak.

## Test Ortamı
- Güncel `dist/fikir.css` üretildi (`npm run build`)
- Playground açık (`playground/index.html`)
- Tema kontrolü: light + dark

## Core QA Adımları

1. Klavye navigasyonu
- `Tab` sırası mantıklı mı?
- `Shift+Tab` ile geri geçişte odak kaybı var mı?
- `button` öğeleri `Enter/Space` ile tetikleniyor mu?

2. Form ilişkileri (`field`)
- `label` -> `input` ilişkisi (`for`/`id`) doğru mu?
- Invalid örnekte hata metni görsel + semantic olarak açık mı?
- `readonly` ve `disabled` davranışları ayrışıyor mu?

3. Button vs Link
- Navigasyon öğeleri link olarak modellenmiş mi?
- Aksiyon öğeleri button olarak modellenmiş mi?

4. Kontrast ve okunabilirlik
- Dark mode'da badge/alert/table metinleri okunabilir mi?
- Durum tonları yalnızca renk ile mi ifade ediliyor?

5. Icon-only / yardımcı erişilebilir isim
- Icon-only butonlarda `aria-label` var mı?

## Overlay QA Adımları (M1 seçili yüzey)

1. Modal açıldığında odak davranışı kırılmadan ilerliyor mu?
2. `Escape` ile kapanış çalışıyor mu?
3. Kapanış sonrası tetikleyiciye geri odak davranışı beklenen seviyede mi? (mevcut demo sınırları içinde)

## Release Kayıt Kuralı
Bu checklist sonucu release notunda kısa bir özetle belirtilmelidir:
- geçti / kaldı
- bilinen sınırlamalar
- sonraki sürüme taşınan a11y borçları

## İlgili Dosyalar
- `docs/architecture/core-accessibility-expectations.md`
- `docs/architecture/icon-only-surface-guidance.md`
- `docs/architecture/overlay-accessibility-expectations.md`
- `docs/testing/a11y-ci-scope.md`
- `docs/release/release-checklist.md`
