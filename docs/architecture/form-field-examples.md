# Form Field Examples (v0.2)

## Amaç
Bu doküman, `field` kompozisyon yüzeyinin mevcut v0.2 foundation içinde nasıl kullanılacağını gösterir.

İlgili RFC:
- `docs/rfcs/components/field-rfc.md`

## 1. Temel Field Örneği

```html
<div class="field">
  <label class="label" for="email">Email</label>
  <input id="email" class="input" type="email" aria-describedby="email-help" />
  <p id="email-help" class="helper-text">İş e-postanızı girin.</p>
</div>
```

## 2. Invalid Field Örneği

```html
<div class="field" data-field-invalid="true">
  <label class="label" for="email-invalid">Email</label>
  <input
    id="email-invalid"
    class="input aria-invalid:ring-danger"
    type="email"
    aria-invalid="true"
    aria-describedby="email-invalid-error"
  />
  <p id="email-invalid-error" class="error-text">Geçerli bir e-posta adresi girin.</p>
</div>
```

## 3. Readonly ve Disabled Örneği

```html
<div class="field">
  <label class="label" for="email-readonly">Readonly email</label>
  <input id="email-readonly" class="input" type="email" readonly />
  <p class="helper-text">Bu alan düzenlenemez.</p>
</div>

<div class="field" data-field-disabled="true">
  <label class="label" for="email-disabled">Disabled email</label>
  <input id="email-disabled" class="input disabled:opacity-50" type="email" disabled />
  <p class="helper-text">Bu alan etkileşime kapalıdır.</p>
</div>
```

## 4. Accessibility Notları
1. `label[for]` değeri ilgili kontrolün `id` değeriyle eşleşmelidir.
2. Yardım/hata metni için `aria-describedby` kullanılmalıdır.
3. Hata durumu için class eklemek yeterli değildir; `aria-invalid="true"` birlikte verilmelidir.
4. `disabled` ve `readonly` farklı semantiklere sahiptir; birbirinin yerine kullanılmamalıdır.

## 5. Textarea Örneği

```html
<div class="field">
  <label class="label" for="bio">Bio</label>
  <textarea id="bio" class="textarea" aria-describedby="bio-help"></textarea>
  <p id="bio-help" class="helper-text">Maksimum 280 karakter.</p>
</div>
```

## 6. Select Örneği

```html
<div class="field">
  <label class="label" for="country">Country</label>
  <select id="country" class="select" aria-describedby="country-help">
    <option value="">Select country</option>
    <option value="tr">Turkey</option>
    <option value="us">United States</option>
  </select>
  <p id="country-help" class="helper-text">Ülke seçimi zorunludur.</p>
</div>
```

## 7. Checkbox / Radio / Switch Örneği

```html
<fieldset class="field">
  <legend class="label">Plan</legend>

  <label class="cluster text-sm">
    <input class="checkbox" type="checkbox" />
    Enable email updates
  </label>

  <label class="cluster text-sm">
    <input class="radio" type="radio" name="plan" />
    Starter
  </label>

  <label class="cluster text-sm">
    <input class="radio" type="radio" name="plan" />
    Pro
  </label>

  <label class="cluster text-sm">
    <input id="auto-sync" class="switch" type="checkbox" />
    Auto-sync
  </label>
</fieldset>
```

## 8. Input Group Örneği

```html
<div class="field">
  <label class="label" for="username">Username</label>
  <div class="input-group">
    <span class="input-group-addon">@</span>
    <input id="username" class="input" type="text" />
  </div>
  <p class="helper-text">Kullanıcı adını girin.</p>
</div>
```
