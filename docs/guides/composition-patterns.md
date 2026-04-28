# Composition Patterns & Page Templates

Fikir CSS follows a **Zero Custom CSS** philosophy for standard layouts. This guide provides copy-paste ready skeletons for common application patterns using only Fikir CSS surfaces and layout primitives.

## 1. SaaS Dashboard (Standard)

The canonical layout for modern SaaS apps: a sticky topbar, a responsive sidebar, and a multi-column main area.

```html
<div class="app-shell" data-variant="fullscreen">
  <!-- Topbar -->
  <header class="app-shell-topbar">
    <div class="cluster"> <!-- Brand --> </div>
    <div class="cluster"> <!-- Actions & Profile --> </div>
  </header>

  <div class="app-shell-content">
    <!-- Sidebar -->
    <aside class="app-shell-sidebar">
      <nav class="sidebar-nav">
        <div class="sidebar-nav-section">
          <a href="#" class="sidebar-nav-item" aria-current="page">Dashboard</a>
          <a href="#" class="sidebar-nav-item">Analytics</a>
        </div>
      </nav>
    </aside>

    <!-- Main -->
    <main class="app-shell-main">
      <div class="stack" style="--stack-gap: var(--space-6)">
        <header class="page-header">
          <h1 class="heading-2">Overview</h1>
        </header>

        <!-- Metrics Grid -->
        <section data-pattern="kpi-grid">
          <article class="kpi-card"> ... </article>
          <article class="kpi-card"> ... </article>
        </section>

        <!-- Content Area -->
        <div class="grid" style="--grid-template-columns: 2fr 1fr; --grid-gap: var(--space-4)">
          <article class="card"> <!-- Table or Chart --> </article>
          <aside class="stack" style="--stack-gap: var(--space-4)">
            <article class="stat"> <!-- Secondary Metric --> </article>
          </aside>
        </div>
      </div>
    </main>
  </div>
</div>
```

## 2. Analytics / Data Panel (Compact)

Focuses on density and data visualization. Uses `data-density="compact"` and a more complex grid.

```html
<html data-theme="light" data-density="compact">
<body class="surface">
  <main class="container stack" style="--stack-gap: var(--space-4); padding: var(--space-4)">
    
    <header class="cluster" style="justify-content: space-between">
      <h1 class="heading-3">Analytics Engine</h1>
      <div class="cluster" style="gap: var(--space-2)">
        <select class="select"> <option>Last 24h</option> </select>
        <button class="btn btn-solid btn-primary btn-sm">Refresh</button>
      </div>
    </header>

    <div data-pattern="stat-group" data-variant="divided">
      <article class="stat"> ... </article>
      <article class="stat"> ... </article>
      <article class="stat"> ... </article>
      <article class="stat"> ... </article>
    </div>

    <section class="grid" style="--grid-template-columns: repeat(2, 1fr); --grid-gap: var(--space-4)">
      <article class="card"> <!-- Chart 1 --> </article>
      <article class="card"> <!-- Chart 2 --> </article>
    </section>

    <article class="card card-p-none">
      <table class="table"> ... </table>
    </article>

  </main>
</body>
</html>
```

## 3. CRM / Settings Page (Single Column)

A centered, narrow layout optimized for forms and reading.

```html
<body class="surface">
  <div class="container" style="max-width: var(--container-max-width-sm); margin: 0 auto; padding: var(--space-8) var(--space-4)">
    
    <main class="stack" style="--stack-gap: var(--space-8)">
      
      <header class="stack" style="--stack-gap: var(--space-2)">
        <h1 class="heading-2">Account Settings</h1>
        <p style="color: var(--color-fg-muted)">Manage your profile and security preferences.</p>
      </header>

      <section class="card card-elevated stack" style="--stack-gap: var(--space-4)">
        <h2 class="heading-4">Profile Information</h2>
        <div class="field">
          <label class="label">Full Name</label>
          <input class="input" type="text" value="John Doe" />
        </div>
        <div class="field">
          <label class="label">Bio</label>
          <textarea class="textarea" rows="3"></textarea>
        </div>
        <button class="btn btn-solid btn-primary btn-md" style="width: fit-content">Save Changes</button>
      </section>

      <section class="card stack" style="--stack-gap: var(--space-4); border-color: var(--color-danger)">
        <h2 class="heading-4" style="color: var(--color-danger)">Danger Zone</h2>
        <p style="font-size: var(--font-size-sm)">Once you delete your account, there is no going back.</p>
        <button class="btn btn-outline btn-danger btn-md" style="width: fit-content">Delete Account</button>
      </section>

    </main>
  </div>
</body>
```

## Key Principles for Composition

1. **Use `app-shell` for Shells**: Don't build your own sidebar layout with raw floats or flex. Use `app-shell-sidebar` and `app-shell-main`.
2. **Standardize Grids**: Use `data-pattern="kpi-grid"` for cards and `data-pattern="stat-group"` for small metrics.
3. **Control Spacing with Stack**: Use the `stack` primitive with `--stack-gap: var(--space-*)` instead of adding margins to components.
4. **Prefer Tokens**: If you need an inline style (e.g., `width`, `max-width`), always use a Fikir CSS token if possible.
