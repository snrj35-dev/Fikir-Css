# Theme System Guide

> Status: planned — full content coming in M10.

Fikir CSS ships multiple theme layers that can be activated independently:

| Theme | Import | Effect |
|-------|--------|--------|
| Dark | `fikir-css/themes/dark` | Dark color tokens on `[data-theme="dark"]` |
| High contrast | `fikir-css/themes/high-contrast` | WCAG AAA contrast on `[data-theme="high-contrast"]` |
| Compact | `fikir-css/themes/compact` | Reduced spacing/sizing on `[data-density="compact"]` |
| Comfortable | `fikir-css/themes/comfortable` | Increased spacing on `[data-density="comfortable"]` |
| Reduced motion | `fikir-css/themes/reduced-motion` | Disables transitions/animations |
| Shape | `fikir-css/themes/shape` | Alternative border-radius scale |

Full documentation (activation, token overrides, mixing themes) will be added in M10.
