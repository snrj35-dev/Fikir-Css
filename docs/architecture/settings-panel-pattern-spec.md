# Settings Panel Pattern Spec (v0.2)

## Durum
- Status: Draft (pattern spec)
- Scope: v0.2 foundation class surface
- Non-goal: yeni component, yeni selector contract, yeni recipe axis

## Amaç
Bu belge, `Settings Panel` ürün pattern'inin mevcut v0.2 surface ile nasıl kurulacağını tanımlar.

Bu spec:
- yeni framework class'ı tanımlamaz,
- mevcut component/layout sınıflarını kompozisyon kurallarıyla birleştirir.

## Kapsam ve Sınırlar
Settings Panel pattern'i aşağıdaki mevcut surface'i kullanmalıdır:
- Layout: `stack`, `cluster`, `sidebar`
- Shell: `page-header`, `section-block`, `section-header`, `section-body`
- Form: `field`, `label`, `helper-text`, `error-text`, `input`, `select`, `textarea`, `switch`, `checkbox`, `radio`
- Aksiyonlar: `btn`, `btn-solid`, `btn-outline`, `btn-primary`, `btn-neutral`, `btn-sm`, `btn-md`

Bu pattern için canonical `settings-panel` class yüzeyi v0.2'de tanımlanmamıştır.

## Pattern Yapısı
Önerilen yapı:
1. Üst alanda `page-header` ile sayfa başlığı ve global aksiyonlar.
2. İçerikte `sidebar` layout ile navigation + form alanı ayrımı.
3. Form alanında her grup için `section-block`.
4. Her input satırında `field` kompozisyonu.

## State ve Override Kuralları
- Form validasyonunda `aria-invalid="true"` ve ilgili invalid class birlikte kullanılmalıdır.
- `disabled` ve `readonly` state'leri HTML attribute üzerinden temsil edilmelidir.
- Utility override kullanılabilir; ancak `force-*` sınıfları sadece escape-hatch olarak kullanılmalıdır.
- Aynı recipe axis'ten çakışan sınıflar aynı node üzerinde birlikte kullanılmamalıdır.

## Accessibility Beklentileri
- Her kontrol bir `label` ile ilişkilendirilmelidir (`for`/`id` veya uygun sarmal yapı).
- Yardım ve hata metinleri `aria-describedby` ile input'a bağlanmalıdır.
- Grup bazlı kontroller için `fieldset`/`legend` kullanılmalıdır.
- Birincil kayıt eylemi native `<button type="submit">` ile tanımlanmalıdır.

## Contract İlişkisi
- Pattern içinde kullanılan framework class'ları `dist/contracts/selectors.json` yüzeyinde bulunmalıdır.
- Bu spec, `contracts/naming.contract.mjs` veya `contracts/recipes.contract.mjs` üzerinde değişiklik gerektirmez.

## Minimal Kullanım Örneği
```html
<form class="stack gap-4" data-pattern="settings-panel">
  <header class="page-header">
    <div class="page-header-content">
      <h1>Workspace settings</h1>
      <p class="text-sm">Manage defaults and access policy.</p>
    </div>
    <div class="page-header-actions cluster gap-2">
      <button type="button" class="btn btn-outline btn-neutral btn-sm">Cancel</button>
      <button type="submit" class="btn btn-solid btn-primary btn-sm">Save changes</button>
    </div>
  </header>

  <div class="sidebar gap-4">
    <aside class="sidebar-nav">
      <a class="sidebar-nav-item" href="#" aria-current="page">General</a>
      <a class="sidebar-nav-item" href="#">Security</a>
    </aside>

    <main class="stack gap-4">
      <section class="section-block">
        <div class="section-header"><h2>General</h2></div>
        <div class="section-body stack gap-4">
          <div class="field">
            <label class="label" for="workspace-name">Workspace name</label>
            <input id="workspace-name" class="input" />
            <p class="helper-text">Visible to all members.</p>
          </div>
        </div>
      </section>
    </main>
  </div>
</form>
```

## Open Questions
1. v0.3'te `Settings Panel` için canonical pattern wrapper class gerekli mi?
2. Section içi action placement için ek normatif kural gerekir mi?

