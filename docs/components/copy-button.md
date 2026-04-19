# Copy Button

Panoya kopyalama geri bildirimi olan düğme pattern'i. `data-copied="true"` state'i uygulandığında ikon ve label'ı değiştirir.

## When to use

- Kod bloğu veya snippet kopyalamak için
- API key, token veya paylaşım URL'si kopyalamak için
- Herhangi bir tek tıkla kopyalama aksiyonu için

## Basic usage

```html
<button
  class="btn btn-ghost btn-sm"
  data-pattern="copy-button"
  type="button"
  aria-label="Copy to clipboard"
>
  <span data-icon="copy" aria-hidden="true">📋</span>
  <span data-icon="check" aria-hidden="true">✓</span>
  <span data-label="copy">Copy</span>
  <span data-label="copied">Copied!</span>
</button>
```

## Icon only

```html
<button
  class="btn btn-ghost btn-xs"
  data-pattern="copy-button"
  type="button"
  aria-label="Copy to clipboard"
>
  <span data-icon="copy" aria-hidden="true">📋</span>
  <span data-icon="check" aria-hidden="true">✓</span>
</button>
```

## With tooltip feedback

```html
<div style="position: relative; display: inline-block">
  <button
    class="btn btn-ghost btn-sm"
    data-pattern="copy-button"
    type="button"
    aria-label="Copy"
  >
    <span data-icon="copy" aria-hidden="true">📋</span>
    <span data-icon="check" aria-hidden="true">✓</span>
    <span data-slot="feedback">Copied!</span>
  </button>
</div>
```

## In a code block

```html
<div class="card card-flat" style="position: relative; padding: var(--space-3)">
  <pre><code>npm install fikir-css</code></pre>
  <button
    class="btn btn-ghost btn-xs"
    data-pattern="copy-button"
    type="button"
    aria-label="Copy command"
    style="position: absolute; inset-block-start: var(--space-2); inset-inline-end: var(--space-2)"
  >
    <span data-icon="copy" aria-hidden="true">📋</span>
    <span data-icon="check" aria-hidden="true">✓</span>
  </button>
</div>
```

## Accessibility

- `aria-label` her zaman belirtilmeli.
- Kopyalandıktan sonra bir `aria-live` region güncellenerek ekran okuyuculara bildirim yapılabilir.

## JavaScript scaffold

```js
document.querySelectorAll('[data-pattern="copy-button"]').forEach((btn) => {
  const text = btn.dataset.copy
    ?? btn.closest('[data-copy-target]')?.querySelector('code')?.textContent
    ?? '';

  btn.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(text);
      btn.dataset.copied = 'true';
      setTimeout(() => { btn.dataset.copied = 'false'; }, 2000);
    } catch {
      // Clipboard API not available
    }
  });
});
```

## Related components

- **Button** — base button styles
- **Code Block** — use copy-button inside code blocks
- **Tooltip** — alternative feedback mechanism
