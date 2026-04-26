/**
 * Fikir CSS — Overlay JS Helpers type declarations
 *
 * Import: import { createFocusTrap, bindOverlayKeyboard, createRovingTabindex } from "fikir-css/helpers"
 */

// ─── createFocusTrap ──────────────────────────────────────────────────────────

export interface FocusTrap {
  /**
   * Start trapping focus. Moves focus to the first focusable child.
   * @param triggerEl - Element to return focus to on deactivate.
   */
  activate(triggerEl?: HTMLElement | null): void;

  /**
   * Stop trapping focus and return focus to the trigger element.
   */
  deactivate(): void;
}

/**
 * Trap keyboard focus inside `container`.
 *
 * @example
 * const trap = createFocusTrap(document.getElementById('my-modal')!);
 * trap.activate(openButton);   // on open
 * trap.deactivate();            // on close
 */
export function createFocusTrap(container: HTMLElement): FocusTrap;

// ─── bindOverlayKeyboard ──────────────────────────────────────────────────────

export interface OverlayKeyboardOptions {
  /** Called when Escape is pressed or the backdrop is clicked. */
  onClose: () => void;
  /** Whether clicking the backdrop (overlay wrapper itself) triggers onClose. Default: true. */
  closeOnBackdrop?: boolean;
}

export interface OverlayKeyboardBinding {
  /** Remove all event listeners added by bindOverlayKeyboard. */
  destroy(): void;
}

/**
 * Bind Escape-key and backdrop-click dismiss behavior to an overlay element.
 *
 * @example
 * const { destroy } = bindOverlayKeyboard(modalEl, {
 *   onClose: () => modalEl.setAttribute('data-open', 'false'),
 * });
 * // Later, when the overlay is removed from the DOM:
 * destroy();
 */
export function bindOverlayKeyboard(
  overlayEl: HTMLElement,
  options: OverlayKeyboardOptions
): OverlayKeyboardBinding;

// ─── bindSidebarDrawer ────────────────────────────────────────────────────────

export interface SidebarDrawerOptions {
  /** Button/icon-button that toggles the drawer. aria-expanded is kept in sync. */
  trigger: HTMLElement;
  /** The drawer component root. Must contain a `.drawer-backdrop` child. */
  drawer: HTMLElement;
  /**
   * Viewport width at/above which the drawer stays closed (desktop sidebar takes over).
   * Accepts any CSS length (`60rem`, `960px`). Defaults to `60rem`.
   */
  breakpoint?: string;
}

export interface SidebarDrawerBinding {
  /** Programmatically open the drawer (no-op on desktop). */
  open(): void;
  /** Close the drawer and release focus-trap + listeners. */
  close(): void;
  /** Remove all listeners created by bindSidebarDrawer. */
  destroy(): void;
}

/**
 * Wire a responsive sidebar/drawer pair to a single trigger button.
 * Below the breakpoint the drawer behaves as a focus-trapped overlay with
 * Escape/backdrop-click close. Above the breakpoint the helper is a no-op
 * because the inline sidebar is expected to be visible.
 *
 * @example
 * import { bindSidebarDrawer } from "fikir-css/helpers";
 * bindSidebarDrawer({
 *   trigger: document.querySelector('[data-action="open-drawer"]')!,
 *   drawer:  document.getElementById('mobile-nav')!,
 * });
 */
export function bindSidebarDrawer(options: SidebarDrawerOptions): SidebarDrawerBinding;

// ─── createRovingTabindex ─────────────────────────────────────────────────────

export type RovingOrientation = 'vertical' | 'horizontal' | 'both';

export interface RovingTabindexOptions {
  /**
   * CSS selector for the navigable items within the container.
   * Default covers common ARIA roles: tab, menuitem, option, treeitem, button, a[href].
   */
  itemSelector?: string;
  /**
   * Which arrow keys move focus.
   * - 'vertical': ArrowUp / ArrowDown
   * - 'horizontal': ArrowLeft / ArrowRight
   * - 'both': all four arrows
   * @default 'both'
   */
  orientation?: RovingOrientation;
  /**
   * Whether focus wraps from last item back to first and vice versa.
   * @default true
   */
  wrap?: boolean;
}

export interface RovingTabindex {
  /** Remove all event listeners and restore original tabindex attributes. */
  destroy(): void;
}

/**
 * Implement roving tabindex keyboard navigation inside a container.
 *
 * @example
 * const nav = createRovingTabindex(tabListEl, {
 *   itemSelector: '[role="tab"]',
 *   orientation: 'horizontal',
 * });
 */
export function createRovingTabindex(
  container: HTMLElement,
  options?: RovingTabindexOptions
): RovingTabindex;
