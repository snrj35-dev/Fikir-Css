# Semantic-to-Utility Equivalence Tables

> Created: 2026-04-12
> Scope: M2 Dual API — cross-reference for semantic component consumers migrating to utility-first patterns

## Purpose

This document maps each Fikir CSS semantic component selector to the approximate utility class equivalent. Use this when:
- Porting a component to a utility-only style sheet.
- Debugging a styling override.
- Understanding which tokens a component uses.

> **Note:** Utility classes operate in the `utilities` layer which sits above `components`. Applying utility classes alongside component classes is always valid and overrides win predictably.

---

## Button

| Semantic | Utility Equivalent | Notes |
|----------|-------------------|-------|
| `.btn` | `inline-flex items-center justify-center gap-2 rounded-md px-4 py-2 font-medium text-sm cursor-pointer border-0` | Baseline shape |
| `.btn-primary` | `bg-primary-500 text-white hover:bg-primary-600` | Accent fill variant |
| `.btn-sm` | `px-3 py-1 text-xs` | Size override |
| `.btn-lg` | `px-5 py-3 text-md` | Size override |

---

## Badge

| Semantic | Utility Equivalent | Notes |
|----------|-------------------|-------|
| `.badge` | `inline-flex items-center rounded-md px-2 py-0.5 font-medium text-xs` | Base |
| `.badge-primary` | `bg-primary-500 text-white` | Accent fill |
| `.badge-neutral` | `bg-surface border-subtle` | Neutral outline |
| `.badge-danger` | `bg-danger text-white` | Danger fill |

---

## Alert

| Semantic | Utility Equivalent | Notes |
|----------|-------------------|-------|
| `.alert` | `flex gap-3 p-4 rounded-md border border-subtle bg-surface text-fg-default` | Base layout |
| `.alert-danger` | Override border and background with danger color-mix | See token composition in `alert.css` |

---

## Card

| Semantic | Utility Equivalent | Notes |
|----------|-------------------|-------|
| `.card` | `rounded-md border border-subtle bg-surface shadow-sm p-4` | Standard card |
| `.card-header` | `flex items-center justify-between gap-2 mb-3` | Header row |
| `.card-body` | `text-sm text-fg-default` | Body text |
| `.card-footer` | `flex justify-end gap-2 mt-4 pt-4 border-t border-subtle` | Footer strip |

---

## Icon Button

| Semantic | Utility Equivalent | Notes |
|----------|-------------------|-------|
| `.icon-button` | `inline-flex items-center justify-center rounded-md cursor-pointer border-0 bg-transparent text-fg-muted` | Base |
| `.icon-button-sm` | `w-7 h-7 text-xs` | Small |
| `.icon-button-md` | `w-8 h-8 text-sm` | Default |
| `.icon-button-lg` | `w-10 h-10 text-md` | Large |

---

## Input / Field

| Semantic | Utility Equivalent | Notes |
|----------|-------------------|-------|
| `.input` | `block w-full rounded-md border border-subtle bg-surface text-fg-default text-sm px-3 py-2` | Base input |
| `.field` | `flex flex-col gap-1` | Field wrapper (label + input + helper) |
| `.label` | `text-sm font-medium text-fg-default` | Label |
| `.helper-text` | `text-xs text-fg-muted` | Helper |
| `.error-text` | `text-xs text-danger` | Error |

---

## Divider

| Semantic | Utility Equivalent | Notes |
|----------|-------------------|-------|
| `.divider` | `block w-full h-px bg-border-subtle my-4` | Horizontal |

---

## Surface

| Semantic | Utility Equivalent | Notes |
|----------|-------------------|-------|
| `.surface` | `bg-surface rounded-md` | Base container |
| `.surface-raised` | `bg-surface shadow-md` | Elevated |
| `.surface-sunken` | `bg-default` | Inset |

---

## Segmented Control

| Semantic | Utility Equivalent | Notes |
|----------|-------------------|-------|
| `.segmented-control` | `inline-flex gap-1 p-1 border border-subtle rounded-md bg-default` | Container |
| `.segmented-control-label` | `inline-flex items-center justify-center px-3 py-1 rounded-sm text-sm font-medium text-fg-muted cursor-pointer` | Option |
