# Time Range Picker

İki `time-picker` input'unu "başlangıç–bitiş" çifti olarak hizalayan CSS pattern'i. Zaman aralığı seçimi için kullanılır.

## When to use

- Çalışma saatleri seçimi (from/to)
- Rezervasyon veya etkinlik zaman aralığı
- Dashboard filtre çubuklarında zaman filtresi

## Basic usage

```html
<div data-pattern="time-range-picker">
  <div data-slot="from">
    <input
      class="time-picker-input input"
      type="time"
      aria-label="Start time"
      value="09:00"
    />
  </div>
  <span data-slot="separator">to</span>
  <div data-slot="to">
    <input
      class="time-picker-input input"
      type="time"
      aria-label="End time"
      value="17:00"
    />
  </div>
</div>
```

## Block variant (full width)

```html
<div data-pattern="time-range-picker" data-variant="block">
  <div data-slot="from">
    <label class="label" for="shift-start">Start</label>
    <input
      id="shift-start"
      class="time-picker-input input"
      type="time"
      value="08:00"
    />
  </div>
  <span data-slot="separator" style="margin-block-start: 1.6rem">–</span>
  <div data-slot="to">
    <label class="label" for="shift-end">End</label>
    <input
      id="shift-end"
      class="time-picker-input input"
      type="time"
      value="16:00"
    />
  </div>
</div>
```

## In a filter bar

```html
<div data-pattern="filter-bar">
  <div data-slot="filters">
    <div data-pattern="time-range-picker">
      <div data-slot="from">
        <input class="time-picker-input input" type="time" aria-label="From time" />
      </div>
      <span data-slot="separator">–</span>
      <div data-slot="to">
        <input class="time-picker-input input" type="time" aria-label="To time" />
      </div>
    </div>
  </div>
</div>
```

## With invalid state

```html
<div data-pattern="time-range-picker" data-invalid="true">
  <div data-slot="from">
    <input
      class="time-picker-input input"
      type="time"
      aria-label="Start time"
      aria-invalid="true"
      value="18:00"
    />
  </div>
  <span data-slot="separator">to</span>
  <div data-slot="to">
    <input
      class="time-picker-input input"
      type="time"
      aria-label="End time"
      aria-invalid="true"
      value="09:00"
    />
  </div>
</div>
<p class="error-text">End time must be after start time.</p>
```

## Slots

| Slot | Required | Description |
|---|---|---|
| `from` | ✓ | Start time input wrapper |
| `separator` | ✗ | Visual separator ("to", "–") |
| `to` | ✓ | End time input wrapper |

## Variants

| `data-variant` | Description |
|---|---|
| *(default)* | Inline compact layout |
| `block` | Full width, flex row |

## Accessibility

- Her input'a ayrı `aria-label` veya `<label>` eklenmeli.
- Range geçersizse her iki input'a `aria-invalid="true"` ve `aria-describedby="[error-id]"` eklenmeli.

## Related components

- **Time Picker** — tekli zaman seçici
- **Date Range Picker** — tarih aralığı
- **Filter Bar** — filtre çubuğu içinde kullanım
