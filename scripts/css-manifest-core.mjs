/**
 * css-manifest-core.mjs — Opt-in split: core-only surface list (M3)
 *
 * Contains only the foundational surfaces suitable for a lightweight "core"
 * bundle. Consumers who need the full surface set should use css-manifest.mjs.
 *
 * Core surfaces: reset, base tokens, layout primitives, and the most commonly
 * used interactive components (button, input, card, badge, alert, modal, toast,
 * table, tabs, pagination + foundation extensions).
 */

export const cssManifestCore = [
  "packages/tokens/core.css",
  "packages/tokens/semantic.css",
  "packages/reset/reset.css",
  "packages/base/base.css",
  "packages/layouts/container.css",
  "packages/layouts/stack.css",
  "packages/layouts/cluster.css",
  "packages/layouts/sidebar.css",
  "packages/layouts/switcher.css",
  "packages/layouts/center.css",
  "packages/layouts/grid.css",
  "packages/recipes/recipes.css",
  "packages/components/button.css",
  "packages/components/input.css",
  "packages/components/textarea.css",
  "packages/components/select.css",
  "packages/components/checkbox.css",
  "packages/components/radio.css",
  "packages/components/switch.css",
  "packages/components/card.css",
  "packages/components/modal.css",
  "packages/components/toast.css",
  "packages/components/table.css",
  "packages/components/tabs.css",
  "packages/components/pagination.css",
  "packages/components/empty-state.css",
  "packages/components/icon-button.css",
  "packages/components/link.css",
  "packages/components/divider.css",
  "packages/components/surface.css",
  "packages/components/visually-hidden.css",
  "packages/components/skeleton.css",
  "packages/components/spinner.css",
  "packages/components/label.css",
  "packages/components/helper-text.css",
  "packages/components/error-text.css",
  "packages/components/badge.css",
  "packages/components/alert.css",
  "packages/utilities/spacing.css",
  "packages/utilities/typography.css",
  "packages/utilities/color.css",
  "packages/utilities/layout.css",
  "packages/utilities/state.css",
  "packages/utilities/effects.css"
];
