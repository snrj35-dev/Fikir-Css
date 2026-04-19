# Search Result Item

Arama sonucu listesinde tek bir öğeyi temsil eden CSS pattern'i. İkon, başlık, açıklama ve meta bilgisi slot'larını destekler.

## When to use

- Command palette sonuç listesi
- Global arama overlay'i
- Önerilen öğeler listesi (autocomplete dropdown)

## Basic usage

```html
<a data-pattern="search-result-item" href="#" role="option">
  <div data-slot="icon" aria-hidden="true">📄</div>
  <div data-slot="content">
    <p data-slot="title">Getting started guide</p>
    <p data-slot="description">Learn the basics of Fikir CSS</p>
  </div>
  <span data-slot="meta">Docs</span>
</a>
```

## With highlighted match

```html
<a data-pattern="search-result-item" href="#" role="option">
  <div data-slot="icon" aria-hidden="true">⚙️</div>
  <div data-slot="content">
    <p data-slot="title">
      <mark>Filter</mark> Bar component
    </p>
    <p data-slot="description">Responsive filter layout with search and controls</p>
  </div>
  <span data-slot="meta">Components</span>
</a>
```

## Section header

```html
<div data-pattern="search-result-item" data-role="section-header">
  Components
</div>
```

## Result list

```html
<ul role="listbox" aria-label="Search results" style="list-style: none; padding: 0; margin: 0">
  <li>
    <div data-pattern="search-result-item" data-role="section-header">Pages</div>
  </li>
  <li>
    <a data-pattern="search-result-item" href="/docs/getting-started" role="option">
      <div data-slot="icon" aria-hidden="true">📖</div>
      <div data-slot="content">
        <p data-slot="title">Getting started</p>
        <p data-slot="description">Installation and quick start</p>
      </div>
    </a>
  </li>
  <li>
    <a data-pattern="search-result-item" href="/docs/components" role="option">
      <div data-slot="icon" aria-hidden="true">🧩</div>
      <div data-slot="content">
        <p data-slot="title">Components</p>
        <p data-slot="description">Full component reference</p>
      </div>
    </a>
  </li>
  <li>
    <div data-pattern="search-result-item" data-role="section-header">Recent</div>
  </li>
  <li>
    <a data-pattern="search-result-item" href="/docs/button" role="option" data-active="true">
      <div data-slot="icon" aria-hidden="true">🔘</div>
      <div data-slot="content">
        <p data-slot="title">Button</p>
        <p data-slot="description">Base interactive element</p>
      </div>
      <span data-slot="meta">2m ago</span>
    </a>
  </li>
</ul>
```

## Slots

| Slot | Required | Description |
|---|---|---|
| `icon` | ✗ | Visual icon (emoji, SVG) |
| `content` | ✓ | Wrapper for title + description |
| `title` | ✓ | Primary result label |
| `description` | ✗ | Secondary detail text |
| `meta` | ✗ | Timestamp, category, breadcrumb |

## States

| Attribute | Description |
|---|---|
| `data-active="true"` | Highlighted/selected item (keyboard nav) |
| `data-role="section-header"` | Non-interactive group label |

## Accessibility

- Sonuç list'ini `role="listbox"` ile sarmalayın.
- Her öğeye `role="option"` ekleyin.
- Seçili öğeye `aria-selected="true"` ekleyin.
- `listbox`'a `aria-activedescendant="[active-item-id]"` ayarlayın.

## Related components

- **Search Box** — arama input alanı
- **Command Palette** — tam ekran komut arama
- **Empty Search State** — sonuç bulunamadı durumu
