# Form Layout — Canonical Recipe

> Status: **Stable** · Added 2026-04-20 (M22)
> Source of truth: `field`, `label`, `input`, `input-group`, `helper-text`, `error-text` components; `stack` primitive.

This recipe shows the canonical way to lay out a real form with mixed control types (inputs, selects, input-groups, switches, radios), validation, helper text, and a footer action row. It uses only the public Fikir CSS surface — no inline layout CSS.

## Single-field anatomy

```html
<div class="field">
  <label class="label" for="email">Email</label>
  <input class="input input-md" id="email" type="email"
         aria-describedby="email-hint" required />
  <p class="helper-text" id="email-hint">We will not share your email.</p>
</div>
```

Rules:
- `field` is the wrapper. Its display already provides consistent vertical gaps between label / control / helper / error.
- `label[for]` must match `input[id]`.
- `helper-text` is referenced via `aria-describedby`.
- Use a `helper-text` OR an `error-text` — never both simultaneously.

## Invalid state

```html
<div class="field" data-invalid="true">
  <label class="label" for="email">Email</label>
  <input class="input input-md" id="email" type="email"
         aria-describedby="email-error" aria-invalid="true" />
  <p class="error-text" id="email-error" role="alert">Enter a valid email address.</p>
</div>
```

- `data-invalid="true"` on the `field` root triggers the error visual state (red border on the control).
- `aria-invalid="true"` on the control + `role="alert"` on `error-text` announces the error to screen readers.
- If the control is inside an `input-group`, set `aria-invalid` on the native input, not the group wrapper.

## Input-group (prefix/suffix)

Use `input-group` when the control pairs with an addon (currency symbol, unit, search icon).

```html
<div class="field">
  <label class="label" for="price">Price</label>
  <div class="input-group">
    <span class="input-group-addon">$</span>
    <input class="input input-md" id="price" type="number"
           inputmode="decimal" aria-describedby="price-hint" />
    <span class="input-group-addon">USD</span>
  </div>
  <p class="helper-text" id="price-hint">Excluding tax.</p>
</div>
```

- `input-group` replaces raw `input` positioning; the `input-group-addon` children flank the control.
- Do **not** wrap the `input-group` itself with another `field` child — keep it inside `field` as the sole control.

## Full form composition

Use `stack` for vertical flow (consistent gap between fields) and `cluster` for horizontal action rows.

```html
<form class="stack" style="--stack-gap: var(--space-4)" novalidate>

  <div class="field">
    <label class="label" for="name">Full name</label>
    <input class="input input-md" id="name" type="text" autocomplete="name" required />
  </div>

  <div class="field">
    <label class="label" for="email">Email</label>
    <input class="input input-md" id="email" type="email"
           autocomplete="email" required />
  </div>

  <div class="field">
    <label class="label" for="plan">Plan</label>
    <select class="select select-md" id="plan">
      <option>Starter</option>
      <option>Pro</option>
      <option>Enterprise</option>
    </select>
    <p class="helper-text">You can change this later from billing.</p>
  </div>

  <div class="field">
    <label class="label" for="budget">Monthly budget</label>
    <div class="input-group">
      <span class="input-group-addon">$</span>
      <input class="input input-md" id="budget" type="number" inputmode="decimal" />
      <span class="input-group-addon">USD</span>
    </div>
  </div>

  <div class="field">
    <span class="label">Notifications</span>
    <label class="cluster" style="--cluster-gap: var(--space-2)">
      <input type="checkbox" class="checkbox" checked />
      <span>Weekly product updates</span>
    </label>
    <label class="cluster" style="--cluster-gap: var(--space-2)">
      <input type="checkbox" class="checkbox" />
      <span>Security alerts only</span>
    </label>
  </div>

  <hr class="divider" />

  <div class="cluster" data-cluster-justify="between">
    <button type="button" class="btn btn-ghost btn-md">Cancel</button>
    <div class="cluster">
      <button type="button" class="btn btn-outline btn-md">Save draft</button>
      <button type="submit" class="btn btn-primary btn-md">Create account</button>
    </div>
  </div>
</form>
```

Why this works:
- `stack` owns vertical rhythm — no `margin-bottom` on individual fields.
- Action row uses `cluster[data-cluster-justify="between"]` to push primary/secondary groups apart while keeping them inline-wrap safe on narrow viewports.
- No inline `display: grid` / `display: flex`; every layout decision is expressed through a primitive.

## Two-column form (wide forms)

Use `switcher` to flip a two-column layout to a single column below the threshold.

```html
<form class="stack">
  <div class="switcher" style="--switcher-min: 20rem; --switcher-gap: var(--space-4)">
    <div class="field">
      <label class="label" for="first">First name</label>
      <input class="input input-md" id="first" />
    </div>
    <div class="field">
      <label class="label" for="last">Last name</label>
      <input class="input input-md" id="last" />
    </div>
  </div>

  <div class="field">
    <label class="label" for="address">Address</label>
    <input class="input input-md" id="address" />
  </div>

  <!-- action row -->
</form>
```

`switcher` stacks automatically when each item would need less than 20rem — no media queries.

## Accessibility checklist

- [ ] Every `input`/`select`/`textarea` has a `label[for]` pointing at its `id`.
- [ ] `helper-text`/`error-text` are wired via `aria-describedby`.
- [ ] Controls in error state have `aria-invalid="true"` and the field has `data-invalid="true"`.
- [ ] Submit button type is `"submit"`, cancel/reset buttons are `type="button"` to avoid accidental form submission.
- [ ] Form uses `novalidate` if you own validation; otherwise native validation runs first.

## Related

- `docs/components/field.md`, `label.md`, `input.md`, `input-group.md`, `helper-text.md`, `error-text.md`
- `docs/guides/canonical-conventions.md` — aria-* vs data-* attribute rules
- `docs/guides/layout-composition.md` — `stack`, `cluster`, `switcher` primitives
