# Headless Usage Examples

> Created: 2026-04-12
> Scope: Concrete integration examples for modal, dropdown, popover, tabs, accordion

## Modal

```html
<div class="modal" data-open="false" role="dialog" aria-modal="true" aria-labelledby="modal-title">
  <div class="modal-dialog">
    <header class="modal-header">
      <h2 id="modal-title" class="modal-title">Title</h2>
      <button class="icon-button" aria-label="Close dialog" type="button">×</button>
    </header>
    <div class="modal-body">Content</div>
    <footer class="modal-footer">
      <button class="btn" type="button">Cancel</button>
      <button class="btn btn-primary" type="button">Confirm</button>
    </footer>
  </div>
</div>
```

**JS wiring:**
```js
function openModal(id) {
  document.getElementById(id).dataset.open = "true";
}
function closeModal(id) {
  document.getElementById(id).dataset.open = "false";
}
```

---

## Dropdown Menu

```html
<div class="dropdown-menu-item" data-open="false">
  <button class="btn" aria-haspopup="menu" aria-expanded="false" type="button">
    Options
  </button>
  <div class="dropdown-menu-content" role="menu">
    <a class="dropdown-menu-link" role="menuitem" href="#">Edit</a>
    <a class="dropdown-menu-link" role="menuitem" href="#">Delete</a>
  </div>
</div>
```

**JS wiring:**
```js
trigger.addEventListener("click", () => {
  const isOpen = item.dataset.open === "true";
  item.dataset.open = isOpen ? "false" : "true";
  trigger.setAttribute("aria-expanded", String(!isOpen));
});
```

---

## Popover

```html
<button class="btn" aria-controls="my-popover" aria-expanded="false" type="button">
  Info
</button>
<div id="my-popover" class="popover" data-open="false" role="tooltip">
  <div class="popover-content">Popover content here</div>
</div>
```

**JS wiring:**
```js
trigger.addEventListener("click", () => {
  const isOpen = popover.dataset.open === "true";
  popover.dataset.open = String(!isOpen);
  trigger.setAttribute("aria-expanded", String(!isOpen));
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    popover.dataset.open = "false";
    trigger.setAttribute("aria-expanded", "false");
  }
});
```

---

## Tabs

```html
<div class="tabs" role="tablist" aria-label="Settings tabs">
  <button class="tabs-trigger" role="tab" aria-selected="true" aria-controls="panel-general">General</button>
  <button class="tabs-trigger" role="tab" aria-selected="false" aria-controls="panel-security">Security</button>
</div>
<div id="panel-general" class="tabs-panel" role="tabpanel" aria-labelledby="tab-general">
  General settings content
</div>
<div id="panel-security" class="tabs-panel" role="tabpanel" aria-labelledby="tab-security" hidden>
  Security settings content
</div>
```

**JS wiring:**
```js
tabs.forEach(tab => {
  tab.addEventListener("click", () => {
    tabs.forEach(t => t.setAttribute("aria-selected", "false"));
    tab.setAttribute("aria-selected", "true");
    panels.forEach(p => p.hidden = true);
    document.getElementById(tab.getAttribute("aria-controls")).hidden = false;
  });
});
```

---

## Accordion

```html
<div class="accordion">
  <div class="accordion-item">
    <h3 class="accordion-header">
      <button
        class="accordion-trigger"
        type="button"
        aria-expanded="false"
        aria-controls="section-1"
      >
        Section 1
      </button>
    </h3>
    <div id="section-1" class="accordion-panel" role="region" aria-labelledby="trigger-1" hidden>
      Panel content here.
    </div>
  </div>
</div>
```

**JS wiring:**
```js
trigger.addEventListener("click", () => {
  const isExpanded = trigger.getAttribute("aria-expanded") === "true";
  trigger.setAttribute("aria-expanded", String(!isExpanded));
  panel.hidden = isExpanded;
});
```
