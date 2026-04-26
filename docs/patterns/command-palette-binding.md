# Command Palette Binding — Canonical Recipe

> Status: **Stable** · Added 2026-04-24 (M23)
> Source of truth: `command-palette`, `command-palette-dialog`, `command-palette-input`, `command-palette-list`, `command-palette-item`, `button`, `kbd`.

This recipe provides a CDN-friendly baseline for opening a command palette, filtering results, moving the active option with the keyboard, and executing a selected command. It deliberately uses tiny vanilla JS so the same structure works in static HTML, server-rendered apps, and frameworks.

## Markup

```html
<button
  class="btn btn-ghost btn-sm"
  id="open-command-palette"
  type="button"
  aria-haspopup="dialog"
  aria-controls="command-palette"
  aria-expanded="false"
>
  Search
  <span aria-hidden="true"><kbd class="kbd">Ctrl</kbd> + <kbd class="kbd">K</kbd></span>
</button>

<div
  class="command-palette"
  id="command-palette"
  role="dialog"
  aria-modal="true"
  aria-labelledby="command-palette-title"
  hidden
  style="position: fixed; inset: 0; display: grid; place-items: start center; padding: var(--space-8) var(--space-4); background: color-mix(in oklch, black 28%, transparent);"
>
  <div class="command-palette-dialog" style="inline-size: min(100%, 40rem);">
    <h2 id="command-palette-title">Command palette</h2>

    <input
      class="command-palette-input"
      id="command-palette-input"
      type="search"
      role="combobox"
      aria-autocomplete="list"
      aria-expanded="true"
      aria-controls="command-palette-list"
      aria-activedescendant="command-item-dashboard"
      placeholder="Type a page or action"
      autocomplete="off"
    />

    <ul
      class="command-palette-list"
      id="command-palette-list"
      role="listbox"
      aria-label="Commands"
    >
      <li
        class="command-palette-item"
        id="command-item-dashboard"
        role="option"
        aria-selected="true"
        data-active="true"
        data-command-label="Go to dashboard"
        data-command-href="/dashboard"
        tabindex="-1"
      >
        Go to dashboard
      </li>
      <li
        class="command-palette-item"
        id="command-item-customers"
        role="option"
        aria-selected="false"
        data-command-label="Open customers"
        data-command-href="/customers"
        tabindex="-1"
      >
        Open customers
      </li>
      <li
        class="command-palette-item"
        id="command-item-theme"
        role="option"
        aria-selected="false"
        data-command-label="Toggle dark theme"
        data-command-action="toggle-theme"
        tabindex="-1"
      >
        Toggle dark theme
      </li>
    </ul>
  </div>
</div>
```

## Binding script

```html
<script type="module">
  const trigger = document.getElementById("open-command-palette");
  const palette = document.getElementById("command-palette");
  const input = document.getElementById("command-palette-input");
  const items = Array.from(palette.querySelectorAll(".command-palette-item"));
  let activeIndex = 0;

  function visibleItems() {
    return items.filter((item) => !item.hidden);
  }

  function syncActive(index) {
    const currentItems = visibleItems();
    if (currentItems.length === 0) {
      items.forEach((item) => {
        item.dataset.active = "false";
        item.setAttribute("aria-selected", "false");
      });
      input.removeAttribute("aria-activedescendant");
      activeIndex = 0;
      return;
    }

    activeIndex = Math.max(0, Math.min(index, currentItems.length - 1));

    items.forEach((item) => {
      item.dataset.active = "false";
      item.setAttribute("aria-selected", "false");
    });

    const activeItem = currentItems[activeIndex];
    if (!activeItem) return;

    activeItem.dataset.active = "true";
    activeItem.setAttribute("aria-selected", "true");
    input.setAttribute("aria-activedescendant", activeItem.id);
    activeItem.scrollIntoView({ block: "nearest" });
  }

  function openPalette() {
    palette.hidden = false;
    trigger.setAttribute("aria-expanded", "true");
    input.value = "";
    items.forEach((item) => { item.hidden = false; });
    syncActive(0);
    requestAnimationFrame(() => input.focus());
  }

  function closePalette() {
    palette.hidden = true;
    trigger.setAttribute("aria-expanded", "false");
    trigger.focus();
  }

  function runCommand(item) {
    if (item.dataset.commandAction === "toggle-theme") {
      document.documentElement.dataset.theme =
        document.documentElement.dataset.theme === "dark" ? "light" : "dark";
    }

    if (item.dataset.commandHref) {
      window.location.href = item.dataset.commandHref;
      return;
    }

    closePalette();
  }

  function filterCommands(query) {
    const value = query.trim().toLowerCase();

    items.forEach((item) => {
      const label = item.dataset.commandLabel.toLowerCase();
      item.hidden = value !== "" && !label.includes(value);
    });

    syncActive(0);
  }

  trigger.addEventListener("click", openPalette);

  document.addEventListener("keydown", (event) => {
    if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
      event.preventDefault();
      palette.hidden ? openPalette() : closePalette();
    }
  });

  palette.addEventListener("click", (event) => {
    if (event.target === palette) closePalette();
  });

  input.addEventListener("input", (event) => {
    filterCommands(event.currentTarget.value);
  });

  palette.addEventListener("keydown", (event) => {
    const currentItems = visibleItems();
    if (event.key === "Escape") closePalette();
    if (currentItems.length === 0) return;
    if (event.key === "ArrowDown") {
      event.preventDefault();
      syncActive((activeIndex + 1) % currentItems.length);
    }
    if (event.key === "ArrowUp") {
      event.preventDefault();
      syncActive((activeIndex - 1 + currentItems.length) % currentItems.length);
    }
    if (event.key === "Enter") {
      event.preventDefault();
      runCommand(currentItems[activeIndex]);
    }
  });

  items.forEach((item) => {
    item.addEventListener("click", () => runCommand(item));
  });
</script>
```

## Notes for CDN use

- This recipe has no framework dependency.
- Replace `window.location.href` with your router hook if you are in an SPA.
- If your command set is generated server-side, render the `<li>` items directly and keep the client script unchanged.
- For large command lists, precompute `data-command-label` so filtering does not depend on nested markup parsing.

## Accessibility checklist

- [ ] Trigger keeps `aria-expanded` in sync with the palette state.
- [ ] Palette root uses `role="dialog"` and `aria-modal="true"`.
- [ ] Search input exposes `role="combobox"` and `aria-activedescendant`.
- [ ] Results list uses `role="listbox"` and items use `role="option"`.
- [ ] Active item is mirrored with both `aria-selected="true"` and `data-active="true"`.
- [ ] Escape closes the dialog and returns focus to the trigger.

## Related

- `docs/components/command-palette.md`
- `docs/guides/overlay-js-helpers.md`
