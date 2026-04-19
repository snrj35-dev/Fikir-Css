# Plain HTML Quickstart

> M18 — v1.0.0

Get a Fikir CSS page running in under 2 minutes — no build tool required.

---

## 1. Add the stylesheet

### Via CDN

```html
<!doctype html>
<html lang="en" data-theme="light">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>My App</title>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/fikir-css@1.0.0/dist/fikir.css" />
</head>
<body class="surface" style="padding: 1rem">
  <!-- your content here -->
</body>
</html>
```

### Via npm (local file)

```bash
npm install fikir-css
```

```html
<link rel="stylesheet" href="./node_modules/fikir-css/dist/fikir.css" />
```

---

## 2. Set the theme attribute

Fikir CSS requires `data-theme` on `<html>` to resolve semantic tokens:

```html
<html data-theme="light">   <!-- or "dark" -->
```

Without `data-theme`, color tokens fall back to system `prefers-color-scheme`.

---

## 3. Add components

### Button

```html
<button class="btn btn-solid btn-primary btn-md" type="button">Save</button>
<button class="btn btn-outline btn-neutral btn-md" type="button">Cancel</button>
```

### Card

```html
<div class="card card-elevated card-p-md">
  <h2>Card title</h2>
  <p>Card content here.</p>
</div>
```

### Alert

```html
<div class="alert" role="alert">
  <p class="alert-title">Info</p>
  <p class="alert-description">Everything is working as expected.</p>
</div>

<div class="alert alert-danger" role="alert">
  <p class="alert-title">Error</p>
  <p class="alert-description">Something went wrong. Please try again.</p>
</div>
```

### Form field

```html
<div class="field">
  <label class="label" for="email">Email</label>
  <input class="input" id="email" type="email" placeholder="you@example.com" />
  <p class="helper-text">We'll never share your email.</p>
</div>
```

### Badge

```html
<span class="badge badge-soft badge-primary">New</span>
<span class="badge badge-soft badge-neutral">Draft</span>
<span class="badge badge-soft badge-danger">Error</span>
```

---

## 4. Theme toggle (vanilla JS)

```html
<button id="theme-btn" type="button">Toggle dark mode</button>

<script>
  document.getElementById('theme-btn').addEventListener('click', () => {
    const html = document.documentElement;
    html.setAttribute('data-theme', html.getAttribute('data-theme') === 'light' ? 'dark' : 'light');
  });
</script>
```

---

## 5. Compact density (opt-in)

Add the compact stylesheet to enable `data-density="compact"`:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/fikir-css@1.0.0/dist/themes/compact.css" />
```

```js
// Toggle
document.documentElement.setAttribute('data-density', 'compact');
// Reset
document.documentElement.removeAttribute('data-density');
```

---

## 6. Accessible modal

```html
<button id="open-modal" class="btn btn-solid btn-primary btn-md" type="button">Open</button>

<div id="modal" class="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title">
  <div class="modal-dialog">
    <header class="modal-header">
      <h2 id="modal-title" class="modal-title">Confirm</h2>
      <button id="close-modal" class="icon-button" aria-label="Close">✕</button>
    </header>
    <div class="modal-body">
      <p>Are you sure you want to continue?</p>
    </div>
    <footer class="modal-footer">
      <button id="cancel-modal" class="btn btn-ghost btn-neutral">Cancel</button>
      <button class="btn btn-solid btn-primary btn-md">Confirm</button>
    </footer>
  </div>
</div>

<script>
  const modal   = document.getElementById('modal');
  const openBtn = document.getElementById('open-modal');
  const closeBtn = document.getElementById('close-modal');
  const cancelBtn = document.getElementById('cancel-modal');
  let prev = null;

  function openModal() {
    prev = document.activeElement;
    modal.setAttribute('data-open', 'true');
    modal.querySelector('button, input, [tabindex]:not([tabindex="-1"])')?.focus();
    modal.addEventListener('keydown', onKey);
  }
  function closeModal() {
    modal.removeAttribute('data-open');
    modal.removeEventListener('keydown', onKey);
    prev?.focus();
  }
  function onKey(e) {
    if (e.key === 'Escape') closeModal();
  }
  openBtn.addEventListener('click', openModal);
  closeBtn.addEventListener('click', closeModal);
  cancelBtn.addEventListener('click', closeModal);
</script>
```

---

## Next steps

- Add framework integration → `docs/guides/react-adapter.md`, `vue-adapter.md`, `svelte-adapter.md`
- Existing project migration → `docs/guides/adding-to-existing-project.md`
- Token customisation → `docs/architecture/brand-theme-cookbook.md`
- All components reference → `docs/architecture/` and `packages/components/`
