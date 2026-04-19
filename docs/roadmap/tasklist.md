# Fikir CSS — Post-1.0 Open Tasks

> Son güncelleme: 2026-04-20 · **v1.0.0 yayınlandı** ✅  
> Tamamlanan tüm milestone'lar → [`tasklist-archive.md`](./tasklist-archive.md)  
> Geniş backlog → [`post-1.0-backlog.md`](./post-1.0-backlog.md)

---

## Legend
- `[ ]` açık
- `[x]` tamamlandı
- `(P1)` yüksek öncelik — sonraki minor release
- `(P2)` planlandı ama takvimli değil
- `(P3)` nice-to-have

---

## Açık görevler (post-1.0)

### Docs hygiene (M19.3)
- [ ] stale docs / archive boundary temizliği yap `(P2)`
- [ ] duplicate rehberleri sadeleştir `(P2)`

### Manifest & CDN (M20)
- [ ] CDN'den erişilebilir olduğunu doğrula — jsDelivr/unpkg link testi `(P1)`
- [ ] CDN URL'ler accessible olduğunu test et `(P1)`
- [ ] metadata: hangi component'lerde kullanıldığını belirt (tokens.json) `(P1)`
- [ ] manifest diff ve changelog'a mirror et: CSS değişim → manifest changelog otomatik `(P2)`

### AI Integration (M20.8)
- [ ] web agent integration örneği yaz `(P2)`
- [ ] VS Code extension örneği yaz `(P2)`

### Visual regression (M21.3)
- [ ] screenshot/baseline görsellerini güncelle `(P3)`

---

# Definition of Done (her görev için)
- [ ] İlgili kod, docs ve demo yüzeyi güncel
- [ ] Gerekliyse contract ve exports güncellendi
- [ ] Gerekliyse test eklendi veya güncellendi
- [ ] Link ve snippet doğruluğu kontrol edildi
- [ ] Theme / density / dark mode etkisi gözden geçirildi
- [ ] Changelog veya migration note ihtiyacı değerlendirildi

---

# v1.0 çıkış özeti ✅

Fikir CSS v1.0.0 aşağıdaki sorulara net cevap verebilir:

- **Neyi destekliyor?** → 69 supported · 22 beta · 10 experimental surface, `docs/release/what-is-stable-in-v1.md`
- **Nasıl kullanılıyor?** → `README.md`, `docs/guides/`, `examples/`
- **Hangi varyantları resmi?** → `dist/contracts/variants.json`
- **Ne kadar erişilebilir?** → 272 Playwright testi geçiyor, `docs/testing/accessibility-matrix.md`
- **Hangi frameworklerde güvenle tüketilir?** → React · Vue · Svelte · plain HTML
- **Nasıl yayınlanır ve sürdürülür?** → `docs/governance/`, `docs/release/hotfix-checklist.md`
