# Zero to Dashboard in 5 Minutes

This guide walks you through building a functional, responsive dashboard with Fikir CSS starting from a blank HTML file.

## 1. Minimal Setup

Create an `index.html` and link Fikir CSS and the JS helpers from the CDN.

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Quick Dashboard</title>
  <!-- Core CSS -->
  <link rel="stylesheet" href="https://unpkg.com/fikir-css@latest/dist/fikir.css">
</head>
<body class="bg-surface">
  <div class="app-shell" data-variant="fullscreen">
    <header class="app-shell-topbar" data-variant="glass">
      <strong>My Dashboard</strong>
      <button class="btn btn-primary btn-sm">New Task</button>
    </header>
    
    <div class="app-shell-content">
      <aside class="app-shell-sidebar">
        <nav class="sidebar-nav">
          <a class="sidebar-nav-item" href="#" aria-current="page">Overview</a>
          <a class="sidebar-nav-item" href="#">Analytics</a>
          <a class="sidebar-nav-item" href="#">Settings</a>
        </nav>
      </aside>
      
      <main class="app-shell-main stack" style="--stack-gap: var(--space-4)">
        <!-- Dashboard Content -->
      </main>
    </div>
  </div>

  <!-- Optional: JS Helpers for interactivity -->
  <script src="https://unpkg.com/fikir-css@latest/dist/fikir-helpers.js"></script>
</body>
</html>
```

## 2. Adding Data Cards

Use the `grid` primitive and `kpi-card` component to display metrics.

```html
<div class="grid" style="--grid-min: 16rem; gap: var(--space-3)">
  <div class="kpi-card" data-variant="mesh">
    <h3 class="kpi-card-header">Revenue</h3>
    <p class="kpi-card-value">$12,450</p>
    <div class="kpi-card-trend">+12%</div>
  </div>
  <div class="kpi-card" data-variant="conic-border">
    <h3 class="kpi-card-header">Users</h3>
    <p class="kpi-card-value">1,284</p>
    <div class="kpi-card-trend">+5%</div>
  </div>
  <div class="kpi-card">
    <h3 class="kpi-card-header">Conversion</h3>
    <p class="kpi-card-value">3.2%</p>
    <div class="kpi-card-trend">-0.4%</div>
  </div>
</div>
```

## 3. Adding a Data Table

Wrap your table in `overflow-auto` to handle mobile responsiveness.

```html
<article class="card card-flat">
  <div class="overflow-auto">
    <table class="table">
      <thead>
        <tr>
          <th>Customer</th>
          <th>Status</th>
          <th>Amount</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Jane Doe</td>
          <td><span class="badge badge-success">Paid</span></td>
          <td>$450.00</td>
        </tr>
        <tr>
          <td>John Smith</td>
          <td><span class="badge badge-warning">Pending</span></td>
          <td>$120.00</td>
        </tr>
      </tbody>
    </table>
  </div>
</article>
```

## 4. Dark Mode & OLED

Fikir CSS supports dark mode out of the box. Add `data-theme="dark"` or `data-theme="oled"` to the `<html>` tag to see the transformation.

```html
<html lang="en" data-theme="oled">
```

## 5. Next Steps

- Explore **Layout Primitives** (`stack`, `cluster`, `switcher`) in `docs/guides/layout-composition.md`.
- Use **JS Helpers** for Modals and Drawers.
- Consult the **Component Gallery** for more UI elements.
