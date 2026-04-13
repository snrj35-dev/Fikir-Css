# Design Token Export Format Mapping

> Created: 2026-04-12
> Scope: M3 — CSS vars → JSON / Style Dictionary / Figma Token formats

## Overview

Fikir CSS tokens are defined as CSS custom properties. This document maps them to common token exchange formats used by design tools.

## CSS → W3C Design Token Format (DTCG)

```json
{
  "color": {
    "accent": {
      "$value": "oklch(58% 0.2 250)",
      "$type": "color",
      "$description": "Primary interactive color — buttons, links, focus rings"
    },
    "danger": {
      "$value": "oklch(56% 0.24 25)",
      "$type": "color"
    },
    "bg-default": {
      "$value": "oklch(99% 0.005 255)",
      "$type": "color"
    }
  },
  "space": {
    "1": { "$value": "0.25rem", "$type": "dimension" },
    "2": { "$value": "0.5rem", "$type": "dimension" },
    "3": { "$value": "0.75rem", "$type": "dimension" },
    "4": { "$value": "1rem", "$type": "dimension" }
  },
  "radius": {
    "sm": { "$value": "0.25rem", "$type": "borderRadius" },
    "md": { "$value": "0.375rem", "$type": "borderRadius" },
    "lg": { "$value": "0.5rem", "$type": "borderRadius" }
  }
}
```

## CSS → Style Dictionary Format

```json
{
  "color": {
    "accent": { "value": "oklch(58% 0.2 250)" },
    "danger": { "value": "oklch(56% 0.24 25)" },
    "bg": {
      "default": { "value": "oklch(99% 0.005 255)" },
      "surface": { "value": "oklch(97% 0.004 255)" }
    },
    "fg": {
      "default": { "value": "oklch(15% 0.01 255)" },
      "muted": { "value": "oklch(46% 0.02 255)" }
    }
  },
  "space": {
    "1": { "value": "4px" },
    "2": { "value": "8px" },
    "4": { "value": "16px" }
  }
}
```

## CSS → Figma Variable Format

In Figma, create a variable collection named `Fikir Tokens`:

| Variable | Type | Light Value | Dark Value |
|----------|------|-------------|------------|
| `color/bg/default` | Color | `#FAFBFF` | `#0E0F14` |
| `color/bg/surface` | Color | `#F5F6FA` | `#15161E` |
| `color/fg/default` | Color | `#1A1B23` | `#EDEFF5` |
| `color/fg/muted` | Color | `#6B7280` | `#9CA3AF` |
| `color/accent` | Color | `#2563EB` | `#60A5FA` |
| `color/danger` | Color | `#DC2626` | `#F87171` |
| `space/1` | Number | 4 | 4 |
| `space/2` | Number | 8 | 8 |
| `space/4` | Number | 16 | 16 |
| `radius/sm` | Number | 4 | 4 |
| `radius/md` | Number | 6 | 6 |

## Automated Token Export Script (Planned)

A `scripts/export-tokens.mjs` script is planned for M4 that will:
1. Parse `packages/tokens/core.css` and `packages/tokens/semantic.css`
2. Output DTCG-format `dist/tokens.json`
3. Output Style Dictionary-format `dist/tokens-sd.json`

Track this task in `docs/roadmap/tasklist.md`.

## Figma Token Handoff

See `docs/guides/figma-token-handoff.md` for the complete Figma plugin and variable handoff workflow.
