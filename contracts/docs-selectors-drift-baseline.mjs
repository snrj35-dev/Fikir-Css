/**
 * docs-selectors-drift-baseline.mjs
 *
 * Known markdown docs that still contain pre-plain-mode or otherwise
 * unsupported class tokens inside copy-paste HTML fences.
 *
 * The docs-selectors consistency test treats these as tracked backlog so that
 * CI can fail on newly introduced drift without blocking on historical debt.
 * Remove entries as docs are migrated to canonical selectors.
 */
export const docsSelectorsDriftBaseline = {
  "docs/components/avatar-group.md": ["comp-avatar-group", "comp-avatar-group-item", "comp-avatar-group-more"],
  "docs/components/avatar.md": ["comp-avatar", "comp-avatar-lg", "comp-avatar-md", "comp-avatar-sm"],
  "docs/components/breadcrumb.md": ["comp-breadcrumb", "comp-breadcrumb-item", "comp-link"],
  "docs/components/center.md": ["comp-center", "comp-empty-state", "comp-spinner", "comp-spinner-md"],
  "docs/components/cluster.md": ["comp-button", "comp-button-text", "comp-cluster", "comp-cluster-spacing-md", "comp-cluster-spacing-sm", "comp-icon-button", "comp-tag"],
  "docs/components/command-palette.md": ["comp-command-palette", "comp-command-palette-input", "comp-command-palette-item", "comp-command-palette-results"],
  "docs/components/container.md": ["comp-button", "comp-container", "comp-container-lg", "comp-container-md", "comp-container-sm", "comp-field", "comp-table"],
  "docs/components/data-grid.md": ["comp-button", "comp-data-grid", "comp-data-grid-cell", "comp-data-grid-content", "comp-data-grid-row", "comp-data-grid-toolbar"],
  "docs/components/description-list.md": ["comp-description-details", "comp-description-list", "comp-description-term"],
  "docs/components/divider.md": ["comp-divider", "comp-divider-muted", "comp-divider-vertical"],
  "docs/components/drawer.md": ["comp-button", "comp-button-ghost", "comp-checkbox", "comp-drawer", "comp-drawer-body", "comp-drawer-footer", "comp-drawer-header", "comp-drawer-overlay", "comp-icon-button", "comp-link", "comp-range-slider"],
  "docs/components/empty-state.md": ["comp-button", "comp-empty-state", "comp-empty-state-actions", "comp-empty-state-description", "comp-empty-state-icon", "comp-empty-state-title"],
  "docs/components/error-text.md": ["comp-error-text", "comp-field", "comp-input", "comp-label"],
  "docs/components/grid.md": ["comp-card", "comp-grid", "comp-grid-auto", "comp-grid-cols-2", "comp-grid-cols-3", "comp-grid-cols-4", "comp-grid-gap-lg", "comp-grid-gap-md"],
  "docs/components/helper-text.md": ["comp-field", "comp-helper-text", "comp-input", "comp-label"],
  "docs/components/input-group.md": ["comp-button", "comp-checkbox", "comp-icon-button", "comp-input", "comp-input-group", "comp-input-group-addon", "comp-input-group-input"],
  "docs/components/label.md": ["comp-field", "comp-field-label", "comp-input", "comp-label", "comp-select"],
  "docs/components/list.md": ["comp-button-text", "comp-list", "comp-list-item", "comp-list-text"],
  "docs/components/loading-overlay.md": ["comp-loading-overlay", "comp-loading-overlay-message", "comp-spinner", "comp-spinner-lg"],
  "docs/components/menu-bar.md": ["comp-menu-bar", "comp-menu-bar-item", "comp-menu-bar-submenu"],
  "docs/components/modal.md": ["comp-icon-button"],
  "docs/components/number-input.md": ["comp-error-text", "comp-field", "comp-field-input", "comp-input-group", "comp-input-group-addon", "comp-label", "comp-number-input"],
  "docs/components/otp-input.md": ["comp-button-text", "comp-error-text", "comp-field", "comp-helper-text", "comp-otp-digit", "comp-otp-input"],
  "docs/components/pagination.md": ["comp-pagination", "comp-pagination-item", "comp-pagination-item-current", "comp-pagination-next", "comp-pagination-prev"],
  "docs/components/progress.md": ["comp-progress", "comp-progress-bar", "comp-progress-label"],
  "docs/components/radio.md": ["comp-radio"],
  "docs/components/range-slider.md": ["comp-field", "comp-field-input", "comp-label", "comp-range-slider"],
  "docs/components/result.md": ["comp-button", "comp-button-ghost", "comp-result", "comp-result-actions", "comp-result-description", "comp-result-icon", "comp-result-title", "comp-surface"],
  "docs/components/search-box.md": ["comp-button", "comp-icon-button", "comp-input", "comp-input-group-addon", "comp-search-box", "comp-search-box-button", "comp-search-box-input", "comp-surface"],
  "docs/components/section-block.md": ["comp-field", "comp-section-block", "comp-section-block-content", "comp-section-block-title"],
  "docs/components/segmented-control.md": ["comp-segmented-control", "comp-segmented-item", "comp-segmented-item-selected"],
  "docs/components/sidebar.md": ["comp-icon-button", "comp-sidebar", "comp-sidebar-item", "comp-sidebar-item-active"],
  "docs/components/spinner.md": ["comp-button", "comp-spinner", "comp-spinner-lg", "comp-spinner-md", "comp-spinner-sm"],
  "docs/components/split-pane.md": ["comp-split-pane", "comp-split-pane-divider", "comp-split-pane-left", "comp-split-pane-right", "comp-split-pane-vertical"],
  "docs/components/stack.md": ["comp-button", "comp-button-text", "comp-field", "comp-stack", "comp-stack-horizontal", "comp-stack-spacing-lg", "comp-stack-spacing-md", "comp-stack-spacing-sm", "comp-stack-vertical"],
  "docs/components/stat.md": ["comp-stat", "comp-stat-change", "comp-stat-label", "comp-stat-value"],
  "docs/components/switch.md": ["comp-field", "comp-spinner", "comp-spinner-sm", "comp-switch"],
  "docs/components/switcher.md": ["comp-switcher", "comp-switcher-gap-lg", "comp-switcher-gap-md"],
  "docs/components/table.md": ["comp-button-text", "comp-table", "comp-table-body", "comp-table-cell", "comp-table-head", "comp-table-row"],
  "docs/components/tag.md": ["comp-tag", "comp-tag-close", "comp-tag-label", "comp-tag-primary"],
  "docs/components/toast.md": ["comp-button", "comp-icon-button", "comp-toast", "comp-toast-error", "comp-toast-info", "comp-toast-success"]
};
