# Fikir CSS — Style Variant Contract

> Created: 2026-04-16
> Status: v1.0 track canonical reference for style naming

## Purpose

This document freezes the public style vocabulary used across supported Fikir CSS surfaces.

The goal is consistency:

- the same style word should mean the same visual intent across families,
- families may support a subset of the shared vocabulary,
- unsupported synonyms (`filled`, `raised`, `secondary`, `minimal`) must not become parallel public APIs.

## Global Vocabulary

The global style vocabulary is:

- `solid`
- `soft`
- `outline`
- `ghost`
- `plain`
- `link`

Rules:

- `link` is reserved for link-like action surfaces. Buttons use `btn-plain`; they do not define a separate `btn-link` public class.
- Class-based families use `{family}-{style}` naming such as `btn-soft` or `badge-outline`.
- Families that do not expose extra public classes may use `data-style="<value>"` instead.

## Family Matrix

### Button

Official public style selectors:

- `btn-solid`
- `btn-soft`
- `btn-outline`
- `btn-ghost`
- `btn-plain`

Buttons combine a style selector with a tone selector such as `btn-primary`, `btn-neutral`, or `btn-danger`.

Example:

```html
<button class="btn btn-soft btn-primary btn-md">Save draft</button>
```

### Badge

Official public style selectors:

- `badge-solid`
- `badge-soft`
- `badge-outline`
- `badge-plain`

`badge-ghost` is intentionally not part of the public badge contract for v1.0.

Example:

```html
<span class="badge badge-outline badge-primary">Beta</span>
```

### Alert

Official styles:

- default soft treatment via tone classes
- `data-style="outline"`

Example:

```html
<div class="alert alert-warning" data-style="outline" role="alert">...</div>
```

### Result

Official styles:

- outline by default
- `data-style="soft"` for stronger emphasis

Example:

```html
<article class="result" data-result-tone="danger" data-style="soft">...</article>
```

### Toast

Official styles:

- soft by default
- `data-style="outline"`

Example:

```html
<article class="toast" data-tone="info" data-style="outline" data-open="true">...</article>
```

## Container Surface Matrix

Container surfaces use a dedicated four-state style vocabulary:

- `flat`
- `subtle`
- `elevated`
- `interactive`

### Card

Official selectors:

- `card-flat`
- `card-subtle`
- `card-elevated`
- `card-interactive`

Compatibility alias:

- `card-plain` remains available as a legacy alias for `card-flat`

### Surface

Official selectors:

- `surface-flat`
- `surface-subtle`
- `surface-elevated`
- `surface-interactive`

Compatibility aliases:

- `surface-raised` remains available as a legacy alias for `surface-elevated`
- `surface-sunken` remains available as a legacy alias for `surface-subtle`

## Naming Guardrails

The following are not valid public style names in the v1.0 track:

- `filled`
- `minimal`
- `raised` for card
- `hoverable`
- `secondary` as a style name

If a new style name is needed, this document and the relevant tests must be updated in the same change.
